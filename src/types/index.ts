export type UserRole = 'student' | 'teacher' | 'admin';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  board?: string; // For students e.g. 'CBSE'
  standard?: number; // 1 to 12
  language?: string;
  avatar_url?: string;
  is_approved?: boolean; // For teachers: admin approval required
  subjects?: string[]; // For teachers: assigned subjects
  classes?: number[]; // For teachers: assigned classes
  created_at: string;
}

export interface EducationBoard {
  id: string;
  code: string;
  name: string;
  description: string;
}

export interface AcademicStandard {
  id: string;
  board_id: string;
  standard_number: number; // 1 to 12
  name: string; // e.g. "Standard 10" or "Class 10"
}

export interface Subject {
  id: string;
  board_id: string;
  standard_number: number;
  name: string; // e.g. "Mathematics", "Science"
  code: string;
  icon: string;
  color: string;
}

export interface Chapter {
  id: string;
  subject_id: string;
  chapter_number: number;
  title: string;
  description: string;
}

export interface Topic {
  id: string;
  chapter_id: string;
  topic_number: number;
  title: string;
  description: string;
}

export type MaterialType = 'note' | 'video' | 'pdf' | 'document' | 'assignment' | 'quiz' | 'external_link';

export interface LearningMaterial {
  id: string;
  title: string;
  description: string;
  board: string;
  standard: number;
  subject_id: string;
  chapter_id: string;
  topic_id?: string;
  material_type: MaterialType;
  file_url?: string;
  external_url?: string;
  duration?: string;
  author_id: string;
  author_name: string;
  language: string;
  is_published: boolean;
  created_at: string;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  board: string;
  standard: number;
  subject_id: string;
  chapter_id: string;
  due_date: string;
  max_marks: number;
  teacher_id: string;
  teacher_name: string;
  attachment_url?: string;
  is_published: boolean;
  created_at: string;
}

export type SubmissionStatus = 'Draft' | 'Submitted' | 'Under Review' | 'Graded' | 'Returned';

export interface AssignmentSubmission {
  id: string;
  assignment_id: string;
  student_id: string;
  student_name: string;
  submitted_at: string;
  content: string;
  file_url?: string;
  status: SubmissionStatus;
  marks_obtained?: number;
  feedback?: string;
}

export interface QuizQuestion {
  id: string;
  question_text: string;
  options: string[];
  correct_option_index: number;
  marks: number;
  explanation?: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  board: string;
  standard: number;
  subject_id: string;
  chapter_id: string;
  time_limit_minutes: number;
  max_attempts: number;
  teacher_id: string;
  teacher_name: string;
  is_published: boolean;
  questions: QuizQuestion[];
  created_at: string;
}

export interface QuizAttempt {
  id: string;
  quiz_id: string;
  student_id: string;
  score: number;
  total_marks: number;
  percentage: number;
  completed_at: string;
  answers: Record<string, number>; // question_id -> chosen index
}

export interface StudentProgress {
  id: string;
  student_id: string;
  subject_id: string;
  chapter_id: string;
  topic_id?: string;
  material_id?: string;
  completed: boolean;
  updated_at: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  board?: string;
  standard?: number;
  author_name: string;
  author_role: UserRole;
  created_at: string;
}

export interface Bookmark {
  id: string;
  student_id: string;
  material_id: string;
  title: string;
  subject_name: string;
  material_type: MaterialType;
  created_at: string;
}
