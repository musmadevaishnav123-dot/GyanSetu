import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  BookOpen,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  FileText,
  Video,
  Award,
  ArrowRight,
  ShieldCheck,
  Mail,
  Lock,
  User,
  Phone,
  School,
  Briefcase,
  X,
  Compass,
  Flame,
  Globe2,
  ArrowDown
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  // Active modal/drawer: null | 'student' | 'teacher'
  const [activeLoginModal, setActiveLoginModal] = useState<'student' | 'teacher' | null>(null);
  const [isSignUp, setIsSignUp] = useState(false);

  // Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  // Student Fields
  const [standard, setStandard] = useState(10);
  const [board, setBoard] = useState('CBSE (Central Board)');
  const [schoolName, setSchoolName] = useState('');
  const [parentContact, setParentContact] = useState('');
  const [stream, setStream] = useState('Science (PCM)');
  const [mediumOfStudy, setMediumOfStudy] = useState('English Medium');

  // Teacher Fields
  const [teachingSubject, setTeachingSubject] = useState('Science (Physics/Chemistry)');
  const [experienceYears, setExperienceYears] = useState('5 to 10 Years');
  const [classesTaught, setClassesTaught] = useState<string[]>(['Class 9', 'Class 10']);
  const [qualification, setQualification] = useState('M.Sc / B.Ed');
  const [affiliatedInstitution, setAffiliatedInstitution] = useState('');
  const [stateName, setStateName] = useState('Maharashtra');

  // Clickable Auto-Suggestions
  const boardSuggestions = [
    'CBSE (Central Board)',
    'Maharashtra State Board (MSBSHSE)',
    'ICSE / ISC',
    'UP Board (UPMSP)',
    'Bihar Board (BSEB)',
    'Karnataka Board'
  ];

  const streamSuggestions = ['Science (PCM)', 'Science (PCB)', 'Commerce', 'Arts / Humanities'];
  const mediumSuggestions = ['English Medium', 'Hindi Medium', 'Marathi Medium', 'Regional Medium'];

  const teacherSubjectSuggestions = [
    'Mathematics',
    'Science (Physics)',
    'Science (Chemistry)',
    'Biology',
    'Social Science',
    'English Literature',
    'Computer Science & IT'
  ];

  const experienceSuggestions = ['1 - 3 Years', '3 - 5 Years', '5 - 10 Years', '10+ Years (Senior HOD)'];
  const qualificationSuggestions = ['B.Ed with Graduation', 'M.Sc / M.A with B.Ed', 'Ph.D / Subject Specialist'];
  const indianStates = ['Maharashtra', 'Delhi NCR', 'Uttar Pradesh', 'Karnataka', 'Bihar', 'Gujarat', 'Tamil Nadu', 'Rajasthan'];

  const openAuthModal = (role: 'student' | 'teacher') => {
    setActiveLoginModal(role);
    if (role === 'student') {
      setEmail('vaishnav.student@gyansetu.edu');
      setPassword('student123');
    } else {
      setEmail('dr.sharma@gyansetu.edu');
      setPassword('teacher123');
    }
  };

  const handleClassSelectionToggle = (cls: string) => {
    setClassesTaught(prev =>
      prev.includes(cls) ? prev.filter(c => c !== cls) : [...prev, cls]
    );
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeLoginModal) return;

    login(email, activeLoginModal);

    if (activeLoginModal === 'student') {
      navigate('/student/dashboard');
    } else {
      navigate('/teacher/dashboard');
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-between bg-gradient-to-br from-slate-900 via-slate-900 to-teal-950 text-white overflow-hidden">
      
      {/* Background Decorative Glow Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-teal-500/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />

      {/* Main Full-Height Hero Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 my-auto w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Bold Hero Typography & Direct Action Cards */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-teal-400" />
              <span>National Learning Commons • Standards 1 to 12 across India</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.1]">
              Gyan<span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">Setu</span>
              <span className="block text-2xl sm:text-3xl font-extrabold text-slate-300 mt-2 font-serif italic">
                "Your Bridge to Knowledge"
              </span>
            </h1>

            <p className="text-xs sm:text-sm font-bold tracking-widest text-teal-400 uppercase">
              ज्ञान से सफलता तक
            </p>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
              An open, ad-free educational ecosystem connecting school students with verified teachers across CBSE, State Boards, and ICSE. Experience class-wise notes, conceptual video lessons, assignments, and instant self-scoring quizzes.
            </p>

            {/* Two Interactive Hero Action Portals */}
            <div className="pt-2">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Select Your Access Portal:
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Student Entry Card */}
                <button
                  type="button"
                  onClick={() => openAuthModal('student')}
                  className="group relative p-5 rounded-3xl bg-slate-800/80 hover:bg-slate-800 border-2 border-teal-500/30 hover:border-teal-400 text-left transition-all duration-300 shadow-xl hover:shadow-teal-500/10 hover:-translate-y-1 backdrop-blur-sm"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-2xl bg-teal-500/20 text-teal-300 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded-full border border-teal-500/30">
                      Standard 1–12
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-teal-300 transition">
                    I am a Student
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Access chapter notes, lectures, and practice speed quizzes.
                  </p>
                  <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-teal-400">
                    <span>Enter Student Portal</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>

                {/* Teacher Entry Card */}
                <button
                  type="button"
                  onClick={() => openAuthModal('teacher')}
                  className="group relative p-5 rounded-3xl bg-slate-800/80 hover:bg-slate-800 border-2 border-blue-500/30 hover:border-blue-400 text-left transition-all duration-300 shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 backdrop-blur-sm"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-2xl bg-blue-500/20 text-blue-300 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full border border-blue-500/30">
                      Educator Console
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition">
                    I am a Teacher
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Upload notes, video lectures, homework, and evaluate students.
                  </p>
                  <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-blue-400">
                    <span>Enter Teacher Portal</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="pt-2 flex flex-wrap items-center gap-5 text-xs text-slate-400 font-semibold">
              <span className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-teal-400" /> CBSE, ICSE & State Boards
              </span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-teal-400" /> Free Open Education
              </span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Child Privacy Protected
              </span>
            </div>

          </div>

          {/* Right Column: Visual Showcase Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md bg-slate-800/90 rounded-3xl p-6 shadow-2xl border border-slate-700 backdrop-blur-md space-y-4">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-700/60">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-teal-500 flex items-center justify-center text-slate-950 font-bold">
                    <BookOpen className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">GyanSetu Open Commons</p>
                    <p className="text-[10px] text-teal-400">All India Class 1 to 12</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/30">
                  Live & Active
                </span>
              </div>

              {/* Sample Live Cards */}
              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-700/70 hover:border-teal-400/50 transition">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Class 10 Science</span>
                    <span className="text-[10px] font-semibold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">Video + Notes</span>
                  </div>
                  <p className="text-sm font-bold text-white">Ohm's Law & Circuit Derivations</p>
                  <p className="text-xs text-slate-400 mt-1">Uploaded by Dr. Ramesh Sharma (Sr. PGT)</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-teal-950/40 border border-teal-500/30">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal-300">Active Speed Quiz</span>
                    <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">4 Questions</span>
                  </div>
                  <p className="text-sm font-bold text-white">Electricity & Equivalent Resistance</p>
                  <p className="text-xs text-slate-400 mt-1">Instant scoring with conceptual explanations</p>
                </div>
              </div>

              {/* Bottom Quote Banner */}
              <div className="p-3 rounded-2xl bg-gradient-to-r from-teal-500/20 to-blue-500/20 border border-teal-500/30 text-xs flex items-center justify-between">
                <div>
                  <p className="font-bold text-white">Empowering Indian Education</p>
                  <p className="text-[10px] text-teal-300">Connecting teachers & students nationwide</p>
                </div>
                <Globe2 className="w-5 h-5 text-teal-400" />
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800 bg-slate-950/60 py-3 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} GyanSetu. Built for Students and Teachers of India. ज्ञान से सफलता तक।</p>
      </div>

      {/* ======================================================== */}
      {/* INTERACTIVE POPUP / MODAL LOGIN DIALOG                   */}
      {/* ======================================================== */}
      {activeLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          
          <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-white text-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200">
            
            {/* Close Button */}
            <button
              onClick={() => setActiveLoginModal(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header in Modal */}
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white ${
                activeLoginModal === 'student' ? 'bg-teal-600' : 'bg-blue-600'
              }`}>
                {activeLoginModal === 'student' ? <GraduationCap className="w-6 h-6" /> : <BookOpen className="w-6 h-6" />}
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  {isSignUp ? `Register as ${activeLoginModal === 'student' ? 'Student' : 'Teacher'}` : `${activeLoginModal === 'student' ? 'Student' : 'Teacher'} Portal Login`}
                </h3>
                <p className="text-xs text-slate-500">
                  {isSignUp ? 'Fill your details to create an account' : `Access your personalized ${activeLoginModal} dashboard`}
                </p>
              </div>
            </div>

            {/* Role Switcher in modal */}
            <div className="flex p-1 bg-slate-100 rounded-2xl mb-5">
              <button
                type="button"
                onClick={() => openAuthModal('student')}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
                  activeLoginModal === 'student' ? 'bg-white text-teal-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => openAuthModal('teacher')}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
                  activeLoginModal === 'teacher' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Teacher
              </button>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              
              {/* Common Credentials */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {activeLoginModal === 'student' ? 'Student Email ID' : 'Teacher Email ID'}
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* If Sign Up */}
              {isSignUp && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder={activeLoginModal === 'student' ? 'e.g. Vaishnav Musmade' : 'e.g. Dr. Ramesh Sharma'}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
                      required
                    />
                  </div>
                </div>
              )}

              {/* STUDENT SPECIFIC PROFILE & AUTO-SUGGESTIONS */}
              {activeLoginModal === 'student' && (
                <div className="p-4 rounded-2xl bg-teal-50/40 border border-teal-100 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-teal-900 pb-1 border-b border-teal-200/50">
                    <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                    <span>Grade & Academic Information</span>
                  </div>

                  {/* Standard / Class Selector (1 to 12) */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Select Standard / Class (1 to 12)
                    </label>
                    <div className="grid grid-cols-6 sm:grid-cols-12 gap-1.5">
                      {[...Array(12)].map((_, i) => {
                        const num = i + 1;
                        const isSelected = standard === num;
                        return (
                          <button
                            key={num}
                            type="button"
                            onClick={() => setStandard(num)}
                            className={`py-2 text-xs font-bold rounded-xl transition ${
                              isSelected
                                ? 'bg-teal-600 text-white shadow-xs'
                                : 'bg-white border border-slate-200 text-slate-700 hover:border-teal-300'
                            }`}
                          >
                            {num}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* If Standard 11 or 12: Stream */}
                  {standard >= 11 && (
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Academic Stream (Class 11 & 12)
                      </label>
                      <input
                        type="text"
                        value={stream}
                        onChange={(e) => setStream(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none mb-1.5"
                      />
                      <div className="flex flex-wrap gap-1.5">
                        {streamSuggestions.map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setStream(s)}
                            className="px-2 py-0.5 rounded-full text-[10px] bg-white border border-teal-200 text-teal-800 hover:bg-teal-50 font-medium"
                          >
                            + {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Education Board */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Education Board
                    </label>
                    <input
                      type="text"
                      value={board}
                      onChange={(e) => setBoard(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none mb-1.5"
                    />
                    <div className="flex flex-wrap gap-1.5">
                      {boardSuggestions.map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setBoard(b)}
                          className={`px-2 py-0.5 rounded-full text-[10px] border transition ${
                            board === b
                              ? 'bg-teal-600 text-white border-teal-600 font-semibold'
                              : 'bg-white border-slate-200 text-slate-600 hover:border-teal-300'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Parent Mobile & School */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Parent Contact Number
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                        <input
                          type="tel"
                          value={parentContact}
                          onChange={(e) => setParentContact(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        School Name
                      </label>
                      <div className="relative">
                        <School className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                        <input
                          type="text"
                          value={schoolName}
                          onChange={(e) => setSchoolName(e.target.value)}
                          placeholder="e.g. Kendriya Vidyalaya"
                          className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Medium */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Medium of Study
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {mediumSuggestions.map((m) => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => setMediumOfStudy(m)}
                          className={`px-2.5 py-1 rounded-xl text-xs border font-medium transition ${
                            mediumOfStudy === m
                              ? 'bg-teal-600 text-white border-teal-600 shadow-2xs'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TEACHER SPECIFIC PROFILE & AUTO-SUGGESTIONS */}
              {activeLoginModal === 'teacher' && (
                <div className="p-4 rounded-2xl bg-blue-50/40 border border-blue-100 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-900 pb-1 border-b border-blue-200/50">
                    <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                    <span>Educator Qualifications & Subject Specialization</span>
                  </div>

                  {/* Teaching Subject */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Teaching Subject
                    </label>
                    <input
                      type="text"
                      value={teachingSubject}
                      onChange={(e) => setTeachingSubject(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none mb-1.5"
                      required
                    />
                    <div className="flex flex-wrap gap-1.5">
                      {teacherSubjectSuggestions.map((sub) => (
                        <button
                          key={sub}
                          type="button"
                          onClick={() => setTeachingSubject(sub)}
                          className={`px-2 py-0.5 rounded-full text-[10px] border transition ${
                            teachingSubject === sub
                              ? 'bg-blue-600 text-white border-blue-600 font-semibold'
                              : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300'
                          }`}
                        >
                          {sub}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Teaching Experience */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Teaching Experience
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {experienceSuggestions.map((exp) => (
                        <button
                          key={exp}
                          type="button"
                          onClick={() => setExperienceYears(exp)}
                          className={`p-2 rounded-xl text-left text-xs border transition ${
                            experienceYears === exp
                              ? 'bg-blue-600 text-white border-blue-600 font-bold'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {exp}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Classes Taught Multi-Select */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Classes Taught (Click to select multiple)
                    </label>
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-1.5">
                      {[...Array(12)].map((_, i) => {
                        const cName = `Class ${i + 1}`;
                        const isChecked = classesTaught.includes(cName);
                        return (
                          <button
                            key={cName}
                            type="button"
                            onClick={() => handleClassSelectionToggle(cName)}
                            className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition ${
                              isChecked
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                            }`}
                          >
                            {cName}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Qualifications */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Highest Qualification
                    </label>
                    <input
                      type="text"
                      value={qualification}
                      onChange={(e) => setQualification(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none mb-1.5"
                    />
                    <div className="flex flex-wrap gap-1.5">
                      {qualificationSuggestions.map((q) => (
                        <button
                          key={q}
                          type="button"
                          onClick={() => setQualification(q)}
                          className="px-2 py-0.5 rounded-full text-[10px] bg-white border border-blue-200 text-blue-800 hover:bg-blue-50 font-medium"
                        >
                          + {q}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Affiliation & State */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Current Institution
                      </label>
                      <input
                        type="text"
                        value={affiliatedInstitution}
                        onChange={(e) => setAffiliatedInstitution(e.target.value)}
                        placeholder="e.g. St. Xavier's High School"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">State</label>
                      <select
                        value={stateName}
                        onChange={(e) => setStateName(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      >
                        {indianStates.map(st => (
                          <option key={st} value={st}>{st}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className={`w-full py-3.5 rounded-2xl font-bold text-xs text-white shadow-md transition flex items-center justify-center gap-2 ${
                  activeLoginModal === 'student'
                    ? 'bg-slate-900 hover:bg-slate-800'
                    : 'bg-blue-700 hover:bg-blue-800'
                }`}
              >
                <span>{isSignUp ? `Complete ${activeLoginModal} Registration` : `Login to ${activeLoginModal} Dashboard`}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Toggle Sign in vs Register */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="font-bold text-teal-600 hover:underline"
              >
                {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Register now"}
              </button>

              <button
                type="button"
                onClick={() => openAuthModal(activeLoginModal === 'student' ? 'student' : 'teacher')}
                className="text-[11px] text-slate-400 hover:text-slate-600"
              >
                Fast Demo Fill
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
