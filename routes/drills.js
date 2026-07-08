const express = require('express');
const Drill = require('../models/Drill');

const router = express.Router();

// Get all drills
router.get('/', async (req, res) => {
  try {
    const { goal, ageGroup } = req.query;
    let query = {};
    
    if (goal && goal !== 'الكل') query.goal = goal;
    if (ageGroup && ageGroup !== 'الكل') query.ageGroup = ageGroup;
    
    const drills = await Drill.find(query);
    res.json(drills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single drill
router.get('/:id', async (req, res) => {
  try {
    const drill = await Drill.findById(req.params.id);
    if (!drill) {
      return res.status(404).json({ message: 'تمرين غير موجود' });
    }
    res.json(drill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;