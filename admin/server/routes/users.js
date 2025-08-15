const express = require('express');
const router = express.Router();
const db = require('../config/database');

// GET /users → List all users from the main database
router.get('/', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT 
        id, 
        email, 
        username, 
        full_name,
        first_name,
        last_name,
        bio,
        location,
        github_username,
        is_verified,
        is_active,
        created_at,
        updated_at
      FROM users 
      ORDER BY created_at DESC
    `);
    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: error.message
    });
  }
});

// GET /users/:id → Get user details
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query(`
      SELECT 
        id, 
        email, 
        username, 
        full_name,
        first_name,
        last_name,
        bio,
        location,
        github_username,
        is_verified,
        is_active,
        created_at,
        updated_at
      FROM users 
      WHERE id = $1
    `, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user',
      error: error.message
    });
  }
});

// POST /users → Add user (Note: In real app, users are created via Clerk webhooks)
router.post('/', async (req, res) => {
  try {
    const { id, email, username, first_name, last_name, full_name, bio, location, github_username } = req.body;
    
    // Generate a unique ID if not provided (normally would come from Clerk)
    const userId = id || `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const result = await db.query(`
      INSERT INTO users (
        id, email, username, first_name, last_name, full_name, bio, location, github_username, is_verified, is_active
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) 
      RETURNING id, email, username, full_name, first_name, last_name, bio, location, github_username, is_verified, is_active, created_at
    `, [userId, email, username, first_name, last_name, full_name, bio, location, github_username, false, true]);
    
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating user',
      error: error.message
    });
  }
});

// PUT /users/:id → Update user
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { email, username, first_name, last_name, full_name, bio, location, github_username, is_verified, is_active } = req.body;
    
    const result = await db.query(`
      UPDATE users SET 
        email = $1, 
        username = $2, 
        first_name = $3, 
        last_name = $4, 
        full_name = $5, 
        bio = $6, 
        location = $7, 
        github_username = $8,
        is_verified = $9,
        is_active = $10,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $11 
      RETURNING id, email, username, full_name, first_name, last_name, bio, location, github_username, is_verified, is_active, created_at, updated_at
    `, [email, username, first_name, last_name, full_name, bio, location, github_username, is_verified, is_active, id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.json({
      success: true,
      message: 'User updated successfully',
      data: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating user',
      error: error.message
    });
  }
});

// DELETE /users/:id → Delete user (cascades to posts, projects, etc.)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query('DELETE FROM users WHERE id = $1 RETURNING id', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting user',
      error: error.message
    });
  }
});

module.exports = router;
