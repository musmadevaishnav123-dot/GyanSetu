import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useAcademic } from '../context/AcademicContext';
import {
  UploadCloud,
  FilePlus,
  BookOpen,
  Users,
  CheckCircle2,
  Clock,
  Sparkles,
  Layers,
  FileText,
  Video,
  Trash2,
  Edit3,
  Send,
  Eye,
  AlertTriangle
} from 'lucide-react';
import { MaterialType } from '../types';

export const TeacherDashboard: React.FC = () => {
  const { user } = useAuth();
  const {
    materials,
    assignments,
    submissions,
    quizzes,
    addMaterial,
    deleteMaterial,
    addAssignment,
    addQuiz,
    addAnnouncement,
    gradeSubmission,
    subjects
  } = useAcademic();

  const [activeTab, setActiveTab] = useState<'overview' | 'upload' | 'assignment' | 'quiz' | 'submissions'>('overview');

  // Form states for Upload Learning Material
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [board, setBoard] = useState('CBSE');
  const [standard, setStandard] = useState(10);
  const [subjectId, setSubjectId] = useState('sub_c10_sci');
  const [chapterId, setChapterId] = useState('ch_c10_sci_4');
  const [materialType, setMaterialType] = useState<MaterialType>('pdf');
  const [externalUrl, setExternalUrl] = useState('');
  const [duration, setDuration] = useState('15 mins');
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Quick announcement state
  const [announcementText, setAnnouncementText] = useState('');
  const [announcementTitle, setAnnouncementTitle] = useState('');
  const [announcementSent, setAnnouncementSent] = useState(false);

  // New assignment form state
  const [asgTitle, setAsgTitle] = useState('');
  const [asgDesc, setAsgDesc] = useState('');
  const [asgMarks, setAsgMarks] = useState(20);
  const [asgDueDate, setAsgDueDate] = useState('2026-11-05');

  // Grading state
  const [gradingMarks, setGradingMarks] = useState<Record<string, number>>({});
  const [gradingFeedback, setGradingFeedback] = useState<Record<string, string>>({});

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    addMaterial({
      title,
      description,
      board,
      standard,
      subject_id: subjectId,
      chapter_id: chapterId,
      material_type: materialType,
      external_url: externalUrl,
      duration,
      author_id: user?.id || 't_sharma',
      author_name: user?.name || 'Dr. Ramesh Sharma',
      language: 'English',
      is_published: true
    });

    setUploadSuccess(true);
    setTitle('');
    setDescription('');
    setExternalUrl('');
    setTimeout(() => setUploadSuccess(false), 3000);
  };

  const handleAnnouncementSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!announcementTitle || !announcementText) return;

    addAnnouncement({
      title: announcementTitle,
      content: announcementText,
      board: 'CBSE',
      standard: 10,
      author_name: user?.name || 'Dr. Ramesh Sharma',
      author_role: 'teacher'
    });

    setAnnouncementSent(true);
    setAnnouncementTitle('');
    setAnnouncementText('');
    setTimeout(() => setAnnouncementSent(false), 3000);
  };

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!asgTitle || !asgDesc) return;

    addAssignment({
      title: asgTitle,
      description: asgDesc,
      board: 'CBSE',
      standard: 10,
      subject_id: 'sub_c10_sci',
      chapter_id: 'ch_c10_sci_4',
      due_date: new Date(asgDueDate).toISOString(),
      max_marks: Number(asgMarks),
      teacher_id: user?.id || 't_sharma',
      teacher_name: user?.name || 'Dr. Ramesh Sharma',
      is_published: true
    });

    setAsgTitle('');
    setAsgDesc('');
    setActiveTab('overview');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Teacher Workstation Header */}
        <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
                Verified Faculty (Administrator Approved)
              </span>
              <span className="text-slate-400 text-xs">Assigned Classes: 9, 10, 11, 12</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-2">
              Teacher Workstation — {user?.name || 'Dr. Ramesh Sharma'}
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1">
              Publish learning notes, video resources, manage homework, and evaluate student submissions.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('upload')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-md transition"
            >
              <UploadCloud className="w-4 h-4" />
              <span>Upload Material</span>
            </button>
            <button
              onClick={() => setActiveTab('assignment')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition"
            >
              <FilePlus className="w-4 h-4" />
              <span>New Assignment</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 gap-4 text-xs font-bold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-3 px-1 border-b-2 transition ${activeTab === 'overview' ? 'border-teal-600 text-teal-700' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
          >
            Overview & Materials
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`pb-3 px-1 border-b-2 transition ${activeTab === 'upload' ? 'border-teal-600 text-teal-700' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
          >
            Upload Learning Material
          </button>
          <button
            onClick={() => setActiveTab('assignment')}
            className={`pb-3 px-1 border-b-2 transition ${activeTab === 'assignment' ? 'border-teal-600 text-teal-700' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
          >
            Create Assignment
          </button>
          <button
            onClick={() => setActiveTab('submissions')}
            className={`pb-3 px-1 border-b-2 transition ${activeTab === 'submissions' ? 'border-teal-600 text-teal-700' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
          >
            Student Submissions ({submissions.length})
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-slate-200">
                <span className="text-xs text-slate-500 font-semibold">Total Resources Published</span>
                <p className="text-2xl font-black text-slate-900 mt-1">{materials.length}</p>
                <p className="text-[10px] text-teal-600 font-semibold mt-1">Class 10 CBSE Science & Math</p>
              </div>
              <div className="p-5 rounded-2xl bg-white border border-slate-200">
                <span className="text-xs text-slate-500 font-semibold">Active Assignments</span>
                <p className="text-2xl font-black text-slate-900 mt-1">{assignments.length}</p>
                <p className="text-[10px] text-amber-600 font-semibold mt-1">Pending student submissions</p>
              </div>
              <div className="p-5 rounded-2xl bg-white border border-slate-200">
                <span className="text-xs text-slate-500 font-semibold">Live Quizzes</span>
                <p className="text-2xl font-black text-slate-900 mt-1">{quizzes.length}</p>
                <p className="text-[10px] text-blue-600 font-semibold mt-1">Self-grading MCQ tests</p>
              </div>
              <div className="p-5 rounded-2xl bg-white border border-slate-200">
                <span className="text-xs text-slate-500 font-semibold">Authorized Standard Range</span>
                <p className="text-2xl font-black text-slate-900 mt-1">Class 9–12</p>
                <p className="text-[10px] text-purple-600 font-semibold mt-1">CBSE Board Verified</p>
              </div>
            </div>

            {/* Quick Broadcast Announcement Box */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200">
              <h3 className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-2">
                <Send className="w-4 h-4 text-teal-600" />
                <span>Broadcast Quick Class Announcement</span>
              </h3>
              <p className="text-xs text-slate-500 mb-4">Post reminders or exam schedules directly to student dashboards.</p>

              {announcementSent && (
                <div className="mb-4 p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
                  Announcement broadcasted successfully to all Standard 10 students!
                </div>
              )}

              <form onSubmit={handleAnnouncementSubmit} className="space-y-3">
                <input
                  type="text"
                  value={announcementTitle}
                  onChange={(e) => setAnnouncementTitle(e.target.value)}
                  placeholder="Subject / Title (e.g. Science Chapter 4 Revision Class)"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  required
                />
                <textarea
                  value={announcementText}
                  onChange={(e) => setAnnouncementText(e.target.value)}
                  placeholder="Write announcement message for your students..."
                  rows={2}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 transition"
                >
                  Post Announcement
                </button>
              </form>
            </div>

            {/* Content Library & Management */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-base font-bold text-slate-900">My Uploaded Materials Library</h3>
                  <p className="text-xs text-slate-500">Edit or delete your published learning materials</p>
                </div>
              </div>

              <div className="divide-y divide-slate-100">
                {materials.map((m) => (
                  <div key={m.id} className="py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-200 uppercase">
                          {m.material_type}
                        </span>
                        <span className="text-[10px] text-slate-500 font-semibold">
                          Class {m.standard} • {m.board}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900">{m.title}</h4>
                      <p className="text-xs text-slate-500 line-clamp-1">{m.description}</p>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <button
                        onClick={() => deleteMaterial(m.id)}
                        className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition"
                        title="Delete material"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: UPLOAD MATERIAL FORM */}
        {activeTab === 'upload' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm max-w-3xl mx-auto">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-900">Upload Learning Material</h2>
              <p className="text-xs text-slate-500 mt-1">
                Attach academic resources strictly mapped to the Board, Class, Subject, and Chapter hierarchy.
              </p>
            </div>

            {uploadSuccess && (
              <div className="mb-6 p-4 rounded-2xl bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Resource published successfully! It is now visible on student class dashboards.</span>
              </div>
            )}

            <form onSubmit={handleUploadSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Education Board</label>
                  <select
                    value={board}
                    onChange={(e) => setBoard(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  >
                    <option value="CBSE">Central Board of Secondary Education (CBSE)</option>
                    <option value="MSBSHSE">Maharashtra State Board</option>
                    <option value="ICSE">ICSE Board</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Standard / Class</label>
                  <select
                    value={standard}
                    onChange={(e) => setStandard(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  >
                    {[...Array(12)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>Standard {i + 1}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Learning Material Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Electric Current & Ohm's Law Comprehensive Notes"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Pedagogical Description / Instructions</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Explain key concepts covered, formulas to remember, or reading instructions..."
                  rows={3}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Resource Type</label>
                  <select
                    value={materialType}
                    onChange={(e) => setMaterialType(e.target.value as MaterialType)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  >
                    <option value="pdf">PDF Document / Notes</option>
                    <option value="video">Educational Video (YouTube / MP4)</option>
                    <option value="note">Markdown / Text Lesson</option>
                    <option value="document">Presentation / Worksheet</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Estimated Reading / Watch Time</label>
                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="e.g. 15 mins or 8 Pages"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Resource File Link or Video Embed URL
                </label>
                <input
                  type="url"
                  value={externalUrl}
                  onChange={(e) => setExternalUrl(e.target.value)}
                  placeholder="https://... (or leave blank to use default safe sample document)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTab('overview')}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold text-xs hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition"
                >
                  Publish Material to Class
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 3: CREATE ASSIGNMENT */}
        {activeTab === 'assignment' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm max-w-3xl mx-auto">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-900">Create New Class Assignment</h2>
              <p className="text-xs text-slate-500 mt-1">Assign homework or subjective numerical worksheets.</p>
            </div>

            <form onSubmit={handleCreateAssignment} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Assignment Title</label>
                <input
                  type="text"
                  value={asgTitle}
                  onChange={(e) => setAsgTitle(e.target.value)}
                  placeholder="e.g. Chapter 4 Circuit Diagram Numerical Practice"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Instructions</label>
                <textarea
                  value={asgDesc}
                  onChange={(e) => setAsgDesc(e.target.value)}
                  placeholder="Specify problem numbers, requirements, formatting rules..."
                  rows={3}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Maximum Marks</label>
                  <input
                    type="number"
                    value={asgMarks}
                    onChange={(e) => setAsgMarks(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Submission Deadline</label>
                  <input
                    type="date"
                    value={asgDueDate}
                    onChange={(e) => setAsgDueDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTab('overview')}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold text-xs hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition"
                >
                  Create & Assign
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 4: STUDENT SUBMISSIONS & GRADING */}
        {activeTab === 'submissions' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 mb-1">Student Assignment Submissions</h3>
            <p className="text-xs text-slate-500 mb-6">Review homework uploads and provide marks and feedback.</p>

            {submissions.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-slate-200 rounded-2xl">
                <Clock className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-xs font-semibold text-slate-700">No submissions received yet.</p>
                <p className="text-[10px] text-slate-500 mt-1">Switch to Student mode to submit an assignment.</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {submissions.map((sub) => (
                  <div key={sub.id} className="py-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{sub.student_name}</h4>
                        <p className="text-[10px] text-slate-500">Submitted at: {new Date(sub.submitted_at).toLocaleString()}</p>
                      </div>
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
                        Status: {sub.status}
                      </span>
                    </div>

                    <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
                      "{sub.content}"
                    </p>

                    <div className="flex items-center gap-3 pt-1">
                      <input
                        type="number"
                        placeholder="Marks"
                        value={gradingMarks[sub.id] ?? (sub.marks_obtained || '')}
                        onChange={(e) => setGradingMarks({ ...gradingMarks, [sub.id]: Number(e.target.value) })}
                        className="w-24 px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs"
                      />
                      <input
                        type="text"
                        placeholder="Teacher Feedback..."
                        value={gradingFeedback[sub.id] ?? (sub.feedback || '')}
                        onChange={(e) => setGradingFeedback({ ...gradingFeedback, [sub.id]: e.target.value })}
                        className="flex-1 px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs"
                      />
                      <button
                        onClick={() => {
                          const m = gradingMarks[sub.id] ?? 20;
                          const f = gradingFeedback[sub.id] ?? 'Well done, neat presentation.';
                          gradeSubmission(sub.id, m, f);
                        }}
                        className="px-3.5 py-1.5 rounded-lg bg-teal-600 text-white font-bold text-xs hover:bg-teal-700 transition"
                      >
                        Save Grade
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
