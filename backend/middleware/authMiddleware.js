// middleware/authMiddleware.js
const jwt = require('jsonwebtoken'); // Import jsonwebtoken

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Extract token
  console.log('Received Token:', token); // Log token for debugging

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    console.log('Decoded Token:', decoded); // Log decoded data
    req.user = decoded; // Attach user data to request
    next();
  } catch (err) {
    console.error('Token error:', err.message); // Log detailed error
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
