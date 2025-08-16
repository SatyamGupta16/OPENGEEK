import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '@/components/layout/AdminLayout';
import LoginPage from '@/components/auth/LoginPage';
import Dashboard from '@/components/dashboard/Dashboard';
import UserList from '@/components/users/UserList';
import UserForm from '@/components/users/UserForm';
import ContentList from '@/components/content/ContentList';
import ContentForm from '@/components/content/ContentForm';
import BlogList from '@/components/blogs/BlogList';
import BlogForm from '@/components/blogs/BlogForm';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

// New enhanced components
import AdminUserList from '@/components/admin-users/AdminUserList';
import AdminUserForm from '@/components/admin-users/AdminUserForm';
import CommunityDashboard from '@/components/community/CommunityDashboard';
import CommunityPosts from '@/components/community/CommunityPosts';
import CommunityProjects from '@/components/community/CommunityProjects';
import CommunityUsers from '@/components/community/CommunityUsers';
import CommunityAnalytics from '@/components/community/CommunityAnalytics';
import ProfileSettings from '@/components/profile/ProfileSettings';
import ApiTest from '@/components/debug/ApiTest';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/admin/login" replace />} />
        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          
          {/* Legacy Community Users Management */}
          <Route path="users" element={<UserList />} />
          <Route path="users/add" element={<UserForm />} />
          <Route path="users/edit/:id" element={<UserForm />} />
          
          {/* Enhanced Admin User Management */}
          <Route path="admin-users" element={<AdminUserList />} />
          <Route path="admin-users/add" element={<AdminUserForm />} />
          <Route path="admin-users/edit/:id" element={<AdminUserForm />} />
          
          {/* Community Management */}
          <Route path="community" element={<CommunityDashboard />} />
          <Route path="community/posts" element={<CommunityPosts />} />
          <Route path="community/projects" element={<CommunityProjects />} />
          <Route path="community/users" element={<CommunityUsers />} />
          <Route path="community/analytics" element={<CommunityAnalytics />} />
          
          {/* Content Management */}
          <Route path="content" element={<ContentList />} />
          <Route path="content/add" element={<ContentForm />} />
          <Route path="content/edit/:id" element={<ContentForm />} />
          
          {/* Blog Management */}
          <Route path="blogs" element={<BlogList />} />
          <Route path="blogs/new" element={<BlogForm />} />
          <Route path="blogs/edit/:id" element={<BlogForm />} />
          
          {/* Profile Settings */}
          <Route path="profile" element={<ProfileSettings />} />
          
          {/* API Test (temporary) */}
          <Route path="api-test" element={<ApiTest />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App