'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { Button } from './button';
import { Card } from './card';
import { CommentSection } from './comment-section';
import { Heart, MessageCircle, Share2, MoreHorizontal, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { postsAPI } from '@/lib/api';
import { toast } from 'sonner';

interface PostCardProps {
  id: string;
  user: {
    name: string;
    username: string;
    avatarUrl: string;
    userId?: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  image?: string;
  isLiked?: boolean;
  onLike?: () => void;
  onDelete?: (postId: string) => void;
}

export function PostCard({
  id,
  user,
  content,
  timestamp,
  likes,
  comments,
  image,
  isLiked = false,
  onLike,
  onDelete
}: PostCardProps) {
  const { user: currentUser } = useUser();
  const [showComments, setShowComments] = useState(false);
  const [showDeleteMenu, setShowDeleteMenu] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Close delete menu when clicking outside
  useEffect(() => {
    if (showDeleteMenu) {
      const handleClickOutside = (e: MouseEvent) => {
        const target = e.target as Element;
        if (!target.closest('.delete-menu')) {
          setShowDeleteMenu(false);
        }
      };
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showDeleteMenu]);

  // Check if current user can delete this post
  const canDelete = currentUser && (currentUser.id === user.userId);

  const handleDeletePost = async () => {
    if (!canDelete) return;

    const confirmed = window.confirm('Are you sure you want to delete this post? This action cannot be undone.');
    if (!confirmed) return;

    setIsDeleting(true);
    try {
      const response = await postsAPI.deletePost(id);
      if (response.success) {
        toast.success('Post deleted successfully');
        onDelete?.(id);
      } else {
        toast.error('Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error('Failed to delete post');
    } finally {
      setIsDeleting(false);
      setShowDeleteMenu(false);
    }
  };

  return (
    <>
      <Card className="bg-black border-zinc-800/50">
        <div className="p-4">
          {/* User Info */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Link href={`/user/${user.username}`}>
                <Avatar className="cursor-pointer hover:ring-2 hover:ring-zinc-600 transition-all">
                  <AvatarImage src={user.avatarUrl} alt={user.name} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
              </Link>
              <div>
                <Link href={`/user/${user.username}`} className="hover:underline">
                  <div className="font-medium text-white">{user.name}</div>
                </Link>
                <Link href={`/user/${user.username}`} className="hover:underline">
                  <div className="text-sm text-zinc-400">@{user.username}</div>
                </Link>
              </div>
            </div>

            {/* Delete Menu */}
            {canDelete && (
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowDeleteMenu(!showDeleteMenu)}
                  className="text-zinc-400 hover:text-white p-1"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
                
                {showDeleteMenu && (
                  <div className="absolute right-0 top-8 bg-zinc-800 border border-zinc-700 rounded-lg shadow-lg z-10 delete-menu">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleDeletePost}
                      disabled={isDeleting}
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/10 w-full justify-start px-3 py-2"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      {isDeleting ? 'Deleting...' : 'Delete Post'}
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>

        {/* Content */}
        <p className="text-zinc-100 mb-4">{content}</p>

        {/* Image */}
        {image && (
          <div className="mb-4 rounded-lg overflow-hidden relative aspect-[16/9]">
            <Image
              src={image}
              alt="Post content"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}

        {/* Timestamp */}
        <div className="text-sm text-zinc-500 mb-4">{timestamp}</div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onLike}
            className={`${likes > 0 || isLiked
              ? 'text-red-500 hover:text-red-400 hover:bg-red-500/10'
              : 'text-zinc-400 hover:text-red-400 hover:bg-red-500/10'
              } transition-colors`}
          >
            <Heart className={`h-4 w-4 mr-1 ${likes > 0 || isLiked ? 'fill-current' : ''}`} />
            {likes}
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowComments(true)}
            className="text-zinc-400 hover:text-emerald-400 hover:bg-emerald-500/10"
          >
            <MessageCircle className="h-4 w-4 mr-1" />
            {comments}
          </Button>
          <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-emerald-400 hover:bg-emerald-500/10">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
        </div>
      </Card>

      {/* Comment Section Modal */}
      <CommentSection
        postId={id}
        isOpen={showComments}
        onClose={() => setShowComments(false)}
      />
    </>
  );
} 