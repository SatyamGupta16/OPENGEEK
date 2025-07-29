'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from './card';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { Badge } from './badge';
import { Button } from './button';
import { 
  Star, 
  GitFork, 
  ExternalLink, 
  Github, 
  Calendar,
  Heart,
  Bookmark,
  Share2,
  Code
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  author: {
    name: string;
    username: string;
    avatarUrl: string;
  };
  image?: string;
  tags: string[];
  stars: number;
  forks: number;
  language: string;
  lastUpdated: string;
  githubUrl: string;
  liveUrl?: string;
  featured?: boolean;
  isStarred?: boolean;
  onStar?: (projectId: string) => void;
}

export function ProjectCard({
  id,
  title,
  description,
  author,
  image,
  tags,
  stars,
  forks,
  language,
  lastUpdated,
  githubUrl,
  liveUrl,
  featured = false,
  isStarred = false,
  onStar
}: ProjectCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleStar = (e: React.MouseEvent) => {
    e.preventDefault();
    onStar?.(id);
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    if (navigator.share) {
      navigator.share({
        title: title,
        text: description,
        url: liveUrl || githubUrl,
      });
    } else {
      navigator.clipboard.writeText(liveUrl || githubUrl);
    }
  };

  return (
    <Card className="group bg-black border-zinc-800 hover:border-zinc-700 transition-all duration-300 hover:shadow-lg hover:shadow-zinc-900/20 overflow-hidden h-fit">
      {/* Compact Project Image */}
      {image && !imageError && (
        <div className="relative h-32 overflow-hidden bg-zinc-800">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
          {featured && (
            <div className="absolute top-2 left-2">
              <Badge className="bg-white text-black shadow-sm text-xs px-2 py-0.5">
                <Star className="h-2.5 w-2.5 mr-1 fill-current" />
                Featured
              </Badge>
            </div>
          )}
          <div className="absolute top-2 right-2">
            <Button
              size="sm"
              variant="ghost"
              className="h-6 w-6 p-0 bg-black/60 hover:bg-black/80 text-white shadow-sm"
              onClick={handleStar}
            >
              <Star className={cn("h-3 w-3", isStarred && "fill-yellow-400 text-yellow-400")} />
            </Button>
          </div>
        </div>
      )}

      {/* Compact Fallback for no image */}
      {(!image || imageError) && (
        <div className="relative h-32 bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
          <Code className="h-8 w-8 text-zinc-500" />
          {featured && (
            <div className="absolute top-2 left-2">
              <Badge className="bg-white text-black shadow-sm text-xs px-2 py-0.5">
                <Star className="h-2.5 w-2.5 mr-1 fill-current" />
                Featured
              </Badge>
            </div>
          )}
          <div className="absolute top-2 right-2">
            <Button
              size="sm"
              variant="ghost"
              className="h-6 w-6 p-0 bg-black/60 hover:bg-black/80 text-white shadow-sm"
              onClick={handleStar}
            >
              <Star className={cn("h-3 w-3", isStarred && "fill-yellow-400 text-yellow-400")} />
            </Button>
          </div>
        </div>
      )}

      {/* Compact Content */}
      <div className="p-4">
        {/* Project Title */}
        <h3 className="text-base font-semibold text-white group-hover:text-zinc-300 transition-colors line-clamp-1 mb-2">
          {title}
        </h3>

        {/* Description */}
        <p className="text-xs text-zinc-400 mb-3 line-clamp-2 leading-relaxed">
          {description}
        </p>

        {/* Compact Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {tags.slice(0, 2).map((tag, index) => (
            <Badge 
              key={index} 
              variant="secondary" 
              className="text-xs bg-zinc-800 text-zinc-300 hover:bg-zinc-700 border-0 px-2 py-0.5"
            >
              {tag}
            </Badge>
          ))}
          {tags.length > 2 && (
            <Badge variant="secondary" className="text-xs bg-zinc-800 text-zinc-300 border-0 px-2 py-0.5">
              +{tags.length - 2}
            </Badge>
          )}
        </div>

        {/* Compact Stats */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3 text-xs text-zinc-500">
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3" />
              <span>{stars}</span>
            </div>
            <div className="flex items-center gap-1">
              <GitFork className="h-3 w-3" />
              <span>{forks}</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <div className={cn(
              "h-2 w-2 rounded-full",
              language === 'TypeScript' && "bg-blue-500",
              language === 'JavaScript' && "bg-yellow-500",
              language === 'Python' && "bg-green-500",
              language === 'Go' && "bg-cyan-500",
              language === 'Vue' && "bg-emerald-500",
              language === 'React' && "bg-blue-400",
              language === 'Node.js' && "bg-green-600",
              !['TypeScript', 'JavaScript', 'Python', 'Go', 'Vue', 'React', 'Node.js'].includes(language) && "bg-zinc-500"
            )} />
            <span className="text-xs text-zinc-500">{language}</span>
          </div>
        </div>

        {/* Author Info - Compact */}
        <div className="flex items-center gap-2 mb-3">
          <Avatar className="h-5 w-5">
            <AvatarImage src={author.avatarUrl} alt={author.name} />
            <AvatarFallback className="bg-zinc-800 text-zinc-300 text-xs">
              {author.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <span className="text-xs text-zinc-500 truncate">{author.name}</span>
          <span className="text-xs text-zinc-600">•</span>
          <span className="text-xs text-zinc-600">{lastUpdated}</span>
        </div>

        {/* Compact Action Buttons */}
        <div className="flex gap-2">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="flex-1 h-8 border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-600 hover:bg-zinc-800 text-xs"
          >
            <Link href={githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="h-3 w-3 mr-1" />
              Code
            </Link>
          </Button>
          {liveUrl && (
            <Button
              asChild
              size="sm"
              className="flex-1 h-8 bg-white hover:bg-zinc-100 text-black shadow-sm text-xs"
            >
              <Link href={liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-3 w-3 mr-1" />
                Demo
              </Link>
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}