const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const connectDB = require('./config/db');
const {typeDefs, resolvers} = require('./graphql');
require('dotenv').config();

const port = process.env.PORT || 3000;

// Initialize Express
const app = express();

// Connect to MongoDB
connectDB();

// Set up Apollo Server
async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers
  });

  await server.start();

  app.use('/graphql', express.json(), expressMiddleware(server));

  app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}/graphql`);
  });
}

startServer();
