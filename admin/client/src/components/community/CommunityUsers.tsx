import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';
import { 
  CheckCircle, 
  XCircle, 
  Eye,
  Search,
  Filter,
  RefreshCw,
  Calendar,
  User,
  Mail,
  MapPin,
  Github,
  Activity
} from 'lucide-react';
import axios from 'axios';

interface CommunityUser {
  id: string;
  email: string;
  username: string;
  full_name: string;
  first_name: string;
  last_name: string;
  bio?: string;
  location?: string;
  github_username?: string;
  is_verified: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  stats?: {
    postsCount: number;
    projectsCount: number;
  };
}

interface UserActivity {
  user: CommunityUser;
  recent_posts: any[];
  recent_projects: any[];
  recent_comments: any[];
  stats: {
    total_posts: number;
    total_projects: number;
    total_comments: number;
    total_likes_given: number;
    total_likes_received: number;
  };
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

const CommunityUsers = () => {
  const [users, setUsers] = useState<CommunityUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState<UserActivity | null>(null);
  const [activityLoading, setActivityLoading] = useState(false);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0
  });

  const token = localStorage.getItem('admin_token');
  const axiosConfig = {
    headers: { Authorization: `Bearer ${token}` }
  };

  useEffect(() => {
    fetchUsers();
  }, [pagination.page, statusFilter, searchTerm]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
      });

      if (searchTerm.trim()) {
        params.append('search', searchTerm.trim());
      }

      // Use the legacy users endpoint for community users
      const response = await axios.get(`/users?${params}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setUsers(response.data.data);
      // Note: Legacy endpoint might not have pagination info
      setPagination(prev => ({
        ...prev,
        total: response.data.data.length
      }));
    } catch (error: any) {
      setError(error.response?.data?.message || 'Error fetching users');
    } finally {
      setLoading(false);
    }
  };

  const fetchUserActivity = async (userId: string) => {
    try {
      setActivityLoading(true);
      const response = await axios.get(`/api/community/users/${userId}/activity`, axiosConfig);
      setSelectedUser(response.data.data);
    } catch (error: any) {
      setError(error.response?.data?.message || 'Error fetching user activity');
    } finally {
      setActivityLoading(false);
    }
  };

  const handleModerateUser = async (user: CommunityUser, action: string) => {
    const reason = prompt(`Please provide a reason for ${action}ing this user:`);
    if (reason === null) return; // User cancelled

    try {
      await axios.put(`/api/community/users/${user.id}/moderate`, {
        action,
        reason
      }, axiosConfig);

      // Update the user in the list
      setUsers(users.map(u => 
        u.id === user.id 
          ? { 
              ...u, 
              is_verified: action === 'verify' ? true : action === 'unverify' ? false : u.is_verified,
              is_active: action === 'activate' ? true : action === 'deactivate' ? false : u.is_active
            }
          : u
      ));
    } catch (error: any) {
      setError(error.response?.data?.message || `Error ${action}ing user`);
    }
  };

  const getStatusBadge = (user: CommunityUser) => {
    if (!user.is_active) {
      return <Badge variant="destructive">Inactive</Badge>;
    }
    if (user.is_verified) {
      return <Badge variant="default">Verified</Badge>;
    }
    return <Badge variant="secondary">Active</Badge>;
  };

  const filteredUsers = users.filter(user => {
    if (statusFilter === 'verified' && !user.is_verified) return false;
    if (statusFilter === 'unverified' && user.is_verified) return false;
    if (statusFilter === 'inactive' && user.is_active) return false;
    if (statusFilter === 'active' && !user.is_active) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Community Users</h1>
          <p className="text-gray-600">Manage and moderate community members</p>
        </div>
        <Button onClick={fetchUsers} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {error && <ErrorMessage message={error} />}

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Filters</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search users by name, username, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-full md:w-48">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  <SelectItem value="active">Active Only</SelectItem>
                  <SelectItem value="inactive">Inactive Only</SelectItem>
                  <SelectItem value="verified">Verified Only</SelectItem>
                  <SelectItem value="unverified">Unverified Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Users List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Users ({filteredUsers.length})</CardTitle>
              <CardDescription>
                Community members and their status
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <LoadingSpinner />
              ) : (
                <div className="space-y-4">
                  {filteredUsers.map((user) => (
                    <div key={user.id} className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 space-y-2">
                          {/* User Header */}
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-2">
                              <User className="h-4 w-4 text-gray-500" />
                              <span className="font-medium">{user.full_name || user.username}</span>
                              <span className="text-sm text-gray-500">@{user.username}</span>
                            </div>
                            {getStatusBadge(user)}
                          </div>

                          {/* User Details */}
                          <div className="space-y-1 text-sm text-gray-600">
                            <div className="flex items-center space-x-2">
                              <Mail className="h-3 w-3" />
                              <span>{user.email}</span>
                            </div>
                            {user.location && (
                              <div className="flex items-center space-x-2">
                                <MapPin className="h-3 w-3" />
                                <span>{user.location}</span>
                              </div>
                            )}
                            {user.github_username && (
                              <div className="flex items-center space-x-2">
                                <Github className="h-3 w-3" />
                                <span>@{user.github_username}</span>
                              </div>
                            )}
                            <div className="flex items-center space-x-2">
                              <Calendar className="h-3 w-3" />
                              <span>Joined {new Date(user.created_at).toLocaleDateString()}</span>
                            </div>
                          </div>

                          {/* User Bio */}
                          {user.bio && (
                            <p className="text-sm text-gray-700 mt-2">{user.bio}</p>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col space-y-2 ml-4">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => fetchUserActivity(user.id)}
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            View Activity
                          </Button>

                          {!user.is_verified ? (
                            <Button
                              size="sm"
                              variant="default"
                              onClick={() => handleModerateUser(user, 'verify')}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Verify
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleModerateUser(user, 'unverify')}
                            >
                              <XCircle className="h-3 w-3 mr-1" />
                              Unverify
                            </Button>
                          )}

                          {user.is_active ? (
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleModerateUser(user, 'deactivate')}
                            >
                              Deactivate
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              variant="default"
                              onClick={() => handleModerateUser(user, 'activate')}
                            >
                              Activate
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {filteredUsers.length === 0 && !loading && (
                    <div className="text-center py-8 text-gray-500">
                      No users found matching your criteria
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* User Activity Panel */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>User Activity</span>
              </CardTitle>
              <CardDescription>
                {selectedUser ? `Activity for ${selectedUser.user.full_name}` : 'Select a user to view activity'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {activityLoading ? (
                <LoadingSpinner />
              ) : selectedUser ? (
                <div className="space-y-4">
                  {/* Activity Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {selectedUser.stats.total_posts}
                      </div>
                      <div className="text-sm text-blue-600">Posts</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {selectedUser.stats.total_projects}
                      </div>
                      <div className="text-sm text-green-600">Projects</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">
                        {selectedUser.stats.total_comments}
                      </div>
                      <div className="text-sm text-purple-600">Comments</div>
                    </div>
                    <div className="text-center p-3 bg-red-50 rounded-lg">
                      <div className="text-2xl font-bold text-red-600">
                        {selectedUser.stats.total_likes_received}
                      </div>
                      <div className="text-sm text-red-600">Likes Received</div>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="space-y-3">
                    <h4 className="font-medium">Recent Posts</h4>
                    {selectedUser.recent_posts.length > 0 ? (
                      <div className="space-y-2">
                        {selectedUser.recent_posts.slice(0, 3).map((post, index) => (
                          <div key={index} className="text-sm p-2 bg-gray-50 rounded">
                            <p className="truncate">{post.content}</p>
                            <div className="text-xs text-gray-500 mt-1">
                              {post.likes_count} likes • {post.comments_count} comments
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">No recent posts</p>
                    )}

                    <h4 className="font-medium">Recent Projects</h4>
                    {selectedUser.recent_projects.length > 0 ? (
                      <div className="space-y-2">
                        {selectedUser.recent_projects.slice(0, 3).map((project, index) => (
                          <div key={index} className="text-sm p-2 bg-gray-50 rounded">
                            <p className="font-medium truncate">{project.title}</p>
                            <p className="text-xs text-gray-600 truncate">{project.description}</p>
                            <div className="text-xs text-gray-500 mt-1">
                              {project.language} • {project.stars_count} stars
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">No recent projects</p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Click "View Activity" on any user to see their detailed activity
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CommunityUsers;