// middleware/auth.js
const jwt = require('jsonwebtoken');

function authRole(role) {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token' });

    try {
      const decoded = jwt.verify(token, 'secretkey');
      if (decoded.role !== role) return res.status(403).json({ message: 'Access denied' });
      req.user = decoded;
      next();
    } catch {
      res.status(401).json({ message: 'Invalid token' });
    }
  };
}

module.exports = authRole;
