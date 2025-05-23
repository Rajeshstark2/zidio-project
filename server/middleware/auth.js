const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

<<<<<<< HEAD
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
=======
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'zidio-super-secret-jwt-key-2024');
>>>>>>> 4c346d197a3c837735338faf67828bd20ebf8bea
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Please authenticate', error: error.message });
  }
};

module.exports = auth; 