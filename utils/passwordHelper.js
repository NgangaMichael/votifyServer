const bcrypt = require("bcryptjs");

const SALT_ROUNDS = process.env.NODE_ENV === "production" ? 12 : 10; // Higher for production

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return bcrypt.hash(password, salt);
};

export const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};
