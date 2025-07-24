const express = require('express');
const { query } = require('../config/database');
const { authenticateToken, optionalAuth } = require('../middleware/auth');
const { validateUserUpdate, validateUUID, validatePagination } = require('../middleware/validation');

const router = express.Router();

// Get user profile by username
router.get('/:username', optionalAuth, async (req, res) => {
  try {
    const { username } = req.params;

    const result = await query(
      `SELECT u.id, u.username, u.first_name, u.last_name, u.bio, u.avatar_url,
              u.github_username, u.linkedin_url, u.twitter_username, u.website_url,
              u.location, u.skills, u.is_verified, u.reputation_score, u.created_at,
              COUNT(DISTINCT p.id) as projects_count,
              COUNT(DISTINCT po.id) as posts_count,
              COUNT(DISTINCT f1.id) as followers_count,
              COUNT(DISTINCT f2.id) as following_count
       FROM users u
       LEFT JOIN projects p ON u.id = p.author_id
       LEFT JOIN posts po ON u.id = po.author_id
       LEFT JOIN follows f1 ON u.id = f1.following_id
       LEFT JOIN follows f2 ON u.id = f2.follower_id
       WHERE u.username = $1 AND u.is_active = true
       GROUP BY u.id`,
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const user = result.rows[0];

    // Check if current user is following this user
    let isFollowing = false;
    if (req.user) {
      const followResult = await query(
        'SELECT id FROM follows WHERE follower_id = $1 AND following_id = $2',
        [req.user.id, user.id]
      );
      isFollowing = followResult.rows.length > 0;
    }

    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          username: user.username,
          firstName: user.first_name,
          lastName: user.last_name,
          bio: user.bio,
          avatarUrl: user.avatar_url,
          githubUsername: user.github_username,
          linkedinUrl: user.linkedin_url,
          twitterUsername: user.twitter_username,
          websiteUrl: user.website_url,
          location: user.location,
          skills: user.skills || [],
          isVerified: user.is_verified,
          reputationScore: user.reputation_score,
          createdAt: user.created_at,
          stats: {
            projectsCount: parseInt(user.projects_count),
            postsCount: parseInt(user.posts_count),
            followersCount: parseInt(user.followers_count),
            followingCount: parseInt(user.following_count)
          },
          isFollowing
        }
      }
    });
  } catch (error) {
    console.error('Get user profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Update user profile
router.put('/profile', authenticateToken, validateUserUpdate, async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      bio,
      location,
      githubUsername,
      twitterUsername,
      websiteUrl,
      linkedinUrl,
      skills
    } = req.body;

    const result = await query(
      `UPDATE users SET
        first_name = COALESCE($1, first_name),
        last_name = COALESCE($2, last_name),
        bio = COALESCE($3, bio),
        location = COALESCE($4, location),
        github_username = COALESCE($5, github_username),
        twitter_username = COALESCE($6, twitter_username),
        website_url = COALESCE($7, website_url),
        linkedin_url = COALESCE($8, linkedin_url),
        skills = COALESCE($9, skills),
        updated_at = CURRENT_TIMESTAMP
       WHERE id = $10
       RETURNING id, username, first_name, last_name, bio, location,
                 github_username, twitter_username, website_url, linkedin_url, skills`,
      [firstName, lastName, bio, location, githubUsername, twitterUsername,
       websiteUrl, linkedinUrl, skills, req.user.id]
    );

    const user = result.rows[0];

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        user: {
          id: user.id,
          username: user.username,
          firstName: user.first_name,
          lastName: user.last_name,
          bio: user.bio,
          location: user.location,
          githubUsername: user.github_username,
          twitterUsername: user.twitter_username,
          websiteUrl: user.website_url,
          linkedinUrl: user.linkedin_url,
          skills: user.skills || []
        }
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Follow/Unfollow user
router.post('/:id/follow', authenticateToken, validateUUID, async (req, res) => {
  try {
    const { id: targetUserId } = req.params;
    const currentUserId = req.user.id;

    if (targetUserId === currentUserId) {
      return res.status(400).json({
        success: false,
        message: 'Cannot follow yourself'
      });
    }

    // Check if target user exists
    const userExists = await query(
      'SELECT id FROM users WHERE id = $1 AND is_active = true',
      [targetUserId]
    );

    if (userExists.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check if already following
    const existingFollow = await query(
      'SELECT id FROM follows WHERE follower_id = $1 AND following_id = $2',
      [currentUserId, targetUserId]
    );

    if (existingFollow.rows.length > 0) {
      // Unfollow
      await query(
        'DELETE FROM follows WHERE follower_id = $1 AND following_id = $2',
        [currentUserId, targetUserId]
      );

      res.json({
        success: true,
        message: 'User unfollowed successfully',
        data: { isFollowing: false }
      });
    } else {
      // Follow
      await query(
        'INSERT INTO follows (follower_id, following_id) VALUES ($1, $2)',
        [currentUserId, targetUserId]
      );

      res.json({
        success: true,
        message: 'User followed successfully',
        data: { isFollowing: true }
      });
    }
  } catch (error) {
    console.error('Follow/unfollow error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get user's followers
router.get('/:id/followers', validateUUID, validatePagination, async (req, res) => {
  try {
    const { id: userId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    const result = await query(
      `SELECT u.id, u.username, u.first_name, u.last_name, u.avatar_url,
              u.bio, u.is_verified, f.created_at as followed_at
       FROM follows f
       JOIN users u ON f.follower_id = u.id
       WHERE f.following_id = $1 AND u.is_active = true
       ORDER BY f.created_at DESC
       LIMIT $2 OFFSET $3`,
      [userId, limit, offset]
    );

    const countResult = await query(
      'SELECT COUNT(*) FROM follows f JOIN users u ON f.follower_id = u.id WHERE f.following_id = $1 AND u.is_active = true',
      [userId]
    );

    const totalCount = parseInt(countResult.rows[0].count);
    const totalPages = Math.ceil(totalCount / limit);

    res.json({
      success: true,
      data: {
        followers: result.rows.map(user => ({
          id: user.id,
          username: user.username,
          firstName: user.first_name,
          lastName: user.last_name,
          avatarUrl: user.avatar_url,
          bio: user.bio,
          isVerified: user.is_verified,
          followedAt: user.followed_at
        })),
        pagination: {
          currentPage: page,
          totalPages,
          totalCount,
          hasNext: page < totalPages,
          hasPrev: page > 1
        }
      }
    });
  } catch (error) {
    console.error('Get followers error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get user's following
router.get('/:id/following', validateUUID, validatePagination, async (req, res) => {
  try {
    const { id: userId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    const result = await query(
      `SELECT u.id, u.username, u.first_name, u.last_name, u.avatar_url,
              u.bio, u.is_verified, f.created_at as followed_at
       FROM follows f
       JOIN users u ON f.following_id = u.id
       WHERE f.follower_id = $1 AND u.is_active = true
       ORDER BY f.created_at DESC
       LIMIT $2 OFFSET $3`,
      [userId, limit, offset]
    );

    const countResult = await query(
      'SELECT COUNT(*) FROM follows f JOIN users u ON f.following_id = u.id WHERE f.follower_id = $1 AND u.is_active = true',
      [userId]
    );

    const totalCount = parseInt(countResult.rows[0].count);
    const totalPages = Math.ceil(totalCount / limit);

    res.json({
      success: true,
      data: {
        following: result.rows.map(user => ({
          id: user.id,
          username: user.username,
          firstName: user.first_name,
          lastName: user.last_name,
          avatarUrl: user.avatar_url,
          bio: user.bio,
          isVerified: user.is_verified,
          followedAt: user.followed_at
        })),
        pagination: {
          currentPage: page,
          totalPages,
          totalCount,
          hasNext: page < totalPages,
          hasPrev: page > 1
        }
      }
    });
  } catch (error) {
    console.error('Get following error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;