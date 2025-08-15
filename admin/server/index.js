const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken');
const db = require('./config/database');
// Database connection verification - using existing database schema
const initDatabase = require('./db/init');
initDatabase();
const authMiddleware = require('./middleware/authMiddleware');
const adminOnly = require('./middleware/adminOnly');
const userRoutes = require('./routes/users');
// const contentRoutes = require('./routes/content');
const dashboardRoutes = require('./routes/dashboard');
const blogsRoutes = require('./routes/blogs');
const blogsPublicRoutes = require('./routes/blogsPublic');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// User management routes
console.log('🔧 Mounting /users routes with authentication...');
app.use('/users', authMiddleware, adminOnly, userRoutes);
console.log('✅ /users routes mounted successfully');

// Content management routes (commented out for now - no database)
// app.use('/content', authMiddleware, adminOnly, contentRoutes);

// Dashboard statistics routes
console.log('🔧 Mounting /dashboard routes with authentication...');
app.use('/dashboard', authMiddleware, adminOnly, dashboardRoutes);
console.log('✅ /dashboard routes mounted successfully');

// Blogs routes
console.log('🔧 Mounting /blogs routes (admin) with authentication...');
app.use('/blogs', authMiddleware, adminOnly, blogsRoutes);
console.log('✅ /blogs routes (admin) mounted successfully');

console.log('🔧 Mounting /public/blogs routes (public)...');
app.use('/public/blogs', blogsPublicRoutes);
console.log('✅ /public/blogs routes mounted successfully');

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

// Admin login endpoint
app.post('/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Log login attempt (without password for security)
    console.log(`Login attempt for username: ${username}`);
    
    // Validate input
    if (!username || !password) {
      console.log('Login failed: Missing username or password');
      return res.status(400).json({
        success: false,
        message: 'Username and password are required'
      });
    }
    
    // Check if environment variables are set
    if (!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD || !process.env.JWT_SECRET) {
      console.error('Login failed: Missing required environment variables');
      return res.status(500).json({
        success: false,
        message: 'Server configuration error'
      });
    }
    
    // Validate credentials (case-sensitive comparison)
    const isValidUsername = username === process.env.ADMIN_USERNAME;
    const isValidPassword = password === process.env.ADMIN_PASSWORD;
    
    if (isValidUsername && isValidPassword) {
      console.log('Login successful for admin user');
      
      const token = jwt.sign(
        { id: 1, username: 'admin', role: 'admin' },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
      );
      
      res.json({
        success: true,
        message: 'Login successful',
        token: token
      });
    } else {
      console.log(`Login failed: Invalid credentials. Username match: ${isValidUsername}, Password match: ${isValidPassword}`);
      res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed',
      error: error.message
    });
  }
});

// Initialize database (commented out for now - no database)
// const initDatabase = require('./db/init');
// initDatabase();

// Test database connection endpoint (commented out for now - no database)
// app.get('/db-test', async (req, res) => {
//   try {
//     await db.query('SELECT NOW()');
//     res.json({ success: true, message: 'Database connection successful' });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Database connection failed', error: error.message });
//   }
// });

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
