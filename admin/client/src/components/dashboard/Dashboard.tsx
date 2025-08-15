import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  FileText, 
  BarChart3,
  TrendingUp
} from 'lucide-react';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface MonthlyData {
  month: string;
  count: string;
}

interface DashboardStats {
  total_users: number;
  total_content: number;
  total_posts: number;
  total_projects: number;
  active_users: number;
  verified_users: number;
  new_signups_this_month: number;
  recent_posts: number;
  recent_projects: number;
  monthly_signups: MonthlyData[];
  monthly_posts: MonthlyData[];
}

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    total_users: 0,
    total_content: 0,
    total_posts: 0,
    total_projects: 0,
    active_users: 0,
    verified_users: 0,
    new_signups_this_month: 0,
    recent_posts: 0,
    recent_projects: 0,
    monthly_signups: [],
    monthly_posts: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        if (!apiUrl) throw new Error('VITE_API_URL is not configured');

        const token = localStorage.getItem('admin_token');
        if (!token) throw new Error('Missing admin token. Please login again.');

        console.log('📊 Fetching dashboard statistics...');
        const response = await axios.get(`${apiUrl}/dashboard/stats`, {
          headers: { Authorization: `Bearer ${token}` },
          timeout: 10000,
        });

        if (response.data?.success) {
          setStats(response.data.data);
          console.log('✅ Dashboard stats loaded:', response.data.data);
        } else {
          throw new Error('Failed to fetch dashboard stats');
        }
      } catch (err: any) {
        console.error('❌ Error fetching dashboard stats:', err);
        if (err.response) setError(err.response.data?.message || `Server error (${err.response.status})`);
        else if (err.request) setError('No response from server. Is the backend running?');
        else setError(err.message || 'Unexpected error');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Generate chart data from real database stats
  const generateChartData = () => {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // Create labels for last 6 months
    const labels = [];
    const signupData = [];
    const postData = [];
    
    // Get current date and go back 6 months
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthKey = date.toISOString().slice(0, 7); // YYYY-MM format
      labels.push(`${monthNames[date.getMonth()]} ${date.getFullYear()}`);
      
      // Find matching data from database
      const signupMatch = stats.monthly_signups?.find(item => 
        item.month && item.month.startsWith(monthKey)
      );
      const postMatch = stats.monthly_posts?.find(item => 
        item.month && item.month.startsWith(monthKey)
      );
      
      signupData.push(signupMatch ? parseInt(signupMatch.count) : 0);
      postData.push(postMatch ? parseInt(postMatch.count) : 0);
    }
    
    return {
      labels,
      datasets: [
        {
          label: 'New Users',
          data: signupData,
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
        {
          label: 'New Posts',
          data: postData,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  const chartData = generateChartData();

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Monthly Activity',
      },
    },
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading dashboard...</div>;
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center">
          <BarChart3 className="h-6 w-6 mr-2" />
          <h1 className="text-3xl font-bold">Dashboard</h1>
        </div>
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="text-red-800">
              <h3 className="font-semibold">Error loading dashboard</h3>
              <p className="text-sm mt-1">{error}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <BarChart3 className="h-6 w-6 mr-2" />
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total_users}</div>
            <p className="text-xs text-muted-foreground">{stats.verified_users} verified users</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.active_users}</div>
            <p className="text-xs text-muted-foreground">Currently active accounts</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Content</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total_content}</div>
            <p className="text-xs text-muted-foreground">{stats.total_posts} posts, {stats.total_projects} projects</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Signups</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.new_signups_this_month}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Additional Statistics Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total_posts}</div>
            <p className="text-xs text-muted-foreground">{stats.recent_posts} in last 30 days</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total_projects}</div>
            <p className="text-xs text-muted-foreground">{stats.recent_projects} in last 30 days</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verified Users</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.verified_users}</div>
            <p className="text-xs text-muted-foreground">
              {stats.total_users > 0 ? Math.round((stats.verified_users / stats.total_users) * 100) : 0}% of total users
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.recent_posts + stats.recent_projects}</div>
            <p className="text-xs text-muted-foreground">Content items this month</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Activity Overview</CardTitle>
            <CardDescription>Monthly user registrations and content creation over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <Bar options={chartOptions} data={chartData} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
