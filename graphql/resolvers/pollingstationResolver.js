const pollingService = require('../../services/pollingstationService');

const pollingResolvers = {
  Query: {
    getPollings: async () => await pollingService.getPollings(),
    getPolling: async (_, { id }) => await pollingService.getPollingById(id),
  },
  Mutation: {
    createPolling: async (_, args) => await pollingService.createPolling(args),
  },
};

module.exports = pollingResolvers;
