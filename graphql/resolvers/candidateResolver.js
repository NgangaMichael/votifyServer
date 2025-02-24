const candidateService = require('../../services/candidateService');
const authenticate = require('../../middleware/authMiddleware');

const candidateResolvers = {
  Query: {
    getCandidates: async (_, __, context) => {
      const candidate = authenticate(context.req);
      return await candidateService.getCandidates();
    },
    getCandidate: async (_, { id }, context) => {
      const candidate = authenticate(context.req);
      return await candidateService.getCandidateById(id);
    },
  },
  Mutation: {
    createCandidate: async (_, args, context) => {
      // const candidate = authenticate(context.req);
      return await candidateService.createCandidate(args);
    },
  },
};

module.exports = candidateResolvers;
