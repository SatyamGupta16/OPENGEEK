const adminOnly = (req, res, next) => {
  // Check if user has admin or super_admin role
  if (req.user && (req.user.role === 'admin' || req.user.role === 'super_admin')) {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: 'Access denied. Admins only.'
    });
  }
};

module.exports = adminOnly;
