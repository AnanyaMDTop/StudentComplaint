const express = require('express');
const Complaint = require('../models/Complaint');
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const router = express.Router();

// Get complaints (students see own, admins see all + optional filter)
router.get('/', auth, async (req, res) => {
  try {
    let query = {};
    if (req.user.role === 'student') {
      query.createdBy = req.user._id;
    }

    // Filtering (admin only or student can also filter their own)
    const { category, status } = req.query;
    if (category) query.category = category;
    if (status) query.status = status;

    const complaints = await Complaint.find(query)
      .populate('createdBy', 'username')
      .sort('-createdAt');
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Submit complaint (student only)
router.post('/', auth, role('student'), async (req, res) => {
  try {
    const { title, description, category, priority } = req.body;
    const complaint = new Complaint({
      title,
      description,
      category,
      priority,
      createdBy: req.user._id
    });
    await complaint.save();
    res.status(201).json(complaint);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update complaint status (admin only)
router.put('/:id', auth, role('admin'), async (req, res) => {
  try {
    const { status } = req.body;
    if (!['pending', 'in-progress', 'resolved'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: Date.now() },
      { new: true }
    );
    if (!complaint) return res.status(404).json({ error: 'Complaint not found' });
    res.json(complaint);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;