'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card } from './card';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { Badge } from './badge';
import {
  Star,
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
  const [imageError, setImageError] = useState(false);

  return (
    <Link href={`/projects/${id}`}>
      <Card className="group bg-black border-zinc-800 hover:border-zinc-700 transition-all duration-300 hover:shadow-lg hover:shadow-zinc-900/20 overflow-hidden h-fit cursor-pointer">
        {/* Project Image */}
        {image && !imageError ? (
          <div className="relative h-40 overflow-hidden bg-zinc-800">
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
          </div>
        ) : (
          <div className="relative h-40 bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
            <Code className="h-12 w-12 text-zinc-500" />
            {featured && (
              <div className="absolute top-2 left-2">
                <Badge className="bg-white text-black shadow-sm text-xs px-2 py-0.5">
                  <Star className="h-2.5 w-2.5 mr-1 fill-current" />
                  Featured
                </Badge>
              </div>
            )}
          </div>
        )}

        {/* Minimal Content */}
        <div className="p-4">
          {/* Project Title */}
          <h3 className="text-lg font-semibold text-white group-hover:text-zinc-300 transition-colors line-clamp-1 mb-3">
            {title}
          </h3>

          {/* Author Info */}
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={author.avatarUrl} alt={author.name} />
              <AvatarFallback className="bg-zinc-800 text-zinc-300 text-xs">
                {author.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm text-zinc-400 truncate">{author.name}</span>
          </div>
        </div>
      </Card>
    </Link>
  );
}