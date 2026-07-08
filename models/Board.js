const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  fieldType: {
    type: String,
    enum: ['full', 'half'],
    default: 'full'
  },
  miniGoals: {
    type: Boolean,
    default: false
  },
  bgTheme: {
    type: String,
    enum: ['green', 'navy', 'chalk'],
    default: 'green'
  },
  elements: [{
    id: String,
    type: String,
    x: Number,
    y: Number,
    x1: Number,
    y1: Number,
    x2: Number,
    y2: Number,
    number: Number,
    text: String
  }],
  thumbnail: String,
  isPublic: {
    type: Boolean,
    default: false
  },
  shareToken: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('Board', boardSchema);