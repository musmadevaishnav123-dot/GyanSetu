import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
  Users,
  Compass,
  Layers,
  ChevronRight,
  HelpCircle,
  Mail,
  Lock,
  User,
  Phone,
  School,
  Briefcase
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  // Selected Role for the Embedded Login / Registration below
  const [selectedRole, setSelectedRole] = useState<'student' | 'teacher'>('student');
  const [isSignUp, setIsSignUp] = useState(false);

  // Form States
  const [email, setEmail] = useState('vaishnav.student@gyansetu.edu');
  const [password, setPassword] = useState('student123');
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

  const experienceSuggestions = [
    '1 - 3 Years',
    '3 - 5 Years',
    '5 - 10 Years',
    '10+ Years (Senior HOD)'
  ];

  const qualificationSuggestions = [
    'B.Ed with Graduation',
    'M.Sc / M.A with B.Ed',
    'Ph.D / Subject Specialist'
  ];

  const indianStates = [
    'Maharashtra',
    'Delhi NCR',
    'Uttar Pradesh',
    'Karnataka',
    'Bihar',
    'Gujarat',
    'Tamil Nadu',
    'Rajasthan'
  ];

  const handleRoleToggle = (role: 'student' | 'teacher') => {
    setSelectedRole(role);
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
    login(email, selectedRole);

    if (selectedRole === 'student') {
      navigate('/student/dashboard');
    } else {
      navigate('/teacher/dashboard');
    }
  };

  const scrollToAuth = (role: 'student' | 'teacher') => {
    handleRoleToggle(role);
    const element = document.getElementById('login-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      
      {/* ======================================================== */}
      {/* 1. SHORT APP INFORMATION & HERO SECTION                  */}
      {/* ======================================================== */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-16 lg:pb-20 border-b border-slate-200 bg-gradient-to-b from-white via-slate-50 to-teal-50/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold">
                <Sparkles className="w-4 h-4 text-teal-600" />
                <span>All-India National Learning Commons • Standards 1 to 12</span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
                Gyan<span className="text-teal-600">Setu</span> — Your Bridge to Knowledge.
              </h1>

              <p className="text-sm font-bold text-teal-700 tracking-wide uppercase">
                ज्ञान से सफलता तक
              </p>

              <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-xl">
                A centralized, ad-free educational platform uniting school students and verified educators from across India. Access class-wise NCERT notes, video lessons, homework assignments, and self-scoring quizzes for CBSE, State Boards, and ICSE.
              </p>

              {/* Quick Jump Buttons to Login Options Below */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => scrollToAuth('student')}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs text-white bg-slate-900 hover:bg-slate-800 shadow-md transition"
                >
                  <GraduationCap className="w-4 h-4 text-teal-400" />
                  <span>Login as Student</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => scrollToAuth('teacher')}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs text-slate-800 bg-white hover:bg-slate-100 border border-slate-300 shadow-2xs transition"
                >
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  <span>Login as Teacher</span>
                </button>
              </div>

              {/* Highlights */}
              <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center gap-5 text-xs text-slate-600 font-semibold">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Standards 1–12
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> CBSE & State Boards
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Verified Teachers Only
                </span>
              </div>
            </div>

            {/* Right Card: Quick Feature Highlights */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200 space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-slate-900 to-teal-600 flex items-center justify-center text-white">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">What GyanSetu Delivers</h3>
                    <p className="text-[11px] text-slate-500">Every resource verified & class-aligned</p>
                  </div>
                </div>

                <div className="space-y-2.5 text-xs text-slate-700">
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                    <FileText className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-slate-900">NCERT & Board Notes (PDF)</p>
                      <p className="text-[11px] text-slate-500">Structured chapter summaries, derivations & formulas.</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                    <Video className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-slate-900">Expert Video Lectures</p>
                      <p className="text-[11px] text-slate-500">Concept breakdowns by certified school educators.</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                    <Award className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-slate-900">Self-Scoring Quizzes & Homework</p>
                      <p className="text-[11px] text-slate-500">Instant explanations, marks tracking, and feedback.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. DEDICATED LOGIN / REGISTRATION SECTION RIGHT BELOW     */}
      {/* ======================================================== */}
      <section id="login-section" className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <div className="text-center space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
              Direct Portal Access
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Sign In to GyanSetu
            </h2>
            <p className="text-xs text-slate-500">
              Select whether you are a Student or a Teacher to continue
            </p>
          </div>

          {/* THE TWO OPTIONS: STUDENT VS TEACHER */}
          <div className="grid grid-cols-2 gap-4">
            {/* Option 1: Student */}
            <button
              type="button"
              onClick={() => handleRoleToggle('student')}
              className={`p-5 rounded-3xl border-2 text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                selectedRole === 'student'
                  ? 'border-teal-500 bg-white shadow-lg ring-4 ring-teal-500/10'
                  : 'border-slate-200 bg-white/70 hover:border-slate-300 text-slate-500'
              }`}
            >
              {selectedRole === 'student' && (
                <div className="absolute top-3 right-3 text-teal-600">
                  <CheckCircle2 className="w-5 h-5 fill-teal-50 text-teal-600" />
                </div>
              )}
              <div className="w-10 h-10 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-700 mb-3">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">I am a Student</h3>
                <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                  Standards 1 to 12 • Access notes, videos & tests
                </p>
              </div>
            </button>

            {/* Option 2: Teacher */}
            <button
              type="button"
              onClick={() => handleRoleToggle('teacher')}
              className={`p-5 rounded-3xl border-2 text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                selectedRole === 'teacher'
                  ? 'border-blue-600 bg-white shadow-lg ring-4 ring-blue-600/10'
                  : 'border-slate-200 bg-white/70 hover:border-slate-300 text-slate-500'
              }`}
            >
              {selectedRole === 'teacher' && (
                <div className="absolute top-3 right-3 text-blue-600">
                  <CheckCircle2 className="w-5 h-5 fill-blue-50 text-blue-600" />
                </div>
              )}
              <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-700 mb-3">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">I am a Teacher</h3>
                <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                  Educators & Tutors • Upload materials & create quizzes
                </p>
              </div>
            </button>
          </div>

          {/* DYNAMIC FORM CARD WITH DETAILED FIELDS & AUTO-SUGGESTIONS */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {isSignUp ? `New ${selectedRole === 'student' ? 'Student' : 'Teacher'} Registration` : `${selectedRole === 'student' ? 'Student' : 'Teacher'} Login`}
                </h3>
                <p className="text-xs text-slate-500">
                  {isSignUp ? 'Provide your academic details below' : `Access your ${selectedRole} dashboard`}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-xs font-bold text-teal-600 hover:text-teal-800"
              >
                {isSignUp ? 'Already registered? Log In' : 'New user? Complete Sign Up'}
              </button>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              
              {/* Common Credentials */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {selectedRole === 'student' ? 'Student Email ID' : 'Teacher Email ID'}
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
                      placeholder={selectedRole === 'student' ? 'e.g. Vaishnav Musmade' : 'e.g. Dr. Ramesh Sharma'}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
                      required
                    />
                  </div>
                </div>
              )}

              {/* STUDENT SPECIFIC PROFILE & AUTO-SUGGESTIONS */}
              {selectedRole === 'student' && (
                <div className="p-4 rounded-2xl bg-teal-50/40 border border-teal-100 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-teal-900 pb-1 border-b border-teal-200/50">
                    <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                    <span>Student Grade & Academic Details</span>
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
              {selectedRole === 'teacher' && (
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
                  selectedRole === 'student'
                    ? 'bg-slate-900 hover:bg-slate-800'
                    : 'bg-blue-700 hover:bg-blue-800'
                }`}
              >
                <span>{isSignUp ? `Complete ${selectedRole} Registration` : `Login to ${selectedRole} Dashboard`}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Quick Demo Pre-fills */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span>Fast Demo Sign-In:</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleRoleToggle('student')}
                  className="text-teal-700 hover:underline font-semibold"
                >
                  Sample Student
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => handleRoleToggle('teacher')}
                  className="text-blue-700 hover:underline font-semibold"
                >
                  Sample Teacher
                </button>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/60 border border-slate-200 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Compliant with Indian Child Privacy Regulations & Verified Teacher Standards</span>
          </div>

        </div>
      </section>

    </div>
  );
};
