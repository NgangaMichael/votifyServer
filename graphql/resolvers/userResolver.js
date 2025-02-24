const userService = require('../../services/userService');
const authenticate = require('../../middleware/authMiddleware');

const userResolvers = {
  Query: {
    getUsers: async () => await userService.getUsers(),
    getUser: async (_, { id }) => await userService.getUserById(id),
  },
  Mutation: {
    createUser: async (_, args) => await userService.createUser(args),
  },
};

module.exports = userResolvers;
