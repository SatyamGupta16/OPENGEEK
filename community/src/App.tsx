import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './lib/auth-context';
import ClientLayout from './components/layout/ClientLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import './App.css';

// Import your existing Login component from platform
import Login from './app/login/Login';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          
          {/* Public route with client layout */}
          <Route element={<ClientLayout />}>
            <Route path="/" element={
              <div>
                <h1 className="text-3xl font-bold text-zinc-100 mb-8">
                  Welcome to OpenGeek Community
                </h1>
                <div className="bg-black rounded-lg border border-zinc-800 p-6">
                  <p className="text-zinc-400">
                    This is where the main content will go. The navbar is fixed at the top, and
                    the sidebar has a scrollable content area for navigation and channels.
                  </p>
                </div>
              </div>
            } />
          </Route>

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<ClientLayout />}>
              {/* Add protected routes here */}
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
