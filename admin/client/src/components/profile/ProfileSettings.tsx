import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  User, 
  Mail, 
  Shield, 
  ShieldCheck, 
  Save, 
  Key,
  Clock,
  Calendar
} from 'lucide-react';
import axios from 'axios';

interface AdminProfile {
  id: number;
  username: string;
  email: string;
  role: 'super_admin' | 'admin' | 'moderator';
  is_active: boolean;
  created_at: string;
  last_login?: string;
  last_activity?: string;
}

interface PasswordChangeData {
  current_password: string;
  new_password: string;
  confirm_password: string;
}

const ProfileSettings = () => {
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [passwordData, setPasswordData] = useState<PasswordChangeData>({
    current_password: '',
    new_password: '',
    confirm_password: ''
  });
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  const token = localStorage.getItem('admin_token');
  const axiosConfig = {
    headers: { Authorization: `Bearer ${token}` }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/admin-users/profile', axiosConfig);
      setProfile(response.data.data);
    } catch (error: any) {
      setError(error.response?.data?.message || 'Error fetching profile');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!passwordData.current_password || !passwordData.new_password || !passwordData.confirm_password) {
      setPasswordError('All password fields are required');
      return;
    }

    if (passwordData.new_password.length < 8) {
      setPasswordError('New password must be at least 8 characters long');
      return;
    }

    if (passwordData.new_password !== passwordData.confirm_password) {
      setPasswordError('New passwords do not match');
      return;
    }

    try {
      setPasswordLoading(true);
      setPasswordError('');

      await axios.put(`/api/admin-users/${profile?.id}/password`, {
        current_password: passwordData.current_password,
        new_password: passwordData.new_password
      }, axiosConfig);

      setPasswordSuccess('Password changed successfully');
      setPasswordData({
        current_password: '',
        new_password: '',
        confirm_password: ''
      });

      setTimeout(() => setPasswordSuccess(''), 5000);
    } catch (error: any) {
      setPasswordError(error.response?.data?.message || 'Error changing password');
    } finally {
      setPasswordLoading(false);
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'super_admin':
        return <ShieldCheck className="h-5 w-5 text-red-500" />;
      case 'admin':
        return <Shield className="h-5 w-5 text-blue-500" />;
      case 'moderator':
        return <User className="h-5 w-5 text-green-500" />;
      default:
        return <User className="h-5 w-5 text-gray-500" />;
    }
  };

  const getRoleBadge = (role: string) => {
    const variants = {
      super_admin: 'destructive',
      admin: 'default',
      moderator: 'secondary'
    } as const;
    
    return (
      <Badge variant={variants[role as keyof typeof variants] || 'outline'}>
        {role.replace('_', ' ').toUpperCase()}
      </Badge>
    );
  };

  const getRoleDescription = (role: string) => {
    switch (role) {
      case 'super_admin':
        return 'Full system access including admin user management';
      case 'admin':
        return 'Community management and user moderation';
      case 'moderator':
        return 'Content moderation and basic user management';
      default:
        return 'Limited access';
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Profile Settings</h1>
        <p className="text-gray-600">Manage your admin account settings</p>
      </div>

      {error && <ErrorMessage message={error} />}
      {success && (
        <Alert>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      {profile && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Profile Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Profile Information</span>
              </CardTitle>
              <CardDescription>
                Your admin account details and permissions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* User Details */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  {getRoleIcon(profile.role)}
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <span className="font-semibold text-lg">{profile.username}</span>
                      {getRoleBadge(profile.role)}
                    </div>
                    <p className="text-sm text-gray-600">{getRoleDescription(profile.role)}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{profile.email}</span>
                </div>
              </div>

              {/* Account Status */}
              <div className="space-y-3">
                <h4 className="font-medium">Account Status</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Status:</span>
                    <Badge variant={profile.is_active ? 'secondary' : 'destructive'}>
                      {profile.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Account Created:</span>
                    <div className="flex items-center space-x-1 text-sm">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(profile.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                  {profile.last_login && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Last Login:</span>
                      <div className="flex items-center space-x-1 text-sm">
                        <Clock className="h-3 w-3" />
                        <span>{new Date(profile.last_login).toLocaleDateString()}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Role Permissions */}
              <div className="space-y-3">
                <h4 className="font-medium">Permissions</h4>
                <div className="space-y-2 text-sm">
                  {profile.role === 'super_admin' && (
                    <>
                      <div className="flex items-center space-x-2 text-green-600">
                        <span>✓</span>
                        <span>Manage admin users</span>
                      </div>
                      <div className="flex items-center space-x-2 text-green-600">
                        <span>✓</span>
                        <span>Full community management</span>
                      </div>
                      <div className="flex items-center space-x-2 text-green-600">
                        <span>✓</span>
                        <span>System configuration</span>
                      </div>
                    </>
                  )}
                  {(profile.role === 'admin' || profile.role === 'super_admin') && (
                    <>
                      <div className="flex items-center space-x-2 text-green-600">
                        <span>✓</span>
                        <span>User management</span>
                      </div>
                      <div className="flex items-center space-x-2 text-green-600">
                        <span>✓</span>
                        <span>Content moderation</span>
                      </div>
                      <div className="flex items-center space-x-2 text-green-600">
                        <span>✓</span>
                        <span>Analytics access</span>
                      </div>
                    </>
                  )}
                  {profile.role === 'moderator' && (
                    <>
                      <div className="flex items-center space-x-2 text-green-600">
                        <span>✓</span>
                        <span>Content moderation</span>
                      </div>
                      <div className="flex items-center space-x-2 text-green-600">
                        <span>✓</span>
                        <span>Basic user actions</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-500">
                        <span>✗</span>
                        <span>User management</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Change Password */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Key className="h-5 w-5" />
                <span>Change Password</span>
              </CardTitle>
              <CardDescription>
                Update your account password for security
              </CardDescription>
            </CardHeader>
            <CardContent>
              {passwordError && <ErrorMessage message={passwordError} />}
              {passwordSuccess && (
                <Alert className="mb-4">
                  <AlertDescription>{passwordSuccess}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current_password">Current Password *</Label>
                  <Input
                    id="current_password"
                    type="password"
                    value={passwordData.current_password}
                    onChange={(e) => setPasswordData(prev => ({
                      ...prev,
                      current_password: e.target.value
                    }))}
                    placeholder="Enter your current password"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new_password">New Password *</Label>
                  <Input
                    id="new_password"
                    type="password"
                    value={passwordData.new_password}
                    onChange={(e) => setPasswordData(prev => ({
                      ...prev,
                      new_password: e.target.value
                    }))}
                    placeholder="Enter new password (min 8 characters)"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm_password">Confirm New Password *</Label>
                  <Input
                    id="confirm_password"
                    type="password"
                    value={passwordData.confirm_password}
                    onChange={(e) => setPasswordData(prev => ({
                      ...prev,
                      confirm_password: e.target.value
                    }))}
                    placeholder="Confirm your new password"
                    required
                  />
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Password Requirements:</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• At least 8 characters long</li>
                    <li>• Use a strong, unique password</li>
                    <li>• Don't reuse previous passwords</li>
                  </ul>
                </div>

                <Button type="submit" disabled={passwordLoading} className="w-full">
                  {passwordLoading ? (
                    <LoadingSpinner />
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Change Password
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ProfileSettings;