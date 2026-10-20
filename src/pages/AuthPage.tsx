import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  BookOpen,
  GraduationCap,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Lock,
  Mail,
  User,
  Phone,
  School,
  MapPin,
  Calendar,
  Briefcase,
  Layers,
  Sparkles
} from 'lucide-react';

export const AuthPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Mode: 'student' or 'teacher'
  const initialRole = searchParams.get('role') === 'teacher' ? 'teacher' : 'student';
  const [selectedRole, setSelectedRole] = useState<'student' | 'teacher'>(initialRole);
  const [isSignUp, setIsSignUp] = useState(false);

  // Common Fields
  const [email, setEmail] = useState('vaishnav.student@gyansetu.edu');
  const [password, setPassword] = useState('student123');
  const [fullName, setFullName] = useState('');

  // Student Comprehensive Fields
  const [standard, setStandard] = useState(10);
  const [board, setBoard] = useState('CBSE (Central Board)');
  const [schoolName, setSchoolName] = useState('');
  const [parentContact, setParentContact] = useState('');
  const [stream, setStream] = useState('Science'); // For 11 & 12
  const [mediumOfStudy, setMediumOfStudy] = useState('English');
  const [studentCity, setStudentCity] = useState('');

  // Teacher Comprehensive Fields
  const [teachingSubject, setTeachingSubject] = useState('Science (Physics/Chemistry)');
  const [experienceYears, setExperienceYears] = useState('5 to 10 Years');
  const [classesTaught, setClassesTaught] = useState<string[]>(['Class 9', 'Class 10']);
  const [qualification, setQualification] = useState('M.Sc / B.Ed');
  const [affiliatedInstitution, setAffiliatedInstitution] = useState('');
  const [stateName, setStateName] = useState('Maharashtra');

  // Auto-suggestion lists for quick clicking
  const boardSuggestions = [
    'CBSE (Central Board)',
    'Maharashtra State Board (MSBSHSE)',
    'ICSE / ISC',
    'UP Board (UPMSP)',
    'Bihar Board (BSEB)',
    'Karnataka Board (KSEAB)',
    'Tamil Nadu State Board'
  ];

  const streamSuggestions = ['Science (PCM)', 'Science (PCB)', 'Commerce', 'Arts / Humanities'];

  const mediumSuggestions = ['English Medium', 'Hindi Medium', 'Marathi Medium', 'Regional Medium'];

  const teacherSubjectSuggestions = [
    'Mathematics',
    'Science (Physics)',
    'Science (Chemistry)',
    'Biology & Life Sciences',
    'Social Science (History/Civics/Geo)',
    'English Language & Literature',
    'Hindi Course A/B',
    'Computer Science & IT'
  ];

  const experienceSuggestions = [
    '1 - 3 Years (Junior Educator)',
    '3 - 5 Years',
    '5 - 10 Years (Senior PGT/TGT)',
    '10+ Years (Master Educator / HOD)'
  ];

  const qualificationSuggestions = [
    'B.Ed with Graduation',
    'M.Sc / M.A with B.Ed',
    'M.Phil / Ph.D / Senior Specialist',
    'Engineering / Subject Expert'
  ];

  const indianStates = [
    'Maharashtra',
    'Delhi NCR',
    'Uttar Pradesh',
    'Karnataka',
    'Bihar',
    'Gujarat',
    'Tamil Nadu',
    'Madhya Pradesh',
    'Rajasthan',
    'West Bengal'
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, selectedRole);

    if (selectedRole === 'student') {
      navigate('/student/dashboard');
    } else {
      navigate('/teacher/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-teal-50/20 to-white flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2.5 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-slate-900 to-teal-600 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
            <span className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Gyan<span className="text-teal-600">Setu</span>
            </span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            National Learning Portal
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            Choose your role below to access or create your verified academic account
          </p>
        </div>

        {/* The Two Dedicated Role Options */}
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
                Standards 1 to 12 • Access notes, video lessons & tests
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
                Educators & Mentors • Share materials, quizzes & assignments
              </p>
            </div>
          </button>
        </div>

        {/* Dynamic Form Card with Auto-Suggestions */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                {isSignUp ? `New ${selectedRole === 'student' ? 'Student' : 'Teacher'} Registration` : `${selectedRole === 'student' ? 'Student' : 'Teacher'} Sign In`}
              </h2>
              <p className="text-xs text-slate-500">
                {isSignUp ? 'Fill in your academic profile details below' : `Access your personalized ${selectedRole} dashboard`}
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

          <form onSubmit={handleSubmit} className="space-y-4">
            
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

            {/* If Sign Up mode or expanding details */}
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

            {/* ======================================================== */}
            {/* STUDENT SPECIFIC FIELDS WITH AUTO-SUGGESTIONS           */}
            {/* ======================================================== */}
            {selectedRole === 'student' && (
              <div className="p-4 rounded-2xl bg-teal-50/40 border border-teal-100 space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-teal-900 pb-1 border-b border-teal-200/50">
                  <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                  <span>Student Academic Profile & Grade Settings</span>
                </div>

                {/* Standard / Class Selector (1 to 12) */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Which Class / Standard are you studying in?
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
                  <p className="text-[10px] text-slate-400 mt-1">
                    {standard <= 5 ? 'Primary Wing (Class 1–5)' : standard <= 8 ? 'Middle School (Class 6–8)' : standard <= 10 ? 'Secondary Board Prep (Class 9–10)' : 'Senior Secondary (Class 11–12)'}
                  </p>
                </div>

                {/* If Standard 11 or 12, ask for Stream with auto-suggestions */}
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

                {/* Education Board with Auto-Suggestions */}
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

                {/* Parent Contact Number & School Name (Crucial for Indian Child Safety & Communication) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Parent / Guardian Mobile Number
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
                    <span className="text-[10px] text-slate-400">For SMS test alerts & homework updates</span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      School / Institution Name
                    </label>
                    <div className="relative">
                      <School className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                      <input
                        type="text"
                        value={schoolName}
                        onChange={(e) => setSchoolName(e.target.value)}
                        placeholder="e.g. Kendriya Vidyalaya / Delhi Public School"
                        className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Medium of Instruction with Auto-suggestions */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Medium of Study / Preferred Language
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

            {/* ======================================================== */}
            {/* TEACHER SPECIFIC FIELDS WITH AUTO-SUGGESTIONS           */}
            {/* ======================================================== */}
            {selectedRole === 'teacher' && (
              <div className="p-4 rounded-2xl bg-blue-50/40 border border-blue-100 space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-900 pb-1 border-b border-blue-200/50">
                  <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                  <span>Educator Qualifications & Subject Specialization</span>
                </div>

                {/* Subject Specialization with Auto-Suggestions */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Primary Teaching Subject
                  </label>
                  <input
                    type="text"
                    value={teachingSubject}
                    onChange={(e) => setTeachingSubject(e.target.value)}
                    placeholder="e.g. Mathematics, Physics..."
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

                {/* Teaching Experience with Auto-Suggestions */}
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

                {/* Authorized Classes Multi-Select */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Which Standards / Classes do you teach? (Click to select multiple)
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

                {/* Qualifications with Auto-Suggestions */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Highest Educational Qualification
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

                {/* School/College Affiliation & State */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Current School / Coaching Institute
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
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
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

          {/* Quick Demo Pre-fill */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span>Fast Fill Demo Account:</span>
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

        {/* Security & Child Privacy Footer Badge */}
        <div className="p-4 rounded-2xl bg-white/60 border border-slate-200 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Compliant with Indian Child Privacy Regulations & Verified Teacher Standards</span>
        </div>

      </div>
    </div>
  );
};
