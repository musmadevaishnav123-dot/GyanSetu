import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAcademic } from '../context/AcademicContext';
import { useAuth } from '../context/AuthContext';
import {
  FileText,
  Calendar,
  Award,
  ChevronLeft,
  CheckCircle2,
  UploadCloud,
  Send
} from 'lucide-react';

export const AssignmentSubmissionPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { assignments, submitAssignment, submissions } = useAcademic();
  const { user } = useAuth();

  const assignment = assignments.find(a => a.id === id);
  const existingSubmission = submissions.find(
    s => s.assignment_id === id && s.student_id === (user?.id || 'std_demo_101')
  );

  const [solutionText, setSolutionText] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  if (!assignment) {
    return (
      <div className="min-h-screen bg-slate-50 py-16 text-center">
        <h2 className="text-xl font-bold text-slate-800">Assignment Not Found</h2>
        <Link to="/student/dashboard" className="text-xs text-teal-600 font-bold mt-3 inline-block">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!solutionText) return;

    submitAssignment({
      assignment_id: assignment.id,
      student_id: user?.id || 'std_demo_101',
      student_name: user?.name || 'Vaishnav Musmade',
      content: solutionText,
      status: 'Submitted'
    });

    setSubmittedSuccess(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Navigation */}
        <Link
          to="/student/dashboard"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Homework Stream</span>
        </Link>

        {/* Assignment details card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 uppercase">
              Class Homework
            </span>
            <span className="text-xs font-bold text-slate-600 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-amber-600" />
              Due: {new Date(assignment.due_date).toLocaleDateString()}
            </span>
          </div>

          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {assignment.title}
          </h1>

          <div className="text-xs text-slate-500 font-medium">
            Assigned by: <strong>{assignment.teacher_name}</strong> • Max Marks: {assignment.max_marks}
          </div>

          <div className="pt-4 border-t border-slate-100">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Instructions</h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
              {assignment.description}
            </p>
          </div>
        </div>

        {/* Submission Form or Status Card */}
        {existingSubmission || submittedSuccess ? (
          <div className="bg-emerald-50 rounded-3xl p-6 border border-emerald-200 text-emerald-900 space-y-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <h3 className="text-sm font-bold">Your Homework is Submitted!</h3>
            </div>
            <p className="text-xs text-emerald-800">
              Your teacher will review your submission and provide feedback and marks here.
            </p>
            {existingSubmission?.marks_obtained !== undefined && (
              <div className="p-3 bg-white rounded-xl border border-emerald-200 text-xs mt-2">
                <p className="font-bold text-slate-900">Marks Awarded: {existingSubmission.marks_obtained} / {assignment.max_marks}</p>
                {existingSubmission.feedback && (
                  <p className="text-slate-600 mt-1">Teacher Feedback: "{existingSubmission.feedback}"</p>
                )}
              </div>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900">Submit Your Work</h3>
            <p className="text-xs text-slate-500">
              Type your answers, derivations, or paste your notebook calculations below:
            </p>

            <textarea
              value={solutionText}
              onChange={(e) => setSolutionText(e.target.value)}
              placeholder="Write your detailed answers here..."
              rows={8}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
              required
            />

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition"
              >
                <Send className="w-4 h-4" />
                <span>Submit Assignment to Teacher</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
