import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAcademic } from '../context/AcademicContext';
import {
  FileText,
  Video,
  Download,
  CheckCircle,
  Bookmark as BookmarkIcon,
  ChevronLeft,
  Share2,
  Clock,
  Sparkles,
  Award
} from 'lucide-react';

export const MaterialViewerPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { materials, completedLessons, toggleCompleteLesson, bookmarks, toggleBookmark } = useAcademic();

  const material = materials.find(m => m.id === id);
  const [copied, setCopied] = useState(false);

  if (!material) {
    return (
      <div className="min-h-screen bg-slate-50 py-16 text-center">
        <h2 className="text-xl font-bold text-slate-800">Learning Material Not Found</h2>
        <Link to="/student/dashboard" className="text-xs text-teal-600 font-bold mt-3 inline-block">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  const isCompleted = completedLessons.includes(material.id);
  const isBookmarked = bookmarks.some(b => b.material_id === material.id);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            to="/student/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Class 10 Learning Stream</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleBookmark(material)}
              className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition ${
                isBookmarked
                  ? 'bg-teal-50 border-teal-200 text-teal-700'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <BookmarkIcon className={`w-4 h-4 ${isBookmarked ? 'fill-teal-600' : ''}`} />
              <span>{isBookmarked ? 'Saved' : 'Bookmark'}</span>
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <Share2 className="w-4 h-4" />
              <span>{copied ? 'Link Copied!' : 'Share'}</span>
            </button>
          </div>
        </div>

        {/* Content Viewer Main Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-200 uppercase">
                {material.material_type}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Standard {material.standard} • {material.board} Board
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {material.title}
            </h1>
            <p className="text-xs text-slate-500">
              Authored by <strong>{material.author_name}</strong> • Published on {new Date(material.created_at).toLocaleDateString()}
            </p>
          </div>

          {/* Interactive Player or Document Frame */}
          <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-900">
            {material.material_type === 'video' ? (
              <div className="aspect-video w-full flex items-center justify-center relative">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube-nocookie.com/embed/k_jH22g3eY8"
                  title={material.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="p-8 sm:p-12 text-center text-white space-y-4 bg-gradient-to-b from-slate-900 to-slate-800">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300">
                  <FileText className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Standard 10 Study Notes & Reference Sheet</h3>
                  <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                    Contains NCERT formulas, step-by-step circuit derivations, and 15 exemplar practice numericals.
                  </p>
                </div>
                <a
                  href={material.file_url || 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-md transition"
                >
                  <Download className="w-4 h-4" />
                  <span>Download / View Full PDF</span>
                </a>
              </div>
            )}
          </div>

          {/* Description & Pedagogical Details */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <h3 className="text-sm font-bold text-slate-900">Lesson Summary & Key Concepts</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {material.description}
            </p>
          </div>

          {/* Complete Lesson Action */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-xs text-slate-500 flex items-center gap-2">
              <Clock className="w-4 h-4 text-teal-600" />
              <span>Recommended Study Time: {material.duration || '20 mins'}</span>
            </div>

            <button
              onClick={() => toggleCompleteLesson(material.id)}
              className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition ${
                isCompleted
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-slate-900 hover:bg-slate-800 text-white shadow-md'
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              <span>{isCompleted ? 'Marked as Completed! ✓' : 'Mark Topic as Completed'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
