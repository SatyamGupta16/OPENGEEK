const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { hashPassword, comparePassword } = require('../middleware/enhancedAuth');
const { auditLog, userManagementRateLimit } = require('../middleware/security');

// GET /admin-users - List all admin users (super_admin only)
router.get('/', auditLog('VIEW_ADMIN_USERS'), async (req, res) => {
  try {
    if (req.user.role !== 'super_admin') {
      return res.status(403).json({
        success: false,
        message: 'Only super admins can view admin users'
      });
    }
    
    const result = await db.query(`
      SELECT 
        id, username, email, role, is_active, created_at, 
        last_login, last_activity, login_attempts
      FROM admin_users 
      ORDER BY created_at DESC
    `);
    
    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Error fetching admin users:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching admin users',
      error: error.message
    });
  }
});

// POST /admin-users - Create new admin user (super_admin only)
router.post('/', userManagementRateLimit, auditLog('CREATE_ADMIN_USER'), async (req, res) => {
  try {
    if (req.user.role !== 'super_admin') {
      return res.status(403).json({
        success: false,
        message: 'Only super admins can create admin users'
      });
    }
    
    const { username, email, password, role = 'admin' } = req.body;
    
    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username, email, and password are required'
      });
    }
    
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters long'
      });
    }
    
    if (!['admin', 'moderator'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Role must be either admin or moderator'
      });
    }
    
    // Check if username or email already exists
    const existingUser = await db.query(
      'SELECT id FROM admin_users WHERE username = $1 OR email = $2',
      [username, email]
    );
    
    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Username or email already exists'
      });
    }
    
    // Hash password
    const hashedPassword = await hashPassword(password);
    
    // Create user
    const result = await db.query(`
      INSERT INTO admin_users (username, email, password_hash, role)
      VALUES ($1, $2, $3, $4)
      RETURNING id, username, email, role, is_active, created_at
    `, [username, email, hashedPassword, role]);
    
    console.log(`👤 New admin user created: ${username} (${role}) by ${req.user.username}`);
    
    res.status(201).json({
      success: true,
      message: 'Admin user created successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error creating admin user:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating admin user',
      error: error.message
    });
  }
});

// PUT /admin-users/:id - Update admin user
router.put('/:id', userManagementRateLimit, auditLog('UPDATE_ADMIN_USER'), async (req, res) => {
  try {
    const { id } = req.params;
    const { email, role, is_active } = req.body;
    
    // Only super_admin can update other users, or users can update themselves (limited)
    if (req.user.role !== 'super_admin' && req.user.id !== parseInt(id)) {
      return res.status(403).json({
        success: false,
        message: 'You can only update your own profile'
      });
    }
    
    // Only super_admin can change roles and activation status
    if ((role || is_active !== undefined) && req.user.role !== 'super_admin') {
      return res.status(403).json({
        success: false,
        message: 'Only super admins can change roles or activation status'
      });
    }
    
    // Get target user info to check if it's a super_admin
    const targetUserResult = await db.query(
      'SELECT role FROM admin_users WHERE id = $1',
      [id]
    );
    
    if (targetUserResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Admin user not found'
      });
    }
    
    const targetUser = targetUserResult.rows[0];
    
    // Prevent modifying other super_admin users (except self)
    if (targetUser.role === 'super_admin' && req.user.id !== parseInt(id)) {
      return res.status(403).json({
        success: false,
        message: 'Super admin accounts cannot be modified by other users'
      });
    }
    
    // Build update query dynamically
    const updates = [];
    const values = [];
    let paramCount = 0;
    
    if (email) {
      paramCount++;
      updates.push(`email = $${paramCount}`);
      values.push(email);
    }
    
    if (role && ['admin', 'moderator', 'super_admin'].includes(role)) {
      paramCount++;
      updates.push(`role = $${paramCount}`);
      values.push(role);
    }
    
    if (is_active !== undefined) {
      paramCount++;
      updates.push(`is_active = $${paramCount}`);
      values.push(is_active);
    }
    
    if (updates.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No valid fields to update'
      });
    }
    
    updates.push('updated_at = CURRENT_TIMESTAMP');
    paramCount++;
    values.push(id);
    
    const query = `UPDATE admin_users SET ${updates.join(', ')} WHERE id = $${paramCount} RETURNING id, username, email, role, is_active, created_at, updated_at`;
    
    const result = await db.query(query, values);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Admin user not found'
      });
    }
    
    console.log(`👤 Admin user updated: ${result.rows[0].username} by ${req.user.username}`);
    
    res.json({
      success: true,
      message: 'Admin user updated successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error updating admin user:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating admin user',
      error: error.message
    });
  }
});

// PUT /admin-users/:id/password - Change password
router.put('/:id/password', userManagementRateLimit, auditLog('CHANGE_PASSWORD'), async (req, res) => {
  try {
    const { id } = req.params;
    const { current_password, new_password } = req.body;
    
    // Users can only change their own password, or super_admin can change any
    if (req.user.role !== 'super_admin' && req.user.id !== parseInt(id)) {
      return res.status(403).json({
        success: false,
        message: 'You can only change your own password'
      });
    }
    
    if (!new_password || new_password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 8 characters long'
      });
    }
    
    // Get current user data
    const userResult = await db.query(
      'SELECT username, password_hash, role FROM admin_users WHERE id = $1',
      [id]
    );
    
    if (userResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Admin user not found'
      });
    }
    
    const user = userResult.rows[0];
    
    // Prevent changing password of other super_admin users
    if (user.role === 'super_admin' && req.user.id !== parseInt(id) && req.user.role !== 'super_admin') {
      return res.status(403).json({
        success: false,
        message: 'Cannot change password of super admin users'
      });
    }
    
    // If not super_admin, verify current password
    if (req.user.role !== 'super_admin') {
      if (!current_password) {
        return res.status(400).json({
          success: false,
          message: 'Current password is required'
        });
      }
      
      const isValidPassword = await comparePassword(current_password, user.password_hash);
      if (!isValidPassword) {
        return res.status(400).json({
          success: false,
          message: 'Current password is incorrect'
        });
      }
    }
    
    // Hash new password
    const hashedPassword = await hashPassword(new_password);
    
    // Update password
    await db.query(
      'UPDATE admin_users SET password_hash = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
      [hashedPassword, id]
    );
    
    console.log(`🔐 Password changed for admin user: ${user.username} by ${req.user.username}`);
    
    res.json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({
      success: false,
      message: 'Error changing password',
      error: error.message
    });
  }
});

// DELETE /admin-users/:id - Delete admin user (super_admin only)
router.delete('/:id', userManagementRateLimit, auditLog('DELETE_ADMIN_USER'), async (req, res) => {
  try {
    if (req.user.role !== 'super_admin') {
      return res.status(403).json({
        success: false,
        message: 'Only super admins can delete admin users'
      });
    }
    
    const { id } = req.params;
    
    // Prevent deleting self
    if (req.user.id === parseInt(id)) {
      return res.status(400).json({
        success: false,
        message: 'You cannot delete your own account'
      });
    }
    
    // Get user info before deletion
    const userResult = await db.query(
      'SELECT username, role FROM admin_users WHERE id = $1',
      [id]
    );
    
    if (userResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Admin user not found'
      });
    }
    
    const targetUser = userResult.rows[0];
    
    // Prevent deleting other super_admin users (only allow deleting admin/moderator)
    if (targetUser.role === 'super_admin') {
      return res.status(403).json({
        success: false,
        message: 'Super admin accounts cannot be deleted for security reasons'
      });
    }
    
    // Delete user
    await db.query('DELETE FROM admin_users WHERE id = $1', [id]);
    
    console.log(`🗑️ Admin user deleted: ${targetUser.username} (${targetUser.role}) by ${req.user.username}`);
    
    res.json({
      success: true,
      message: 'Admin user deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting admin user:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting admin user',
      error: error.message
    });
  }
});

// GET /admin-users/profile - Get current user profile
router.get('/profile', auditLog('VIEW_PROFILE'), async (req, res) => {
  try {
    const result = await db.query(`
      SELECT 
        id, username, email, role, is_active, created_at, 
        last_login, last_activity
      FROM admin_users 
      WHERE id = $1
    `, [req.user.id]);
    
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
    console.error('Error fetching profile:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching profile',
      error: error.message
    });
  }
});

// GET /admin-users/:id - Get specific admin user (super_admin only)
router.get('/:id', auditLog('VIEW_ADMIN_USER'), async (req, res) => {
  try {
    if (req.user.role !== 'super_admin') {
      return res.status(403).json({
        success: false,
        message: 'Only super admins can view specific admin users'
      });
    }
    
    const { id } = req.params;
    
    const result = await db.query(`
      SELECT 
        id, username, email, role, is_active, created_at, 
        last_login, last_activity, login_attempts
      FROM admin_users 
      WHERE id = $1
    `, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Admin user not found'
      });
    }
    
    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error fetching admin user:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching admin user',
      error: error.message
    });
  }
});

module.exports = router;