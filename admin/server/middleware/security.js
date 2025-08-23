const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

// Enhanced rate limiting for different endpoints
const createRateLimit = (windowMs, max, message) => {
  return rateLimit({
    windowMs,
    max,
    message: { success: false, message },
    standardHeaders: true,
    legacyHeaders: false,
  });
};

// Strict rate limiting for authentication
const authRateLimit = createRateLimit(
  15 * 60 * 1000, // 15 minutes
  5, // 5 attempts per window
  'Too many login attempts, please try again later'
);

// Moderate rate limiting for admin operations
const adminRateLimit = createRateLimit(
  60 * 1000, // 1 minute
  30, // 30 requests per minute
  'Too many admin requests, please slow down'
);

// Strict rate limiting for user management operations
const userManagementRateLimit = createRateLimit(
  60 * 1000, // 1 minute
  10, // 10 operations per minute
  'Too many user management operations, please slow down'
);

// Enhanced helmet configuration
const securityHeaders = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  },
  crossOriginEmbedderPolicy: false,
});

// Input sanitization middleware
const sanitizeInput = (req, res, next) => {
  const sanitize = (obj) => {
    for (let key in obj) {
      if (typeof obj[key] === 'string') {
        // Basic XSS prevention
        obj[key] = obj[key]
          .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
          .replace(/javascript:/gi, '')
          .replace(/on\w+\s*=/gi, '');
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        sanitize(obj[key]);
      }
    }
  };

  if (req.body) sanitize(req.body);
  if (req.query) sanitize(req.query);
  if (req.params) sanitize(req.params);
  
  next();
};

// Audit logging middleware
const auditLog = (action) => {
  return (req, res, next) => {
    const originalSend = res.send;
    
    res.send = function(data) {
      // Log the action after response
      const logData = {
        timestamp: new Date().toISOString(),
        action,
        user: req.user?.username || 'unknown',
        ip: req.ip || req.connection.remoteAddress,
        userAgent: req.get('User-Agent'),
        method: req.method,
        url: req.originalUrl,
        statusCode: res.statusCode,
        success: res.statusCode < 400
      };
      
      console.log('🔍 AUDIT LOG:', JSON.stringify(logData));
      
      // In production, you'd want to store this in a database or log service
      // await db.query('INSERT INTO audit_logs (timestamp, action, user, ip, method, url, status_code, success) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', 
      //   [logData.timestamp, logData.action, logData.user, logData.ip, logData.method, logData.url, logData.statusCode, logData.success]);
      
      return originalSend.call(this, data);
    };
    
    next();
  };
};

module.exports = {
  authRateLimit,
  adminRateLimit,
  userManagementRateLimit,
  securityHeaders,
  sanitizeInput,
  auditLog
};