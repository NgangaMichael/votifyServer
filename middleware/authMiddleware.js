const jwt = require('jsonwebtoken');

const authenticate = (req) => {
  const token = req.headers.authorization;
  if (!token) throw new Error('Unauthorized');

  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid Token');
  }
};

module.exports = authenticate;
