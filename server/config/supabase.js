const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

let supabase = null;

const isConfigured = Boolean(
  supabaseUrl &&
  supabaseUrl !== 'https://your-project.supabase.co' &&
  supabaseKey &&
  supabaseKey !== 'your-supabase-service-role-key-here'
);

if (isConfigured) {
  try {
    supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });
    console.log('✅ Supabase connected successfully to:', supabaseUrl);
  } catch (err) {
    console.error('❌ Supabase initialization error:', err.message);
  }
} else {
  console.log('ℹ️ Supabase not yet configured. Server running in in-memory / fallback mock mode.');
}

module.exports = {
  supabase,
  isConfigured
};
