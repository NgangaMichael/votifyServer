const jwt = require("jsonwebtoken");

const authenticate = (req) => {
  /**
   * 🔒 Step 1: Validate Request Object
   * - Ensures `req`, `req.headers`, and `req.headers.authorization` exist.
   * - Ensures `authorization` is a string to avoid runtime errors.
   */
  if (
    !req ||
    !req.headers ||
    !req.headers.authorization ||
    typeof req.headers.authorization !== "string"
  ) {
    throw new Error("Unauthorized");
  }

  /**
   * 🔑 Step 2: Check Authorization Format
   * - Splits the authorization string by space (" ").
   * - Ensures the format follows "Bearer <token>".
   */
  const parts = req.headers.authorization.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    throw new Error("Unauthorized");
  }

  /**
   * 🆔 Step 3: Extract Token
   * - Retrieves the actual token from the "Bearer" string.
   * - Ensures the token is not empty.
   */
  const token = parts[1].trim();
  if (!token) {
    throw new Error("Unauthorized");
  }

  /**
   * ✅ Step 4: Verify JWT Token
   * - Uses `jwt.verify()` to decode and validate the token.
   * - Throws "Invalid Token" if verification fails.
   */
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid Token");
  }
};

module.exports = authenticate;
