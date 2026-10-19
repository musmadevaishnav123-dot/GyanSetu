import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Heart, Shield, Mail, Phone, Award } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-14 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Brand info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center text-slate-950 font-bold shadow-md">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">Gyan<span className="text-teal-400">Setu</span></span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your Bridge to Knowledge — connecting school students (Standards 1 to 12) with teachers across CBSE and State Boards in India.
            </p>
            <div className="flex items-center gap-2 text-xs text-teal-400 font-medium">
              <Shield className="w-4 h-4" />
              <span>Compliant with Indian Child Privacy & School Guidelines</span>
            </div>
          </div>

          {/* Standards 1-12 Quick Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Academic Coverage</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link to="/features" className="hover:text-teal-400 transition">Primary Wing (Standards 1–5)</Link></li>
              <li><Link to="/features" className="hover:text-teal-400 transition">Middle School (Standards 6–8)</Link></li>
              <li><Link to="/features" className="hover:text-teal-400 transition">Secondary School (Standards 9–10)</Link></li>
              <li><Link to="/features" className="hover:text-teal-400 transition">Senior Secondary (Standards 11–12)</Link></li>
              <li><span className="text-slate-500">Science • Math • Social Science • Languages</span></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Platform</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link to="/student/dashboard" className="hover:text-teal-400 transition">Student Learning Portal</Link></li>
              <li><Link to="/teacher/dashboard" className="hover:text-teal-400 transition">Teacher Workstation</Link></li>
              <li><Link to="/admin/dashboard" className="hover:text-teal-400 transition">School Admin Console</Link></li>
              <li><Link to="/about" className="hover:text-teal-400 transition">About the Initiative</Link></li>
              <li><Link to="/register?role=teacher" className="hover:text-teal-400 transition">Apply as Verified Teacher</Link></li>
            </ul>
          </div>

          {/* Contact and Trust */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Support & Trust</h4>
            <div className="space-y-2 text-xs text-slate-400">
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-teal-400" />
                <span>support@gyansetu.edu.in</span>
              </p>
              <p className="flex items-center gap-2">
                <Award className="w-4 h-4 text-teal-400" />
                <span>CBSE & NCERT Aligned Curriculum</span>
              </p>
              <div className="pt-2 flex gap-3 text-xs">
                <Link to="/privacy" className="hover:text-slate-200">Privacy Policy</Link>
                <span>•</span>
                <Link to="/terms" className="hover:text-slate-200">Terms of Service</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 text-center text-xs text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p>© {new Date().getFullYear()} GyanSetu. All rights reserved. ज्ञान से सफलता तक।</p>
          <p className="flex items-center gap-1">
            Built for Students and Teachers of India
          </p>
        </div>
      </div>
    </footer>
  );
};
