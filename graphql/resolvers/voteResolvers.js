const voteService = require('../../services/voteService');
const authenticate = require('../../middleware/authMiddleware');

const voteResolvers = {
  Query: {
    getVotes: async (_, __, context) => {
      const vote = authenticate(context.req);
      return await voteService.getVotes();
    },
    getVote: async (_, { id }, context) => {
      const vote = authenticate(context.req);
      return await voteService.getVoteById(id);
    },
  },
  Mutation: {
    createVote: async (_, args, context) => {
      // const vote = authenticate(context.req);
      return await voteService.createVote(args);
    },
  },
};

module.exports = voteResolvers;
