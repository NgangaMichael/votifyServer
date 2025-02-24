const jwt = require('jsonwebtoken');

const authenticate = (req) => {
  if (!req || !req.headers || !req.headers.authorization) {
    throw new Error('Unauthorized');
  }

  const token = req.headers.authorization.split(" ")[1]; // Extract token if it comes as "Bearer <token>"
  
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid Token');
  }
};

module.exports = authenticate;
