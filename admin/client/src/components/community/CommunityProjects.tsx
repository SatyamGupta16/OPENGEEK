import { useState, useEffect } from 'react';
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
  Star, 
  ExternalLink,
  Github,
  Search,
  Filter,
  RefreshCw,
  Code,
  Calendar,
  User,
  AlertTriangle
} from 'lucide-react';
import axios from 'axios';

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

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

const CommunityProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
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

  const token = localStorage.getItem('admin_token');
  const axiosConfig = {
    headers: { Authorization: `Bearer ${token}` }
  };

  useEffect(() => {
    fetchProjects();
  }, [pagination.page, statusFilter, searchTerm]);

  const fetchProjects = async () => {
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

      const response = await axios.get(`/api/community/projects?${params}`, axiosConfig);
      setProjects(response.data.data.projects);
      setPagination(prev => ({
        ...prev,
        ...response.data.data.pagination
      }));
    } catch (error: any) {
      setError(error.response?.data?.message || 'Error fetching projects');
    } finally {
      setLoading(false);
    }
  };

  const handleModerateProject = async (project: Project, action: string) => {
    const reason = prompt(`Please provide a reason for ${action}ing this project:`);
    if (reason === null) return; // User cancelled

    try {
      await axios.put(`/api/community/projects/${project.id}/moderate`, {
        action,
        reason
      }, axiosConfig);

      // Update the project in the list
      setProjects(projects.map(p => 
        p.id === project.id 
          ? { 
              ...p, 
              is_approved: action === 'approve' ? true : action === 'reject' ? false : p.is_approved,
              is_featured: action === 'feature' ? true : action === 'unfeature' ? false : p.is_featured
            }
          : p
      ));
    } catch (error: any) {
      setError(error.response?.data?.message || `Error ${action}ing project`);
    }
  };

  const truncateDescription = (description: string, maxLength: number = 120) => {
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength) + '...';
  };

  const getStatusBadge = (project: Project) => {
    if (!project.is_approved) {
      return <Badge variant="destructive">Pending Approval</Badge>;
    }
    if (project.is_featured) {
      return <Badge variant="default">Featured</Badge>;
    }
    return <Badge variant="secondary">Approved</Badge>;
  };

  const getPriorityLevel = (project: Project) => {
    if (!project.is_approved) return 'high'; // Pending approval needs attention
    if (project.is_featured) return 'low'; // Featured projects are good
    return 'medium'; // Regular approved projects
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Community Projects</h1>
          <p className="text-gray-600">Review and moderate community project submissions</p>
        </div>
        <Button onClick={fetchProjects} variant="outline">
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
                  placeholder="Search projects, users, or technologies..."
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
                  <SelectItem value="all">All Projects</SelectItem>
                  <SelectItem value="pending">Pending Approval</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="featured">Featured</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Projects List */}
      <Card>
        <CardHeader>
          <CardTitle>Projects ({pagination.total})</CardTitle>
          <CardDescription>
            Showing {projects.length} of {pagination.total} projects
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="space-y-4">
              {projects.map((project) => {
                const priority = getPriorityLevel(project);
                return (
                  <div 
                    key={project.id} 
                    className={`border rounded-lg p-4 hover:bg-gray-50 ${
                      priority === 'high' ? 'border-l-4 border-l-red-500' : 
                      priority === 'medium' ? 'border-l-4 border-l-yellow-500' : 
                      'border-l-4 border-l-green-500'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-3">
                        {/* Project Header */}
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-3">
                              <h3 className="font-semibold text-lg">{project.title}</h3>
                              {getStatusBadge(project)}
                              {!project.is_approved && (
                                <AlertTriangle className="h-4 w-4 text-orange-500" />
                              )}
                            </div>
                            <div className="flex items-center space-x-3 text-sm text-gray-500">
                              <div className="flex items-center space-x-1">
                                <User className="h-3 w-3" />
                                <span>{project.full_name} (@{project.username})</span>
                                {project.is_verified && (
                                  <Badge variant="secondary" className="text-xs">Verified</Badge>
                                )}
                              </div>
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-3 w-3" />
                                <span>{new Date(project.created_at).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Project Description */}
                        <p className="text-gray-700">{truncateDescription(project.description)}</p>

                        {/* Project Details */}
                        <div className="flex items-center space-x-6 text-sm">
                          <div className="flex items-center space-x-1">
                            <Code className="h-4 w-4 text-blue-500" />
                            <span className="font-medium">{project.language}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span>{project.stars_count} stars</span>
                          </div>
                          {project.tags.length > 0 && (
                            <div className="flex items-center space-x-1">
                              <span className="text-gray-500">Tags:</span>
                              <div className="flex space-x-1">
                                {project.tags.slice(0, 3).map((tag, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                                {project.tags.length > 3 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{project.tags.length - 3} more
                                  </Badge>
                                )}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Project Links */}
                        <div className="flex items-center space-x-3">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => window.open(project.github_url, '_blank')}
                          >
                            <Github className="h-3 w-3 mr-1" />
                            GitHub
                          </Button>
                          {project.live_url && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => window.open(project.live_url, '_blank')}
                            >
                              <ExternalLink className="h-3 w-3 mr-1" />
                              Live Demo
                            </Button>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col space-y-2 ml-4">
                        {!project.is_approved ? (
                          <>
                            <Button
                              size="sm"
                              variant="default"
                              onClick={() => handleModerateProject(project, 'approve')}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleModerateProject(project, 'reject')}
                            >
                              <XCircle className="h-3 w-3 mr-1" />
                              Reject
                            </Button>
                          </>
                        ) : (
                          <>
                            {!project.is_featured ? (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleModerateProject(project, 'feature')}
                                className="text-yellow-600 border-yellow-600 hover:bg-yellow-50"
                              >
                                <Star className="h-3 w-3 mr-1" />
                                Feature
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleModerateProject(project, 'unfeature')}
                                className="text-yellow-600 border-yellow-600 bg-yellow-50"
                              >
                                <Star className="h-3 w-3 mr-1 fill-current" />
                                Unfeature
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleModerateProject(project, 'reject')}
                            >
                              <XCircle className="h-3 w-3 mr-1" />
                              Unapprove
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {projects.length === 0 && !loading && (
                <div className="text-center py-8 text-gray-500">
                  No projects found matching your criteria
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
    </div>
  );
};

export default CommunityProjects;