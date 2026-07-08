const express = require('express');
const Board = require('../models/Board');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Get user sessions
router.get('/', authMiddleware, async (req, res) => {
  try {
    const sessions = await Board.find({ userId: req.userId })
      .select('_id title createdAt updatedAt fieldType')
      .sort({ updatedAt: -1 });
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;