import React, { useState } from 'react';
import { useAcademic } from '../context/AcademicContext';
import {
  ShieldAlert,
  Users,
  CheckCircle,
  XCircle,
  BookOpen,
  Layers,
  Plus,
  Trash2,
  BarChart3,
  Award,
  AlertTriangle
} from 'lucide-react';

interface PendingTeacher {
  id: string;
  name: string;
  email: string;
  qualification: string;
  requestedClasses: string;
  subjects: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export const AdminDashboard: React.FC = () => {
  const {
    materials,
    assignments,
    quizzes,
    subjects,
    chapters,
    addSubject,
    addChapter
  } = useAcademic();

  const [teachers, setTeachers] = useState<PendingTeacher[]>([
    {
      id: 't_req_1',
      name: 'Dr. Ramesh Sharma',
      email: 'dr.sharma@gyansetu.edu',
      qualification: 'M.Sc, B.Ed, 14 Yrs PGT Physics',
      requestedClasses: 'Classes 9, 10, 11, 12',
      subjects: 'Science, Physics',
      status: 'Approved'
    },
    {
      id: 't_req_2',
      name: 'Sunita Deshmukh',
      email: 'sunita.deshmukh@school.in',
      qualification: 'M.A. Hindi & Sanskrit, B.Ed',
      requestedClasses: 'Classes 6, 7, 8, 9, 10',
      subjects: 'Hindi Course-A',
      status: 'Pending'
    },
    {
      id: 't_req_3',
      name: 'Vikramaditya Rathore',
      email: 'v.rathore@maths.edu',
      qualification: 'M.Sc Mathematics (IIT Roorkee)',
      requestedClasses: 'Classes 10, 11, 12',
      subjects: 'Mathematics',
      status: 'Pending'
    }
  ]);

  // New chapter form
  const [newChapterTitle, setNewChapterTitle] = useState('');
  const [newChapterDesc, setNewChapterDesc] = useState('');
  const [newChapterSubject, setNewChapterSubject] = useState('sub_c10_sci');

  const handleApproveTeacher = (id: string) => {
    setTeachers(prev =>
      prev.map(t => (t.id === id ? { ...t, status: 'Approved' } : t))
    );
  };

  const handleRejectTeacher = (id: string) => {
    setTeachers(prev =>
      prev.map(t => (t.id === id ? { ...t, status: 'Rejected' } : t))
    );
  };

  const handleAddChapter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChapterTitle) return;

    addChapter({
      subject_id: newChapterSubject,
      chapter_number: chapters.length + 1,
      title: newChapterTitle,
      description: newChapterDesc || 'NCERT aligned chapter unit.'
    });

    setNewChapterTitle('');
    setNewChapterDesc('');
  };

  const pendingApprovalsCount = teachers.filter(t => t.status === 'Pending').length;

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Administrator Header */}
        <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-semibold">
              School Administrator Level
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Academic Administration & Verification Console
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
            Manage teacher publishing approvals, audit educational resources, and control CBSE & State Board academic curricula.
          </p>
        </div>

        {/* Real Platform Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200">
            <span className="text-xs text-slate-500 font-semibold">Pending Teacher Verifications</span>
            <p className="text-2xl font-black text-amber-600 mt-1">{pendingApprovalsCount}</p>
            <p className="text-[10px] text-slate-400 mt-1">Requires review before publishing</p>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-slate-200">
            <span className="text-xs text-slate-500 font-semibold">Total Verified Materials</span>
            <p className="text-2xl font-black text-slate-900 mt-1">{materials.length}</p>
            <p className="text-[10px] text-teal-600 font-semibold mt-1">Class 1 to 12 verified</p>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-slate-200">
            <span className="text-xs text-slate-500 font-semibold">Configured Chapters</span>
            <p className="text-2xl font-black text-slate-900 mt-1">{chapters.length}</p>
            <p className="text-[10px] text-blue-600 font-semibold mt-1">Across 11 subjects</p>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-slate-200">
            <span className="text-xs text-slate-500 font-semibold">Assignments & Tests</span>
            <p className="text-2xl font-black text-slate-900 mt-1">{assignments.length + quizzes.length}</p>
            <p className="text-[10px] text-purple-600 font-semibold mt-1">Evaluated by teachers</p>
          </div>
        </div>

        {/* Teacher Verification Workflow */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-base font-bold text-slate-900">Faculty Verification & Approval Queue</h3>
              <p className="text-xs text-slate-500">
                School policy: Teachers cannot publish learning materials until credentials and assigned classes are approved.
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
              {pendingApprovalsCount} Awaiting Review
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Teacher Name & Email</th>
                  <th className="py-3 px-4">Qualifications</th>
                  <th className="py-3 px-4">Assigned Classes</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Moderation Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {teachers.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50/50">
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-slate-900">{t.name}</p>
                      <p className="text-[10px] text-slate-400">{t.email}</p>
                    </td>
                    <td className="py-3.5 px-4 font-medium">{t.qualification}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded bg-slate-100 font-semibold text-[10px] text-slate-700">
                        {t.requestedClasses}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          t.status === 'Approved'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : t.status === 'Rejected'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        {t.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {t.status === 'Pending' ? (
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleApproveTeacher(t.id)}
                            className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-[10px] transition"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleRejectTeacher(t.id)}
                            className="px-2.5 py-1 bg-rose-100 hover:bg-rose-200 text-rose-700 rounded-lg font-bold text-[10px] transition"
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-[10px] text-slate-400 font-medium">Verified</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Academic Hierarchy Management Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 mb-1">Add Chapter to Board Curriculum</h3>
            <p className="text-xs text-slate-500 mb-4">
              Dynamically populate syllabus units without modifying code.
            </p>

            <form onSubmit={handleAddChapter} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Target Subject</label>
                <select
                  value={newChapterSubject}
                  onChange={(e) => setNewChapterSubject(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-purple-500 focus:outline-none"
                >
                  {subjects.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.name} (Class {s.standard_number})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Chapter Title</label>
                <input
                  type="text"
                  value={newChapterTitle}
                  onChange={(e) => setNewChapterTitle(e.target.value)}
                  placeholder="e.g. Magnetic Effects of Electric Current"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Syllabus Summary</label>
                <input
                  type="text"
                  value={newChapterDesc}
                  onChange={(e) => setNewChapterDesc(e.target.value)}
                  placeholder="Magnetic fields, Fleming's left hand rule, electric motor..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-purple-900 hover:bg-purple-800 text-white font-bold text-xs transition shadow-2xs"
              >
                Add Chapter to Syllabus
              </button>
            </form>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 mb-1">Configured Curriculum Chapters</h3>
            <p className="text-xs text-slate-500 mb-4">Live academic units currently active for students.</p>

            <div className="max-h-64 overflow-y-auto space-y-2 pr-1">
              {chapters.map((ch) => (
                <div key={ch.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center text-xs">
                  <div>
                    <p className="font-bold text-slate-900">
                      Ch {ch.chapter_number}: {ch.title}
                    </p>
                    <p className="text-[10px] text-slate-500">{ch.description}</p>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200">
                    Active
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
