const Vote = require('../models/Vote');

const voteService = {
  getVotes: async () => await Vote.find(),
  getVoteById: async (id) => await Vote.findById(id),
  createVote: async (voteData) => await Vote.create(voteData),
};

module.exports = voteService;