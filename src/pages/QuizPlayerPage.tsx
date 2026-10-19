import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAcademic } from '../context/AcademicContext';
import {
  HelpCircle,
  Clock,
  CheckCircle2,
  XCircle,
  Award,
  ChevronLeft,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const QuizPlayerPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { quizzes, submitQuizAttempt } = useAcademic();

  const quiz = quizzes.find(q => q.id === id);

  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [totalMarks, setTotalMarks] = useState(0);

  if (!quiz) {
    return (
      <div className="min-h-screen bg-slate-50 py-16 text-center">
        <h2 className="text-xl font-bold text-slate-800">Quiz Not Found</h2>
        <Link to="/student/dashboard" className="text-xs text-teal-600 font-bold mt-3 inline-block">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (submitted) return;
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmitQuiz = () => {
    let calculatedScore = 0;
    let maxScore = 0;

    quiz.questions.forEach(q => {
      maxScore += q.marks;
      if (selectedAnswers[q.id] === q.correct_option_index) {
        calculatedScore += q.marks;
      }
    });

    setScore(calculatedScore);
    setTotalMarks(maxScore);
    setSubmitted(true);

    const percentage = Math.round((calculatedScore / maxScore) * 100);

    submitQuizAttempt({
      quiz_id: quiz.id,
      student_id: 'std_demo_101',
      score: calculatedScore,
      total_marks: maxScore,
      percentage,
      answers: selectedAnswers
    });

    if (percentage >= 70) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Safe fallback if canvas not available
      }
    }
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <Link
            to="/student/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Clock className="w-4 h-4 text-teal-600" />
            <span>Time Allowed: {quiz.time_limit_minutes} Mins</span>
          </div>
        </div>

        {/* Quiz Header Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-3">
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 uppercase">
            Interactive Academic Evaluation
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            {quiz.title}
          </h1>
          <p className="text-xs text-slate-600">
            {quiz.description}
          </p>
          <div className="pt-2 text-[10px] text-slate-400 font-medium">
            Teacher: {quiz.teacher_name} • Standard {quiz.standard} • {quiz.questions.length} Questions
          </div>
        </div>

        {/* Score Banner (if submitted) */}
        {submitted && (
          <div className={`p-6 rounded-3xl border shadow-sm text-center space-y-2 ${
            (score / totalMarks) >= 0.7
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
              : 'bg-amber-50 border-amber-200 text-amber-900'
          }`}>
            <Award className="w-10 h-10 mx-auto text-emerald-600" />
            <h2 className="text-2xl font-black">
              Your Score: {score} / {totalMarks} ({Math.round((score / totalMarks) * 100)}%)
            </h2>
            <p className="text-xs">
              {(score / totalMarks) >= 0.7
                ? 'Outstanding performance! You have grasped the concepts thoroughly.'
                : 'Good effort! Review the detailed explanations below to improve your score.'}
            </p>
            <button
              onClick={handleRetake}
              className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition"
            >
              <RotateCcw className="w-4 h-4" /> Retake Quiz
            </button>
          </div>
        )}

        {/* Questions list */}
        <div className="space-y-4">
          {quiz.questions.map((q, idx) => {
            const chosen = selectedAnswers[q.id];
            const isCorrect = chosen === q.correct_option_index;

            return (
              <div
                key={q.id}
                className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-4"
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-sm font-bold text-slate-900">
                    Question {idx + 1}. {q.question_text}
                  </h3>
                  <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                    {q.marks} Marks
                  </span>
                </div>

                {/* Options */}
                <div className="space-y-2">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = chosen === optIdx;
                    let optionStyle = 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800';

                    if (submitted) {
                      if (optIdx === q.correct_option_index) {
                        optionStyle = 'border-emerald-400 bg-emerald-50 text-emerald-900 font-bold';
                      } else if (isSelected && !isCorrect) {
                        optionStyle = 'border-rose-400 bg-rose-50 text-rose-900 font-semibold';
                      } else {
                        optionStyle = 'border-slate-100 bg-white opacity-60 text-slate-400';
                      }
                    } else if (isSelected) {
                      optionStyle = 'border-teal-500 bg-teal-50 text-teal-900 font-bold ring-2 ring-teal-200';
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={submitted}
                        onClick={() => handleSelectOption(q.id, optIdx)}
                        className={`w-full text-left p-3.5 rounded-2xl border text-xs transition flex items-center justify-between ${optionStyle}`}
                      >
                        <span>{opt}</span>
                        {submitted && optIdx === q.correct_option_index && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        )}
                        {submitted && isSelected && !isCorrect && (
                          <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Teacher Explanation */}
                {submitted && q.explanation && (
                  <div className="p-3.5 rounded-xl bg-teal-50/50 border border-teal-200 text-xs text-teal-900 space-y-1">
                    <p className="font-bold flex items-center gap-1.5 text-teal-800">
                      <Sparkles className="w-3.5 h-3.5" /> Conceptual Explanation:
                    </p>
                    <p className="text-[11px] text-teal-700">{q.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Action bottom button */}
        {!submitted && (
          <div className="pt-4 flex justify-end">
            <button
              onClick={handleSubmitQuiz}
              disabled={Object.keys(selectedAnswers).length === 0}
              className="px-8 py-3 rounded-2xl bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-bold text-xs shadow-md transition"
            >
              Submit Quiz & View Score
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
