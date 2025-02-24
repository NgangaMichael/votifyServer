// Keeps GraphQL resolvers clean and testable.
// If you switch from MongoDB to PostgreSQL later, you only modify this file.

const Polling = require('../models/Pollings');

const pollingService = {
  getPollings: async () => await Polling.find(),
  getPollingById: async (id) => await Polling.findById(id),
  createPolling: async (pollingData) => await Polling.create(pollingData),
};

module.exports = pollingService;