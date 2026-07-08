const mongoose = require('mongoose');

const drillSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  goal: {
    type: String,
    enum: ['استحواذ', 'تسديد', 'لياقة ورشاقة', 'دفاع', 'مهارة فردية', 'اتخاذ قرار'],
    required: true
  },
  ageGroup: {
    type: String,
    enum: ['ناشئين', 'شباب', 'كبار'],
    required: true
  },
  playersCount: String,
  duration: Number,
  equipment: [String],
  steps: [String],
  setup: [{
    type: String,
    x: Number,
    y: Number
  }],
  imageUrl: String,
  difficulty: {
    type: String,
    enum: ['سهل', 'متوسط', 'صعب'],
    default: 'متوسط'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('Drill', drillSchema);