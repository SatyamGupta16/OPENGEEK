/** @type {import('express')} */
const express = require('express');
/** @type {import('cors')} */
const cors = require('cors');
/** @type {import('jsonwebtoken')} */
const jwt = require('jsonwebtoken');
const db = require('./config/database');

// Enhanced security and authentication
const {
  securityHeaders,
  sanitizeInput,
  authRateLimit,
  adminRateLimit
} = require('./middleware/security');
const {
  enhancedAuth,
  requireRole,
  comparePassword,
  createDefaultAdmin,
  trackLoginAttempt,
  isAccountLocked
} = require('./middleware/enhancedAuth');

// Legacy middleware for backward compatibility
const authMiddleware = require('./middleware/authMiddleware');
const adminOnly = require('./middleware/adminOnly');

// Routes - adding back one by one to identify the issue
const userRoutes = require('./routes/users');
const dashboardRoutes = require('./routes/dashboard');
const blogsRoutes = require('./routes/blogs');
const blogsPublicRoutes = require('./routes/blogsPublic');
const communityAdminRoutes = require('./routes/communityAdmin');
const adminUsersRoutes = require('./routes/adminUsers');

// Database initialization
const initDatabase = require('./db/init');
initDatabase();

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize enhanced security
app.use(securityHeaders);
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(sanitizeInput);

// Create default admin user on startup (async)
createDefaultAdmin().catch(error => {
  console.error('❌ Failed to initialize admin system:', error.message);
  console.log('📝 Note: System will fall back to environment variable authentication');
});

// Enhanced Admin Routes (using new authentication system)
console.log('🔧 Mounting enhanced admin routes...');

// Profile route accessible to all authenticated admin users
app.get('/api/admin-users/profile', enhancedAuth, requireRole(['admin', 'moderator', 'super_admin']), (req, res, next) => {
  // Forward to the profile route in adminUsersRoutes
  req.url = '/profile';
  adminUsersRoutes(req, res, next);
});

// Other admin-users routes restricted to super_admin only
app.use('/api/admin-users', enhancedAuth, requireRole(['super_admin']), adminUsersRoutes);
app.use('/api/community', enhancedAuth, requireRole(['admin', 'moderator', 'super_admin']), adminRateLimit, communityAdminRoutes);
console.log('✅ Enhanced admin routes mounted successfully');

// Legacy Routes (backward compatibility)
console.log('🔧 Mounting legacy routes with authentication...');
app.use('/users', authMiddleware, adminOnly, userRoutes);
app.use('/dashboard', authMiddleware, adminOnly, dashboardRoutes);
app.use('/blogs', authMiddleware, adminOnly, blogsRoutes);
console.log('✅ Legacy routes mounted successfully');

// Public routes (no authentication required)
console.log('🔧 Mounting public routes...');
app.use('/public/blogs', blogsPublicRoutes);
console.log('✅ Public routes mounted successfully');

// Test route
app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

// Debug route to test if routes are working
app.get('/debug', (req, res) => {
  res.json({
    message: 'Server is working',
    routes: {
      users: '/users (requires auth)',
      health: '/health',
      login: '/admin/login'
    }
  });
});

// Health-check endpoint
app.get('/health', async (req, res) => {
  const healthCheck = {
    server: 'OK',
    database: 'OK',
    timestamp: new Date().toISOString()
  };

  try {
    // Test database connection with a simple query
    const result = await db.query('SELECT NOW() as current_time');

    if (result && result.rows && result.rows.length > 0) {
      healthCheck.database = 'OK';
    } else {
      healthCheck.database = 'ERROR';
    }
  } catch (error) {
    console.error('Database health check failed:', error);
    healthCheck.database = 'ERROR';
    healthCheck.database_error = error.message;
  }

  // If database is not OK, return 503 status
  const statusCode = healthCheck.database === 'OK' ? 200 : 503;

  res.status(statusCode).json(healthCheck);
});

// Debug endpoint to check authentication
app.get('/debug/auth', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.json({ error: 'No authorization header' });
  }
  
  const token = authHeader.split(' ')[1];
  const { debugToken, debugUser } = require('./debug-auth');
  
  const decoded = debugToken(token);
  if (decoded) {
    debugUser(decoded.id).then(user => {
      res.json({
        token: decoded,
        user: user,
        authHeader: authHeader
      });
    });
  } else {
    res.json({ error: 'Invalid token' });
  }
});

// Enhanced admin login endpoint
app.post('/admin/login', authRateLimit, async (req, res) => {
  try {
    const { username, password } = req.body;
    const clientIP = req.ip || req.connection.remoteAddress;

    // Validate input
    if (!username || !password) {
      await trackLoginAttempt(username, false, clientIP);
      return res.status(400).json({
        success: false,
        message: 'Username and password are required'
      });
    }

    // Check if account is locked
    if (await isAccountLocked(username)) {
      return res.status(423).json({
        success: false,
        message: 'Account is temporarily locked due to too many failed login attempts. Please try again later.'
      });
    }

    // Check if JWT secret is configured
    if (!process.env.JWT_SECRET) {
      console.error('Login failed: Missing JWT_SECRET');
      return res.status(500).json({
        success: false,
        message: 'Server configuration error'
      });
    }

    // Try enhanced authentication first (database-based)
    try {
      const userResult = await db.query(
        'SELECT id, username, email, password_hash, role, is_active FROM admin_users WHERE username = $1 AND is_active = true',
        [username]
      );

      if (userResult.rows.length > 0) {
        const user = userResult.rows[0];
        const isValidPassword = await comparePassword(password, user.password_hash);

        if (isValidPassword) {
          await trackLoginAttempt(username, true, clientIP);

          const token = jwt.sign(
            {
              id: user.id,
              username: user.username,
              email: user.email,
              role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
          );

          console.log(`✅ Enhanced login successful: ${username} from ${clientIP}`);

          return res.json({
            success: true,
            message: 'Login successful',
            token: token,
            user: {
              id: user.id,
              username: user.username,
              email: user.email,
              role: user.role
            }
          });
        } else {
          await trackLoginAttempt(username, false, clientIP);
          return res.status(401).json({
            success: false,
            message: 'Invalid credentials'
          });
        }
      }
    } catch (dbError) {
      console.log('Database authentication failed, falling back to environment variables:', dbError.message);
    }

    // Fallback to legacy environment variable authentication
    if (process.env.ADMIN_USERNAME && process.env.ADMIN_PASSWORD) {
      const isValidUsername = username === process.env.ADMIN_USERNAME;
      const isValidPassword = password === process.env.ADMIN_PASSWORD;

      if (isValidUsername && isValidPassword) {
        console.log(`✅ Legacy login successful: ${username} from ${clientIP}`);

        const token = jwt.sign(
          { id: 1, username: 'admin', role: 'super_admin' },
          process.env.JWT_SECRET,
          { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
        );

        return res.json({
          success: true,
          message: 'Login successful (legacy mode)',
          token: token,
          user: {
            id: 1,
            username: 'admin',
            role: 'super_admin'
          }
        });
      }
    }

    // All authentication methods failed
    await trackLoginAttempt(username, false, clientIP);
    console.log(`❌ Login failed: ${username} from ${clientIP}`);

    res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed',
      error: error.message
    });
  }
});

// 404 handler for unmatched routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
    path: req.originalUrl,
    method: req.method,
    availableEndpoints: {
      auth: '/admin/login',
      health: '/health',
      debug: '/debug',
      adminUsers: '/api/admin-users',
      community: '/api/community',
      legacy: {
        users: '/users',
        dashboard: '/dashboard',
        blogs: '/blogs'
      },
      public: '/public/blogs'
    }
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Global error handler:', error);

  // Handle specific error types
  if (error.type === 'entity.parse.failed') {
    return res.status(400).json({
      success: false,
      message: 'Invalid JSON in request body'
    });
  }

  if (error.type === 'entity.too.large') {
    return res.status(413).json({
      success: false,
      message: 'Request entity too large'
    });
  }

  if (error.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      details: error.message
    });
  }

  // Default error response
  res.status(error.status || 500).json({
    success: false,
    message: process.env.NODE_ENV === 'production'
      ? 'Internal server error'
      : error.message || 'Something went wrong',
    ...(process.env.NODE_ENV !== 'production' && {
      stack: error.stack,
      type: error.name
    })
  });
});

// Graceful shutdown handlers
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  if (db.pool) {
    db.pool.end(() => {
      console.log('Database pool closed');
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  if (db.pool) {
    db.pool.end(() => {
      console.log('Database pool closed');
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
});

// Start server with enhanced logging
app.listen(PORT, () => {
  console.log(`
🚀 Enhanced Admin Server Started!
📍 Environment: ${process.env.NODE_ENV || 'development'}
🌐 Server: http://localhost:${PORT}
💾 Database: ${process.env.DB_NAME || 'opengeek'}
🔐 JWT Expiry: ${process.env.JWT_EXPIRES_IN || '24h'}
📚 API Docs: http://localhost:${PORT}/debug

🔗 Available Endpoints:
   • Health: GET /health
   • Login: POST /admin/login
   • Admin Users: /api/admin-users/*
   • Community: /api/community/*
   • Legacy: /users, /dashboard, /blogs
   • Public: /public/blogs
  `);
});
