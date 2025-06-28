const mongoose = require('mongoose');

const contestSchema = new mongoose.Schema({
  contest: {
    type: String,
    required: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  fileType: {
    type: String
  },
  fileSizeKB: {
    type: Number
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('CONTEST', contestSchema);
