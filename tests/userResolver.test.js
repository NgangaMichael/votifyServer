const request = require('supertest');
const { ApolloServer } = require('@apollo/server');
const { typeDefs, resolvers } = require('../graphql');
const express = require('express');
const { expressMiddleware } = require('@apollo/server/express4');
const authenticate = require('../middleware/authMiddleware'); // Import auth middleware

let app;
let server;

// Mock user service
jest.mock('../services/userService', () => ({
  getUsers: jest.fn().mockResolvedValue([{ id: "1", name: "Test User", email: "test@example.com" }]),
  getUserById: jest.fn().mockImplementation((id) => 
    Promise.resolve({ id, name: "Test User", email: "test@example.com" })
  ),
  createUser: jest.fn().mockImplementation((args) => 
    Promise.resolve({ id: "2", ...args })
  ),
}));

// Mock authentication middleware to always return a valid user
jest.mock('../middleware/authMiddleware', () => jest.fn(() => ({ id: "user123" })));

beforeAll(async () => {
  server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ req: { headers: { authorization: "Bearer testtoken" } } }) // Mocked auth header
  });

  await server.start();

  app = express();
  app.use('/graphql', express.json(), expressMiddleware(server));
});

afterAll(async () => {
  await server.stop();
});

// Test Queries
describe("GraphQL API Tests", () => {
  it("should fetch all users", async () => {
    const query = `
      query {
        getUsers {
          id
          name
          email
        }
      }
    `;

    const response = await request(app)
      .post('/graphql')
      .send({ query });

    expect(response.status).toBe(200);
    expect(response.body.data.getUsers).toEqual([
      { id: "1", name: "Test User", email: "test@example.com" }
    ]);
  });

  it("should fetch a single user by ID", async () => {
    const query = `
      query {
        getUser(id: "1") {
          id
          name
          email
        }
      }
    `;

    const response = await request(app)
      .post('/graphql')
      .send({ query });

    expect(response.status).toBe(200);
    expect(response.body.data.getUser).toEqual({
      id: "1",
      name: "Test User",
      email: "test@example.com"
    });
  });

  it("should create a new user", async () => {
    const mutation = `
      mutation {
        createUser(name: "New User", email: "new@example.com", age: 30, gender: "Male", polling: "001", designation: "Developer", location: "Nairobi", idnumber: "12345678", voted: false) {
          id
          name
          email
        }
      }
    `;

    const response = await request(app)
      .post('/graphql')
      .send({ query: mutation });

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty("createUser");
    expect(response.body.data.createUser).toEqual({
      id: "2",
      name: "New User",
      email: "new@example.com"
    });
  });

  it("should return an error when creating a user with missing fields", async () => {
    const mutation = `
      mutation {
        createUser(name: "", email: "", age: 30, gender: "Male", polling: "001", designation: "Developer", location: "Nairobi", idnumber: "12345678", voted: false) {
          id
          name
          email
        }
      }
    `;
  
    const response = await request(app)
      .post('/graphql')
      .send({ query: mutation });
  
    // GraphQL always returns 200, but errors will be inside response.body.errors
    expect(response.status).toBe(200); 
    expect(response.body).toHaveProperty("errors"); // Check if errors exist
    expect(response.body.errors[0].message).toMatch(/Missing required field/); // Validate the error message
  });

  it("should handle large user lists efficiently", async () => {
    const largeData = Array.from({ length: 10000 }, (_, i) => ({
      id: i.toString(),
      name: `User ${i}`,
      email: `user${i}@example.com`,
    }));
  
    require('../services/userService').getUsers.mockResolvedValue(largeData);
  
    const query = `
      query {
        getUsers {
          id
          name
          email
        }
      }
    `;
  
    const response = await request(app)
      .post('/graphql')
      .send({ query });
  
    expect(response.status).toBe(200);
    expect(response.body.data.getUsers).toHaveLength(10000);
  });

  it("should return null for a non-existent user", async () => {
    const query = `
      query {
        getUser(id: "999") {
          id
          name
          email
        }
      }
    `;
  
    // Mock service to return null for unknown ID
    require('../services/userService').getUserById.mockResolvedValue(null);
  
    const response = await request(app)
      .post('/graphql')
      .send({ query });
  
    expect(response.status).toBe(200);
    expect(response.body.data.getUser).toBeNull();
  });
  
});
