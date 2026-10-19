import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AcademicProvider } from './context/AcademicContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { StudentDashboard } from './pages/StudentDashboard';
import { TeacherDashboard } from './pages/TeacherDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { MaterialViewerPage } from './pages/MaterialViewerPage';
import { QuizPlayerPage } from './pages/QuizPlayerPage';
import { AssignmentSubmissionPage } from './pages/AssignmentSubmissionPage';
import { AuthPage } from './pages/AuthPage';

export function App() {
  return (
    <AuthProvider>
      <AcademicProvider>
        <BrowserRouter>
          <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900">
            <Navbar />
            <main className="flex-1">
              <Routes>
                {/* Public */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<AuthPage />} />
                <Route path="/register" element={<AuthPage />} />

                {/* Student */}
                <Route path="/student/dashboard" element={<StudentDashboard />} />
                <Route path="/student/material/:id" element={<MaterialViewerPage />} />
                <Route path="/student/quiz/:id" element={<QuizPlayerPage />} />
                <Route path="/student/assignment/:id" element={<AssignmentSubmissionPage />} />

                {/* Teacher */}
                <Route path="/teacher/dashboard" element={<TeacherDashboard />} />

                {/* Administrator */}
                <Route path="/admin/dashboard" element={<AdminDashboard />} />

                {/* Fallbacks */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </AcademicProvider>
    </AuthProvider>
  );
}

export default App;
