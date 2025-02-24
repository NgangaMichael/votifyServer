const { gql } = require('graphql-tag');

const userTypeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    age: Int!
    gender: String!
    polling: String!
    designation: String!
    location: String!
    idnumber: String!
    voted: Boolean
  }

  type Query {
    getUsers: [User]
    getUser(id: ID!): User
  }

  type Mutation {
    createUser(
        name: String!, 
        email: String!,
        age: Int!,
        gender: String!,
        polling: String!,
        designation: String!,
        location: String!,
        idnumber: String!,
        voted: Boolean
    ): User
  }
`;

module.exports = userTypeDefs;
