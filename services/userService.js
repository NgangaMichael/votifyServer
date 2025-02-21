
// business logic 
const User = require('../models/User');

const userService = {
  getUsers: async () => await User.find(),
  getUserById: async (id) => await User.findById(id),
  createUser: async (userData) => await User.create(userData),
};

module.exports = userService;
