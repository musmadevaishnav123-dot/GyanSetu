import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  BookOpen,
  LayoutDashboard,
  LogOut,
  Menu,
  X,
  UserCheck
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getDashboardPath = () => {
    if (!user) return '/login';
    switch (user.role) {
      case 'student':
        return '/student/dashboard';
      case 'teacher':
        return '/teacher/dashboard';
      case 'admin':
        return '/admin/dashboard';
      default:
        return '/login';
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
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
                <span className="text-[10px] font-semibold bg-teal-50 text-teal-700 px-1.5 py-0.5 rounded border border-teal-200">All India</span>
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

          {/* User Account Controls (No Demo Role Switcher) */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700">
                    <UserCheck className="w-4 h-4 text-teal-600" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-slate-900 truncate max-w-[140px]">{user?.name}</p>
                    <span className="text-[10px] font-semibold text-teal-700 bg-teal-50 px-1.5 py-0.2 rounded border border-teal-200 capitalize">
                      {user?.role}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-rose-600 hover:bg-rose-50 rounded-lg transition font-medium"
                  title="Logout"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
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
                  to="/login"
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
          
          {isAuthenticated ? (
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <Link
                to={getDashboardPath()}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm font-semibold text-teal-600"
              >
                Open Dashboard ({user?.role})
              </Link>
              <button
                onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                className="w-full text-left py-1.5 text-xs text-rose-600 font-semibold"
              >
                Logout ({user?.name})
              </button>
            </div>
          ) : (
            <div className="pt-2 border-t border-slate-100">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm font-bold text-teal-600"
              >
                Log In / Register
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
