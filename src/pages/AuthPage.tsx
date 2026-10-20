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
  Mail
} from 'lucide-react';

export const AuthPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Mode: 'student' or 'teacher'
  const initialRole = searchParams.get('role') === 'teacher' ? 'teacher' : 'student';
  const [selectedRole, setSelectedRole] = useState<'student' | 'teacher'>(initialRole);

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [board, setBoard] = useState('CBSE');
  const [standard, setStandard] = useState(10);
  const [stateName, setStateName] = useState('Maharashtra');
  const [qualification, setQualification] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  // Pre-fill demo accounts for fast evaluation
  const setDemoCredentials = (role: 'student' | 'teacher') => {
    setSelectedRole(role);
    if (role === 'student') {
      setEmail('vaishnav.student@gyansetu.edu');
      setPassword('student123');
    } else {
      setEmail('dr.sharma@gyansetu.edu');
      setPassword('teacher123');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email || (selectedRole === 'student' ? 'vaishnav.student@gyansetu.edu' : 'dr.sharma@gyansetu.edu'), selectedRole);

    if (selectedRole === 'student') {
      navigate('/student/dashboard');
    } else {
      navigate('/teacher/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-teal-50/20 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full space-y-6">
        
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
          <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
            Connecting students & verified educators from across India
          </p>
        </div>

        {/* The Two Dedicated Role Cards / Toggle */}
        <div className="grid grid-cols-2 gap-4">
          {/* Student Selection Option */}
          <button
            type="button"
            onClick={() => { setSelectedRole('student'); setDemoCredentials('student'); }}
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
                Standards 1 to 12 • Access notes, video lectures & tests
              </p>
            </div>
          </button>

          {/* Teacher Selection Option */}
          <button
            type="button"
            onClick={() => { setSelectedRole('teacher'); setDemoCredentials('teacher'); }}
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
                Educators & Tutors • Upload resources, create quizzes & assignments
              </p>
            </div>
          </button>
        </div>

        {/* Dynamic Form Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                {isSignUp ? 'Create Your Account' : 'Welcome Back'}
              </h2>
              <p className="text-xs text-slate-500">
                Continuing as <span className="font-bold text-slate-800 capitalize">{selectedRole}</span>
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-xs font-bold text-teal-600 hover:text-teal-800"
            >
              {isSignUp ? 'Already registered? Log In' : 'New here? Register'}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Common or Role-Specific Fields */}
            {isSignUp && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={selectedRole === 'student' ? 'e.g. Vaishnav Musmade' : 'e.g. Dr. Ramesh Sharma'}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {selectedRole === 'student' ? 'Student Email ID' : 'Official / Teacher Email ID'}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Student specific fields on Signup */}
            {isSignUp && selectedRole === 'student' && (
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Education Board</label>
                  <select
                    value={board}
                    onChange={(e) => setBoard(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  >
                    <option value="CBSE">CBSE (National)</option>
                    <option value="MSBSHSE">Maharashtra State Board</option>
                    <option value="ICSE">ICSE</option>
                    <option value="UPMSP">UP Board</option>
                    <option value="BSEB">Bihar Board</option>
                    <option value="Other">Other State Board</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Standard / Class</label>
                  <select
                    value={standard}
                    onChange={(e) => setStandard(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  >
                    {[...Array(12)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>Standard {i + 1}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Teacher specific fields on Signup */}
            {isSignUp && selectedRole === 'teacher' && (
              <div className="space-y-3 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Highest Qualification / Teaching Role</label>
                  <input
                    type="text"
                    value={qualification}
                    onChange={(e) => setQualification(e.target.value)}
                    placeholder="e.g. M.Sc Physics, B.Ed (Senior PGT)"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">State / Union Territory</label>
                  <select
                    value={stateName}
                    onChange={(e) => setStateName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Delhi">Delhi NCR</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="West Bengal">West Bengal</option>
                    <option value="Other">Other State</option>
                  </select>
                </div>
              </div>
            )}

            {/* Submit Action */}
            <button
              type="submit"
              className={`w-full py-3.5 rounded-2xl font-bold text-xs text-white shadow-md transition flex items-center justify-center gap-2 ${
                selectedRole === 'student'
                  ? 'bg-slate-900 hover:bg-slate-800'
                  : 'bg-blue-700 hover:bg-blue-800'
              }`}
            >
              <span>{isSignUp ? `Register as ${selectedRole}` : `Login as ${selectedRole}`}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Fill Buttons */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span>Fast Demo Sign-In:</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setDemoCredentials('student')}
                className="text-teal-700 hover:underline font-semibold"
              >
                Sample Student
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => setDemoCredentials('teacher')}
                className="text-blue-700 hover:underline font-semibold"
              >
                Sample Teacher
              </button>
            </div>
          </div>
        </div>

        {/* Trust & Safety Notice */}
        <div className="p-4 rounded-2xl bg-white/60 border border-slate-200 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Safe, verified platform aligned with Indian school privacy regulations.</span>
        </div>

      </div>
    </div>
  );
};
