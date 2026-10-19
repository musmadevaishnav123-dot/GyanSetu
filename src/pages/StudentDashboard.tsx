import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAcademic } from '../context/AcademicContext';
import {
  BookOpen,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Clock,
  CheckCircle,
  FileText,
  Video,
  Award,
  Bell,
  Search,
  Bookmark as BookmarkIcon,
  Flame,
  ChevronRight,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const {
    subjects,
    materials,
    assignments,
    quizzes,
    announcements,
    bookmarks,
    completedLessons,
    toggleCompleteLesson,
    toggleBookmark
  } = useAcademic();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStandard, setSelectedStandard] = useState<number>(user?.standard || 10);
  const [selectedBoard, setSelectedBoard] = useState<string>(user?.board || 'CBSE');

  // Filter subjects for standard
  const studentSubjects = subjects.filter(
    s => s.standard_number === selectedStandard && s.board_id === 'b_cbse'
  );

  // Filter materials for this standard
  const filteredMaterials = materials.filter(m => {
    const matchesStd = m.standard === selectedStandard;
    const matchesSearch =
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStd && (searchQuery ? matchesSearch : true);
  });

  // Calculate progress
  const totalStandardMaterials = materials.filter(m => m.standard === selectedStandard).length;
  const completedCount = completedLessons.filter(id =>
    materials.some(m => m.id === id && m.standard === selectedStandard)
  ).length;
  const progressPercent = totalStandardMaterials > 0 ? Math.round((completedCount / totalStandardMaterials) * 100) : 0;

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Welcome & Persona Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-teal-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-semibold">
                  {selectedBoard} • Class {selectedStandard}
                </span>
                <span className="flex items-center gap-1 text-amber-300 text-xs font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> 4-Day Learning Streak!
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Namaste, {user?.name || 'Student'}! 👋
              </h1>
              <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
                Ready for today's learning? You have 2 upcoming assignments and 1 practice quiz due this week.
              </p>
            </div>

            {/* Quick Class Switcher for testing standards 1-12 */}
            <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20 text-xs">
              <label className="block text-slate-300 text-[10px] uppercase font-bold mb-1">
                Browse Standard:
              </label>
              <select
                value={selectedStandard}
                onChange={(e) => setSelectedStandard(Number(e.target.value))}
                className="bg-slate-900 text-white rounded-lg px-3 py-1.5 border border-slate-700 font-semibold focus:outline-none focus:border-teal-400"
              >
                {[...Array(12)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    Standard {i + 1} ({i < 5 ? 'Primary' : i < 8 ? 'Middle' : i < 10 ? 'Secondary' : 'Sr. Secondary'})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Academic Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-slate-500 font-semibold">Overall Progress</span>
              <div className="p-2 rounded-xl bg-teal-50 text-teal-600">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-black text-slate-900">{progressPercent}%</p>
            <div className="w-full bg-slate-100 rounded-full h-1.5 mt-3">
              <div
                className="bg-teal-600 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="text-[10px] text-slate-400 mt-2">{completedCount} of {totalStandardMaterials} topics completed</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-slate-500 font-semibold">Active Subjects</span>
              <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                <BookOpen className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-black text-slate-900">{studentSubjects.length || 5}</p>
            <p className="text-[10px] text-slate-400 mt-2">Class {selectedStandard} CBSE Curriculum</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-slate-500 font-semibold">Pending Homework</span>
              <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
                <FileText className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-black text-slate-900">{assignments.length}</p>
            <p className="text-[10px] text-amber-600 font-semibold mt-2">Earliest due in 3 days</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-slate-500 font-semibold">Saved Bookmarks</span>
              <div className="p-2 rounded-xl bg-rose-50 text-rose-600">
                <BookmarkIcon className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-black text-slate-900">{bookmarks.length}</p>
            <p className="text-[10px] text-slate-400 mt-2">Revision materials saved</p>
          </div>
        </div>

        {/* Global Academic Search Bar */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search chapters, topics (e.g., Ohm's law, chemical equations, real numbers)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm text-slate-800"
            />
          </div>
        </div>

        {/* Teacher Announcements Banner */}
        {announcements.length > 0 && (
          <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-amber-100 rounded-xl text-amber-700">
                <Bell className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider">Teacher Announcement</h4>
                <p className="text-sm font-semibold text-slate-900 mt-0.5">{announcements[0].title}</p>
                <p className="text-xs text-slate-600 mt-1">{announcements[0].content}</p>
                <p className="text-[10px] text-slate-400 mt-1.5">— {announcements[0].author_name}</p>
              </div>
            </div>
          </div>
        )}

        {/* My Subjects Grid */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">My Subjects</h2>
              <p className="text-xs text-slate-500">Standard {selectedStandard} CBSE curriculum syllabus</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {studentSubjects.map((sub) => (
              <Link
                key={sub.id}
                to={`/student/subject/${sub.id}`}
                className="group p-5 rounded-2xl bg-white border border-slate-200 hover:border-teal-400 hover:shadow-md transition relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      {sub.code}
                    </span>
                    <span className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
                      5 Chapters
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-600 transition">
                    {sub.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Class {sub.standard_number} NCERT & School Syllabus
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-teal-600 font-semibold">
                  <span>Open Chapters</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recently Added Study Materials / Content Hierarchy */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Class Learning Materials</h2>
              <p className="text-xs text-slate-500">Notes, video lectures, and revision guides uploaded by teachers</p>
            </div>
          </div>

          {filteredMaterials.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-300">
              <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-700">No learning materials found for this search.</p>
              <p className="text-xs text-slate-500 mt-1">Try another keyword or select Standard 10 to see verified seed curriculum.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMaterials.map((mat) => {
                const isCompleted = completedLessons.includes(mat.id);
                const isBookmarked = bookmarks.some(b => b.material_id === mat.id);

                return (
                  <div
                    key={mat.id}
                    className="p-5 rounded-2xl bg-white border border-slate-200 hover:shadow-md transition flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          mat.material_type === 'video' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                          mat.material_type === 'pdf' ? 'bg-red-50 text-red-700 border border-red-200' :
                          'bg-teal-50 text-teal-700 border border-teal-200'
                        }`}>
                          {mat.material_type === 'video' ? <Video className="w-3 h-3" /> : <FileText className="w-3 h-3" />}
                          <span className="uppercase">{mat.material_type}</span>
                        </span>

                        <button
                          onClick={() => toggleBookmark(mat)}
                          className={`p-1 rounded-md transition ${isBookmarked ? 'text-teal-600 bg-teal-50' : 'text-slate-400 hover:text-slate-600'}`}
                          title="Bookmark"
                        >
                          <BookmarkIcon className={`w-4 h-4 ${isBookmarked ? 'fill-teal-600' : ''}`} />
                        </button>
                      </div>

                      <h4 className="text-sm font-bold text-slate-900 line-clamp-2 mt-1">
                        {mat.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                        {mat.description}
                      </p>

                      <p className="text-[10px] text-slate-400 mt-3">
                        By {mat.author_name} • {mat.duration || 'Study guide'}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => toggleCompleteLesson(mat.id)}
                        className={`text-xs font-semibold flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition ${
                          isCompleted
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        <CheckCircle className={`w-3.5 h-3.5 ${isCompleted ? 'text-emerald-600 fill-emerald-100' : ''}`} />
                        <span>{isCompleted ? 'Completed' : 'Mark Done'}</span>
                      </button>

                      <Link
                        to={`/student/material/${mat.id}`}
                        className="text-xs font-bold text-teal-600 hover:text-teal-800 flex items-center gap-1"
                      >
                        Study Now <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Assignments & Quizzes Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Assignments */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Upcoming Assignments</h3>
                <p className="text-xs text-slate-500">School homework and subjective problems</p>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                {assignments.length} Active
              </span>
            </div>

            <div className="space-y-3">
              {assignments.map(asg => (
                <div key={asg.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex justify-between items-center">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{asg.title}</h4>
                    <p className="text-[10px] text-slate-500 mt-0.5">Teacher: {asg.teacher_name} • Max Marks: {asg.max_marks}</p>
                    <p className="text-[10px] text-amber-700 font-semibold mt-1">Due: {new Date(asg.due_date).toLocaleDateString()}</p>
                  </div>
                  <Link
                    to={`/student/assignment/${asg.id}`}
                    className="text-xs font-bold px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white shadow-2xs"
                  >
                    Submit
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Practice Quizzes & Mock Tests */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Practice Quizzes & Tests</h3>
                <p className="text-xs text-slate-500">MCQ speed tests with instant explanations</p>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                {quizzes.length} Available
              </span>
            </div>

            <div className="space-y-3">
              {quizzes.map(quiz => (
                <div key={quiz.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex justify-between items-center">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{quiz.title}</h4>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      {quiz.questions.length} Questions • {quiz.time_limit_minutes} Mins • Max Attempts: {quiz.max_attempts}
                    </p>
                    <p className="text-[10px] text-emerald-600 font-semibold mt-1">Instant Grading Available</p>
                  </div>
                  <Link
                    to={`/student/quiz/${quiz.id}`}
                    className="text-xs font-bold px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white shadow-2xs"
                  >
                    Start Quiz
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
