const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authMiddleware");

describe("Authentication Middleware Tests", () => {
  beforeEach(() => {
    jest.restoreAllMocks(); // Reset mocks before each test
  });

  /**
   * ✅ Unit Test: Valid Token Authentication
   * - Mocks `jwt.verify()` to return a valid user object.
   * - Ensures that a valid JWT token is successfully authenticated.
   */
  it("should authenticate a valid token", () => {
    const mockUser = { id: "user123" };

    // Mock jwt.verify to return the mock user without verifying signature
    jest.spyOn(jwt, "verify").mockReturnValue(mockUser);

    const req = { headers: { authorization: "Bearer mockValidToken" } };

    const user = authenticate(req);
    expect(user).toEqual(mockUser);
  });

  /**
   * ❌ Unit Test: Missing Authorization Header
   * - Ensures that a request without an `authorization` header is rejected.
   */
  it("should throw an error for missing authorization header", () => {
    const req = { headers: {} };
    expect(() => authenticate(req)).toThrow("Unauthorized");
  });

  /**
   * ❌ Unit Test: Null Authorization Header
   * - Ensures that a `null` authorization header is rejected.
   */
  it("should throw an error if authorization header is null", () => {
    const req = { headers: { authorization: null } };
    expect(() => authenticate(req)).toThrow("Unauthorized");
  });

  /**
   * ❌ Unit Test: Undefined Authorization Header
   * - Ensures that an `undefined` authorization header is rejected.
   */
  it("should throw an error if authorization header is undefined", () => {
    const req = { headers: { authorization: undefined } };
    expect(() => authenticate(req)).toThrow("Unauthorized");
  });

  /**
   * ❌ Unit Test: Non-String Authorization Header
   * - Ensures that a non-string authorization value (e.g., number) is rejected.
   */
  it("should throw an error if authorization is not a string", () => {
    const req = { headers: { authorization: 12345 } }; // Non-string authorization
    expect(() => authenticate(req)).toThrow("Unauthorized");
  });

  /**
   * ❌ Unit Test: Missing "Bearer" Prefix
   * - Ensures that tokens without the "Bearer" prefix are rejected.
   */
  it("should throw an error if token does not have 'Bearer' prefix", () => {
    const req = { headers: { authorization: "mockValidTokenWithoutBearer" } };
    expect(() => authenticate(req)).toThrow("Unauthorized");
  });

  /**
   * ❌ Unit Test: Empty Token
   * - Ensures that an empty token after "Bearer" is rejected.
   */
  it("should throw an error if token is empty after 'Bearer'", () => {
    const req = { headers: { authorization: "Bearer " } };
    expect(() => authenticate(req)).toThrow("Unauthorized");
  });

  /**
   * ❌ Unit Test: Invalid Token
   * - Mocks `jwt.verify()` to throw an "Invalid Token" error.
   * - Ensures that an invalid token results in authentication failure.
   */
  it("should throw an error for invalid token", () => {
    jest.spyOn(jwt, "verify").mockImplementation(() => {
      throw new Error("Invalid Token");
    });

    const req = { headers: { authorization: "Bearer invalidtoken" } };

    expect(() => authenticate(req)).toThrow("Invalid Token");
  });

  /**
   * ❌ Unit Test: Expired Token
   * - Mocks `jwt.verify()` to throw a "jwt expired" error.
   * - Ensures that an expired token results in authentication failure.
   */
  it("should throw an error for expired token", () => {
    jest.spyOn(jwt, "verify").mockImplementation(() => {
      throw new Error("jwt expired");
    });

    const req = { headers: { authorization: "Bearer expiredToken" } };

    expect(() => authenticate(req)).toThrow("Invalid Token");
  });
});
