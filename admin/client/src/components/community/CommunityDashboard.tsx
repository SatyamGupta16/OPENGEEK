import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  FileText, 
  FolderOpen, 
  TrendingUp, 
  Shield, 
  AlertTriangle,
  Eye,
  Pin,
  Archive,
  Trash2,
  CheckCircle,
  XCircle,
  Star
} from 'lucide-react';
import axios from 'axios';

interface CommunityStats {
  new_users: number;
  active_users: number;
  verified_users: number;
  new_posts: number;
  new_projects: number;
  new_comments: number;
  new_likes: number;
  avg_likes_per_post: number;
  avg_comments_per_post: number;
  archived_posts: number;
  pinned_posts: number;
  pending_projects: number;
  featured_projects: number;
}

interface Post {
  id: string;
  content: string;
  image_url?: string;
  likes_count: number;
  comments_count: number;
  is_pinned: boolean;
  is_archived: boolean;
  created_at: string;
  user_id: string;
  username: string;
  full_name: string;
  email: string;
  is_verified: boolean;
}

interface Project {
  id: string;
  title: string;
  description: string;
  github_url: string;
  live_url?: string;
  image_url?: string;
  tags: string[];
  language: string;
  stars_count: number;
  is_featured: boolean;
  is_approved: boolean;
  created_at: string;
  user_id: string;
  username: string;
  full_name: string;
  email: string;
  is_verified: boolean;
}

const CommunityDashboard = () => {
  const [stats, setStats] = useState<CommunityStats | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  const token = localStorage.getItem('admin_token');
  const axiosConfig = {
    headers: { Authorization: `Bearer ${token}` }
  };

  useEffect(() => {
    fetchCommunityData();
  }, []);

  const fetchCommunityData = async () => {
    try {
      setLoading(true);
      
      // Fetch analytics
      const analyticsResponse = await axios.get('/api/community/analytics?period=30', axiosConfig);
      setStats(analyticsResponse.data.data.summary);
      
      // Fetch recent posts
      const postsResponse = await axios.get('/api/community/posts?limit=10', axiosConfig);
      setPosts(postsResponse.data.data.posts);
      
      // Fetch recent projects
      const projectsResponse = await axios.get('/api/community/projects?limit=10', axiosConfig);
      setProjects(projectsResponse.data.data.projects);
      
    } catch (error) {
      console.error('Error fetching community data:', error);
    } finally {
      setLoading(false);
    }
  };

  const moderatePost = async (postId: string, action: string, reason?: string) => {
    try {
      await axios.put(`/api/community/posts/${postId}/moderate`, {
        action,
        reason
      }, axiosConfig);
      
      // Refresh posts
      const postsResponse = await axios.get('/api/community/posts?limit=10', axiosConfig);
      setPosts(postsResponse.data.data.posts);
      
      // Show success message
      alert(`Post ${action}ed successfully`);
    } catch (error) {
      console.error('Error moderating post:', error);
      alert('Error moderating post');
    }
  };

  const moderateProject = async (projectId: string, action: string, reason?: string) => {
    try {
      await axios.put(`/api/community/projects/${projectId}/moderate`, {
        action,
        reason
      }, axiosConfig);
      
      // Refresh projects
      const projectsResponse = await axios.get('/api/community/projects?limit=10', axiosConfig);
      setProjects(projectsResponse.data.data.projects);
      
      // Show success message
      alert(`Project ${action}ed successfully`);
    } catch (error) {
      console.error('Error moderating project:', error);
      alert('Error moderating project');
    }
  };

  const deletePost = async (postId: string) => {
    if (!confirm('Are you sure you want to permanently delete this post? This action cannot be undone.')) {
      return;
    }
    
    const reason = prompt('Please provide a reason for deletion:');
    
    try {
      await axios.delete(`/api/community/posts/${postId}`, {
        data: { reason },
        ...axiosConfig
      });
      
      // Refresh posts
      const postsResponse = await axios.get('/api/community/posts?limit=10', axiosConfig);
      setPosts(postsResponse.data.data.posts);
      
      alert('Post deleted successfully');
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Error deleting post');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Community Management</h1>
          <p className="text-gray-600">Monitor and moderate the OPENGEEK community</p>
        </div>
        <Button onClick={fetchCommunityData} variant="outline">
          Refresh Data
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.active_users || 0}</div>
                <p className="text-xs text-muted-foreground">
                  +{stats?.new_users || 0} new this month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Recent Posts</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.new_posts || 0}</div>
                <p className="text-xs text-muted-foreground">
                  {stats?.archived_posts || 0} archived, {stats?.pinned_posts || 0} pinned
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Projects</CardTitle>
                <FolderOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.new_projects || 0}</div>
                <p className="text-xs text-muted-foreground">
                  {stats?.pending_projects || 0} pending approval
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Engagement</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.new_likes || 0}</div>
                <p className="text-xs text-muted-foreground">
                  {stats?.new_comments || 0} comments this month
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Posts</CardTitle>
                <CardDescription>Latest posts from the community</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {posts.slice(0, 5).map((post) => (
                    <div key={post.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-sm">{post.full_name}</span>
                          {post.is_verified && <Badge variant="secondary" className="text-xs">Verified</Badge>}
                          {post.is_pinned && <Pin className="h-3 w-3 text-blue-500" />}
                          {post.is_archived && <Archive className="h-3 w-3 text-gray-500" />}
                        </div>
                        <p className="text-sm text-gray-600 truncate">{post.content}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                          <span>{post.likes_count} likes</span>
                          <span>{post.comments_count} comments</span>
                          <span>{new Date(post.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Projects</CardTitle>
                <CardDescription>Latest projects submitted</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projects.slice(0, 5).map((project) => (
                    <div key={project.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-sm">{project.title}</span>
                          {project.is_featured && <Star className="h-3 w-3 text-yellow-500" />}
                          {!project.is_approved && <AlertTriangle className="h-3 w-3 text-orange-500" />}
                        </div>
                        <p className="text-sm text-gray-600 truncate">{project.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                          <span>{project.language}</span>
                          <span>{project.stars_count} stars</span>
                          <span>by {project.username}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="posts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Post Management</CardTitle>
              <CardDescription>Moderate community posts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {posts.map((post) => (
                  <div key={post.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-medium">{post.full_name}</span>
                          <span className="text-sm text-gray-500">@{post.username}</span>
                          {post.is_verified && <Badge variant="secondary">Verified</Badge>}
                          {post.is_pinned && <Badge variant="default">Pinned</Badge>}
                          {post.is_archived && <Badge variant="destructive">Archived</Badge>}
                        </div>
                        <p className="text-sm mb-2">{post.content}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>{post.likes_count} likes</span>
                          <span>{post.comments_count} comments</span>
                          <span>{new Date(post.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => window.open(`/community/posts/${post.id}`, '_blank')}
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                        {!post.is_pinned ? (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => moderatePost(post.id, 'pin')}
                          >
                            <Pin className="h-3 w-3" />
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => moderatePost(post.id, 'unpin')}
                          >
                            <Pin className="h-3 w-3 text-blue-500" />
                          </Button>
                        )}
                        {!post.is_archived ? (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => moderatePost(post.id, 'archive')}
                          >
                            <Archive className="h-3 w-3" />
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => moderatePost(post.id, 'unarchive')}
                          >
                            <Archive className="h-3 w-3 text-gray-500" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => deletePost(post.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Management</CardTitle>
              <CardDescription>Review and moderate community projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-medium">{project.title}</span>
                          {project.is_featured && <Badge variant="default">Featured</Badge>}
                          {project.is_approved ? (
                            <Badge variant="secondary">Approved</Badge>
                          ) : (
                            <Badge variant="destructive">Pending</Badge>
                          )}
                        </div>
                        <p className="text-sm mb-2">{project.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500 mb-2">
                          <span>{project.language}</span>
                          <span>{project.stars_count} stars</span>
                          <span>by {project.username}</span>
                          <span>{new Date(project.created_at).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => window.open(project.github_url, '_blank')}
                          >
                            GitHub
                          </Button>
                          {project.live_url && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => window.open(project.live_url, '_blank')}
                            >
                              Live Demo
                            </Button>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {!project.is_approved ? (
                          <Button
                            size="sm"
                            variant="default"
                            onClick={() => moderateProject(project.id, 'approve')}
                          >
                            <CheckCircle className="h-3 w-3" />
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => moderateProject(project.id, 'reject')}
                          >
                            <XCircle className="h-3 w-3" />
                          </Button>
                        )}
                        {!project.is_featured ? (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => moderateProject(project.id, 'feature')}
                          >
                            <Star className="h-3 w-3" />
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => moderateProject(project.id, 'unfeature')}
                          >
                            <Star className="h-3 w-3 text-yellow-500" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>User Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Active Users:</span>
                    <span className="font-medium">{stats?.active_users || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Verified Users:</span>
                    <span className="font-medium">{stats?.verified_users || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>New Users (30d):</span>
                    <span className="font-medium">{stats?.new_users || 0}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Content Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>New Posts (30d):</span>
                    <span className="font-medium">{stats?.new_posts || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>New Projects (30d):</span>
                    <span className="font-medium">{stats?.new_projects || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>New Comments (30d):</span>
                    <span className="font-medium">{stats?.new_comments || 0}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Engagement Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>New Likes (30d):</span>
                    <span className="font-medium">{stats?.new_likes || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Avg Likes/Post:</span>
                    <span className="font-medium">{Math.round(stats?.avg_likes_per_post || 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Avg Comments/Post:</span>
                    <span className="font-medium">{Math.round(stats?.avg_comments_per_post || 0)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommunityDashboard;