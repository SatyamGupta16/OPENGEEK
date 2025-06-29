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

function App() {
  return (
    <AuthProvider>
      <Router>
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
            <Route path="/learn" element={<LearnPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/community" element={<div className="p-8">Community Page</div>} />
            <Route path="/documentation" element={<div className="p-8">Documentation Page</div>} />
            <Route path="/recent-updates" element={<div className="p-8">Recent Updates Page</div>} />
            <Route path="/discussions" element={<div className="p-8">Discussions Page</div>} />
            <Route path="/settings" element={<div className="p-8">Settings Page</div>} />
            <Route path="/help" element={<div className="p-8">Help Center Page</div>} />
          </Route>

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster position="top-right" />
      </Router>
    </AuthProvider>
  );
}

export default App;
