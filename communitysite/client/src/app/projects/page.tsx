'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProjectCard } from '@/components/ui/project-card';
import { Search, Filter, Plus, ArrowUpDown, TrendingUp, Clock, SortAsc } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Sample project data
const sampleProjects = [
  {
    id: 1,
    title: 'React Component Library',
    description: 'A comprehensive UI component library built with React, TypeScript, and Tailwind CSS. Features 50+ components with full accessibility support.',
    author: {
      name: 'John Doe',
      username: 'johndoe',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
    },
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'UI Library'],
    stars: 1247,
    forks: 89,
    language: 'TypeScript',
    lastUpdated: '2 days ago',
    githubUrl: 'https://github.com/johndoe/react-ui-lib',
    liveUrl: 'https://react-ui-lib.vercel.app',
    featured: true
  },
  {
    id: 2,
    title: 'AI Chat Application',
    description: 'Real-time chat application with AI integration using OpenAI API. Features include message history, user authentication, and responsive design.',
    author: {
      name: 'Sarah Wilson',
      username: 'sarahw',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
    },
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
    tags: ['Next.js', 'OpenAI', 'Socket.io', 'MongoDB'],
    stars: 892,
    forks: 156,
    language: 'JavaScript',
    lastUpdated: '5 hours ago',
    githubUrl: 'https://github.com/sarahw/ai-chat-app',
    liveUrl: 'https://ai-chat-demo.vercel.app',
    featured: true
  },
  {
    id: 3,
    title: 'E-commerce Dashboard',
    description: 'Modern admin dashboard for e-commerce platforms with analytics, inventory management, and order tracking capabilities.',
    author: {
      name: 'Mike Chen',
      username: 'mikechen',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike'
    },
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
    tags: ['Vue.js', 'Node.js', 'PostgreSQL', 'Chart.js'],
    stars: 634,
    forks: 78,
    language: 'Vue',
    lastUpdated: '1 week ago',
    githubUrl: 'https://github.com/mikechen/ecommerce-dashboard',
    liveUrl: 'https://ecommerce-dash.netlify.app'
  },
  {
    id: 4,
    title: 'Mobile Fitness Tracker',
    description: 'Cross-platform mobile app for fitness tracking with workout plans, progress monitoring, and social features.',
    author: {
      name: 'Emily Davis',
      username: 'emilyd',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily'
    },
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop',
    tags: ['React Native', 'Firebase', 'Redux', 'Health API'],
    stars: 445,
    forks: 67,
    language: 'JavaScript',
    lastUpdated: '3 days ago',
    githubUrl: 'https://github.com/emilyd/fitness-tracker',
    featured: true
  },
  {
    id: 5,
    title: 'DevOps Automation Tool',
    description: 'CLI tool for automating deployment pipelines with Docker, Kubernetes, and CI/CD integration.',
    author: {
      name: 'David Rodriguez',
      username: 'davidr',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David'
    },
    image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=400&fit=crop',
    tags: ['Go', 'Docker', 'Kubernetes', 'CLI'],
    stars: 789,
    forks: 123,
    language: 'Go',
    lastUpdated: '4 days ago',
    githubUrl: 'https://github.com/davidr/devops-cli'
  },
  {
    id: 6,
    title: 'Data Visualization Platform',
    description: 'Interactive data visualization platform with support for multiple chart types, real-time updates, and collaborative features.',
    author: {
      name: 'Lisa Park',
      username: 'lisap',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa'
    },
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
    tags: ['D3.js', 'Python', 'Flask', 'WebSocket'],
    stars: 567,
    forks: 89,
    language: 'Python',
    lastUpdated: '1 week ago',
    githubUrl: 'https://github.com/lisap/data-viz-platform',
    liveUrl: 'https://dataviz-demo.herokuapp.com'
  }
];

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('stars'); // stars, recent, name

  const filteredProjects = sampleProjects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      project.author.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'all' ||
      (selectedCategory === 'featured' && project.featured) ||
      project.language.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'stars':
        return b.stars - a.stars;
      case 'recent':
        // Simple date sorting based on lastUpdated string
        return a.lastUpdated.localeCompare(b.lastUpdated);
      case 'name':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
            Projects Showcase
          </h1>
          <p className="text-zinc-400">
            Discover amazing projects built by our community members
          </p>
        </div>
        <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Submit Project
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
          <Input
            placeholder="Search projects, technologies, or authors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-black border-zinc-800 text-white placeholder:text-zinc-500"
          />
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-zinc-800 text-zinc-400 hover:text-white">
                <ArrowUpDown className="h-4 w-4 mr-2" />
                Sort by {sortBy === 'stars' ? 'Stars' : sortBy === 'recent' ? 'Recent' : 'Name'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-black border-zinc-800 text-zinc-100">
              <DropdownMenuItem onClick={() => setSortBy('stars')} className="hover:bg-zinc-800">
                <TrendingUp className="h-4 w-4 mr-2" />
                Most Stars
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy('recent')} className="hover:bg-zinc-800">
                <Clock className="h-4 w-4 mr-2" />
                Recently Updated
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy('name')} className="hover:bg-zinc-800">
                <SortAsc className="h-4 w-4 mr-2" />
                Alphabetical
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" className="border-zinc-800 text-zinc-400 hover:text-white">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="flex items-center justify-between mb-6 text-sm text-zinc-500">
        <span>
          Showing {filteredProjects.length} of {sampleProjects.length} projects
        </span>
        <div className="flex items-center gap-4">
          <span>{sampleProjects.filter(p => p.featured).length} featured</span>
          <span>{sampleProjects.reduce((acc, p) => acc + p.stars, 0).toLocaleString()} total stars</span>
        </div>
      </div>

      {/* Category Tabs */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full mb-8">
        <TabsList className="w-full justify-start border-b border-zinc-800 rounded-none h-auto p-0 bg-transparent">
          <TabsTrigger
            value="all"
            className="data-[state=active]:border-b-2 data-[state=active]:border-emerald-500 data-[state=active]:text-emerald-400 rounded-none px-6 py-3 text-sm font-medium"
          >
            All Projects
          </TabsTrigger>
          <TabsTrigger
            value="featured"
            className="data-[state=active]:border-b-2 data-[state=active]:border-emerald-500 data-[state=active]:text-emerald-400 rounded-none px-6 py-3 text-sm font-medium"
          >
            Featured
          </TabsTrigger>
          <TabsTrigger
            value="typescript"
            className="data-[state=active]:border-b-2 data-[state=active]:border-emerald-500 data-[state=active]:text-emerald-400 rounded-none px-6 py-3 text-sm font-medium"
          >
            TypeScript
          </TabsTrigger>
          <TabsTrigger
            value="javascript"
            className="data-[state=active]:border-b-2 data-[state=active]:border-emerald-500 data-[state=active]:text-emerald-400 rounded-none px-6 py-3 text-sm font-medium"
          >
            JavaScript
          </TabsTrigger>
          <TabsTrigger
            value="python"
            className="data-[state=active]:border-b-2 data-[state=active]:border-emerald-500 data-[state=active]:text-emerald-400 rounded-none px-6 py-3 text-sm font-medium"
          >
            Python
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => {
          const { id, ...projectProps } = project;
          return <ProjectCard key={id} {...projectProps} />;
        })}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <div className="text-zinc-500 mb-4">
            <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg">No projects found</p>
            <p className="text-sm">Try adjusting your search or filters</p>
          </div>
        </div>
      )}
    </div>
  );
}