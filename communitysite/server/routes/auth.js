const express = require('express');
const { pool } = require('../config/database');
const { requireAuth, getUserInfo } = require('../middleware/auth');
const { clerkClient } = require('@clerk/backend');

const router = express.Router();

/**
 * GET /api/auth/me - Get current user profile
 * Requires Clerk authentication
 */
router.get('/me', requireAuth, getUserInfo, async (req, res) => {
  try {
    // Get user from database (synced from Clerk)
    const result = await pool.query(
      `SELECT id, email, username, first_name, last_name, full_name, 
              image_url, bio, location, website, github_username, 
              twitter_username, linkedin_username, is_verified, is_active,
              created_at, updated_at
       FROM users WHERE id = $1`,
      [req.userId]
    );

    let dbUser = result.rows[0];

    // If user doesn't exist in database, create from Clerk data
    if (!dbUser && req.user) {
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

      dbUser = insertResult.rows[0];
    }

    if (!dbUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: {
        user: {
          id: dbUser.id,
          email: dbUser.email,
          username: dbUser.username,
          firstName: dbUser.first_name,
          lastName: dbUser.last_name,
          fullName: dbUser.full_name,
          imageUrl: dbUser.image_url,
          bio: dbUser.bio,
          location: dbUser.location,
          website: dbUser.website,
          githubUsername: dbUser.github_username,
          twitterUsername: dbUser.twitter_username,
          linkedinUsername: dbUser.linkedin_username,
          isVerified: dbUser.is_verified,
          isActive: dbUser.is_active,
          createdAt: dbUser.created_at,
          updatedAt: dbUser.updated_at
        }
      }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get user profile'
    });
  }
});

/**
 * PUT /api/auth/profile - Update user profile
 * Requires Clerk authentication
 */
router.put('/profile', requireAuth, getUserInfo, async (req, res) => {
  try {
    const { bio, location, website, githubUsername, twitterUsername, linkedinUsername } = req.body;

    // Update user in database
    const result = await pool.query(`
      UPDATE users 
      SET bio = $1, location = $2, website = $3, github_username = $4, 
          twitter_username = $5, linkedin_username = $6, updated_at = CURRENT_TIMESTAMP
      WHERE id = $7
      RETURNING id, email, username, first_name, last_name, full_name, 
                image_url, bio, location, website, github_username, 
                twitter_username, linkedin_username, is_verified, is_active,
                created_at, updated_at
    `, [bio, location, website, githubUsername, twitterUsername, linkedinUsername, req.userId]);

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

/**
 * POST /api/auth/webhook - Clerk webhook handler
 * Handles user creation, updates, and deletion from Clerk
 */
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  try {
    const payload = req.body;
    const signature = req.headers['svix-signature'];

    // Verify webhook signature (if webhook secret is configured)
    if (process.env.CLERK_WEBHOOK_SECRET) {
      const { Webhook } = require('svix');
      const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

      try {
        webhook.verify(payload, {
          'svix-id': req.headers['svix-id'],
          'svix-timestamp': req.headers['svix-timestamp'],
          'svix-signature': signature,
        });
      } catch (err) {
        console.error('Webhook signature verification failed:', err);
        return res.status(400).json({ error: 'Invalid signature' });
      }
    }

    const event = JSON.parse(payload);
    const { type, data } = event;

    switch (type) {
      case 'user.created':
        // Create user in database when created in Clerk
        await pool.query(`
          INSERT INTO users (id, email, username, first_name, last_name, full_name, image_url)
          VALUES ($1, $2, $3, $4, $5, $6, $7)
          ON CONFLICT (id) DO UPDATE SET
            email = EXCLUDED.email,
            username = EXCLUDED.username,
            first_name = EXCLUDED.first_name,
            last_name = EXCLUDED.last_name,
            full_name = EXCLUDED.full_name,
            image_url = EXCLUDED.image_url,
            updated_at = CURRENT_TIMESTAMP
        `, [
          data.id,
          data.email_addresses[0]?.email_address,
          data.username || data.email_addresses[0]?.email_address?.split('@')[0],
          data.first_name,
          data.last_name,
          `${data.first_name || ''} ${data.last_name || ''}`.trim(),
          data.image_url
        ]);
        break;

      case 'user.updated':
        // Update user in database when updated in Clerk
        await pool.query(`
          UPDATE users 
          SET email = $2, username = $3, first_name = $4, last_name = $5, 
              full_name = $6, image_url = $7, updated_at = CURRENT_TIMESTAMP
          WHERE id = $1
        `, [
          data.id,
          data.email_addresses[0]?.email_address,
          data.username || data.email_addresses[0]?.email_address?.split('@')[0],
          data.first_name,
          data.last_name,
          `${data.first_name || ''} ${data.last_name || ''}`.trim(),
          data.image_url
        ]);
        break;

      case 'user.deleted':
        // Soft delete user in database when deleted in Clerk
        await pool.query(`
          UPDATE users 
          SET is_active = FALSE, updated_at = CURRENT_TIMESTAMP
          WHERE id = $1
        `, [data.id]);
        break;

      default:
        console.log(`Unhandled webhook event type: ${type}`);
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

/**
 * GET /api/auth/status - Check authentication status
 */
router.get('/status', requireAuth, (req, res) => {
  res.json({
    success: true,
    data: {
      authenticated: true,
      userId: req.userId
    }
  });
});

module.exports = router;