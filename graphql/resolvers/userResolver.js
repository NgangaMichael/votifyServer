const userService = require('../../services/userService');
const authenticate = require('../../middleware/authMiddleware');

const userResolvers = {
  Query: {
    getUsers: async (_, __, context) => {
      const user = authenticate(context.req);
      return await userService.getUsers();
    },
    getUser: async (_, { id }, context) => {
      const user = authenticate(context.req);
      return await userService.getUserById(id);
    },
  },
  Mutation: {
    createUser: async (_, args, context) => {
      const user = authenticate(context.req);

      // List of required fields
      const requiredFields = ["name", "email", "age", "gender", "polling", "designation", "location", "idnumber"];

      for (const field of requiredFields) {
        if (!args[field]) {
          throw new Error(`Missing required field: ${field}`);
        }
      }

      return await userService.createUser(args);
    },
  },
};

module.exports = userResolvers;
