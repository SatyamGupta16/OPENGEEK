import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, Save, Shield, ShieldCheck, User } from 'lucide-react';
import axios from 'axios';

interface AdminUserFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: 'admin' | 'moderator';
  is_active: boolean;
}

const AdminUserForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const [formData, setFormData] = useState<AdminUserFormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'admin',
    is_active: true
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [currentUser, setCurrentUser] = useState<any>(null);

  const token = localStorage.getItem('admin_token');
  const axiosConfig = {
    headers: { Authorization: `Bearer ${token}` }
  };

  useEffect(() => {
    fetchCurrentUser();
    if (isEditing) {
      fetchAdminUser();
    }
  }, [id]);

  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get('/api/admin-users/profile', axiosConfig);
      setCurrentUser(response.data.data);
    } catch (error) {
      console.error('Error fetching current user:', error);
    }
  };

  const fetchAdminUser = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/admin-users/${id}`, axiosConfig);
      const user = response.data.data;
      setFormData({
        username: user.username,
        email: user.email,
        password: '',
        confirmPassword: '',
        role: user.role === 'super_admin' ? 'admin' : user.role,
        is_active: user.is_active
      });
    } catch (error: any) {
      setError(error.response?.data?.message || 'Error fetching admin user');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof AdminUserFormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setError('');
    setSuccess('');
  };

  const validateForm = () => {
    if (!formData.username.trim()) {
      setError('Username is required');
      return false;
    }

    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }

    if (!isEditing && !formData.password) {
      setError('Password is required');
      return false;
    }

    if (formData.password && formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      setLoading(true);
      setError('');

      const submitData: any = {
        username: formData.username.trim(),
        email: formData.email.trim(),
        role: formData.role,
        is_active: formData.is_active
      };

      if (formData.password) {
        submitData.password = formData.password;
      }

      if (isEditing) {
        await axios.put(`/api/admin-users/${id}`, submitData, axiosConfig);
        setSuccess('Admin user updated successfully');
      } else {
        await axios.post('/api/admin-users', submitData, axiosConfig);
        setSuccess('Admin user created successfully');
      }

      setTimeout(() => {
        navigate('/admin/admin-users');
      }, 1500);
    } catch (error: any) {
      setError(error.response?.data?.message || `Error ${isEditing ? 'updating' : 'creating'} admin user`);
    } finally {
      setLoading(false);
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Shield className="h-4 w-4 text-blue-500" />;
      case 'moderator':
        return <User className="h-4 w-4 text-green-500" />;
      default:
        return <User className="h-4 w-4 text-gray-500" />;
    }
  };

  const canEditRole = () => {
    return currentUser?.role === 'super_admin';
  };

  const canEditStatus = () => {
    return currentUser?.role === 'super_admin' && currentUser?.id !== parseInt(id || '0');
  };

  if (loading && isEditing) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={() => navigate('/admin/admin-users')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Admin Users
        </Button>
        <div>
          <h1 className="text-3xl font-bold">
            {isEditing ? 'Edit Admin User' : 'Create Admin User'}
          </h1>
          <p className="text-gray-600">
            {isEditing ? 'Update admin user details' : 'Add a new admin user to the system'}
          </p>
        </div>
      </div>

      {error && <ErrorMessage message={error} />}
      {success && (
        <Alert>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>
            {isEditing ? 'Edit Admin User' : 'Create New Admin User'}
          </CardTitle>
          <CardDescription>
            {isEditing 
              ? 'Update the admin user information below'
              : 'Fill in the details to create a new admin user'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="username">Username *</Label>
                <Input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  placeholder="Enter username"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter email address"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="password">
                  Password {!isEditing && '*'}
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder={isEditing ? 'Leave blank to keep current password' : 'Enter password (min 8 characters)'}
                  required={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">
                  Confirm Password {!isEditing && '*'}
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  placeholder="Confirm password"
                  required={!isEditing}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="role">Role *</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) => handleInputChange('role', value)}
                  disabled={!canEditRole()}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">
                      <div className="flex items-center space-x-2">
                        <Shield className="h-4 w-4 text-blue-500" />
                        <span>Admin</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="moderator">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-green-500" />
                        <span>Moderator</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                {!canEditRole() && (
                  <p className="text-sm text-gray-500">
                    Only super admins can change roles
                  </p>
                )}
              </div>

              {isEditing && (
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.is_active ? 'active' : 'inactive'}
                    onValueChange={(value) => handleInputChange('is_active', value === 'active')}
                    disabled={!canEditStatus()}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  {!canEditStatus() && (
                    <p className="text-sm text-gray-500">
                      Cannot change your own status
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Role Permissions:</h4>
              <div className="space-y-2 text-sm text-blue-800">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4" />
                  <span><strong>Admin:</strong> Full community management, user moderation, content approval</span>
                </div>
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span><strong>Moderator:</strong> Content moderation and basic user management only</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <LoadingSpinner />
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    {isEditing ? 'Update User' : 'Create User'}
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/admin/admin-users')}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUserForm;