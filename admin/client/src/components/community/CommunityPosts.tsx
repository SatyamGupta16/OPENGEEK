import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';
import { 
  Pin, 
  Archive, 
  Trash2, 
  Eye, 
  Search,
  Filter,
  RefreshCw,
  MessageCircle,
  Heart,
  Calendar,
  User
} from 'lucide-react';
import axios from 'axios';

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
  actual_likes: number;
  actual_comments: number;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

const CommunityPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0
  });
  const [deletePost, setDeletePost] = useState<Post | null>(null);
  const [moderatePost, setModeratePost] = useState<{ post: Post; action: string } | null>(null);

  const token = localStorage.getItem('admin_token');
  const axiosConfig = {
    headers: { Authorization: `Bearer ${token}` }
  };

  useEffect(() => {
    fetchPosts();
  }, [pagination.page, statusFilter, searchTerm]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
      });

      if (statusFilter !== 'all') {
        params.append('status', statusFilter);
      }

      if (searchTerm.trim()) {
        params.append('search', searchTerm.trim());
      }

      const response = await axios.get(`/api/community/posts?${params}`, axiosConfig);
      setPosts(response.data.data.posts);
      setPagination(prev => ({
        ...prev,
        ...response.data.data.pagination
      }));
    } catch (error: any) {
      setError(error.response?.data?.message || 'Error fetching posts');
    } finally {
      setLoading(false);
    }
  };

  const handleModeratePost = async (post: Post, action: string) => {
    const reason = prompt(`Please provide a reason for ${action}ing this post:`);
    if (reason === null) return; // User cancelled

    try {
      await axios.put(`/api/community/posts/${post.id}/moderate`, {
        action,
        reason
      }, axiosConfig);

      // Update the post in the list
      setPosts(posts.map(p => 
        p.id === post.id 
          ? { 
              ...p, 
              is_pinned: action === 'pin' ? true : action === 'unpin' ? false : p.is_pinned,
              is_archived: action === 'archive' ? true : action === 'unarchive' ? false : p.is_archived
            }
          : p
      ));

      setModeratePost(null);
    } catch (error: any) {
      setError(error.response?.data?.message || `Error ${action}ing post`);
    }
  };

  const handleDeletePost = async (post: Post) => {
    const reason = prompt('Please provide a reason for deleting this post:');
    if (reason === null) return; // User cancelled

    try {
      await axios.delete(`/api/community/posts/${post.id}`, {
        data: { reason },
        ...axiosConfig
      });

      setPosts(posts.filter(p => p.id !== post.id));
      setDeletePost(null);
    } catch (error: any) {
      setError(error.response?.data?.message || 'Error deleting post');
    }
  };

  const truncateContent = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  const getStatusBadge = (post: Post) => {
    if (post.is_archived) {
      return <Badge variant="destructive">Archived</Badge>;
    }
    if (post.is_pinned) {
      return <Badge variant="default">Pinned</Badge>;
    }
    return <Badge variant="secondary">Active</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Community Posts</h1>
          <p className="text-gray-600">Moderate and manage community posts</p>
        </div>
        <Button onClick={fetchPosts} variant="outline">
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
                  placeholder="Search posts, users, or content..."
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
                  <SelectItem value="all">All Posts</SelectItem>
                  <SelectItem value="active">Active Only</SelectItem>
                  <SelectItem value="archived">Archived Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Posts List */}
      <Card>
        <CardHeader>
          <CardTitle>Posts ({pagination.total})</CardTitle>
          <CardDescription>
            Showing {posts.length} of {pagination.total} posts
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <div key={post.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-3">
                      {/* User Info */}
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-gray-500" />
                          <span className="font-medium">{post.full_name}</span>
                          <span className="text-sm text-gray-500">@{post.username}</span>
                          {post.is_verified && (
                            <Badge variant="secondary" className="text-xs">Verified</Badge>
                          )}
                        </div>
                        {getStatusBadge(post)}
                      </div>

                      {/* Post Content */}
                      <div className="space-y-2">
                        <p className="text-gray-800">{truncateContent(post.content)}</p>
                        {post.image_url && (
                          <div className="text-sm text-gray-500">
                            📷 Contains image
                          </div>
                        )}
                      </div>

                      {/* Post Stats */}
                      <div className="flex items-center space-x-6 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Heart className="h-4 w-4" />
                          <span>{post.actual_likes || post.likes_count} likes</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="h-4 w-4" />
                          <span>{post.actual_comments || post.comments_count} comments</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(post.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-2 ml-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(`/community/posts/${post.id}`, '_blank')}
                        title="View Post"
                      >
                        <Eye className="h-3 w-3" />
                      </Button>

                      {!post.is_pinned ? (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleModeratePost(post, 'pin')}
                          title="Pin Post"
                        >
                          <Pin className="h-3 w-3" />
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleModeratePost(post, 'unpin')}
                          title="Unpin Post"
                          className="text-blue-600"
                        >
                          <Pin className="h-3 w-3" />
                        </Button>
                      )}

                      {!post.is_archived ? (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleModeratePost(post, 'archive')}
                          title="Archive Post"
                        >
                          <Archive className="h-3 w-3" />
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleModeratePost(post, 'unarchive')}
                          title="Unarchive Post"
                          className="text-green-600"
                        >
                          <Archive className="h-3 w-3" />
                        </Button>
                      )}

                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => setDeletePost(post)}
                        title="Delete Post"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              {posts.length === 0 && !loading && (
                <div className="text-center py-8 text-gray-500">
                  No posts found matching your criteria
                </div>
              )}
            </div>
          )}

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-gray-500">
                Page {pagination.page} of {pagination.totalPages}
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                  disabled={pagination.page <= 1}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                  disabled={pagination.page >= pagination.totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!deletePost}
        onClose={() => setDeletePost(null)}
        onConfirm={() => deletePost && handleDeletePost(deletePost)}
        title="Delete Post"
        description={`Are you sure you want to permanently delete this post? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
};

export default CommunityPosts;