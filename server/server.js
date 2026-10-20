const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { isConfigured } = require('./config/supabase');
const materialsRoutes = require('./routes/materials');
const curriculumRoutes = require('./routes/curriculum');
const teachersRoutes = require('./routes/teachers');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Root Health & Metadata Route
app.get('/', (req, res) => {
  res.json({
    project: 'GyanSetu National Learning Platform Backend API',
    tagline: 'Your Bridge to Knowledge • ज्ञान से सफलता तक',
    coverage: 'All India (Standards 1 to 12 across CBSE, State Boards, and ICSE)',
    database: isConfigured ? 'Connected to Supabase PostgreSQL' : 'In-Memory National Cache (Ready for Supabase)',
    endpoints: {
      materials: '/api/materials',
      curriculum: '/api/curriculum',
      teachers: '/api/teachers'
    }
  });
});

// API Routes
app.use('/api/materials', materialsRoutes);
app.use('/api/curriculum', curriculumRoutes);
app.use('/api/teachers', teachersRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('API Error:', err);
  res.status(500).json({ success: false, error: err.message || 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`🚀 GyanSetu Backend Server running on http://localhost:${PORT}`);
});
