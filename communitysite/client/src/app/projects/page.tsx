'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { ProjectCard } from '@/components/ui/project-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Search,
  Plus,
  Star,
  Code,
  Filter,
  ArrowUpDown,
  GitBranch
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { projectsAPI } from '@/lib/api';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';
import { CreateProjectModal } from '@/components/ui/create-project-modal';
import { cn } from '@/lib/utils';

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  githubUrl: string;
  liveUrl?: string;
  tags: string[];
  language: string;
  isFeatured: boolean;
  starsCount: number;
  forksCount: number;
  createdAt: string;
  updatedAt: string;
  author: {
    username: string;
    fullName: string;
    imageUrl: string;
    isVerified: boolean;
  };
  isStarredByUser: boolean;
}

export default function ProjectsPage() {
  const { isSignedIn, user } = useUser();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [sortBy, setSortBy] = useState('created_at');

  const [showFeatured, setShowFeatured] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Available programming languages for filtering
  const languages = [
    'All', 'TypeScript', 'JavaScript', 'Python', 'Go', 'Rust',
    'Java', 'C++', 'React', 'Vue', 'Angular', 'Node.js'
  ];

  // Sample projects for demo
  const sampleProjects: Project[] = [
    {
      id: '1',
      title: 'AI-Powered Task Manager',
      description: 'A modern task management application with AI-powered suggestions and smart scheduling. Built with React, TypeScript, and OpenAI API.',
      imageUrl: '',
      githubUrl: 'https://github.com/example/ai-task-manager',
      liveUrl: 'https://ai-task-manager.demo.com',
      tags: ['React', 'TypeScript', 'AI', 'Productivity'],
      language: 'TypeScript',
      isFeatured: true,
      starsCount: 245,
      forksCount: 32,
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-20T15:30:00Z',
      author: {
        username: 'alexdev',
        fullName: 'Alex Johnson',
        imageUrl: '',
        isVerified: true
      },
      isStarredByUser: false
    },
    {
      id: '2',
      title: 'Real-time Chat Application',
      description: 'A scalable real-time chat application with rooms, file sharing, and emoji reactions. Built with Node.js, Socket.io, and MongoDB.',
      imageUrl: '',
      githubUrl: 'https://github.com/example/realtime-chat',
      liveUrl: 'https://chat-app.demo.com',
      tags: ['Node.js', 'Socket.io', 'MongoDB', 'Real-time'],
      language: 'JavaScript',
      isFeatured: false,
      starsCount: 189,
      forksCount: 28,
      createdAt: '2024-01-10T08:00:00Z',
      updatedAt: '2024-01-18T12:00:00Z',
      author: {
        username: 'sarahcode',
        fullName: 'Sarah Chen',
        imageUrl: '',
        isVerified: false
      },
      isStarredByUser: true
    },
    {
      id: '3',
      title: 'E-commerce Dashboard',
      description: 'A comprehensive e-commerce dashboard with analytics, inventory management, and order tracking. Built with Vue.js and Python FastAPI.',
      imageUrl: '',
      githubUrl: 'https://github.com/example/ecommerce-dashboard',
      liveUrl: '',
      tags: ['Vue.js', 'Python', 'FastAPI', 'Analytics'],
      language: 'Vue',
      isFeatured: false,
      starsCount: 156,
      forksCount: 19,
      createdAt: '2024-01-05T14:00:00Z',
      updatedAt: '2024-01-16T09:45:00Z',
      author: {
        username: 'mikecoder',
        fullName: 'Mike Rodriguez',
        imageUrl: '',
        isVerified: true
      },
      isStarredByUser: false
    },
    {
      id: '4',
      title: 'Weather Forecast App',
      description: 'A beautiful weather application with 7-day forecasts, interactive maps, and weather alerts. Built with React Native and Go backend.',
      imageUrl: '',
      githubUrl: 'https://github.com/example/weather-app',
      liveUrl: 'https://weather-forecast.demo.com',
      tags: ['React Native', 'Go', 'Weather API', 'Mobile'],
      language: 'Go',
      isFeatured: true,
      starsCount: 312,
      forksCount: 45,
      createdAt: '2023-12-28T16:00:00Z',
      updatedAt: '2024-01-14T11:20:00Z',
      author: {
        username: 'emmadev',
        fullName: 'Emma Wilson',
        imageUrl: '',
        isVerified: true
      },
      isStarredByUser: false
    },
    {
      id: '5',
      title: 'Blockchain Voting System',
      description: 'A secure and transparent voting system built on blockchain technology. Features smart contracts, voter verification, and real-time results.',
      imageUrl: '',
      githubUrl: 'https://github.com/example/blockchain-voting',
      liveUrl: '',
      tags: ['Blockchain', 'Solidity', 'Web3', 'Security'],
      language: 'JavaScript',
      isFeatured: false,
      starsCount: 98,
      forksCount: 15,
      createdAt: '2023-12-20T10:00:00Z',
      updatedAt: '2024-01-12T14:30:00Z',
      author: {
        username: 'davidtech',
        fullName: 'David Kim',
        imageUrl: '',
        isVerified: false
      },
      isStarredByUser: false
    },
    {
      id: '6',
      title: 'Machine Learning Image Classifier',
      description: 'An image classification system using TensorFlow and Python. Can identify objects, animals, and scenes with 95% accuracy.',
      imageUrl: '',
      githubUrl: 'https://github.com/example/ml-classifier',
      liveUrl: 'https://image-classifier.demo.com',
      tags: ['Python', 'TensorFlow', 'Machine Learning', 'AI'],
      language: 'Python',
      isFeatured: false,
      starsCount: 267,
      forksCount: 38,
      createdAt: '2023-12-15T12:00:00Z',
      updatedAt: '2024-01-10T16:15:00Z',
      author: {
        username: 'lisaai',
        fullName: 'Lisa Zhang',
        imageUrl: '',
        isVerified: true
      },
      isStarredByUser: true
    }
  ];

  // Fetch projects from backend
  const fetchProjects = async (resetPage = false) => {
    try {
      setLoading(true);
      const currentPage = resetPage ? 1 : page;

      const response = await projectsAPI.getProjects({
        page: currentPage,
        limit: 12,
        search: searchQuery || undefined,
        language: selectedLanguage && selectedLanguage !== 'All' ? selectedLanguage : undefined,
        featured: showFeatured ? 'true' : undefined,
        sortBy
      });

      if (response.success && response.data) {
        const newProjects = response.data.projects || [];

        if (resetPage) {
          setProjects(newProjects);
          setPage(1);
        } else {
          setProjects(prev => [...prev, ...newProjects]);
        }

        setHasMore(response.data.pagination?.hasNext || false);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      // Show sample projects when API fails
      if (resetPage) {
        let filteredProjects = [...sampleProjects];

        // Apply filters to sample data
        if (searchQuery) {
          filteredProjects = filteredProjects.filter(p =>
            p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.description.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }

        if (selectedLanguage && selectedLanguage !== 'All') {
          filteredProjects = filteredProjects.filter(p => p.language === selectedLanguage);
        }

        if (showFeatured) {
          filteredProjects = filteredProjects.filter(p => p.isFeatured);
        }

        // Apply sorting
        if (sortBy === 'stars') {
          filteredProjects.sort((a, b) => b.starsCount - a.starsCount);
        } else if (sortBy === 'name') {
          filteredProjects.sort((a, b) => a.title.localeCompare(b.title));
        } else {
          filteredProjects.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
        }

        setProjects(filteredProjects);
        setHasMore(false);
      }
      toast.error('Using demo data - API connection failed');
    } finally {
      setLoading(false);
    }
  };

  // Initial load and when filters change
  useEffect(() => {
    fetchProjects(true);
  }, [searchQuery, selectedLanguage, sortBy, showFeatured]);

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProjects(true);
  };

  // Handle project star
  const handleProjectStar = async (projectId: string) => {
    if (!isSignedIn) {
      toast.error('Please sign in to star projects');
      return;
    }

    try {
      const response = await projectsAPI.starProject(projectId);
      if (response.success) {
        setProjects(prev => prev.map(project =>
          project.id === projectId
            ? {
              ...project,
              isStarredByUser: response.data.isStarred,
              starsCount: response.data.starsCount
            }
            : project
        ));
        toast.success(response.data.isStarred ? 'Project starred!' : 'Project unstarred');
      }
    } catch (error) {
      console.error('Error starring project:', error);
      toast.error('Failed to star project');
    }
  };

  // Load more projects
  const loadMore = () => {
    setPage(prev => prev + 1);
    fetchProjects();
  };

  return (
    <>
      {/* Professional Header */}
      <div className="mb-8">


        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Projects Showcase
            </h1>
            <p className="text-zinc-400 text-lg">
              Discover and explore innovative projects built by our talented developer community
            </p>
          </div>

          {isSignedIn && (
            <Button
              className="bg-white hover:bg-zinc-100 text-black font-medium px-6 py-3 rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl"
              onClick={() => setShowCreateModal(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Submit Project
            </Button>
          )}
        </div>
      </div>

      {/* Compact Professional Search and Filters */}
      <Card className="bg-black border-zinc-800 shadow-sm mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar - Compact */}
            <div className="flex-1">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search projects..."
                  className="pl-10 pr-4 h-9 bg-zinc-800 border-zinc-700 text-white placeholder-zinc-400 text-sm focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600"
                />
              </form>
            </div>

            {/* Filters Row - Compact */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Language Filter */}
              <Select value={selectedLanguage || 'All'} onValueChange={(value) => setSelectedLanguage(value === 'All' ? '' : value)}>
                <SelectTrigger className="w-[140px] h-9 bg-zinc-800 border-zinc-700 text-white text-sm">
                  <Filter className="h-3 w-3 mr-2 text-zinc-400" />
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 border-zinc-700">
                  {languages.map(lang => (
                    <SelectItem key={lang} value={lang} className="text-white hover:bg-zinc-700 text-sm">
                      {lang}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort Filter */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[120px] h-9 bg-zinc-800 border-zinc-700 text-white text-sm">
                  <ArrowUpDown className="h-3 w-3 mr-2 text-zinc-400" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 border-zinc-700">
                  <SelectItem value="created_at" className="text-white hover:bg-zinc-700 text-sm">Latest</SelectItem>
                  <SelectItem value="stars" className="text-white hover:bg-zinc-700 text-sm">Most Starred</SelectItem>
                  <SelectItem value="name" className="text-white hover:bg-zinc-700 text-sm">Name</SelectItem>
                </SelectContent>
              </Select>

              {/* Compact Filter Tabs */}
              <div className="flex items-center border border-zinc-700 rounded-md overflow-hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFeatured(false)}
                  className={cn(
                    "h-9 px-3 rounded-none border-0 text-xs font-medium",
                    !showFeatured
                      ? 'bg-white text-black hover:bg-zinc-100'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                  )}
                >
                  All
                </Button>
                <Separator orientation="vertical" className="h-5 bg-zinc-700" />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFeatured(true)}
                  className={cn(
                    "h-9 px-3 rounded-none border-0 text-xs font-medium",
                    showFeatured
                      ? 'bg-white text-black hover:bg-zinc-100'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                  )}
                >
                  <Star className="h-3 w-3 mr-1" />
                  Featured
                </Button>
              </div>

              {/* Clear Filters */}
              {(searchQuery || selectedLanguage || showFeatured) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedLanguage('');
                    setShowFeatured(false);
                  }}
                  className="h-9 px-3 text-zinc-400 hover:text-white hover:bg-zinc-800 text-xs"
                >
                  Clear
                </Button>
              )}
            </div>
          </div>

          {/* Active Filters - Compact */}
          {(searchQuery || selectedLanguage || showFeatured) && (
            <div className="mt-3 pt-3 border-t border-zinc-800">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-zinc-500">Filters:</span>
                {searchQuery && (
                  <Badge variant="secondary" className="bg-zinc-800 text-zinc-300 text-xs px-2 py-0.5">
                    &quot;{searchQuery}&quot;
                  </Badge>
                )}
                {selectedLanguage && (
                  <Badge variant="secondary" className="bg-zinc-800 text-zinc-300 text-xs px-2 py-0.5">
                    {selectedLanguage}
                  </Badge>
                )}
                {showFeatured && (
                  <Badge variant="secondary" className="bg-zinc-800 text-zinc-300 text-xs px-2 py-0.5">
                    <Star className="h-2.5 w-2.5 mr-1" />
                    Featured
                  </Badge>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Projects Grid - Smaller Cards */}
      <div className="mb-12">
        {loading && projects.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="bg-black border-zinc-800 animate-pulse">
                <div className="h-32 bg-zinc-800 rounded-t-lg"></div>
                <CardContent className="p-4">
                  <div className="h-4 bg-zinc-800 rounded mb-2"></div>
                  <div className="h-3 bg-zinc-800 rounded mb-3"></div>
                  <div className="flex gap-1 mb-3">
                    <div className="h-5 w-12 bg-zinc-800 rounded"></div>
                    <div className="h-5 w-16 bg-zinc-800 rounded"></div>
                  </div>
                  <div className="flex justify-between">
                    <div className="h-6 w-16 bg-zinc-800 rounded"></div>
                    <div className="h-6 w-20 bg-zinc-800 rounded"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : projects.length === 0 ? (
          <Card className="bg-black border-zinc-800 shadow-sm">
            <CardContent className="p-12 text-center">
              <div className="p-4 bg-zinc-800 rounded-full w-fit mx-auto mb-4">
                <Code className="h-12 w-12 text-zinc-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No projects found</h3>
              <p className="text-zinc-400 mb-6 max-w-md mx-auto">
                {searchQuery || selectedLanguage || showFeatured
                  ? 'Try adjusting your search filters to discover more projects'
                  : 'Be the first to showcase your amazing project to the community!'}
              </p>
              {isSignedIn && (
                <Button
                  variant="outline"
                  className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                  onClick={() => setShowCreateModal(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Submit Your Project
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-semibold text-white">
                  {projects.length} {projects.length === 1 ? 'Project' : 'Projects'}
                </h2>
                {(searchQuery || selectedLanguage || showFeatured) && (
                  <Badge variant="secondary" className="bg-zinc-800 text-zinc-300">
                    Filtered
                  </Badge>
                )}
              </div>
              <div className="text-sm text-zinc-400">
                Showing {projects.length} of {projects.length} results
              </div>
            </div>

            {/* Compact Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  id={project.id}
                  title={project.title}
                  description={project.description}
                  author={{
                    name: project.author.fullName,
                    username: project.author.username,
                    avatarUrl: project.author.imageUrl
                  }}
                  image={project.imageUrl}
                  tags={project.tags}
                  stars={project.starsCount}
                  forks={project.forksCount}
                  language={project.language}
                  lastUpdated={formatDistanceToNow(new Date(project.updatedAt), { addSuffix: true })}
                  githubUrl={project.githubUrl}
                  liveUrl={project.liveUrl}
                  featured={project.isFeatured}
                  isStarred={project.isStarredByUser}
                  onStar={handleProjectStar}
                />
              ))}
            </div>

            {/* Professional Load More */}
            {hasMore && (
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  onClick={loadMore}
                  disabled={loading}
                  className="border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800 px-8 py-3 rounded-lg transition-all duration-200"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-zinc-600 border-t-white rounded-full animate-spin mr-2" />
                      Loading more projects...
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      Load More Projects
                    </>
                  )}
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Professional Stats Section */}
      <Card className="bg-black border-zinc-800 shadow-lg">
        <CardContent className="p-8">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-white mb-2">Community Impact</h3>
            <p className="text-zinc-400 text-sm">Showcasing the power of our developer community</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="p-3 bg-zinc-800 rounded-lg w-fit mx-auto mb-3">
                <Code className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                {projects.length}
              </div>
              <div className="text-zinc-400 text-sm">Total Projects</div>
            </div>

            <div className="text-center">
              <div className="p-3 bg-zinc-800 rounded-lg w-fit mx-auto mb-3">
                <Star className="h-6 w-6 text-yellow-400" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                {projects.reduce((sum, p) => sum + p.starsCount, 0).toLocaleString()}
              </div>
              <div className="text-zinc-400 text-sm">Total Stars</div>
            </div>

            <div className="text-center">
              <div className="p-3 bg-zinc-800 rounded-lg w-fit mx-auto mb-3">
                <GitBranch className="h-6 w-6 text-blue-400" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                {projects.reduce((sum, p) => sum + p.forksCount, 0).toLocaleString()}
              </div>
              <div className="text-zinc-400 text-sm">Total Forks</div>
            </div>

            <div className="text-center">
              <div className="p-3 bg-zinc-800 rounded-lg w-fit mx-auto mb-3">
                <Code className="h-6 w-6 text-green-400" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                {new Set(projects.map(p => p.language)).size}
              </div>
              <div className="text-zinc-400 text-sm">Languages</div>
            </div>
          </div>

          {/* Featured Languages */}
          <div className="mt-8 pt-6 border-t border-zinc-800">
            <h4 className="text-sm font-medium text-white mb-3 text-center">Popular Technologies</h4>
            <div className="flex flex-wrap justify-center gap-2">
              {Array.from(new Set(projects.map(p => p.language))).slice(0, 8).map((lang) => (
                <Badge
                  key={lang}
                  variant="secondary"
                  className="bg-zinc-800 text-zinc-300 hover:bg-zinc-700 border-0"
                >
                  <div className={cn(
                    "h-2 w-2 rounded-full mr-2",
                    lang === 'TypeScript' && "bg-blue-500",
                    lang === 'JavaScript' && "bg-yellow-500",
                    lang === 'Python' && "bg-green-500",
                    lang === 'Go' && "bg-cyan-500",
                    lang === 'Vue' && "bg-emerald-500",
                    lang === 'React' && "bg-blue-400",
                    lang === 'Node.js' && "bg-green-600",
                    !['TypeScript', 'JavaScript', 'Python', 'Go', 'Vue', 'React', 'Node.js'].includes(lang) && "bg-zinc-500"
                  )} />
                  {lang}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Create Project Modal */}
      <CreateProjectModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onProjectCreated={(newProject) => {
          // Construct a complete project object with user info
          const completeProject: Project = {
            ...newProject,
            author: {
              username: user?.username || 'unknown',
              fullName: user?.fullName || 'Unknown User',
              imageUrl: user?.imageUrl || '',
              isVerified: false
            },
            isStarredByUser: false
          };

          // Add the new project to the top of the list
          setProjects(prev => [completeProject, ...prev]);
          toast.success('Project submitted successfully!');
        }}
      />
    </>
  );
}