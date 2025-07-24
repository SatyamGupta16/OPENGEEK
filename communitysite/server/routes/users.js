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
  body('bio').optional().isLength({ max: 500 }).withMessage('Bio must be less than 500 characters'),
  body('location').optional().isLength({ max: 100 }).withMessage('Location must be less than 100 characters'),
  body('website').optional().isURL().withMessage('Website must be a valid URL'),
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

// Get current user profile
router.get('/profile/me', requireAuth, getUserInfo, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, email, username, first_name, last_name, full_name, 
              image_url, bio, location, website, github_username, 
              twitter_username, linkedin_username, is_verified, is_active,
              created_at, updated_at
       FROM users WHERE id = $1`,
      [req.userId]
    );

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
    const {
      bio,
      location,
      website,
      githubUsername,
      twitterUsername,
      linkedinUsername
    } = req.body;

    const result = await pool.query(
      `UPDATE users SET
        bio = COALESCE($1, bio),
        location = COALESCE($2, location),
        website = COALESCE($3, website),
        github_username = COALESCE($4, github_username),
        twitter_username = COALESCE($5, twitter_username),
        linkedin_username = COALESCE($6, linkedin_username),
        updated_at = CURRENT_TIMESTAMP
       WHERE id = $7
       RETURNING id, email, username, first_name, last_name, full_name, 
                 image_url, bio, location, website, github_username, 
                 twitter_username, linkedin_username, is_verified, is_active,
                 created_at, updated_at`,
      [bio, location, website, githubUsername, twitterUsername, linkedinUsername, req.userId]
    );

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

module.exports = router;