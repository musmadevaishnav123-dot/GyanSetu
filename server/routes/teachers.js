const express = require('express');
const router = express.Router();
const { supabase, isConfigured } = require('../config/supabase');
const store = require('../data/store');

// GET /api/teachers - List verified educators across India
router.get('/', (req, res) => {
  const { state, subject } = req.query;
  let list = [...store.teachers];

  if (state) {
    list = list.filter(t => t.state.toLowerCase() === state.toLowerCase());
  }
  if (subject) {
    list = list.filter(t => t.subjects.toLowerCase().includes(subject.toLowerCase()));
  }

  res.json({ success: true, count: list.length, data: list });
});

// POST /api/teachers/register - Any educator can register
router.post('/register', (req, res) => {
  const { name, email, qualification, location, state, subjects, assignedClasses } = req.body;

  if (!name || !email) {
    return res.status(400).json({ success: false, message: 'Name and email are required' });
  }

  const newTeacher = {
    id: `t_${Date.now()}`,
    name,
    email,
    qualification: qualification || 'B.Ed / Subject Specialist',
    location: location || 'India',
    state: state || 'All India',
    assignedClasses: assignedClasses || '9, 10, 11, 12',
    subjects: subjects || 'General Science',
    is_approved: false, // Under admin verification
    created_at: new Date().toISOString()
  };

  store.teachers.unshift(newTeacher);
  res.status(201).json({
    success: true,
    message: 'Teacher profile created. Verification is in progress.',
    data: newTeacher
  });
});

// POST /api/teachers/:id/approve - Admin approval
router.post('/:id/approve', (req, res) => {
  const { id } = req.params;
  const teacher = store.teachers.find(t => t.id === id);
  if (teacher) {
    teacher.is_approved = true;
    return res.json({ success: true, message: 'Teacher approved successfully', data: teacher });
  }
  res.status(404).json({ success: false, message: 'Teacher not found' });
});

module.exports = router;
