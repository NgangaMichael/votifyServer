const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true, enum: ['Male', 'Female'] },
    idnumber: { type: String, required: true, unique: true },
    location: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Candidate', CandidateSchema);
