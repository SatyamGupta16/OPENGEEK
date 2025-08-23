import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';
import { 
  TrendingUp, 
  Users, 
  FileText, 
  FolderOpen,
  Heart,
  MessageCircle,
  RefreshCw,
  Calendar,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';
import axios from 'axios';

interface AnalyticsData {
  summary: {
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
  };
  daily_activity: Array<{
    date: string;
    posts: number;
    projects: number;
    users: number;
  }>;
  period: string;
}

const CommunityAnalytics = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [period, setPeriod] = useState('30');

  const token = localStorage.getItem('admin_token');
  const axiosConfig = {
    headers: { Authorization: `Bearer ${token}` }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [period]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/community/analytics?period=${period}`, axiosConfig);
      setAnalytics(response.data.data);
    } catch (error: any) {
      setError(error.response?.data?.message || 'Error fetching analytics');
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const getGrowthIndicator = (current: number, comparison: number) => {
    if (comparison === 0) return { percentage: 0, isPositive: true };
    const percentage = ((current - comparison) / comparison) * 100;
    return { percentage: Math.abs(percentage), isPositive: percentage >= 0 };
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Community Analytics</h1>
          <p className="text-gray-600">Insights and metrics for the OPENGEEK community</p>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="365">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={fetchAnalytics} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {error && <ErrorMessage message={error} />}

      {analytics && (
        <>
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">New Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatNumber(analytics.summary.new_users)}</div>
                <p className="text-xs text-muted-foreground">
                  {analytics.summary.active_users} total active users
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">New Posts</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatNumber(analytics.summary.new_posts)}</div>
                <p className="text-xs text-muted-foreground">
                  {analytics.summary.pinned_posts} pinned, {analytics.summary.archived_posts} archived
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">New Projects</CardTitle>
                <FolderOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatNumber(analytics.summary.new_projects)}</div>
                <p className="text-xs text-muted-foreground">
                  {analytics.summary.pending_projects} pending approval
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Engagement</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatNumber(analytics.summary.new_likes)}</div>
                <p className="text-xs text-muted-foreground">
                  {formatNumber(analytics.summary.new_comments)} new comments
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* User Analytics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>User Analytics</span>
                </CardTitle>
                <CardDescription>User growth and engagement metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <div className="font-medium">Active Users</div>
                      <div className="text-sm text-gray-600">Currently active members</div>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">
                      {formatNumber(analytics.summary.active_users)}
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <div className="font-medium">Verified Users</div>
                      <div className="text-sm text-gray-600">Users with verified status</div>
                    </div>
                    <div className="text-2xl font-bold text-green-600">
                      {formatNumber(analytics.summary.verified_users)}
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div>
                      <div className="font-medium">New Users ({period} days)</div>
                      <div className="text-sm text-gray-600">Recent registrations</div>
                    </div>
                    <div className="text-2xl font-bold text-purple-600">
                      {formatNumber(analytics.summary.new_users)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Content Analytics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Content Analytics</span>
                </CardTitle>
                <CardDescription>Content creation and moderation metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {formatNumber(analytics.summary.new_posts)}
                      </div>
                      <div className="text-sm text-blue-600">New Posts</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {formatNumber(analytics.summary.new_projects)}
                      </div>
                      <div className="text-sm text-green-600">New Projects</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Pinned Posts</span>
                      <span className="font-medium">{analytics.summary.pinned_posts}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Archived Posts</span>
                      <span className="font-medium">{analytics.summary.archived_posts}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Pending Projects</span>
                      <span className="font-medium text-orange-600">{analytics.summary.pending_projects}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Featured Projects</span>
                      <span className="font-medium text-yellow-600">{analytics.summary.featured_projects}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Engagement Analytics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="h-5 w-5" />
                  <span>Engagement Analytics</span>
                </CardTitle>
                <CardDescription>User interaction and engagement metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-red-50 rounded-lg">
                      <div className="text-2xl font-bold text-red-600">
                        {formatNumber(analytics.summary.new_likes)}
                      </div>
                      <div className="text-sm text-red-600">New Likes</div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {formatNumber(analytics.summary.new_comments)}
                      </div>
                      <div className="text-sm text-blue-600">New Comments</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Heart className="h-4 w-4 text-red-500" />
                        <span className="text-sm">Avg Likes per Post</span>
                      </div>
                      <span className="font-medium">
                        {Math.round(analytics.summary.avg_likes_per_post || 0)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <MessageCircle className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">Avg Comments per Post</span>
                      </div>
                      <span className="font-medium">
                        {Math.round(analytics.summary.avg_comments_per_post || 0)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Daily Activity Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5" />
                  <span>Daily Activity</span>
                </CardTitle>
                <CardDescription>Recent daily activity breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.daily_activity.slice(0, 7).map((day, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          {new Date(day.date).toLocaleDateString()}
                        </span>
                        <span className="text-sm text-gray-500">
                          Total: {day.posts + day.projects + day.users}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <div className="flex-1 bg-blue-100 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: `${Math.max((day.posts / Math.max(day.posts + day.projects + day.users, 1)) * 100, 5)}%` }}
                          ></div>
                        </div>
                        <div className="flex-1 bg-green-100 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: `${Math.max((day.projects / Math.max(day.posts + day.projects + day.users, 1)) * 100, 5)}%` }}
                          ></div>
                        </div>
                        <div className="flex-1 bg-purple-100 rounded-full h-2">
                          <div 
                            className="bg-purple-500 h-2 rounded-full" 
                            style={{ width: `${Math.max((day.users / Math.max(day.posts + day.projects + day.users, 1)) * 100, 5)}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Posts: {day.posts}</span>
                        <span>Projects: {day.projects}</span>
                        <span>Users: {day.users}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Summary Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <PieChart className="h-5 w-5" />
                <span>Community Health Summary</span>
              </CardTitle>
              <CardDescription>
                Key insights for the last {period} days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {Math.round((analytics.summary.verified_users / Math.max(analytics.summary.active_users, 1)) * 100)}%
                  </div>
                  <div className="text-sm text-green-700">User Verification Rate</div>
                  <div className="text-xs text-gray-600 mt-1">
                    {analytics.summary.verified_users} of {analytics.summary.active_users} users verified
                  </div>
                </div>

                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {Math.round(analytics.summary.avg_likes_per_post || 0)}
                  </div>
                  <div className="text-sm text-blue-700">Avg Engagement per Post</div>
                  <div className="text-xs text-gray-600 mt-1">
                    Likes and comments combined
                  </div>
                </div>

                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-3xl font-bold text-orange-600 mb-2">
                    {analytics.summary.pending_projects}
                  </div>
                  <div className="text-sm text-orange-700">Projects Awaiting Review</div>
                  <div className="text-xs text-gray-600 mt-1">
                    Require admin approval
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default CommunityAnalytics;