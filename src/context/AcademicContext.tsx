import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  EducationBoard,
  Subject,
  Chapter,
  Topic,
  LearningMaterial,
  Assignment,
  AssignmentSubmission,
  Quiz,
  QuizAttempt,
  Announcement,
  Bookmark
} from '../types';
import {
  INITIAL_BOARDS,
  INITIAL_SUBJECTS,
  INITIAL_CHAPTERS,
  INITIAL_TOPICS,
  INITIAL_MATERIALS,
  INITIAL_ASSIGNMENTS,
  INITIAL_QUIZZES,
  INITIAL_ANNOUNCEMENTS
} from '../data/initialData';

interface AcademicContextType {
  boards: EducationBoard[];
  subjects: Subject[];
  chapters: Chapter[];
  topics: Topic[];
  materials: LearningMaterial[];
  assignments: Assignment[];
  submissions: AssignmentSubmission[];
  quizzes: Quiz[];
  quizAttempts: QuizAttempt[];
  announcements: Announcement[];
  bookmarks: Bookmark[];
  completedLessons: string[]; // material_ids

  // Action methods
  addMaterial: (material: Omit<LearningMaterial, 'id' | 'created_at'>) => void;
  deleteMaterial: (id: string) => void;
  updateMaterial: (id: string, updated: Partial<LearningMaterial>) => void;
  addAssignment: (asg: Omit<Assignment, 'id' | 'created_at'>) => void;
  submitAssignment: (sub: Omit<AssignmentSubmission, 'id' | 'submitted_at'>) => void;
  gradeSubmission: (subId: string, marks: number, feedback: string) => void;
  addQuiz: (quiz: Omit<Quiz, 'id' | 'created_at'>) => void;
  submitQuizAttempt: (attempt: Omit<QuizAttempt, 'id' | 'completed_at'>) => void;
  toggleCompleteLesson: (materialId: string) => void;
  toggleBookmark: (material: LearningMaterial) => void;
  addAnnouncement: (announcement: Omit<Announcement, 'id' | 'created_at'>) => void;
  addChapter: (ch: Omit<Chapter, 'id'>) => void;
  addSubject: (sub: Omit<Subject, 'id'>) => void;
}

const AcademicContext = createContext<AcademicContextType | undefined>(undefined);

export const AcademicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [boards] = useState<EducationBoard[]>(INITIAL_BOARDS);
  const [subjects, setSubjects] = useState<Subject[]>(() => {
    const saved = localStorage.getItem('gs_subjects');
    return saved ? JSON.parse(saved) : INITIAL_SUBJECTS;
  });
  const [chapters, setChapters] = useState<Chapter[]>(() => {
    const saved = localStorage.getItem('gs_chapters');
    return saved ? JSON.parse(saved) : INITIAL_CHAPTERS;
  });
  const [topics] = useState<Topic[]>(INITIAL_TOPICS);
  const [materials, setMaterials] = useState<LearningMaterial[]>(() => {
    const saved = localStorage.getItem('gs_materials');
    return saved ? JSON.parse(saved) : INITIAL_MATERIALS;
  });
  const [assignments, setAssignments] = useState<Assignment[]>(() => {
    const saved = localStorage.getItem('gs_assignments');
    return saved ? JSON.parse(saved) : INITIAL_ASSIGNMENTS;
  });
  const [submissions, setSubmissions] = useState<AssignmentSubmission[]>(() => {
    const saved = localStorage.getItem('gs_submissions');
    return saved ? JSON.parse(saved) : [];
  });
  const [quizzes, setQuizzes] = useState<Quiz[]>(() => {
    const saved = localStorage.getItem('gs_quizzes');
    return saved ? JSON.parse(saved) : INITIAL_QUIZZES;
  });
  const [quizAttempts, setQuizAttempts] = useState<QuizAttempt[]>(() => {
    const saved = localStorage.getItem('gs_quiz_attempts');
    return saved ? JSON.parse(saved) : [];
  });
  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    const saved = localStorage.getItem('gs_announcements');
    return saved ? JSON.parse(saved) : INITIAL_ANNOUNCEMENTS;
  });
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => {
    const saved = localStorage.getItem('gs_bookmarks');
    return saved ? JSON.parse(saved) : [];
  });
  const [completedLessons, setCompletedLessons] = useState<string[]>(() => {
    const saved = localStorage.getItem('gs_completed_lessons');
    return saved ? JSON.parse(saved) : ['mat_3'];
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('gs_materials', JSON.stringify(materials));
    localStorage.setItem('gs_assignments', JSON.stringify(assignments));
    localStorage.setItem('gs_submissions', JSON.stringify(submissions));
    localStorage.setItem('gs_quizzes', JSON.stringify(quizzes));
    localStorage.setItem('gs_quiz_attempts', JSON.stringify(quizAttempts));
    localStorage.setItem('gs_announcements', JSON.stringify(announcements));
    localStorage.setItem('gs_bookmarks', JSON.stringify(bookmarks));
    localStorage.setItem('gs_completed_lessons', JSON.stringify(completedLessons));
    localStorage.setItem('gs_chapters', JSON.stringify(chapters));
    localStorage.setItem('gs_subjects', JSON.stringify(subjects));
  }, [materials, assignments, submissions, quizzes, quizAttempts, announcements, bookmarks, completedLessons, chapters, subjects]);

  const addMaterial = (newMat: Omit<LearningMaterial, 'id' | 'created_at'>) => {
    const mat: LearningMaterial = {
      ...newMat,
      id: `mat_${Date.now()}`,
      created_at: new Date().toISOString()
    };
    setMaterials(prev => [mat, ...prev]);
  };

  const deleteMaterial = (id: string) => {
    setMaterials(prev => prev.filter(m => m.id !== id));
  };

  const updateMaterial = (id: string, updated: Partial<LearningMaterial>) => {
    setMaterials(prev => prev.map(m => (m.id === id ? { ...m, ...updated } : m)));
  };

  const addAssignment = (asg: Omit<Assignment, 'id' | 'created_at'>) => {
    const item: Assignment = {
      ...asg,
      id: `asg_${Date.now()}`,
      created_at: new Date().toISOString()
    };
    setAssignments(prev => [item, ...prev]);
  };

  const submitAssignment = (sub: Omit<AssignmentSubmission, 'id' | 'submitted_at'>) => {
    const item: AssignmentSubmission = {
      ...sub,
      id: `sub_${Date.now()}`,
      submitted_at: new Date().toISOString()
    };
    setSubmissions(prev => [item, ...prev]);
  };

  const gradeSubmission = (subId: string, marks: number, feedback: string) => {
    setSubmissions(prev =>
      prev.map(s =>
        s.id === subId ? { ...s, marks_obtained: marks, feedback, status: 'Graded' } : s
      )
    );
  };

  const addQuiz = (quiz: Omit<Quiz, 'id' | 'created_at'>) => {
    const item: Quiz = {
      ...quiz,
      id: `quiz_${Date.now()}`,
      created_at: new Date().toISOString()
    };
    setQuizzes(prev => [item, ...prev]);
  };

  const submitQuizAttempt = (attempt: Omit<QuizAttempt, 'id' | 'completed_at'>) => {
    const item: QuizAttempt = {
      ...attempt,
      id: `att_${Date.now()}`,
      completed_at: new Date().toISOString()
    };
    setQuizAttempts(prev => [item, ...prev]);
  };

  const toggleCompleteLesson = (materialId: string) => {
    setCompletedLessons(prev =>
      prev.includes(materialId) ? prev.filter(id => id !== materialId) : [...prev, materialId]
    );
  };

  const toggleBookmark = (material: LearningMaterial) => {
    setBookmarks(prev => {
      const exists = prev.some(b => b.material_id === material.id);
      if (exists) {
        return prev.filter(b => b.material_id !== material.id);
      } else {
        const sub = subjects.find(s => s.id === material.subject_id);
        const newBm: Bookmark = {
          id: `bm_${Date.now()}`,
          student_id: 'std_demo_101',
          material_id: material.id,
          title: material.title,
          subject_name: sub?.name || 'Subject',
          material_type: material.material_type,
          created_at: new Date().toISOString()
        };
        return [newBm, ...prev];
      }
    });
  };

  const addAnnouncement = (anc: Omit<Announcement, 'id' | 'created_at'>) => {
    const item: Announcement = {
      ...anc,
      id: `anc_${Date.now()}`,
      created_at: new Date().toISOString()
    };
    setAnnouncements(prev => [item, ...prev]);
  };

  const addChapter = (ch: Omit<Chapter, 'id'>) => {
    const item: Chapter = {
      ...ch,
      id: `ch_${Date.now()}`
    };
    setChapters(prev => [...prev, item]);
  };

  const addSubject = (sub: Omit<Subject, 'id'>) => {
    const item: Subject = {
      ...sub,
      id: `sub_${Date.now()}`
    };
    setSubjects(prev => [...prev, item]);
  };

  return (
    <AcademicContext.Provider
      value={{
        boards,
        subjects,
        chapters,
        topics,
        materials,
        assignments,
        submissions,
        quizzes,
        quizAttempts,
        announcements,
        bookmarks,
        completedLessons,
        addMaterial,
        deleteMaterial,
        updateMaterial,
        addAssignment,
        submitAssignment,
        gradeSubmission,
        addQuiz,
        submitQuizAttempt,
        toggleCompleteLesson,
        toggleBookmark,
        addAnnouncement,
        addChapter,
        addSubject
      }}
    >
      {children}
    </AcademicContext.Provider>
  );
};

export const useAcademic = () => {
  const context = useContext(AcademicContext);
  if (!context) {
    throw new Error('useAcademic must be used within an AcademicProvider');
  }
  return context;
};
