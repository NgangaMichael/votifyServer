const { gql } = require('graphql-tag');

const pollingTypeDefs = gql`
  type Polling {
    id: ID!
    name: String!
    location: String!
  }

  type Query {
    getPollings: [Polling]
    getPolling(id: ID!): Polling
  }

  type Mutation {
    createPolling(
        name: String!, 
        location: String!,
    ): Polling
  }
`;

module.exports = pollingTypeDefs;
