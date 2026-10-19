import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  BookOpen,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  User,
  Menu,
  X,
  ShieldAlert,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { UserRole } from '../types';

export const Navbar: React.FC = () => {
  const { user, logout, switchRole, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const getDashboardPath = () => {
    if (!user) return '/login';
    switch (user.role) {
      case 'student':
        return '/student/dashboard';
      case 'teacher':
        return '/teacher/dashboard';
      case 'admin':
        return '/admin/dashboard';
    }
  };

  const handleRoleSwitch = (role: UserRole) => {
    switchRole(role);
    setRoleDropdownOpen(false);
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

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo with Open Book Bridge Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-900 to-teal-600 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-slate-900">Gyan<span className="text-teal-600">Setu</span></span>
                <span className="text-[10px] font-semibold bg-teal-50 text-teal-700 px-1.5 py-0.5 rounded border border-teal-200">CBSE 1-12</span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium tracking-wide">ज्ञान से सफलता तक • Your Bridge to Knowledge</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/' ? 'text-teal-600 font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Home
            </Link>
            <Link
              to="/features"
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/features' ? 'text-teal-600 font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Curriculum (1–12)
            </Link>
            <Link
              to="/about"
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/about' ? 'text-teal-600 font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              About
            </Link>

            {isAuthenticated && (
              <Link
                to={getDashboardPath()}
                className="flex items-center gap-1.5 text-sm font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 px-3 py-1.5 rounded-lg border border-teal-200 transition"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>My Dashboard</span>
              </Link>
            )}
          </nav>

          {/* Role switcher & User Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Interactive Demo Role Switcher Badge */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full border border-slate-300 bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
                title="Switch role for evaluation"
              >
                <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                <span>Role: <strong className="capitalize text-slate-900">{user?.role || 'Guest'}</strong></span>
                <ChevronDown className="w-3 h-3 text-slate-500" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 z-50">
                  <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Switch Live Persona
                  </div>
                  <button
                    onClick={() => handleRoleSwitch('student')}
                    className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <GraduationCap className="w-4 h-4 text-emerald-600" />
                    <span>Student (Class 10)</span>
                  </button>
                  <button
                    onClick={() => handleRoleSwitch('teacher')}
                    className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <BookOpen className="w-4 h-4 text-blue-600" />
                    <span>Teacher (Verified)</span>
                  </button>
                  <button
                    onClick={() => handleRoleSwitch('admin')}
                    className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <ShieldAlert className="w-4 h-4 text-purple-600" />
                    <span>School Administrator</span>
                  </button>
                </div>
              )}
            </div>

            {isAuthenticated ? (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-900 truncate max-w-[130px]">{user?.name}</p>
                  <p className="text-[10px] text-slate-500 capitalize">{user?.role}</p>
                </div>
                <button
                  onClick={logout}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="text-xs font-semibold text-slate-700 hover:text-slate-900 px-3 py-2"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 px-3.5 py-2 rounded-lg transition shadow-xs"
                >
                  Join GyanSetu
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-4 space-y-3">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-slate-700"
          >
            Home
          </Link>
          <Link
            to="/features"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-slate-700"
          >
            Curriculum Standards (1–12)
          </Link>
          <Link
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-slate-700"
          >
            About GyanSetu
          </Link>
          {isAuthenticated && (
            <Link
              to={getDashboardPath()}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-teal-600"
            >
              Open Dashboard ({user?.role})
            </Link>
          )}

          <div className="pt-2 border-t border-slate-200">
            <p className="text-xs text-slate-400 font-semibold mb-2">Switch Active Persona:</p>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => { handleRoleSwitch('student'); setMobileMenuOpen(false); }}
                className="text-xs py-1.5 px-2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded font-medium"
              >
                Student
              </button>
              <button
                onClick={() => { handleRoleSwitch('teacher'); setMobileMenuOpen(false); }}
                className="text-xs py-1.5 px-2 bg-blue-50 text-blue-700 border border-blue-200 rounded font-medium"
              >
                Teacher
              </button>
              <button
                onClick={() => { handleRoleSwitch('admin'); setMobileMenuOpen(false); }}
                className="text-xs py-1.5 px-2 bg-purple-50 text-purple-700 border border-purple-200 rounded font-medium"
              >
                Admin
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
