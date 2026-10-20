const express = require('express');
const router = express.Router();
const { supabase, isConfigured } = require('../config/supabase');
const store = require('../data/store');

// GET /api/curriculum/boards - List all national and state boards
router.get('/boards', async (req, res) => {
  try {
    if (isConfigured && supabase) {
      const { data, error } = await supabase.from('boards').select('*');
      if (error) throw error;
      return res.json({ success: true, data });
    }
    return res.json({ success: true, data: store.boards });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/curriculum/subjects - Filter subjects by board and standard
router.get('/subjects', async (req, res) => {
  try {
    const { board_id, standard } = req.query;

    if (isConfigured && supabase) {
      let query = supabase.from('subjects').select('*');
      if (board_id) query = query.eq('board_id', board_id);
      if (standard) query = query.eq('standard_number', parseInt(standard));
      const { data, error } = await query;
      if (error) throw error;
      return res.json({ success: true, data });
    }

    let result = [...store.subjects];
    if (board_id) result = result.filter(s => s.board_id === board_id);
    if (standard) result = result.filter(s => s.standard_number === parseInt(standard));

    return res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/curriculum/chapters - Get chapters for a subject
router.get('/chapters', async (req, res) => {
  try {
    const { subject_id } = req.query;

    if (isConfigured && supabase) {
      let query = supabase.from('chapters').select('*');
      if (subject_id) query = query.eq('subject_id', subject_id);
      const { data, error } = await query;
      if (error) throw error;
      return res.json({ success: true, data });
    }

    let result = [...store.chapters];
    if (subject_id) result = result.filter(c => c.subject_id === subject_id);

    return res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
