const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../config/database');
require('dotenv').config();

// Enhanced authentication middleware with session tracking
const enhancedAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'Access denied. No token provided.'
            });
        }

        const token = authHeader.split(' ')[1];

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        try {
            // Check if admin user exists and is active
            const adminResult = await db.query(
                'SELECT id, username, email, role, is_active, last_login FROM admin_users WHERE id = $1 AND is_active = true',
                [decoded.id]
            );

            if (adminResult.rows.length === 0) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid token or user deactivated'
                });
            }

            const admin = adminResult.rows[0];

            // Update last activity
            await db.query(
                'UPDATE admin_users SET last_activity = CURRENT_TIMESTAMP WHERE id = $1',
                [admin.id]
            );

            req.user = {
                id: admin.id,
                username: admin.username,
                email: admin.email,
                role: admin.role,
                lastLogin: admin.last_login
            };

            next();
        } catch (dbError) {
            // If admin_users table doesn't exist, fall back to legacy token validation
            console.log('Enhanced auth failed, using legacy validation:', dbError.message);
            
            // For legacy tokens, just validate the JWT structure
            req.user = {
                id: decoded.id,
                username: decoded.username,
                email: decoded.email || 'admin@opengeek.in',
                role: decoded.role || 'admin'
            };
            
            next();
        }
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Token expired. Please login again.'
            });
        }

        console.error('Enhanced auth error:', error);
        res.status(401).json({
            success: false,
            message: 'Invalid token.'
        });
    }
};

// Role-based authorization middleware
const requireRole = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Authentication required'
            });
        }

        const userRoles = Array.isArray(req.user.role) ? req.user.role : [req.user.role];
        const requiredRoles = Array.isArray(roles) ? roles : [roles];

        const hasRole = requiredRoles.some(role => userRoles.includes(role));

        if (!hasRole) {
            return res.status(403).json({
                success: false,
                message: `Access denied. Required roles: ${requiredRoles.join(', ')}`
            });
        }

        next();
    };
};

// Password hashing utilities
const hashPassword = async (password) => {
    const saltRounds = 12;
    return await bcrypt.hash(password, saltRounds);
};

const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

// Create default admin user if none exists
const createDefaultAdmin = async () => {
    try {
        // Check if admin_users table exists
        const tableExists = await db.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'admin_users'
      );
    `);

        if (!tableExists.rows[0].exists) {
            // Create admin_users table
            await db.query(`
        CREATE TABLE admin_users (
          id SERIAL PRIMARY KEY,
          username VARCHAR(50) UNIQUE NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          password_hash VARCHAR(255) NOT NULL,
          role VARCHAR(20) DEFAULT 'admin',
          is_active BOOLEAN DEFAULT true,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          last_login TIMESTAMP,
          last_activity TIMESTAMP,
          login_attempts INTEGER DEFAULT 0,
          locked_until TIMESTAMP
        );
      `);

            console.log('✅ Admin users table created');
        }

        // Check if any admin users exist
        const adminCount = await db.query('SELECT COUNT(*) FROM admin_users');

        if (parseInt(adminCount.rows[0].count) === 0) {
            // Create default admin from environment variables
            const defaultUsername = process.env.ADMIN_USERNAME || 'admin';
            const defaultPassword = process.env.ADMIN_PASSWORD || 'admin123';
            const defaultEmail = process.env.ADMIN_EMAIL || 'admin@opengeek.in';

            const hashedPassword = await hashPassword(defaultPassword);

            await db.query(`
        INSERT INTO admin_users (username, email, password_hash, role)
        VALUES ($1, $2, $3, 'super_admin')
      `, [defaultUsername, defaultEmail, hashedPassword]);

            console.log('✅ Default admin user created');
            console.log(`   Username: ${defaultUsername}`);
            console.log(`   Email: ${defaultEmail}`);
            console.log('   ⚠️  Please change the default password after first login!');
        }
    } catch (error) {
        console.error('❌ Error creating default admin:', error);
    }
};

// Login attempt tracking
const trackLoginAttempt = async (username, success, ip) => {
    try {
        // Check if admin_users table exists first
        const tableExists = await db.query(`
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_schema = 'public' 
                AND table_name = 'admin_users'
            );
        `);

        if (!tableExists.rows[0].exists) {
            // Table doesn't exist, just log the attempt
            console.log(`🔐 Login attempt (legacy): ${username} from ${ip} - ${success ? 'SUCCESS' : 'FAILED'}`);
            return;
        }

        if (success) {
            // Reset login attempts on successful login
            await db.query(`
                UPDATE admin_users 
                SET login_attempts = 0, locked_until = NULL, last_login = CURRENT_TIMESTAMP 
                WHERE username = $1
            `, [username]);
        } else {
            // Increment login attempts
            await db.query(`
                UPDATE admin_users 
                SET login_attempts = login_attempts + 1,
                    locked_until = CASE 
                      WHEN login_attempts >= 4 THEN CURRENT_TIMESTAMP + INTERVAL '15 minutes'
                      ELSE locked_until 
                    END
                WHERE username = $1
            `, [username]);
        }

        // Log the attempt
        console.log(`🔐 Login attempt: ${username} from ${ip} - ${success ? 'SUCCESS' : 'FAILED'}`);
    } catch (error) {
        console.error('Error tracking login attempt:', error.message);
        // Still log the attempt even if database tracking fails
        console.log(`🔐 Login attempt (fallback): ${username} from ${ip} - ${success ? 'SUCCESS' : 'FAILED'}`);
    }
};

// Check if account is locked
const isAccountLocked = async (username) => {
    try {
        // Check if admin_users table exists first
        const tableExists = await db.query(`
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_schema = 'public' 
                AND table_name = 'admin_users'
            );
        `);

        if (!tableExists.rows[0].exists) {
            // Table doesn't exist, no lockout mechanism available
            return false;
        }

        const result = await db.query(`
            SELECT locked_until, login_attempts 
            FROM admin_users 
            WHERE username = $1
        `, [username]);

        if (result.rows.length === 0) return false;

        const { locked_until, login_attempts } = result.rows[0];

        if (locked_until && new Date(locked_until) > new Date()) {
            return true;
        }

        return login_attempts >= 5;
    } catch (error) {
        console.error('Error checking account lock:', error.message);
        return false;
    }
};

module.exports = {
    enhancedAuth,
    requireRole,
    hashPassword,
    comparePassword,
    createDefaultAdmin,
    trackLoginAttempt,
    isAccountLocked
};