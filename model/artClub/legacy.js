const mongoose = require('mongoose');

const legacySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  years: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false,
    default: '/placeholder.svg'
  },
  biography: {
    type: String,
    required: true
  },
  contributions: {
    type: [String],
    required: true
  },
  influence: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('LEGACY', legacySchema);
