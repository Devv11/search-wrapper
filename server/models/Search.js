const mongoose = require('mongoose');

const searchSchema = new mongoose.Schema({
  query: {
    type: String,
    required: true,
    trim: true
  },
  results: [{
    title: String,
    link: String,
    snippet: String,
    displayLink: String
  }],
  timestamp: {
    type: Date,
    default: Date.now
  },
  resultCount: {
    type: Number,
    default: 0
  },
  searchTime: {
    type: Number, // in milliseconds
    default: 0
  }
});

module.exports = mongoose.model('Search', searchSchema);