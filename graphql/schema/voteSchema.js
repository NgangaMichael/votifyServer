const { gql } = require('graphql-tag');

const voteTypeDefs = gql`
  type Vote {
    id: ID!
    name: String!
    age: Int!
    gender: String!
    idnumber: String!
    location: String!
    candidate: String!
    polling: String!
  }

  type Query {
    getVotes: [Vote]
    getVote(id: ID!): Vote
  }

  type Mutation {
    createVote(
        name: String!, 
        age: Int!,
        gender: String!,
        idnumber: String!,
        location: String!,
        candidate: String!,
        polling: String!,
    ): Vote
  }
`;

module.exports = voteTypeDefs;
