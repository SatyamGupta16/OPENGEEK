import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import Login from './app/login/Login';
import DashboardPage from './app/dashboard/Page';
import ProjectsPage from './app/projects/page';
import LearnPage from './app/learn/page';
import ProfilePage from './app/profile/page';
import { AuthProvider } from './lib/auth-context';
import { ProtectedRoute } from './components/auth/protected-route';
import { ClientLayout } from './components/layout/ClientLayout';
import HTMLCourseLayout from '@/app/learn/html/layout';
import { NotificationsProvider } from '@/lib/notifications-context';

// Getting Started
import HTMLIntroductionPage from '@/app/learn/html/introduction/page';
import HTMLBasicsPage from '@/app/learn/html/basics/page';
import HTMLStructurePage from '@/app/learn/html/structure/page';
import HTMLElementsPage from '@/app/learn/html/elements/page';
import HTMLCodeStylePage from '@/app/learn/html/code-style/page';

// Text and Content
import HTMLTextBasicsPage from '@/app/learn/html/text-basics/page';
import HTMLTextFormattingPage from '@/app/learn/html/text-formatting/page';
import HTMLTextElementsPage from '@/app/learn/html/text-elements/page';
import HTMLLinksPage from '@/app/learn/html/links/page';
import HTMLImagesPage from '@/app/learn/html/images/page';
import HTMLMediaPage from '@/app/learn/html/media/page';
import HTMLIframesPage from '@/app/learn/html/iframes/page';

// Lists and Tables
import HTMLListsPage from '@/app/learn/html/lists/page';
import HTMLTablesPage from '@/app/learn/html/tables/page';
import HTMLTableStructurePage from '@/app/learn/html/table-structure/page';

// Forms
import HTMLFormBasicsPage from '@/app/learn/html/form-basics/page';
import HTMLInputTypesPage from '@/app/learn/html/input-types/page';
import HTMLFormValidationPage from '@/app/learn/html/form-validation/page';

// Structure and Semantics
import HTMLPageStructurePage from '@/app/learn/html/page-structure/page';
import HTMLSemanticElementsPage from '@/app/learn/html/semantic-elements/page';
import HTMLPatternsPage from '@/app/learn/html/patterns/page';
import HTMLAccessibilityPage from '@/app/learn/html/accessibility/page';

// Advanced Features

import HTMLGraphicsPage from '@/app/learn/html/graphics/page';
import HTMLGeolocationPage from '@/app/learn/html/geolocation/page';
import HTMLStoragePage from '@/app/learn/html/storage/page';
import HTMLPerformancePage from '@/app/learn/html/performance/page';
import HTMLSEOPage from '@/app/learn/html/seo/page';

// Course Completion
import HTMLCompletedPage from '@/app/learn/html/completed/page';

function App() {
  return (
    <Router>
      <AuthProvider>
        <NotificationsProvider>
          <Routes>
            {/* Public Routes */}
            <Route
              path="/login"
              element={
                <ProtectedRoute requireAuth={false}>
                  <Login />
                </ProtectedRoute>
              }
            />

            {/* Protected Routes with Layout */}
            <Route
              element={
                <ProtectedRoute>
                  <ClientLayout />
                </ProtectedRoute>
              }
            >
              
              <Route path="/" element={<DashboardPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/learn" element={<LearnPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/community" element={<div className="p-8">Community Page</div>} />
              <Route path="/documentation" element={<div className="p-8">Documentation Page</div>} />
              <Route path="/recent-updates" element={<div className="p-8">Recent Updates Page</div>} />
              <Route path="/discussions" element={<div className="p-8">Discussions Page</div>} />
              <Route path="/settings" element={<div className="p-8">Settings Page</div>} />
              <Route path="/help" element={<div className="p-8">Help Center Page</div>} />
              <Route path="/learn/html" element={<HTMLCourseLayout />}>
                {/* Getting Started */}
                <Route index element={<HTMLIntroductionPage />} />
                <Route path="introduction" element={<HTMLIntroductionPage />} />
                <Route path="basics" element={<HTMLBasicsPage />} />
                <Route path="structure" element={<HTMLStructurePage />} />
                <Route path="elements" element={<HTMLElementsPage />} />
                <Route path="code-style" element={<HTMLCodeStylePage />} />
                
                {/* Text and Content */}
                <Route path="text-basics" element={<HTMLTextBasicsPage />} />
                <Route path="text-formatting" element={<HTMLTextFormattingPage />} />
                <Route path="text-elements" element={<HTMLTextElementsPage />} />
                <Route path="links" element={<HTMLLinksPage />} />
                <Route path="images" element={<HTMLImagesPage />} />
                <Route path="media" element={<HTMLMediaPage />} />
                <Route path="iframes" element={<HTMLIframesPage />} />
                
                {/* Lists and Tables */}
                <Route path="lists" element={<HTMLListsPage />} />
                <Route path="tables" element={<HTMLTablesPage />} />
                <Route path="table-structure" element={<HTMLTableStructurePage />} />
                
                {/* Forms */}
                <Route path="form-basics" element={<HTMLFormBasicsPage />} />
                <Route path="input-types" element={<HTMLInputTypesPage />} />
                <Route path="form-validation" element={<HTMLFormValidationPage />} />
                
                {/* Structure and Semantics */}
                <Route path="page-structure" element={<HTMLPageStructurePage />} />
                <Route path="semantic-elements" element={<HTMLSemanticElementsPage />} />
                <Route path="patterns" element={<HTMLPatternsPage />} />
                <Route path="accessibility" element={<HTMLAccessibilityPage />} />
                
                {/* Advanced Features */}
                
                <Route path="graphics" element={<HTMLGraphicsPage />} />
                <Route path="geolocation" element={<HTMLGeolocationPage />} />
                <Route path="storage" element={<HTMLStoragePage />} />
                <Route path="performance" element={<HTMLPerformancePage />} />
                <Route path="seo" element={<HTMLSEOPage />} />

                {/* Course Completion */}
                <Route path="completed" element={<HTMLCompletedPage />} />
              </Route>
            </Route>

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Toaster position="top-right" />
        </NotificationsProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
