'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    ArrowLeft,
    Star,
    GitFork,
    ExternalLink,
    Github,
    Calendar,
    User,
    Code,
    Eye
} from 'lucide-react';
import { projectsAPI } from '@/lib/api';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';
import Image from 'next/image';

interface ProjectDetail {
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

export default function ProjectDetailPage() {
    const params = useParams();
    const { isSignedIn } = useUser();
    const [project, setProject] = useState<ProjectDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [imageError, setImageError] = useState(false);

    const projectId = params.id as string;

    useEffect(() => {
        if (projectId) {
            fetchProject();
        }
    }, [projectId]);

    const fetchProject = async () => {
        try {
            setLoading(true);
            const response = await projectsAPI.getProject(projectId);

            if (response.success && response.data) {
                setProject(response.data.project);
            } else {
                toast.error('Project not found');
            }
        } catch (error) {
            console.error('Error fetching project:', error);
            toast.error('Failed to load project');
        } finally {
            setLoading(false);
        }
    };

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
            toast.error('Failed to star project');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="animate-pulse">
                        <div className="h-8 bg-zinc-800 rounded mb-6 w-1/3"></div>
                        <div className="h-64 bg-zinc-800 rounded mb-6"></div>
                        <div className="h-6 bg-zinc-800 rounded mb-4 w-2/3"></div>
                        <div className="h-4 bg-zinc-800 rounded mb-2"></div>
                        <div className="h-4 bg-zinc-800 rounded mb-2 w-3/4"></div>
                        <div className="h-4 bg-zinc-800 rounded w-1/2"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="min-h-screen bg-black">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <Card className="bg-zinc-900/50 border-zinc-800">
                        <CardContent className="p-12 text-center">
                            <Code className="h-16 w-16 text-zinc-600 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-white mb-2">Project not found</h3>
                            <p className="text-zinc-400 mb-6">
                                The project you&apos;re looking for doesn&apos;t exist or has been removed.
                            </p>
                            <Button
                                variant="outline"
                                className="border-zinc-600 text-zinc-300 hover:bg-zinc-800/50"
                                asChild
                            >
                                <Link href="/projects">
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Back to Projects
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Back Button */}
                <Button
                    variant="ghost"
                    className="text-zinc-400 hover:text-white mb-6"
                    asChild
                >
                    <Link href="/projects">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Projects
                    </Link>
                </Button>

                {/* Project Header */}
                <Card className="bg-zinc-900/50 border-zinc-800 mb-6">
                    <CardContent className="p-6">
                        <div className="flex flex-col lg:flex-row gap-6">
                            {/* Project Image */}
                            {project.imageUrl && !imageError && (
                                <div className="lg:w-1/3">
                                    <div className="relative aspect-video rounded-lg overflow-hidden">
                                        <Image
                                            src={project.imageUrl}
                                            alt={project.title}
                                            fill
                                            className="object-cover"
                                            onError={() => setImageError(true)}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Project Info */}
                            <div className="flex-1">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h1 className="text-2xl font-bold text-white mb-2">
                                            {project.title}
                                        </h1>
                                        {project.isFeatured && (
                                            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 mb-2">
                                                <Star className="h-3 w-3 mr-1" />
                                                Featured
                                            </Badge>
                                        )}
                                    </div>
                                </div>

                                <p className="text-zinc-300 mb-4 leading-relaxed">
                                    {project.description}
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tags.map((tag, index) => (
                                        <Badge
                                            key={index}
                                            variant="secondary"
                                            className="bg-zinc-800/50 text-zinc-300 hover:bg-zinc-700/50"
                                        >
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>

                                {/* Stats */}
                                <div className="flex items-center gap-6 text-sm text-zinc-400 mb-6">
                                    <div className="flex items-center gap-1">
                                        <Star className="h-4 w-4" />
                                        <span>{project.starsCount.toLocaleString()}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <GitFork className="h-4 w-4" />
                                        <span>{project.forksCount}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Code className="h-4 w-4" />
                                        <span>{project.language}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Calendar className="h-4 w-4" />
                                        <span>Updated {formatDistanceToNow(new Date(project.updatedAt), { addSuffix: true })}</span>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3">
                                    <Button
                                        onClick={handleStar}
                                        variant={project.isStarredByUser ? "default" : "outline"}
                                        className={project.isStarredByUser
                                            ? "bg-yellow-500 hover:bg-yellow-600 text-black"
                                            : "border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-600"
                                        }
                                    >
                                        <Star className={`h-4 w-4 mr-2 ${project.isStarredByUser ? 'fill-current' : ''}`} />
                                        {project.isStarredByUser ? 'Starred' : 'Star'}
                                    </Button>

                                    <Button
                                        variant="outline"
                                        className="border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-600"
                                        asChild
                                    >
                                        <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                            <Github className="h-4 w-4 mr-2" />
                                            View Code
                                        </Link>
                                    </Button>

                                    {project.liveUrl && (
                                        <Button
                                            className="bg-emerald-500 hover:bg-emerald-600 text-white"
                                            asChild
                                        >
                                            <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                                <ExternalLink className="h-4 w-4 mr-2" />
                                                Live Demo
                                            </Link>
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Author Info */}
                <Card className="bg-zinc-900/50 border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <User className="h-5 w-5" />
                            About the Author
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-4">
                            <Avatar className="h-12 w-12">
                                <AvatarImage src={project.author.imageUrl} alt={project.author.fullName} />
                                <AvatarFallback>{project.author.fullName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h3 className="font-semibold text-white">{project.author.fullName}</h3>
                                    {project.author.isVerified && (
                                        <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                                            Verified
                                        </Badge>
                                    )}
                                </div>
                                <p className="text-zinc-400">@{project.author.username}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}