const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');
const userTypeDefs = require('./schema/userSchema');
const pollingTypeDefs = require('./schema/pollingstationSchema');

const userResolvers = require('./resolvers/userResolver');
const pollingResolvers = require('./resolvers/pollingstationResolver');

const typeDefs = mergeTypeDefs([userTypeDefs, pollingTypeDefs]);
const resolvers = mergeResolvers([userResolvers, pollingResolvers]);

module.exports = { typeDefs, resolvers };

