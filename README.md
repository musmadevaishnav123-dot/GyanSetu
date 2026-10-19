# GyanSetu — Complete School Learning Platform

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-purple)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-teal)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Ready-emerald)](https://supabase.com/)

> **"Your Bridge to Knowledge"** • **"ज्ञान से सफलता तक"**  
> Centralized school learning platform connecting students (Standards 1 to 12) with verified school teachers across CBSE, Maharashtra State Board, and ICSE.

---

## 🌟 Key Highlights & Architecture

### 1. Dedicated Multi-Role Portals
- **Student Dashboard**: Personalized academic progress, Standards 1–12 class switcher, upcoming assignments, speed practice quizzes with instant grading, bookmarks, and teacher announcements.
- **Teacher Workstation**: Content upload engine (PDF notes, video lessons, worksheets), assignment creator, and student submission review/grading console.
- **Administrator Console**: Faculty verification queue (protecting students by prohibiting unapproved publishing), and dynamic curriculum/chapter management.

### 2. Rigorous Academic Hierarchy
```
Education Board (CBSE / State / ICSE)
  └── Standard (1 to 12)
        └── Subject (Science, Mathematics, Social Science, Hindi, English, etc.)
              └── Chapter (Syllabus Units)
                    └── Topic (Concept Lessons)
                          └── Learning Material (Notes, Videos, Quizzes, Assignments)
```

### 3. Child Safety & Privacy
- Designed in compliance with Indian child-data protection guidelines.
- Unfiltered ads and social distractions are eliminated.
- Student marks and submission documents are protected with Row Level Security (RLS) policies.

---

## 🚀 Running the Project Locally

### Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm**

### Step-by-Step Setup

1. **Clone & Enter Directory**:
   ```bash
   git clone https://github.com/musmadevaishnav123-dot/GyanSetu.git
   cd GyanSetu
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

4. **Production Build**:
   ```bash
   npm run build
   ```

---

## ☁️ Supabase / PostgreSQL Configuration (Optional)

The application ships with verified initial seed data for CBSE Standard 10 and supports offline/local evaluation seamlessly.

To connect your own live Supabase project:
1. Create a project on [Supabase.com](https://supabase.com).
2. Copy SQL from `supabase/schema.sql` and run it in your Supabase SQL Editor.
3. Create `.env` in the root folder with:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```
