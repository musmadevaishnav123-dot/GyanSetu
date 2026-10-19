-- GyanSetu Production PostgreSQL / Supabase Schema
-- Designed for CBSE & State Boards Standards 1 to 12

-- 1. Profiles Table with Role Based Access Control
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('student', 'teacher', 'admin')),
  board TEXT DEFAULT 'CBSE',
  standard INT CHECK (standard BETWEEN 1 AND 12),
  language TEXT DEFAULT 'English',
  is_approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Academic Hierarchy: Boards, Standards, Subjects, Chapters, Topics
CREATE TABLE IF NOT EXISTS public.boards (
  id TEXT PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT
);

CREATE TABLE IF NOT EXISTS public.subjects (
  id TEXT PRIMARY KEY,
  board_id TEXT REFERENCES public.boards(id) ON DELETE CASCADE,
  standard_number INT NOT NULL CHECK (standard_number BETWEEN 1 AND 12),
  name TEXT NOT NULL,
  code TEXT NOT NULL,
  color TEXT DEFAULT 'bg-teal-500'
);

CREATE TABLE IF NOT EXISTS public.chapters (
  id TEXT PRIMARY KEY,
  subject_id TEXT REFERENCES public.subjects(id) ON DELETE CASCADE,
  chapter_number INT NOT NULL,
  title TEXT NOT NULL,
  description TEXT
);

CREATE TABLE IF NOT EXISTS public.topics (
  id TEXT PRIMARY KEY,
  chapter_id TEXT REFERENCES public.chapters(id) ON DELETE CASCADE,
  topic_number INT NOT NULL,
  title TEXT NOT NULL,
  description TEXT
);

-- 3. Learning Materials Table
CREATE TABLE IF NOT EXISTS public.learning_materials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  board TEXT NOT NULL,
  standard INT NOT NULL CHECK (standard BETWEEN 1 AND 12),
  subject_id TEXT REFERENCES public.subjects(id),
  chapter_id TEXT REFERENCES public.chapters(id),
  topic_id TEXT REFERENCES public.topics(id),
  material_type TEXT NOT NULL CHECK (material_type IN ('pdf', 'video', 'note', 'document')),
  file_url TEXT,
  external_url TEXT,
  duration TEXT,
  author_id UUID REFERENCES public.profiles(id),
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Assignments & Submissions
CREATE TABLE IF NOT EXISTS public.assignments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  board TEXT NOT NULL,
  standard INT NOT NULL CHECK (standard BETWEEN 1 AND 12),
  subject_id TEXT REFERENCES public.subjects(id),
  chapter_id TEXT REFERENCES public.chapters(id),
  due_date TIMESTAMPTZ NOT NULL,
  max_marks INT NOT NULL,
  teacher_id UUID REFERENCES public.profiles(id),
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.assignment_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  assignment_id UUID REFERENCES public.assignments(id) ON DELETE CASCADE,
  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  file_url TEXT,
  status TEXT DEFAULT 'Submitted' CHECK (status IN ('Draft', 'Submitted', 'Under Review', 'Graded', 'Returned')),
  marks_obtained INT,
  feedback TEXT,
  submitted_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Quizzes & Attempts
CREATE TABLE IF NOT EXISTS public.quizzes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  board TEXT NOT NULL,
  standard INT NOT NULL CHECK (standard BETWEEN 1 AND 12),
  subject_id TEXT REFERENCES public.subjects(id),
  time_limit_minutes INT DEFAULT 15,
  max_attempts INT DEFAULT 3,
  teacher_id UUID REFERENCES public.profiles(id),
  questions JSONB NOT NULL,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.quiz_attempts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  quiz_id UUID REFERENCES public.quizzes(id) ON DELETE CASCADE,
  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  score INT NOT NULL,
  total_marks INT NOT NULL,
  percentage INT NOT NULL,
  answers JSONB,
  completed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assignment_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Students can read published materials and assignments
CREATE POLICY "Public read for published materials" ON public.learning_materials
  FOR SELECT USING (is_published = true);

-- Teachers can insert only if approved
CREATE POLICY "Approved teachers can upload" ON public.learning_materials
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'teacher' AND is_approved = true)
  );

-- Students can only access their own submissions
CREATE POLICY "Students manage own submissions" ON public.assignment_submissions
  FOR ALL USING (auth.uid() = student_id);

-- Teachers can view submissions for their classes
CREATE POLICY "Teachers view submissions" ON public.assignment_submissions
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND (role = 'teacher' OR role = 'admin'))
  );
