/**
 * DARPANPREP APPLICATION ROOT & ROUTER
 * Wires authentication, free usage tracking, body language telemetry, and protected routes.
 */

import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './providers/AuthProvider';
import { UsageProvider } from './providers/UsageProvider';
import { BodyLanguageProvider } from './providers/BodyLanguageProvider';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { UpgradeModal } from './components/common/UpgradeModal';
import { ProtectedRoute } from './components/common/ProtectedRoute';

// Pages
import { LandingPage } from './pages/LandingPage';
import { ExamsPage } from './pages/ExamsPage';
import { PlacementPage } from './pages/PlacementPage';
import { CommunicationPage } from './pages/CommunicationPage';
import { PricingPage } from './pages/PricingPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { LoginPage } from './pages/LoginPage';
import { ProfilePage } from './pages/ProfilePage';
import { DashboardPage } from './pages/DashboardPage';
import { SetupWizardPage } from './pages/SetupWizardPage';
import { InterviewRoomPage } from './pages/InterviewRoomPage';
import { ReportPage } from './pages/ReportPage';
import { NotFoundPage } from './pages/NotFoundPage';

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  // Hide standard navbar and footer in the dedicated fullscreen interview room
  const isInterviewRoom = location.pathname === '/interview/room';

  return (
    <div className="flex flex-col min-h-screen bg-[#0A0E17] font-body selection:bg-amber-500 selection:text-slate-950">
      {!isInterviewRoom && <Navbar />}
      <main className="flex-grow">{children}</main>
      {!isInterviewRoom && <Footer />}
      <UpgradeModal />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UsageProvider>
          <BodyLanguageProvider>
            <AppLayout>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/exams" element={<ExamsPage />} />
                <Route path="/placement" element={<PlacementPage />} />
                <Route path="/communication" element={<CommunicationPage />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/resources" element={<ResourcesPage />} />
                <Route path="/login" element={<LoginPage />} />

                {/* Protected Routes */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <DashboardPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/interview/setup"
                  element={
                    <ProtectedRoute>
                      <SetupWizardPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/interview/room"
                  element={
                    <ProtectedRoute>
                      <InterviewRoomPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/interview/report"
                  element={
                    <ProtectedRoute>
                      <ReportPage />
                    </ProtectedRoute>
                  }
                />

                {/* Catch-all 404 */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </AppLayout>
          </BodyLanguageProvider>
        </UsageProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
