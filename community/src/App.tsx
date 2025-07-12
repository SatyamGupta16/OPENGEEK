import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './lib/auth-context';
import ClientLayout from './components/layout/ClientLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Home from './components/Home';
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
            <Route path="/" element={<Home />} />
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
