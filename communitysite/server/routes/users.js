const express = require('express');
const { pool } = require('../config/database');
const { requireAuth, optionalAuth, getUserInfo } = require('../middleware/auth');
const { body, param, query, validationResult } = require('express-validator');

const router = express.Router();

// Validation middleware
const validateUUID = [
  param('id').isUUID().withMessage('Invalid user ID format')
];

const validateUsername = [
  param('username').isLength({ min: 3, max: 30 }).withMessage('Username must be between 3 and 30 characters')
];

const validateUserUpdate = [
  body('firstName').optional().isLength({ max: 50 }).withMessage('First name must be less than 50 characters'),
  body('lastName').optional().isLength({ max: 50 }).withMessage('Last name must be less than 50 characters'),
  body('fullName').optional().isLength({ max: 100 }).withMessage('Display name must be less than 100 characters'),
  body('bio').optional().isLength({ max: 500 }).withMessage('Bio must be less than 500 characters'),
  body('location').optional().isLength({ max: 100 }).withMessage('Location must be less than 100 characters'),
  body('website').optional().custom((value) => {
    if (!value || value.trim() === '') {
      return true; // Allow empty strings
    }
    // Check if it's a valid URL
    try {
      new URL(value);
      return true;
    } catch {
      // If not a valid URL, check if it's a domain without protocol
      const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;
      if (domainRegex.test(value)) {
        return true;
      }
      throw new Error('Website must be a valid URL or domain');
    }
  }),
  body('githubUsername').optional().isLength({ max: 50 }).withMessage('GitHub username must be less than 50 characters'),
  body('twitterUsername').optional().isLength({ max: 50 }).withMessage('Twitter username must be less than 50 characters'),
  body('linkedinUsername').optional().isLength({ max: 50 }).withMessage('LinkedIn username must be less than 50 characters')
];

const validatePagination = [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100')
];

// Handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

// Debug endpoint to test token verification
router.get('/debug/token', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    console.log('Debug endpoint - Auth header:', authHeader ? authHeader.substring(0, 30) + '...' : 'None');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.json({
        success: false,
        message: 'No auth header or invalid format',
        debug: { authHeader: authHeader || 'None' }
      });
    }

    const token = authHeader.substring(7);
    console.log('Debug endpoint - Token:', {
      length: token.length,
      start: token.substring(0, 20) + '...',
      clerkSecretPresent: !!process.env.CLERK_SECRET_KEY
    });

    // Try to verify with Clerk
    const { verifyToken } = require('@clerk/backend');
    const payload = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY
    });

    res.json({
      success: true,
      message: 'Token verified successfully',
      debug: {
        hasPayload: !!payload,
        userId: payload?.sub,
        payloadKeys: payload ? Object.keys(payload) : 'No payload'
      }
    });
  } catch (error) {
    console.error('Debug token verification error:', error);
    res.json({
      success: false,
      message: 'Token verification failed',
      debug: {
        errorName: error.name,
        errorMessage: error.message,
        clerkSecretPresent: !!process.env.CLERK_SECRET_KEY
      }
    });
  }
});

// Get current user profile
router.get('/profile/me', requireAuth, getUserInfo, async (req, res) => {
  try {
    console.log('Profile endpoint reached - User ID:', req.userId);

    let result = await pool.query(
      `SELECT id, email, username, first_name, last_name, full_name, 
              image_url, bio, location, website, github_username, 
              twitter_username, linkedin_username, is_verified, is_active,
              created_at, updated_at
       FROM users WHERE id = $1`,
      [req.userId]
    );

    console.log('Database query result:', {
      rowCount: result.rows.length,
      userId: req.userId
    });

    // If user doesn't exist in database, create them from Clerk data
    if (result.rows.length === 0 && req.user) {
      console.log('User not found in database, creating from Clerk data:', req.user);

      const insertResult = await pool.query(`
        INSERT INTO users (id, email, username, first_name, last_name, full_name, image_url)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id, email, username, first_name, last_name, full_name, 
                  image_url, bio, location, website, github_username, 
                  twitter_username, linkedin_username, is_verified, is_active,
                  created_at, updated_at
      `, [
        req.user.id,
        req.user.email,
        req.user.username,
        req.user.firstName,
        req.user.lastName,
        req.user.fullName,
        req.user.imageUrl
      ]);

      result = insertResult;
      console.log('User created successfully');
    }

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const user = result.rows[0];

    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          firstName: user.first_name,
          lastName: user.last_name,
          fullName: user.full_name,
          imageUrl: user.image_url,
          bio: user.bio,
          location: user.location,
          website: user.website,
          githubUsername: user.github_username,
          twitterUsername: user.twitter_username,
          linkedinUsername: user.linkedin_username,
          isVerified: user.is_verified,
          isActive: user.is_active,
          createdAt: user.created_at,
          updatedAt: user.updated_at
        }
      }
    });
  } catch (error) {
    console.error('Get current user profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get user profile'
    });
  }
});

// Update user profile
router.put('/profile', requireAuth, getUserInfo, validateUserUpdate, handleValidationErrors, async (req, res) => {
  try {
    console.log('Update profile endpoint reached - User ID:', req.userId);
    console.log('Request body:', req.body);

    const {
      firstName,
      lastName,
      fullName,
      bio,
      location,
      website,
      githubUsername,
      twitterUsername,
      linkedinUsername
    } = req.body;

    // First check if user exists, if not create them
    let userExists = await pool.query('SELECT id FROM users WHERE id = $1', [req.userId]);

    if (userExists.rows.length === 0 && req.user) {
      console.log('User not found in database during update, creating from Clerk data:', req.user);

      await pool.query(`
        INSERT INTO users (id, email, username, first_name, last_name, full_name, image_url)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `, [
        req.user.id,
        req.user.email,
        req.user.username,
        req.user.firstName,
        req.user.lastName,
        req.user.fullName,
        req.user.imageUrl
      ]);

      console.log('User created successfully during update');
    }

    const result = await pool.query(
      `UPDATE users SET
        first_name = COALESCE($1, first_name),
        last_name = COALESCE($2, last_name),
        full_name = COALESCE($3, full_name),
        bio = COALESCE($4, bio),
        location = COALESCE($5, location),
        website = COALESCE($6, website),
        github_username = COALESCE($7, github_username),
        twitter_username = COALESCE($8, twitter_username),
        linkedin_username = COALESCE($9, linkedin_username),
        updated_at = CURRENT_TIMESTAMP
       WHERE id = $10
       RETURNING id, email, username, first_name, last_name, full_name, 
                 image_url, bio, location, website, github_username, 
                 twitter_username, linkedin_username, is_verified, is_active,
                 created_at, updated_at`,
      [firstName, lastName, fullName, bio, location, website, githubUsername, twitterUsername, linkedinUsername, req.userId]
    );

    console.log('Update query result:', {
      rowCount: result.rows.length,
      userId: req.userId
    });

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const user = result.rows[0];

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          firstName: user.first_name,
          lastName: user.last_name,
          fullName: user.full_name,
          imageUrl: user.image_url,
          bio: user.bio,
          location: user.location,
          website: user.website,
          githubUsername: user.github_username,
          twitterUsername: user.twitter_username,
          linkedinUsername: user.linkedin_username,
          isVerified: user.is_verified,
          isActive: user.is_active,
          createdAt: user.created_at,
          updatedAt: user.updated_at
        }
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update profile'
    });
  }
});

// Get user profile by username
router.get('/:username', validateUsername, handleValidationErrors, optionalAuth, async (req, res) => {
  try {
    const { username } = req.params;

    const result = await pool.query(
      `SELECT id, username, first_name, last_name, full_name, email, image_url,
              bio, location, website, github_username, twitter_username, 
              linkedin_username, is_verified, created_at, updated_at
       FROM users 
       WHERE username = $1 AND is_active = true`,
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const user = result.rows[0];

    // Get user's post count
    const postsResult = await pool.query(
      'SELECT COUNT(*) as count FROM posts WHERE user_id = $1 AND is_archived = false',
      [user.id]
    );

    // Get user's project count
    const projectsResult = await pool.query(
      'SELECT COUNT(*) as count FROM projects WHERE user_id = $1 AND is_approved = true',
      [user.id]
    );

    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          username: user.username,
          firstName: user.first_name,
          lastName: user.last_name,
          fullName: user.full_name,
          email: user.email,
          imageUrl: user.image_url,
          bio: user.bio,
          location: user.location,
          website: user.website,
          githubUsername: user.github_username,
          twitterUsername: user.twitter_username,
          linkedinUsername: user.linkedin_username,
          isVerified: user.is_verified,
          createdAt: user.created_at,
          updatedAt: user.updated_at,
          stats: {
            postsCount: parseInt(postsResult.rows[0].count),
            projectsCount: parseInt(projectsResult.rows[0].count)
          }
        }
      }
    });
  } catch (error) {
    console.error('Get user profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get user profile'
    });
  }
});

// Get user's posts
router.get('/:username/posts', validateUsername, handleValidationErrors, validatePagination, handleValidationErrors, async (req, res) => {
  try {
    const { username } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 10, 50);
    const offset = (page - 1) * limit;

    // First get user ID
    const userResult = await pool.query(
      'SELECT id FROM users WHERE username = $1 AND is_active = true',
      [username]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const userId = userResult.rows[0].id;

    // Get user's posts
    const postsResult = await pool.query(
      `SELECT p.*, u.username, u.full_name, u.image_url as user_image_url, u.is_verified
       FROM posts p
       JOIN users u ON p.user_id = u.id
       WHERE p.user_id = $1 AND p.is_archived = false
       ORDER BY p.created_at DESC
       LIMIT $2 OFFSET $3`,
      [userId, limit, offset]
    );

    // Get total count
    const countResult = await pool.query(
      'SELECT COUNT(*) as total FROM posts WHERE user_id = $1 AND is_archived = false',
      [userId]
    );

    const total = parseInt(countResult.rows[0].total);
    const totalPages = Math.ceil(total / limit);

    res.json({
      success: true,
      data: {
        posts: postsResult.rows,
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1
        }
      }
    });
  } catch (error) {
    console.error('Get user posts error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get user posts'
    });
  }
});

// Get user's projects
router.get('/:username/projects', validateUsername, handleValidationErrors, validatePagination, handleValidationErrors, async (req, res) => {
  try {
    const { username } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 10, 50);
    const offset = (page - 1) * limit;

    // First get user ID
    const userResult = await pool.query(
      'SELECT id FROM users WHERE username = $1 AND is_active = true',
      [username]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const userId = userResult.rows[0].id;

    // Get user's projects
    const projectsResult = await pool.query(
      `SELECT p.*, u.username, u.full_name, u.image_url as user_image_url, u.is_verified
       FROM projects p
       JOIN users u ON p.user_id = u.id
       WHERE p.user_id = $1 AND p.is_approved = true
       ORDER BY p.created_at DESC
       LIMIT $2 OFFSET $3`,
      [userId, limit, offset]
    );

    // Get total count
    const countResult = await pool.query(
      'SELECT COUNT(*) as total FROM projects WHERE user_id = $1 AND is_approved = true',
      [userId]
    );

    const total = parseInt(countResult.rows[0].total);
    const totalPages = Math.ceil(total / limit);

    res.json({
      success: true,
      data: {
        projects: projectsResult.rows,
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1
        }
      }
    });
  } catch (error) {
    console.error('Get user projects error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get user projects'
    });
  }
});

// POST /api/users/:username/follow - Follow/unfollow user
router.post('/:username/follow',
  validateUsername,
  handleValidationErrors,
  requireAuth,
  getUserInfo,
  async (req, res) => {
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      const { username } = req.params;

      // Get target user
      const targetUserResult = await client.query(
        'SELECT id FROM users WHERE username = $1 AND is_active = true',
        [username]
      );

      if (targetUserResult.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      const targetUserId = targetUserResult.rows[0].id;

      // Check if user is trying to follow themselves
      if (targetUserId === req.userId) {
        return res.status(400).json({
          success: false,
          message: 'You cannot follow yourself'
        });
      }

      // Check if already following
      const existingFollowResult = await client.query(
        'SELECT id FROM user_follows WHERE follower_id = $1 AND following_id = $2',
        [req.userId, targetUserId]
      );

      let isFollowing;

      if (existingFollowResult.rows.length > 0) {
        // Unfollow
        await client.query(
          'DELETE FROM user_follows WHERE follower_id = $1 AND following_id = $2',
          [req.userId, targetUserId]
        );
        isFollowing = false;
      } else {
        // Follow
        await client.query(
          'INSERT INTO user_follows (follower_id, following_id) VALUES ($1, $2)',
          [req.userId, targetUserId]
        );
        isFollowing = true;
      }

      // Get updated follower counts
      const followerCountResult = await client.query(
        'SELECT COUNT(*) as count FROM user_follows WHERE following_id = $1',
        [targetUserId]
      );

      const followingCountResult = await client.query(
        'SELECT COUNT(*) as count FROM user_follows WHERE follower_id = $1',
        [targetUserId]
      );

      await client.query('COMMIT');

      res.json({
        success: true,
        message: isFollowing ? 'User followed successfully' : 'User unfollowed successfully',
        data: {
          isFollowing,
          followerCount: parseInt(followerCountResult.rows[0].count),
          followingCount: parseInt(followingCountResult.rows[0].count)
        }
      });
    } catch (error) {
      await client.query('ROLLBACK');
      console.error('Follow/unfollow error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to follow/unfollow user'
      });
    } finally {
      client.release();
    }
  }
);

// GET /api/users/:username/follow-status - Check if current user follows target user
router.get('/:username/follow-status',
  validateUsername,
  handleValidationErrors,
  requireAuth,
  async (req, res) => {
    try {
      const { username } = req.params;

      // Get target user
      const targetUserResult = await pool.query(
        'SELECT id FROM users WHERE username = $1 AND is_active = true',
        [username]
      );

      if (targetUserResult.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      const targetUserId = targetUserResult.rows[0].id;

      // Check if following
      const followResult = await pool.query(
        'SELECT id FROM user_follows WHERE follower_id = $1 AND following_id = $2',
        [req.userId, targetUserId]
      );

      // Get follower/following counts
      const followerCountResult = await pool.query(
        'SELECT COUNT(*) as count FROM user_follows WHERE following_id = $1',
        [targetUserId]
      );

      const followingCountResult = await pool.query(
        'SELECT COUNT(*) as count FROM user_follows WHERE follower_id = $1',
        [targetUserId]
      );

      res.json({
        success: true,
        data: {
          isFollowing: followResult.rows.length > 0,
          followerCount: parseInt(followerCountResult.rows[0].count),
          followingCount: parseInt(followingCountResult.rows[0].count)
        }
      });
    } catch (error) {
      console.error('Follow status error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get follow status'
      });
    }
  }
);

module.exports = router;