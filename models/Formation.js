const mongoose = require('mongoose');

const formationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true,
    unique: true
  },
  style: {
    type: String,
    required: true
  },
  description: String,
  players: [{
    x: Number,
    y: Number,
    role: String
  }],
  imageUrl: String,
  category: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('Formation', formationSchema);