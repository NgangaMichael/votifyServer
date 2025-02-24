const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');
const userTypeDefs = require('./schema/userSchema');
const voteTypeDefs = require('./schema/voteSchema');
const candidateTypeDefs = require('./schema/candidateSchema');
const pollingTypeDefs = require('./schema/pollingstationSchema');

const userResolvers = require('./resolvers/userResolver');
const voteResolvers = require('./resolvers/voteResolvers');
const candidateResolvers = require('./resolvers/candidateResolver');
const pollingResolvers = require('./resolvers/pollingstationResolver');

const typeDefs = mergeTypeDefs([userTypeDefs, pollingTypeDefs, candidateTypeDefs, voteTypeDefs]);
const resolvers = mergeResolvers([userResolvers, pollingResolvers, candidateResolvers, voteResolvers]);

module.exports = { typeDefs, resolvers };