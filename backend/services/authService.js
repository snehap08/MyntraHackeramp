const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/dbConfig');

exports.generateToken = (user) => {
  const payload = {
    userId: user._id,
    email: user.email,
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
};
