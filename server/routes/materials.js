const express = require('express');
const router = express.Router();
const { supabase, isConfigured } = require('../config/supabase');
const store = require('../data/store');

// GET /api/materials - Get materials with nationwide multi-criteria filtering
router.get('/', async (req, res) => {
  try {
    const { board, standard, subject, search, type, language } = req.query;

    if (isConfigured && supabase) {
      let query = supabase.from('learning_materials').select('*');
      if (board) query = query.eq('board', board);
      if (standard) query = query.eq('standard', parseInt(standard));
      if (type) query = query.eq('material_type', type);
      if (language) query = query.eq('language', language);
      if (search) query = query.ilike('title', `%${search}%`);

      const { data, error } = await query;
      if (error) throw error;
      return res.json({ success: true, count: data.length, data });
    }

    // Fallback in-memory
    let result = [...store.materials];

    if (board) {
      result = result.filter(m => m.board.toLowerCase() === board.toLowerCase());
    }
    if (standard) {
      result = result.filter(m => m.standard === parseInt(standard));
    }
    if (type) {
      result = result.filter(m => m.material_type.toLowerCase() === type.toLowerCase());
    }
    if (language) {
      result = result.filter(m => m.language.toLowerCase().includes(language.toLowerCase()));
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(m => m.title.toLowerCase().includes(q) || m.description.toLowerCase().includes(q));
    }

    return res.json({ success: true, count: result.length, data: result });
  } catch (err) {
    console.error('Error fetching materials:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/materials/:id - Single material
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (isConfigured && supabase) {
      const { data, error } = await supabase
        .from('learning_materials')
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw error;
      return res.json({ success: true, data });
    }

    const material = store.materials.find(m => m.id === id);
    if (!material) {
      return res.status(404).json({ success: false, message: 'Material not found' });
    }
    return res.json({ success: true, data: material });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/materials - Any verified teacher uploads content
router.post('/', async (req, res) => {
  try {
    const {
      title,
      description,
      board,
      standard,
      subject_id,
      chapter_id,
      material_type,
      file_url,
      external_url,
      duration,
      author_id,
      author_name,
      author_location,
      language
    } = req.body;

    if (!title || !description || !board || !standard) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const newMaterial = {
      id: `mat_${Date.now()}`,
      title,
      description,
      board: board || 'CBSE',
      standard: parseInt(standard),
      subject_id: subject_id || 'sub_c10_sci',
      chapter_id: chapter_id || 'ch_c10_sci_4',
      material_type: material_type || 'pdf',
      file_url: file_url || null,
      external_url: external_url || null,
      duration: duration || '15 mins',
      author_id: author_id || 't_general',
      author_name: author_name || 'Verified Educator',
      author_location: author_location || 'India',
      language: language || 'English/Hindi',
      is_published: true,
      likes: 0,
      created_at: new Date().toISOString()
    };

    if (isConfigured && supabase) {
      const { data, error } = await supabase
        .from('learning_materials')
        .insert([newMaterial])
        .select();
      if (error) throw error;
      return res.status(201).json({ success: true, data: data[0] });
    }

    store.materials.unshift(newMaterial);
    return res.status(201).json({ success: true, data: newMaterial });
  } catch (err) {
    console.error('Error creating material:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/materials/:id/like - Upvote / helpful reaction
router.post('/:id/like', (req, res) => {
  const { id } = req.params;
  const mat = store.materials.find(m => m.id === id);
  if (mat) {
    mat.likes = (mat.likes || 0) + 1;
    return res.json({ success: true, likes: mat.likes });
  }
  res.status(404).json({ success: false, message: 'Material not found' });
});

module.exports = router;
