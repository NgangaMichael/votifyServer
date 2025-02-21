const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true, enum: ['Male', 'Female'] },
  idnumber: { type: String, required: true, unique: true },
  location: { type: String, required: true },
  polling: { type: String, required: true },
  designation: { type: String, required: true },
  voted: { type: Boolean, default: false },
  email: { type: String, required: true, unique: true, lowercase: true },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
