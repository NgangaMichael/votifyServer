const { gql } = require('graphql-tag');

const candidateTypeDefs = gql`
  type Candidate {
    id: ID!
    name: String!
    age: Int!
    gender: String!
    idnumber: String!
    location: String!
  }

  type Query {
    getCandidates: [Candidate]
    getCandidate(id: ID!): Candidate
  }

  type Mutation {
    createCandidate(
        name: String!, 
        age: Int!,
        gender: String!,
        idnumber: String!,
        location: String!,
    ): Candidate
  }
`;

module.exports = candidateTypeDefs;
