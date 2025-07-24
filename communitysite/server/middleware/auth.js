const { createClerkClient, verifyToken } = require('@clerk/backend');

// Initialize Clerk client with secret key
const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY
});

/**
 * Middleware to verify Clerk authentication
 */
const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required',
        error: 'UNAUTHORIZED'
      });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    
    // Verify the session token with Clerk
    const payload = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY
    });
    
    if (!payload || !payload.sub) {
      return res.status(401).json({
        success: false,
        message: 'Invalid authentication token',
        error: 'INVALID_TOKEN'
      });
    }

    // Add user info to request object
    req.userId = payload.sub;
    req.auth = payload;
    
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(401).json({
      success: false,
      message: 'Invalid authentication token',
      error: 'INVALID_TOKEN'
    });
  }
};

/**
 * Optional authentication middleware - doesn't fail if no auth
 */
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next();
    }

    const token = authHeader.substring(7);
    
    // Verify the session token with Clerk
    const payload = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY
    });
    
    if (payload && payload.sub) {
      req.userId = payload.sub;
      req.auth = payload;
    }
    
    next();
  } catch (error) {
    // Continue without auth if token is invalid
    next();
  }
};

/**
 * Middleware to get user info from Clerk
 */
const getUserInfo = async (req, res, next) => {
  try {
    if (!req.userId) {
      return next();
    }

    const user = await clerkClient.users.getUser(req.userId);

    req.user = {
      id: user.id,
      email: user.emailAddresses[0]?.emailAddress,
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
      imageUrl: user.imageUrl,
      username: user.username || user.emailAddresses[0]?.emailAddress?.split('@')[0],
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };

    next();
  } catch (error) {
    console.error('Get user info error:', error);
    next(); // Continue without user info
  }
};

module.exports = {
  requireAuth,
  optionalAuth,
  getUserInfo
};