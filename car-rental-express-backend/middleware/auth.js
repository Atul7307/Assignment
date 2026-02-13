// Authentication middleware

const requireAuth = (req, res, next) => {
  if (!req.session || !req.session.user_id) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  next();
};

const requireRole = (role) => {
  return (req, res, next) => {
    if (!req.session || !req.session.user_id) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    if (req.session.role !== role) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    next();
  };
};

const optionalAuth = (req, res, next) => {
  // Doesn't require authentication but makes session data available
  next();
};

module.exports = {
  requireAuth,
  requireRole,
  optionalAuth
};
