import React from 'react';
import { Link } from 'react-router-dom';
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
  HelpCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const LandingPage: React.FC = () => {
  const { switchRole } = useAuth();

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-slate-200 bg-gradient-to-b from-white via-slate-50 to-teal-50/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headline and Call-to-actions */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold">
                <Sparkles className="w-4 h-4 text-teal-600" />
                <span>Centralized Learning Platform for Standards 1–12</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Every Student Deserves a <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-teal-700 to-teal-500">Better Way to Learn.</span>
              </h1>

              <p className="text-lg text-slate-600 font-normal leading-relaxed max-w-2xl">
                <strong>Your Bridge to Knowledge</strong> — explore lessons, access chapter notes, watch teacher explanations, practice verified quizzes, and submit assignments in one safe, centralized school platform.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/student/dashboard"
                  onClick={() => switchRole('student')}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-white bg-slate-900 hover:bg-slate-800 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                >
                  <GraduationCap className="w-5 h-5 text-teal-400" />
                  <span>Start Learning</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>

                <Link
                  to="/teacher/dashboard"
                  onClick={() => switchRole('teacher')}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-slate-800 bg-white hover:bg-slate-100 border border-slate-300 shadow-xs hover:shadow-md transition"
                >
                  <BookOpen className="w-5 h-5 text-teal-600" />
                  <span>Join as a Teacher</span>
                </Link>
              </div>

              {/* Trust & Academic tags */}
              <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center gap-6 text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1.5 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> CBSE & State Boards
                </span>
                <span className="flex items-center gap-1.5 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Verified Teachers Only
                </span>
                <span className="flex items-center gap-1.5 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Zero Unfiltered Ads
                </span>
              </div>
            </div>

            {/* Right Column: Visual Bridge Concept Card */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md bg-white rounded-3xl p-6 shadow-xl border border-slate-200">
                {/* Visual badge */}
                <div className="flex justify-between items-center pb-4 mb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center text-white font-bold">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">GyanSetu Portal</p>
                      <p className="text-[10px] text-teal-600">Standard 10 • Science & Math</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
                    Live Session
                  </span>
                </div>

                {/* Lesson Preview Mock */}
                <div className="space-y-3">
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-teal-300 transition">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Chapter 4 • Electricity</span>
                      <span className="text-[10px] font-semibold text-teal-600 bg-teal-50 px-2 py-0.5 rounded">Video + Notes</span>
                    </div>
                    <p className="text-sm font-bold text-slate-800">Ohm's Law & Factors Affecting Resistance</p>
                    <p className="text-xs text-slate-500 mt-1">Uploaded by Dr. Ramesh Sharma (Verified PGT)</p>
                    <div className="mt-3 flex items-center justify-between text-xs">
                      <span className="text-slate-400">Duration: 22 mins</span>
                      <span className="text-teal-600 font-semibold flex items-center gap-1">
                        Resume Lesson <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-teal-50/50 border border-teal-200">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800">Active Test</span>
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">Due Oct 28</span>
                    </div>
                    <p className="text-sm font-bold text-slate-800">Circuits & Resistors Speed Quiz</p>
                    <p className="text-xs text-slate-500 mt-1">4 Questions • 15 Minutes</p>
                  </div>
                </div>

                <div className="mt-5 p-3 rounded-xl bg-slate-900 text-white flex items-center justify-between text-xs">
                  <div>
                    <p className="font-semibold text-slate-100">Overall Syllabus Progress</p>
                    <p className="text-[10px] text-teal-400">Science: 65% Completed</p>
                  </div>
                  <div className="w-12 h-12 rounded-full border-2 border-teal-400 flex items-center justify-center font-bold text-xs text-teal-400">
                    65%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Navigation Hierarchy Breakdown */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-xs font-bold uppercase tracking-widest text-teal-600 mb-2">Structured Education</h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Clear, Class-Wise Learning Path from Class 1 to 12
            </h3>
            <p className="text-sm text-slate-600 mt-3">
              No scattered WhatsApp groups or unverified links. GyanSetu organizes school education in a rigorous academic hierarchy:
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: '1. Board', desc: 'CBSE, State, ICSE', icon: Layers, color: 'bg-blue-50 text-blue-700 border-blue-200' },
              { label: '2. Standard', desc: 'Class 1 to 12', icon: Compass, color: 'bg-teal-50 text-teal-700 border-teal-200' },
              { label: '3. Subject', desc: 'Sci, Math, SST, Lang', icon: BookOpen, color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
              { label: '4. Chapter', desc: 'Syllabus Aligned', icon: FileText, color: 'bg-amber-50 text-amber-700 border-amber-200' },
              { label: '5. Topic', desc: 'Concept by Concept', icon: Sparkles, color: 'bg-purple-50 text-purple-700 border-purple-200' },
              { label: '6. Material', desc: 'Notes, Videos, Quizzes', icon: Video, color: 'bg-rose-50 text-rose-700 border-rose-200' }
            ].map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className={`p-4 rounded-2xl border text-center ${step.color} shadow-2xs`}>
                  <div className="w-8 h-8 mx-auto mb-2 rounded-lg bg-white/80 flex items-center justify-center shadow-xs">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-xs">{step.label}</h4>
                  <p className="text-[10px] opacity-80 mt-0.5">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Feature Grid: Students vs Teachers */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Student Features */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition">
              <div className="inline-flex p-3 rounded-2xl bg-teal-50 text-teal-700 mb-5">
                <GraduationCap className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Built for Students</h3>
              <p className="text-sm text-slate-600 mb-6">
                Age-appropriate, distraction-free environment for young learners in Standards 1–5 up to board exam prep for Standards 10 & 12.
              </p>
              <ul className="space-y-3.5 text-sm text-slate-700">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                  <span><strong>Class-wise notes & revision sheets:</strong> Read handwritten and formatted notes aligned with NCERT.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                  <span><strong>Interactive Quizzes & Practice:</strong> Immediate scoring, instant explanations, and re-attempt tracking.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                  <span><strong>Assignments & Teacher Feedback:</strong> Upload homework, track deadlines, and receive personalized marks.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                  <span><strong>Child Safety First:</strong> No personal contact numbers exposed, no unsolicited messages.</span>
                </li>
              </ul>
              <div className="mt-8 pt-6 border-t border-slate-100">
                <Link
                  to="/student/dashboard"
                  onClick={() => switchRole('student')}
                  className="text-sm font-semibold text-teal-700 hover:text-teal-900 flex items-center gap-1.5"
                >
                  Explore Student Dashboard <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Teacher Features */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition">
              <div className="inline-flex p-3 rounded-2xl bg-blue-50 text-blue-700 mb-5">
                <BookOpen className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Built for Teachers</h3>
              <p className="text-sm text-slate-600 mb-6">
                An information-dense productivity workstation to manage class curriculum, upload learning resources, and track mastery.
              </p>
              <ul className="space-y-3.5 text-sm text-slate-700">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <span><strong>Multi-Format Material Upload:</strong> Upload PDFs, presentation slides, notes, and educational video links.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <span><strong>Automated & Manual Grading:</strong> Create MCQ tests that self-grade or review submitted homework files.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <span><strong>Admin Verification:</strong> Quality control mechanism ensures only authorized educators publish to classes.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <span><strong>Class Broadcast Announcements:</strong> Send notifications to entire classes regarding tests or revisions.</span>
                </li>
              </ul>
              <div className="mt-8 pt-6 border-t border-slate-100">
                <Link
                  to="/teacher/dashboard"
                  onClick={() => switchRole('teacher')}
                  className="text-sm font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1.5"
                >
                  Explore Teacher Workstation <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Frequently Asked Questions</h2>
            <p className="text-sm text-slate-500 mt-2">Everything you need to know about GyanSetu</p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'Which education boards are supported on GyanSetu?',
                a: 'GyanSetu is initially configured with the complete CBSE curriculum for Standards 1 to 12. Support for Maharashtra State Board (MSBSHSE), ICSE, and other state boards is built into the academic hierarchy and can be managed directly via the Admin Console.'
              },
              {
                q: 'Can any user register as a teacher and post content?',
                a: 'No. GyanSetu enforces a strict verification workflow. When teachers register, their account is flagged as pending until the School Administrator reviews credentials and assigns authorized classes and subjects.'
              },
              {
                q: 'How does GyanSetu protect school-age student privacy?',
                a: 'In accordance with Indian child-data protection guidelines, students are never asked for sensitive personal details. Student marks, submissions, and contact info are private and only viewable by authorized class teachers and administrators.'
              },
              {
                q: 'Is GyanSetu accessible on mobile phones?',
                a: 'Yes. GyanSetu is designed mobile-first so students and teachers can easily access notes, stream video lessons, and take quizzes on budget smartphones, tablets, or computers.'
              }
            ].map((faq, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>{faq.q}</span>
                </h4>
                <p className="text-xs text-slate-600 mt-2 pl-6 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-slate-900 via-slate-800 to-teal-900 text-white">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to Bridge the Knowledge Gap in Your School?
          </h2>
          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            Experience the unified learning platform built specifically for Indian school curricula from Class 1 through 12.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link
              to="/student/dashboard"
              onClick={() => switchRole('student')}
              className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm shadow-lg transition"
            >
              Open Student Portal
            </Link>
            <Link
              to="/admin/dashboard"
              onClick={() => switchRole('admin')}
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 transition"
            >
              Administrator Console
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
