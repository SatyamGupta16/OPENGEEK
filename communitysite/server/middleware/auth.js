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
    
    console.log('Auth middleware - Request details:', {
      url: req.url,
      method: req.method,
      hasAuthHeader: !!authHeader,
      authHeaderFormat: authHeader ? authHeader.substring(0, 20) + '...' : 'None',
      clerkSecretKey: process.env.CLERK_SECRET_KEY ? `Present (${process.env.CLERK_SECRET_KEY.substring(0, 10)}...)` : 'Missing'
    });
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('No auth header or invalid format:', authHeader);
      return res.status(401).json({
        success: false,
        message: 'Authentication required',
        error: 'UNAUTHORIZED'
      });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    
    if (!token || token === 'null' || token === 'undefined') {
      console.log('Token is empty or invalid:', token);
      return res.status(401).json({
        success: false,
        message: 'Authentication token is missing',
        error: 'MISSING_TOKEN'
      });
    }

    console.log('Attempting to verify token with Clerk...', {
      tokenLength: token.length,
      tokenStart: token.substring(0, 20) + '...',
      secretKeyPresent: !!process.env.CLERK_SECRET_KEY
    });
    
    // Verify the session token with Clerk
    const payload = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY
    });
    
    console.log('Token verification result:', {
      hasPayload: !!payload,
      hasSub: payload?.sub ? true : false,
      sub: payload?.sub,
      payloadKeys: payload ? Object.keys(payload) : 'No payload'
    });
    
    if (!payload || !payload.sub) {
      console.log('Token verification failed - no payload or sub:', { payload });
      return res.status(401).json({
        success: false,
        message: 'Invalid authentication token',
        error: 'INVALID_TOKEN'
      });
    }

    console.log('Token verified successfully for user:', payload.sub);

    // Add user info to request object
    req.userId = payload.sub;
    req.auth = payload;
    
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    console.error('Error details:', {
      message: error.message,
      name: error.name,
      stack: error.stack?.split('\n').slice(0, 3).join('\n'),
      clerkSecretKey: process.env.CLERK_SECRET_KEY ? `Present (${process.env.CLERK_SECRET_KEY.substring(0, 10)}...)` : 'Missing'
    });
    return res.status(401).json({
      success: false,
      message: 'Invalid authentication token',
      error: 'INVALID_TOKEN',
      debug: process.env.NODE_ENV === 'development' ? {
        errorName: error.name,
        errorMessage: error.message
      } : undefined
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