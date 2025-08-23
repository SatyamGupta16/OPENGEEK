import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import axios from 'axios';

interface UserFormProps {
  user?: {
    id: string;
    email: string;
    username: string;
    full_name: string;
    first_name: string;
    last_name: string;
    bio: string;
    location: string;
    github_username: string;
    is_verified: boolean;
    is_active: boolean;
  };
  isEditing?: boolean;
}

const UserForm = ({ user, isEditing = false }: UserFormProps) => {
  const [email, setEmail] = useState(user?.email || '');
  const [username, setUsername] = useState(user?.username || '');
  const [firstName, setFirstName] = useState(user?.first_name || '');
  const [lastName, setLastName] = useState(user?.last_name || '');
  const [fullName, setFullName] = useState(user?.full_name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [location, setLocation] = useState(user?.location || '');
  const [githubUsername, setGithubUsername] = useState(user?.github_username || '');
  const [isVerified, setIsVerified] = useState(user?.is_verified || false);
  const [isActive, setIsActive] = useState(user?.is_active !== undefined ? user.is_active : true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const params = useParams();
  const effectiveEditing = isEditing || Boolean(params.id);

  // If editing via route, fetch the user details
  useEffect(() => {
    const fetchUser = async () => {
      if (!effectiveEditing || user) return;
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        if (!apiUrl) throw new Error('VITE_API_URL is not configured');
        const token = localStorage.getItem('admin_token');
        if (!token) throw new Error('Missing admin token. Please login again.');
        const id = params.id as string;
        const res = await axios.get(`${apiUrl}/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
          timeout: 10000,
        });
        if (res.data?.success && res.data.data) {
          setEmail(res.data.data.email || '');
          setUsername(res.data.data.username || '');
          setFirstName(res.data.data.first_name || '');
          setLastName(res.data.data.last_name || '');
          setFullName(res.data.data.full_name || '');
          setBio(res.data.data.bio || '');
          setLocation(res.data.data.location || '');
          setGithubUsername(res.data.data.github_username || '');
          setIsVerified(res.data.data.is_verified || false);
          setIsActive(res.data.data.is_active !== undefined ? res.data.data.is_active : true);
        }
      } catch (err: any) {
        console.error('Failed to load user:', err);
        setError(err.response?.data?.message || err.message || 'Failed to load user');
      }
    };
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [effectiveEditing, params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      if (!apiUrl) throw new Error('VITE_API_URL is not configured');
      const token = localStorage.getItem('admin_token');
      if (!token) throw new Error('Missing admin token. Please login again.');

      if (effectiveEditing) {
        const id = (user?.id ?? params.id) as string;
        const response = await axios.put(`${apiUrl}/users/${id}`, {
          email,
          username,
          first_name: firstName,
          last_name: lastName,
          full_name: fullName,
          bio,
          location,
          github_username: githubUsername,
          is_verified: isVerified,
          is_active: isActive,
        }, {
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
          timeout: 10000,
        });
        if (response.data.success) {
          navigate('/admin/users');
        } else {
          setError(response.data.message || 'Update failed');
        }
      } else {
        const response = await axios.post(`${apiUrl}/users`, {
          email,
          username,
          first_name: firstName,
          last_name: lastName,
          full_name: fullName,
          bio,
          location,
          github_username: githubUsername,
        }, {
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
          timeout: 10000,
        });
        if (response.data.success) {
          navigate('/admin/users');
        } else {
          setError(response.data.message || 'Create failed');
        }
      }
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Operation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{isEditing ? 'Edit User' : 'Add User'} </CardTitle>
          <CardDescription>
            {isEditing ? 'Update user details' : 'Create a new user account'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Input
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us about yourself..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. San Francisco, CA"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="githubUsername">GitHub Username</Label>
                <Input
                  id="githubUsername"
                  value={githubUsername}
                  onChange={(e) => setGithubUsername(e.target.value)}
                  placeholder="github-username"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="isVerified">Verified Status</Label>
                <Select value={isVerified.toString()} onValueChange={(value) => setIsVerified(value === 'true')}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select verification status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="false">Not Verified</SelectItem>
                    <SelectItem value="true">Verified</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="isActive">Account Status</Label>
                <Select value={isActive.toString()} onValueChange={(value) => setIsActive(value === 'true')}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select account status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Active</SelectItem>
                    <SelectItem value="false">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button type="submit" disabled={loading}>
                {loading ? 'Saving...' : (isEditing ? 'Update User' : 'Add User')}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate('/admin/users')}
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

export default UserForm;
