import { EducationBoard, Subject, Chapter, Topic, LearningMaterial, Assignment, Quiz, Announcement } from '../types';

export const INITIAL_BOARDS: EducationBoard[] = [
  { id: 'b_cbse', code: 'CBSE', name: 'Central Board of Secondary Education', description: 'National level board of education in India for public and private schools.' },
  { id: 'b_mh', code: 'MSBSHSE', name: 'Maharashtra State Board', description: 'State-level education board in Maharashtra.' },
  { id: 'b_icse', code: 'ICSE', name: 'Council for the Indian School Certificate Examinations', description: 'Private, non-governmental national board of school education in India.' }
];

export const INITIAL_SUBJECTS: Subject[] = [
  // Class 10 CBSE
  { id: 'sub_c10_sci', board_id: 'b_cbse', standard_number: 10, name: 'Science', code: 'SCI10', icon: 'Atom', color: 'bg-emerald-500' },
  { id: 'sub_c10_math', board_id: 'b_cbse', standard_number: 10, name: 'Mathematics', code: 'MATH10', icon: 'Calculator', color: 'bg-blue-600' },
  { id: 'sub_c10_sst', board_id: 'b_cbse', standard_number: 10, name: 'Social Science', code: 'SST10', icon: 'Globe', color: 'bg-amber-600' },
  { id: 'sub_c10_eng', board_id: 'b_cbse', standard_number: 10, name: 'English Language & Lit', code: 'ENG10', icon: 'BookOpen', color: 'bg-indigo-600' },
  { id: 'sub_c10_hin', board_id: 'b_cbse', standard_number: 10, name: 'Hindi Course-A', code: 'HIN10', icon: 'PenTool', color: 'bg-rose-500' },

  // Class 9 CBSE
  { id: 'sub_c9_sci', board_id: 'b_cbse', standard_number: 9, name: 'Science', code: 'SCI09', icon: 'Atom', color: 'bg-emerald-500' },
  { id: 'sub_c9_math', board_id: 'b_cbse', standard_number: 9, name: 'Mathematics', code: 'MATH09', icon: 'Calculator', color: 'bg-blue-600' },

  // Class 12 CBSE
  { id: 'sub_c12_phy', board_id: 'b_cbse', standard_number: 12, name: 'Physics', code: 'PHY12', icon: 'Zap', color: 'bg-cyan-600' },
  { id: 'sub_c12_chem', board_id: 'b_cbse', standard_number: 12, name: 'Chemistry', code: 'CHEM12', icon: 'FlaskConical', color: 'bg-purple-600' },
  { id: 'sub_c12_math', board_id: 'b_cbse', standard_number: 12, name: 'Mathematics', code: 'MATH12', icon: 'Calculator', color: 'bg-blue-600' },
  { id: 'sub_c12_cs', board_id: 'b_cbse', standard_number: 12, name: 'Computer Science', code: 'CS12', icon: 'Code', color: 'bg-teal-600' },
];

export const INITIAL_CHAPTERS: Chapter[] = [
  // Class 10 Science
  { id: 'ch_c10_sci_1', subject_id: 'sub_c10_sci', chapter_number: 1, title: 'Chemical Reactions and Equations', description: 'Types of chemical reactions, combination, decomposition, displacement, and oxidation-reduction.' },
  { id: 'ch_c10_sci_2', subject_id: 'sub_c10_sci', chapter_number: 2, title: 'Acids, Bases and Salts', description: 'Properties, pH scale, preparation and uses of sodium compounds.' },
  { id: 'ch_c10_sci_3', subject_id: 'sub_c10_sci', chapter_number: 3, title: 'Life Processes', description: 'Nutrition, respiration, transportation, and excretion in plants and human beings.' },
  { id: 'ch_c10_sci_4', subject_id: 'sub_c10_sci', chapter_number: 4, title: 'Electricity', description: 'Electric current, potential difference, Ohm\'s law, resistance, and heating effects.' },
  { id: 'ch_c10_sci_5', subject_id: 'sub_c10_sci', chapter_number: 5, title: 'Light - Reflection and Refraction', description: 'Spherical mirrors, lenses, magnification, refractive index and power of a lens.' },

  // Class 10 Math
  { id: 'ch_c10_math_1', subject_id: 'sub_c10_math', chapter_number: 1, title: 'Real Numbers', description: 'Fundamental Theorem of Arithmetic, revisiting irrational numbers.' },
  { id: 'ch_c10_math_2', subject_id: 'sub_c10_math', chapter_number: 2, title: 'Polynomials', description: 'Geometrical meaning of zeroes, relationship between zeroes and coefficients.' },
  { id: 'ch_c10_math_3', subject_id: 'sub_c10_math', chapter_number: 3, title: 'Quadratic Equations', description: 'Standard form, solving by factorisation and quadratic formula.' },
  { id: 'ch_c10_math_4', subject_id: 'sub_c10_math', chapter_number: 4, title: 'Triangles', description: 'Similarity of triangles, Basic Proportionality Theorem (Thales Theorem).' },
];

export const INITIAL_TOPICS: Topic[] = [
  { id: 'top_sci_4_1', chapter_id: 'ch_c10_sci_4', topic_number: 1, title: 'Electric Current & Circuit', description: 'Definition of ampere, electric charge flow and schematic diagrams.' },
  { id: 'top_sci_4_2', chapter_id: 'ch_c10_sci_4', topic_number: 2, title: 'Electric Potential and Potential Difference', description: 'Concept of volt and work done per unit charge.' },
  { id: 'top_sci_4_3', chapter_id: 'ch_c10_sci_4', topic_number: 3, title: 'Ohm\'s Law & Resistance Factors', description: 'Mathematical relationship between V and I, resistance, and factors affecting resistivity.' },
  { id: 'top_sci_4_4', chapter_id: 'ch_c10_sci_4', topic_number: 4, title: 'Resistors in Series and Parallel', description: 'Equivalent resistance derivation and practical applications.' },
];

export const INITIAL_MATERIALS: LearningMaterial[] = [
  {
    id: 'mat_1',
    title: 'Ohm\'s Law Complete Video Lecture & Concept Analysis',
    description: 'Detailed visual breakdown of Ohm\'s Law with verification circuit animations and numerical solutions.',
    board: 'CBSE',
    standard: 10,
    subject_id: 'sub_c10_sci',
    chapter_id: 'ch_c10_sci_4',
    topic_id: 'top_sci_4_3',
    material_type: 'video',
    external_url: 'https://www.youtube.com/watch?v=k_jH22g3eY8',
    duration: '22 mins',
    author_id: 't_sharma',
    author_name: 'Dr. Ramesh Sharma (Sr. PGT Physics)',
    language: 'English/Hindi',
    is_published: true,
    created_at: '2026-10-15T10:00:00Z'
  },
  {
    id: 'mat_2',
    title: 'Electricity Master Revision Notes & Formulas (PDF)',
    description: 'Comprehensive handwritten chapter summary, diagrams, SI units list, and 15 solved exemplar questions.',
    board: 'CBSE',
    standard: 10,
    subject_id: 'sub_c10_sci',
    chapter_id: 'ch_c10_sci_4',
    topic_id: 'top_sci_4_3',
    material_type: 'pdf',
    file_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    duration: '14 Pages',
    author_id: 't_sharma',
    author_name: 'Dr. Ramesh Sharma',
    language: 'English',
    is_published: true,
    created_at: '2026-10-16T14:30:00Z'
  },
  {
    id: 'mat_3',
    title: 'NCERT Chemical Reactions - Core Concept Summary',
    description: 'Color-coded chart of displacement, double displacement and redox reactions with balancing tips.',
    board: 'CBSE',
    standard: 10,
    subject_id: 'sub_c10_sci',
    chapter_id: 'ch_c10_sci_1',
    material_type: 'note',
    duration: '10 mins read',
    author_id: 't_verma',
    author_name: 'Smt. Priya Verma',
    language: 'English',
    is_published: true,
    created_at: '2026-10-14T09:15:00Z'
  }
];

export const INITIAL_ASSIGNMENTS: Assignment[] = [
  {
    id: 'asg_1',
    title: 'Numerical Problems on Resistors in Series and Parallel',
    description: 'Solve the 5 circuit diagrams attached in the worksheet. Show step-by-step calculation for equivalent resistance and power consumption.',
    board: 'CBSE',
    standard: 10,
    subject_id: 'sub_c10_sci',
    chapter_id: 'ch_c10_sci_4',
    due_date: '2026-10-28T23:59:59Z',
    max_marks: 25,
    teacher_id: 't_sharma',
    teacher_name: 'Dr. Ramesh Sharma',
    is_published: true,
    created_at: '2026-10-18T11:00:00Z'
  },
  {
    id: 'asg_2',
    title: 'Real Numbers Word Problems & Proof of Irrationality',
    description: 'Complete questions 1 to 8 from Exercise 1.2 and write formal proofs for irrationality of sqrt(5).',
    board: 'CBSE',
    standard: 10,
    subject_id: 'sub_c10_math',
    chapter_id: 'ch_c10_math_1',
    due_date: '2026-10-25T18:00:00Z',
    max_marks: 20,
    teacher_id: 't_gupta',
    teacher_name: 'Anil Gupta',
    is_published: true,
    created_at: '2026-10-17T08:30:00Z'
  }
];

export const INITIAL_QUIZZES: Quiz[] = [
  {
    id: 'quiz_1',
    title: 'Class 10 Science: Electricity & Circuits Speed Test',
    description: 'Test your understanding of Ohm\'s law, resistivity, electric power, and circuit calculations.',
    board: 'CBSE',
    standard: 10,
    subject_id: 'sub_c10_sci',
    chapter_id: 'ch_c10_sci_4',
    time_limit_minutes: 15,
    max_attempts: 3,
    teacher_id: 't_sharma',
    teacher_name: 'Dr. Ramesh Sharma',
    is_published: true,
    created_at: '2026-10-15T12:00:00Z',
    questions: [
      {
        id: 'q1',
        question_text: 'What is the SI unit of electric potential difference?',
        options: ['Ampere', 'Volt', 'Ohm', 'Joule'],
        correct_option_index: 1,
        marks: 2,
        explanation: 'The SI unit of electric potential difference is Volt (V), named after Alessandro Volta.'
      },
      {
        id: 'q2',
        question_text: 'According to Ohm\'s law, if the resistance of a conductor is doubled while voltage remains constant, the current will:',
        options: ['Double', 'Become four times', 'Be halved', 'Remain unchanged'],
        correct_option_index: 2,
        marks: 2,
        explanation: 'Since I = V / R, current is inversely proportional to resistance. Doubling R halves I.'
      },
      {
        id: 'q3',
        question_text: 'Which instrument is always connected in series with a circuit to measure electric current?',
        options: ['Voltmeter', 'Galvanometer', 'Ammeter', 'Rheostat'],
        correct_option_index: 2,
        marks: 2,
        explanation: 'An ammeter has very low resistance and must be connected in series to measure total current flow.'
      },
      {
        id: 'q4',
        question_text: 'Two resistors of 6 Ω and 3 Ω are connected in parallel. What is their equivalent resistance?',
        options: ['9 Ω', '2 Ω', '3 Ω', '18 Ω'],
        correct_option_index: 1,
        marks: 4,
        explanation: '1/Req = 1/6 + 1/3 = 1/6 + 2/6 = 3/6 = 1/2. Hence Req = 2 Ω.'
      }
    ]
  }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'anc_1',
    title: 'Mid-Term Revision Schedule Announced for Standard 10',
    content: 'Special doubt-solving sessions and mock tests will be published every Friday starting this week. Please check your subject dashboards.',
    board: 'CBSE',
    standard: 10,
    author_name: 'Principal Office / GyanSetu Academic Head',
    author_role: 'admin',
    created_at: '2026-10-19T10:00:00Z'
  },
  {
    id: 'anc_2',
    title: 'Electricity Assignment Deadline Reminder',
    content: 'Please submit your solutions for Assignment #1 before October 28th to receive teacher feedback.',
    board: 'CBSE',
    standard: 10,
    author_name: 'Dr. Ramesh Sharma',
    author_role: 'teacher',
    created_at: '2026-10-18T16:00:00Z'
  }
];
