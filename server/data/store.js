// In-memory data store for fallback when Supabase connection string is not yet provided

const boards = [
  { id: 'b_cbse', code: 'CBSE', name: 'Central Board of Secondary Education', description: 'National level board of education in India.' },
  { id: 'b_mh', code: 'MSBSHSE', name: 'Maharashtra State Board', description: 'State-level education board in Maharashtra.' },
  { id: 'b_icse', code: 'ICSE', name: 'Council for the Indian School Certificate Examinations', description: 'National private school board in India.' },
  { id: 'b_up', code: 'UPMSP', name: 'Uttar Pradesh State Board', description: 'Madhyamik Shiksha Parishad, UP.' },
  { id: 'b_bihar', code: 'BSEB', name: 'Bihar School Examination Board', description: 'State board for school examinations in Bihar.' },
  { id: 'b_karnataka', code: 'KSEAB', name: 'Karnataka School Examination and Assessment Board', description: 'State education board in Karnataka.' }
];

const subjects = [
  { id: 'sub_c10_sci', board_id: 'b_cbse', standard_number: 10, name: 'Science', code: 'SCI10', color: 'bg-emerald-500' },
  { id: 'sub_c10_math', board_id: 'b_cbse', standard_number: 10, name: 'Mathematics', code: 'MATH10', color: 'bg-blue-600' },
  { id: 'sub_c10_sst', board_id: 'b_cbse', standard_number: 10, name: 'Social Science', code: 'SST10', color: 'bg-amber-600' },
  { id: 'sub_c10_eng', board_id: 'b_cbse', standard_number: 10, name: 'English Language & Lit', code: 'ENG10', color: 'bg-indigo-600' },
  { id: 'sub_c10_hin', board_id: 'b_cbse', standard_number: 10, name: 'Hindi Course-A', code: 'HIN10', color: 'bg-rose-500' },
  { id: 'sub_c12_phy', board_id: 'b_cbse', standard_number: 12, name: 'Physics', code: 'PHY12', color: 'bg-cyan-600' },
  { id: 'sub_c12_chem', board_id: 'b_cbse', standard_number: 12, name: 'Chemistry', code: 'CHEM12', color: 'bg-purple-600' },
  { id: 'sub_c12_math', board_id: 'b_cbse', standard_number: 12, name: 'Mathematics', code: 'MATH12', color: 'bg-blue-600' }
];

const chapters = [
  { id: 'ch_c10_sci_1', subject_id: 'sub_c10_sci', chapter_number: 1, title: 'Chemical Reactions and Equations', description: 'Types of chemical reactions, combination, decomposition, displacement, and oxidation-reduction.' },
  { id: 'ch_c10_sci_2', subject_id: 'sub_c10_sci', chapter_number: 2, title: 'Acids, Bases and Salts', description: 'Properties, pH scale, preparation and uses of sodium compounds.' },
  { id: 'ch_c10_sci_3', subject_id: 'sub_c10_sci', chapter_number: 3, title: 'Life Processes', description: 'Nutrition, respiration, transportation, and excretion.' },
  { id: 'ch_c10_sci_4', subject_id: 'sub_c10_sci', chapter_number: 4, title: 'Electricity', description: 'Electric current, potential difference, Ohm\'s law, resistance, and heating effects.' }
];

const materials = [
  {
    id: 'mat_1',
    title: 'Ohm\'s Law Complete Video Lecture & Concept Analysis',
    description: 'Detailed visual breakdown of Ohm\'s Law with verification circuit animations and numerical solutions.',
    board: 'CBSE',
    standard: 10,
    subject_id: 'sub_c10_sci',
    chapter_id: 'ch_c10_sci_4',
    material_type: 'video',
    external_url: 'https://www.youtube.com/watch?v=k_jH22g3eY8',
    duration: '22 mins',
    author_id: 't_sharma',
    author_name: 'Dr. Ramesh Sharma (Sr. PGT Physics)',
    author_location: 'New Delhi',
    language: 'English/Hindi',
    is_published: true,
    likes: 142,
    created_at: new Date().toISOString()
  },
  {
    id: 'mat_2',
    title: 'Electricity Master Revision Notes & Formulas (PDF)',
    description: 'Comprehensive handwritten chapter summary, diagrams, SI units list, and 15 solved exemplar questions.',
    board: 'CBSE',
    standard: 10,
    subject_id: 'sub_c10_sci',
    chapter_id: 'ch_c10_sci_4',
    material_type: 'pdf',
    file_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    duration: '14 Pages',
    author_id: 't_sharma',
    author_name: 'Dr. Ramesh Sharma',
    author_location: 'New Delhi',
    language: 'English',
    is_published: true,
    likes: 89,
    created_at: new Date().toISOString()
  }
];

const assignments = [
  {
    id: 'asg_1',
    title: 'Numerical Problems on Resistors in Series and Parallel',
    description: 'Solve the 5 circuit diagrams. Show step-by-step calculation for equivalent resistance and power consumption.',
    board: 'CBSE',
    standard: 10,
    subject_id: 'sub_c10_sci',
    chapter_id: 'ch_c10_sci_4',
    due_date: '2026-11-10T23:59:59Z',
    max_marks: 25,
    teacher_id: 't_sharma',
    teacher_name: 'Dr. Ramesh Sharma',
    is_published: true,
    created_at: new Date().toISOString()
  }
];

const submissions = [];

const quizzes = [
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
    questions: [
      {
        id: 'q1',
        question_text: 'What is the SI unit of electric potential difference?',
        options: ['Ampere', 'Volt', 'Ohm', 'Joule'],
        correct_option_index: 1,
        marks: 2,
        explanation: 'The SI unit of electric potential difference is Volt (V).'
      },
      {
        id: 'q2',
        question_text: 'According to Ohm\'s law, if the resistance of a conductor is doubled while voltage remains constant, the current will:',
        options: ['Double', 'Become four times', 'Be halved', 'Remain unchanged'],
        correct_option_index: 2,
        marks: 2,
        explanation: 'Since I = V / R, doubling R halves I.'
      }
    ],
    created_at: new Date().toISOString()
  }
];

const teachers = [
  {
    id: 't_sharma',
    name: 'Dr. Ramesh Sharma',
    email: 'dr.sharma@gyansetu.edu',
    qualification: 'M.Sc, B.Ed, 14 Yrs PGT Physics',
    location: 'New Delhi',
    state: 'Delhi',
    assignedClasses: '9, 10, 11, 12',
    subjects: 'Science, Physics',
    is_approved: true,
    created_at: new Date().toISOString()
  },
  {
    id: 't_deshmukh',
    name: 'Sunita Deshmukh',
    email: 'sunita.deshmukh@school.in',
    qualification: 'M.A. Marathi & Sanskrit, B.Ed',
    location: 'Pune',
    state: 'Maharashtra',
    assignedClasses: '6, 7, 8, 9, 10',
    subjects: 'Languages, Marathi',
    is_approved: false,
    created_at: new Date().toISOString()
  }
];

module.exports = {
  boards,
  subjects,
  chapters,
  materials,
  assignments,
  submissions,
  quizzes,
  teachers
};
