import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { BookOpen, GraduationCap, ShieldAlert, Sparkles, CheckCircle } from 'lucide-react';

export const AuthPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState<UserRole>('student');
  const [email, setEmail] = useState('vaishnav.student@gyansetu.edu');
  const [password, setPassword] = useState('password123');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, role);

    switch (role) {
      case 'student':
        navigate('/student/dashboard');
        break;
      case 'teacher':
        navigate('/teacher/dashboard');
        break;
      case 'admin':
        navigate('/admin/dashboard');
        break;
    }
  };

  const handleRoleSelect = (r: UserRole) => {
    setRole(r);
    if (r === 'student') setEmail('vaishnav.student@gyansetu.edu');
    if (r === 'teacher') setEmail('dr.sharma@gyansetu.edu');
    if (r === 'admin') setEmail('admin@gyansetu.edu');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-3xl border border-slate-200 shadow-md">
        
        {/* Brand header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-tr from-slate-900 to-teal-600 flex items-center justify-center text-white shadow-md">
            <BookOpen className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900">Sign in to GyanSetu</h2>
          <p className="text-xs text-slate-500">
            Select your academic role to access your personalized portal
          </p>
        </div>

        {/* Role Selection Tabs */}
        <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-100 rounded-2xl">
          <button
            type="button"
            onClick={() => handleRoleSelect('student')}
            className={`py-2 text-xs font-bold rounded-xl transition ${
              role === 'student'
                ? 'bg-white text-teal-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Student
          </button>
          <button
            type="button"
            onClick={() => handleRoleSelect('teacher')}
            className={`py-2 text-xs font-bold rounded-xl transition ${
              role === 'teacher'
                ? 'bg-white text-blue-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Teacher
          </button>
          <button
            type="button"
            onClick={() => handleRoleSelect('admin')}
            className={`py-2 text-xs font-bold rounded-xl transition ${
              role === 'admin'
                ? 'bg-white text-purple-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Admin
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Registered Email ID
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition"
          >
            Sign In as <span className="capitalize">{role}</span>
          </button>
        </form>

        <div className="pt-2 text-center text-xs text-slate-500">
          <p>
            Demo accounts are pre-filled with verified credentials.
          </p>
        </div>

      </div>
    </div>
  );
};
