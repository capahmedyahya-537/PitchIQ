const express = require('express');
const Formation = require('../models/Formation');

const router = express.Router();

// Get all formations
router.get('/', async (req, res) => {
  try {
    const formations = await Formation.find();
    res.json(formations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single formation
router.get('/:id', async (req, res) => {
  try {
    const formation = await Formation.findById(req.params.id);
    if (!formation) {
      return res.status(404).json({ message: 'تشكيلة غير موجودة' });
    }
    res.json(formation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;