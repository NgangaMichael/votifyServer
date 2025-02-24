// Keeps GraphQL resolvers clean and testable.
// If you switch from MongoDB to PostgreSQL later, you only modify this file.

const Candidate = require('../models/Candidate');

const candidateService = {
  getCandidates: async () => await Candidate.find(),
  getCandidateById: async (id) => await Candidate.findById(id),
  createCandidate: async (candidateData) => await Candidate.create(candidateData),
};

module.exports = candidateService;