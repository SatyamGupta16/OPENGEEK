import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './lib/auth-context';
import { NotificationsProvider } from './lib/notifications-context';
import { Toaster } from 'sonner';
import ClientLayout from './components/layout/ClientLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Home from './components/Home';
import ProjectShowcase from './components/ProjectShowcase';
import './App.css';

// Import your existing Login component from platform
import Login from './app/login/Login';

function App() {
  return (
    <AuthProvider>
      <NotificationsProvider>
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            
            {/* Public route with client layout */}
            <Route element={<ClientLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<ProjectShowcase />} />
            </Route>

            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route element={<ClientLayout />}>
                {/* Add protected routes here */}
              </Route>
            </Route>
          </Routes>
        </Router>
        <Toaster position="top-right" theme="dark" />
      </NotificationsProvider>
    </AuthProvider>
  );
}

export default App;
