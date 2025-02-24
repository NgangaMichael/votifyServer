const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authMiddleware");

describe("Authentication Middleware Tests", () => {
  beforeEach(() => {
    jest.restoreAllMocks(); // Reset mocks before each test
  });

  it("should authenticate a valid token", () => {
    const mockUser = { id: "user123" };

    // Mock jwt.verify to return the mock user without verifying signature
    jest.spyOn(jwt, "verify").mockReturnValue(mockUser);

    const req = { headers: { authorization: "mockValidToken" } };

    const user = authenticate(req);
    expect(user).toEqual(mockUser);
  });

  it("should throw an error for missing token", () => {
    const req = { headers: {} };
    expect(() => authenticate(req)).toThrow("Unauthorized");
  });

  it("should throw an error for invalid token", () => {
    // Mock jwt.verify to throw an error
    jest.spyOn(jwt, "verify").mockImplementation(() => {
      throw new Error("Invalid Token");
    });

    const req = { headers: { authorization: "invalidtoken" } };

    expect(() => authenticate(req)).toThrow("Invalid Token");
  });
});
