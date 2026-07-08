const express = require('express');
const Board = require('../models/Board');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Get all boards for user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const boards = await Board.find({ userId: req.userId }).sort({ updatedAt: -1 });
    res.json(boards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single board
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);
    if (!board) {
      return res.status(404).json({ message: 'لوحة غير موجودة' });
    }
    res.json(board);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new board
router.post('/', authMiddleware, async (req, res) => {
  const { title, description, fieldType, miniGoals, bgTheme } = req.body;

  const board = new Board({
    userId: req.userId,
    title,
    description,
    fieldType: fieldType || 'full',
    miniGoals: miniGoals || false,
    bgTheme: bgTheme || 'green',
    elements: []
  });

  try {
    const newBoard = await board.save();
    res.status(201).json(newBoard);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update board
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);
    if (!board) {
      return res.status(404).json({ message: 'لوحة غير موجودة' });
    }

    if (board.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'غير مصرح لتعديل هذه اللوحة' });
    }

    Object.assign(board, req.body);
    const updatedBoard = await board.save();
    res.json(updatedBoard);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete board
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);
    if (!board) {
      return res.status(404).json({ message: 'لوحة غير موجودة' });
    }

    if (board.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'غير مصرح لحذف هذه اللوحة' });
    }

    await Board.findByIdAndDelete(req.params.id);
    res.json({ message: 'تم حذف اللوحة' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;