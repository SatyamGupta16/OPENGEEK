'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    ArrowLeft,
    Star,
    GitFork,
    ExternalLink,
    Github,
    Calendar,
    Code,
    Eye,
    Download,
    Share2,
    Bookmark
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { projectsAPI } from '@/lib/api';
import { toast } from 'sonner';
import { formatDistanceToNow, format } from 'date-fns';

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
    viewsCount: number;
    downloadsCount: number;
    createdAt: string;
    updatedAt: string;
    author: {
        username: string;
        fullName: string;
        imageUrl: string;
        isVerified: boolean;
    };
    isStarredByUser: boolean;
    isBookmarkedByUser: boolean;
    techStack: string[];
    features: string[];
    installation?: string;
    usage?: string;
    contributing?: string;
    license?: string;
}

export default function ProjectDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { isSignedIn } = useUser();
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);
    const [imageError, setImageError] = useState(false);

    // Get project ID safely
    const projectId = params?.id as string;

    // Sample project data for demo
    const getSampleProject = (id: string): Project => ({
        id: id,
        title: 'AI-Powered Task Manager',
        description: 'A comprehensive task management application that leverages artificial intelligence to provide smart suggestions, automated scheduling, and intelligent prioritization. Built with modern web technologies and designed for maximum productivity.',
        imageUrl: '',
        githubUrl: 'https://github.com/example/ai-task-manager',
        liveUrl: 'https://ai-task-manager.demo.com',
        tags: ['React', 'TypeScript', 'AI', 'Productivity', 'Web App'],
        language: 'TypeScript',
        isFeatured: true,
        starsCount: 245,
        forksCount: 32,
        viewsCount: 1250,
        downloadsCount: 89,
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-20T15:30:00Z',
        author: {
            username: 'alexdev',
            fullName: 'Alex Johnson',
            imageUrl: '',
            isVerified: true
        },
        isStarredByUser: false,
        isBookmarkedByUser: false,
        techStack: ['React 18', 'TypeScript', 'Next.js 14', 'Tailwind CSS', 'OpenAI API', 'Prisma', 'PostgreSQL', 'Vercel'],
        features: [
            'AI-powered task suggestions and prioritization',
            'Smart scheduling with calendar integration',
            'Real-time collaboration and team management',
            'Advanced analytics and productivity insights',
            'Cross-platform synchronization',
            'Customizable workflows and automation',
            'Dark/light theme support',
            'Offline functionality with sync'
        ],
        installation: `# Clone the repository
git clone https://github.com/example/ai-task-manager.git

# Navigate to project directory
cd ai-task-manager

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Run the development server
npm run dev`,
        usage: `# Basic Usage

## Getting Started
1. Sign up for an account or log in
2. Create your first project
3. Add tasks and let AI suggest priorities
4. Use the smart scheduler to optimize your day

## Advanced Features
- Set up team workspaces for collaboration
- Configure automation rules
- Integrate with your calendar
- Export data and analytics`,
        contributing: `# Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Development Setup
- Node.js 18+
- PostgreSQL database
- OpenAI API key required`,
        license: 'MIT License'
    });

    // Fetch project details
    const fetchProject = async () => {
        if (!projectId) {
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const response = await projectsAPI.getProject(projectId);

            console.log('API Response:', response); // Debug log

            if (response.success && response.data) {
                console.log('Setting project data:', response.data); // Debug log
                setProject(response.data);
            } else {
                console.log('API failed, using sample data'); // Debug log
                // Use sample data when API fails
                setProject(getSampleProject(projectId));
            }
        } catch (error) {
            console.error('Error fetching project:', error);
            console.log('Using sample data due to error'); // Debug log
            setProject(getSampleProject(projectId));
            toast.error('Using demo data - API connection failed');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (projectId) {
            fetchProject();
        }
    }, [projectId]);

    // Handle project star
    const handleStar = async () => {
        if (!isSignedIn) {
            toast.error('Please sign in to star projects');
            return;
        }

        if (!project) return;

        try {
            const response = await projectsAPI.starProject(project.id);
            if (response.success) {
                setProject(prev => prev ? {
                    ...prev,
                    isStarredByUser: response.data.isStarred,
                    starsCount: response.data.starsCount
                } : null);
                toast.success(response.data.isStarred ? 'Project starred!' : 'Project unstarred');
            }
        } catch (error) {
            console.error('Error starring project:', error);
            // Update UI optimistically for demo
            setProject(prev => prev ? {
                ...prev,
                isStarredByUser: !prev.isStarredByUser,
                starsCount: prev.isStarredByUser ? prev.starsCount - 1 : prev.starsCount + 1
            } : null);
            toast.success(project.isStarredByUser ? 'Project unstarred' : 'Project starred!');
        }
    };

    // Handle bookmark
    const handleBookmark = async () => {
        if (!isSignedIn) {
            toast.error('Please sign in to bookmark projects');
            return;
        }

        if (!project) return;

        setProject(prev => prev ? {
            ...prev,
            isBookmarkedByUser: !prev.isBookmarkedByUser
        } : null);
        toast.success(project.isBookmarkedByUser ? 'Bookmark removed' : 'Project bookmarked!');
    };

    // Handle share
    const handleShare = async () => {
        if (!project) return;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: project.title,
                    text: project.description,
                    url: window.location.href,
                });
            } catch (error) {
                console.error('Error sharing:', error);
            }
        } else {
            await navigator.clipboard.writeText(window.location.href);
            toast.success('Link copied to clipboard!');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black">
                <div className="max-w-6xl mx-auto px-4 py-8">
                    <div className="animate-pulse">
                        <div className="h-8 bg-zinc-800 rounded w-32 mb-8"></div>
                        <div className="h-64 bg-zinc-800 rounded mb-8"></div>
                        <div className="h-12 bg-zinc-800 rounded w-3/4 mb-4"></div>
                        <div className="h-6 bg-zinc-800 rounded w-1/2 mb-8"></div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 space-y-6">
                                <div className="h-32 bg-zinc-800 rounded"></div>
                                <div className="h-48 bg-zinc-800 rounded"></div>
                            </div>
                            <div className="space-y-6">
                                <div className="h-24 bg-zinc-800 rounded"></div>
                                <div className="h-32 bg-zinc-800 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-white mb-4">Project not found</h1>
                    <Button onClick={() => router.back()} variant="outline">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Go Back
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Header Section */}
            <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto px-6 py-4">
                    <Button
                        onClick={() => router.back()}
                        variant="ghost"
                        size="sm"
                        className="hover:bg-muted"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Projects
                    </Button>
                </div>
            </div>

            {/* Project Image Hero */}
            {project.imageUrl && !imageError ? (
                <div className="relative h-64 sm:h-80 lg:h-96 w-full bg-muted">
                    <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        className="object-cover"
                        onError={() => setImageError(true)}
                    />
                    {project.isFeatured && (
                        <div className="absolute top-6 left-6">
                            <Badge className="bg-primary text-primary-foreground shadow-lg">
                                <Star className="h-3 w-3 mr-1 fill-current" />
                                Featured
                            </Badge>
                        </div>
                    )}
                </div>
            ) : (
                <div className="relative h-64 sm:h-80 lg:h-96 w-full bg-muted flex items-center justify-center">
                    <Code className="h-20 w-20 text-muted-foreground" />
                    {project.isFeatured && (
                        <div className="absolute top-6 left-6">
                            <Badge className="bg-primary text-primary-foreground shadow-lg">
                                <Star className="h-3 w-3 mr-1 fill-current" />
                                Featured
                            </Badge>
                        </div>
                    )}
                </div>
            )}

            {/* Project Info Section */}
            <div className="bg-background">
                <div className="container mx-auto px-6 py-8">
                    <div className="max-w-4xl">
                        {/* Title and Description */}
                        <div className="space-y-6 mb-8">
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                                {project.title}
                            </h1>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                {project.description}
                            </p>
                        </div>

                        {/* Author and Meta Info */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
                            <div className="flex items-center gap-4">
                                <Avatar className="h-14 w-14">
                                    <AvatarImage src={project.author?.imageUrl || ''} alt={project.author?.fullName || 'Author'} />
                                    <AvatarFallback className="text-lg">
                                        {project.author?.fullName?.charAt(0) || 'A'}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-semibold text-lg">{project.author?.fullName || 'Unknown Author'}</span>
                                        {project.author?.isVerified && (
                                            <Badge variant="secondary" className="text-xs">
                                                ✓ Verified
                                            </Badge>
                                        )}
                                    </div>
                                    <span className="text-muted-foreground">@{project.author?.username || 'unknown'}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Calendar className="h-4 w-4" />
                                <span>Updated {project.updatedAt ? formatDistanceToNow(new Date(project.updatedAt), { addSuffix: true }) : 'recently'}</span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3 mb-8">
                            <Button
                                onClick={handleStar}
                                variant={project.isStarredByUser ? "default" : "outline"}
                            >
                                <Star className={cn("h-4 w-4 mr-2", project.isStarredByUser && "fill-current")} />
                                {project.isStarredByUser ? 'Starred' : 'Star'} ({project.starsCount})
                            </Button>

                            <Button
                                onClick={handleBookmark}
                                variant={project.isBookmarkedByUser ? "default" : "outline"}
                            >
                                <Bookmark className={cn("h-4 w-4 mr-2", project.isBookmarkedByUser && "fill-current")} />
                                {project.isBookmarkedByUser ? 'Bookmarked' : 'Bookmark'}
                            </Button>

                            <Button onClick={handleShare} variant="outline">
                                <Share2 className="h-4 w-4 mr-2" />
                                Share
                            </Button>

                            {project.githubUrl && (
                                <Button asChild variant="outline">
                                    <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                        <Github className="h-4 w-4 mr-2" />
                                        View Code
                                    </Link>
                                </Button>
                            )}

                            {project.liveUrl && (
                                <Button asChild>
                                    <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                        <ExternalLink className="h-4 w-4 mr-2" />
                                        Live Demo
                                    </Link>
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="bg-muted/30 border-y">
                <div className="container mx-auto px-6 py-8">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto">
                        <div className="text-center">
                            <Star className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
                            <div className="text-2xl font-bold">{project.starsCount}</div>
                            <div className="text-sm text-muted-foreground">Stars</div>
                        </div>
                        <div className="text-center">
                            <GitFork className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                            <div className="text-2xl font-bold">{project.forksCount}</div>
                            <div className="text-sm text-muted-foreground">Forks</div>
                        </div>
                        <div className="text-center">
                            <Eye className="h-6 w-6 text-green-500 mx-auto mb-2" />
                            <div className="text-2xl font-bold">{project.viewsCount || 0}</div>
                            <div className="text-sm text-muted-foreground">Views</div>
                        </div>
                        <div className="text-center">
                            <Download className="h-6 w-6 text-purple-500 mx-auto mb-2" />
                            <div className="text-2xl font-bold">{project.downloadsCount || 0}</div>
                            <div className="text-sm text-muted-foreground">Downloads</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="bg-background">
                <div className="container mx-auto px-6 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 max-w-7xl mx-auto">
                        {/* Main Content */}
                        <div className="lg:col-span-3 space-y-8">
                            {/* Tags */}
                            {project.tags && project.tags.length > 0 && (
                                <div>
                                    <h2 className="text-xl font-semibold mb-4">Tags</h2>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag, index) => (
                                            <Badge key={index} variant="secondary" className="text-sm">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Features */}
                            {project.features && project.features.length > 0 && (
                                <Card>
                                    <CardContent className="p-8">
                                        <h2 className="text-xl font-semibold mb-6">Key Features</h2>
                                        <ul className="space-y-4">
                                            {project.features.map((feature, index) => (
                                                <li key={index} className="flex items-start gap-3">
                                                    <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Installation */}
                            {project.installation && (
                                <Card>
                                    <CardContent className="p-8">
                                        <h2 className="text-xl font-semibold mb-6">Installation</h2>
                                        <pre className="bg-muted rounded-lg p-4 text-sm overflow-x-auto">
                                            <code>{project.installation}</code>
                                        </pre>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Usage */}
                            {project.usage && (
                                <Card>
                                    <CardContent className="p-8">
                                        <h2 className="text-xl font-semibold mb-6">Usage</h2>
                                        <pre className="bg-muted rounded-lg p-4 text-sm overflow-x-auto whitespace-pre-wrap">
                                            <code>{project.usage}</code>
                                        </pre>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Contributing */}
                            {project.contributing && (
                                <Card>
                                    <CardContent className="p-8">
                                        <h2 className="text-xl font-semibold mb-6">Contributing</h2>
                                        <pre className="bg-muted rounded-lg p-4 text-sm overflow-x-auto whitespace-pre-wrap">
                                            <code>{project.contributing}</code>
                                        </pre>
                                    </CardContent>
                                </Card>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Project Info */}
                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="font-semibold mb-4">Project Info</h3>
                                    <div className="space-y-4 text-sm">
                                        <div className="flex justify-between items-center">
                                            <span className="text-muted-foreground">Language</span>
                                            <div className="flex items-center gap-2">
                                                <div className={cn(
                                                    "h-2 w-2 rounded-full",
                                                    project.language === 'TypeScript' && "bg-blue-500",
                                                    project.language === 'JavaScript' && "bg-yellow-500",
                                                    project.language === 'Python' && "bg-green-500",
                                                    project.language === 'Go' && "bg-cyan-500",
                                                    project.language === 'Vue' && "bg-emerald-500",
                                                    project.language === 'React' && "bg-blue-400",
                                                    !['TypeScript', 'JavaScript', 'Python', 'Go', 'Vue', 'React'].includes(project.language) && "bg-gray-500"
                                                )} />
                                                <span className="font-medium">{project.language}</span>
                                            </div>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Created</span>
                                            <span className="font-medium">{project.createdAt ? format(new Date(project.createdAt), 'MMM d, yyyy') : 'Unknown'}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Updated</span>
                                            <span className="font-medium">{project.updatedAt ? format(new Date(project.updatedAt), 'MMM d, yyyy') : 'Unknown'}</span>
                                        </div>
                                        {project.license && (
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">License</span>
                                                <span className="font-medium">{project.license}</span>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Links */}
                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="font-semibold mb-4">Links</h3>
                                    <div className="space-y-3">
                                        {project.githubUrl && (
                                            <Button asChild variant="outline" className="w-full justify-start">
                                                <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                                    <Github className="h-4 w-4 mr-2" />
                                                    Source Code
                                                </Link>
                                            </Button>
                                        )}
                                        {project.liveUrl && (
                                            <Button asChild variant="outline" className="w-full justify-start">
                                                <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                                    <ExternalLink className="h-4 w-4 mr-2" />
                                                    Live Demo
                                                </Link>
                                            </Button>
                                        )}
                                        {!project.githubUrl && !project.liveUrl && (
                                            <p className="text-sm text-muted-foreground">No links available</p>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}