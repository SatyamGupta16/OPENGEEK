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
  Share2
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
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
}

export function ProjectCard({
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
  featured = false
}: ProjectCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLiked(!isLiked);
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
    <Card className="group bg-black border-zinc-800/50 hover:border-zinc-700/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/5 overflow-hidden">
      {/* Project Image */}
      {image && !imageError && (
        <div className="relative h-48 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
          {featured && (
            <div className="absolute top-3 left-3">
              <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                <Star className="h-3 w-3 mr-1" />
                Featured
              </Badge>
            </div>
          )}
          <div className="absolute top-3 right-3 flex gap-2">
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 bg-black/50 hover:bg-black/70 text-white"
              onClick={handleLike}
            >
              <Heart className={cn("h-4 w-4", isLiked && "fill-red-500 text-red-500")} />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 bg-black/50 hover:bg-black/70 text-white"
              onClick={handleBookmark}
            >
              <Bookmark className={cn("h-4 w-4", isBookmarked && "fill-yellow-500 text-yellow-500")} />
            </Button>
          </div>
        </div>
      )}

      <CardHeader className="pb-3">
        {/* Author Info */}
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={author.avatarUrl} alt={author.name} />
            <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{author.name}</p>
            <p className="text-xs text-zinc-500">@{author.username}</p>
          </div>
          <Button
            size="sm"
            variant="ghost"
            className="h-8 w-8 p-0 text-zinc-400 hover:text-white"
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>

        {/* Project Title */}
        <h3 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
          {title}
        </h3>
      </CardHeader>

      <CardContent className="pb-4">
        {/* Description */}
        <p className="text-sm text-zinc-400 mb-4 line-clamp-2">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {tags.slice(0, 3).map((tag, index) => (
            <Badge 
              key={index} 
              variant="secondary" 
              className="text-xs bg-zinc-800/50 text-zinc-300 hover:bg-zinc-700/50"
            >
              {tag}
            </Badge>
          ))}
          {tags.length > 3 && (
            <Badge variant="secondary" className="text-xs bg-zinc-800/50 text-zinc-300">
              +{tags.length - 3}
            </Badge>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 text-sm text-zinc-500">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4" />
            <span>{stars.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <GitFork className="h-4 w-4" />
            <span>{forks}</span>
          </div>
          <div className="flex items-center gap-1">
            <div className={cn(
              "h-3 w-3 rounded-full",
              language === 'TypeScript' && "bg-blue-500",
              language === 'JavaScript' && "bg-yellow-500",
              language === 'Python' && "bg-green-500",
              language === 'Go' && "bg-cyan-500",
              language === 'Vue' && "bg-emerald-500",
              !['TypeScript', 'JavaScript', 'Python', 'Go', 'Vue'].includes(language) && "bg-zinc-500"
            )} />
            <span>{language}</span>
          </div>
        </div>

        {/* Last Updated */}
        <div className="flex items-center gap-1 text-xs text-zinc-600 mt-2">
          <Calendar className="h-3 w-3" />
          <span>Updated {lastUpdated}</span>
        </div>
      </CardContent>

      <CardFooter className="pt-0 flex gap-2">
        <Button
          asChild
          variant="outline"
          size="sm"
          className="flex-1 border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-600"
        >
          <Link href={githubUrl} target="_blank" rel="noopener noreferrer">
            <Github className="h-4 w-4 mr-2" />
            Code
          </Link>
        </Button>
        {liveUrl && (
          <Button
            asChild
            size="sm"
            className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white"
          >
            <Link href={liveUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" />
              Live Demo
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}