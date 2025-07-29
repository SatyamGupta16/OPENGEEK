'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { Button } from './button';
import { Input } from './input';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { Card } from './card';
import { Heart, MessageCircle, Send, Trash2 } from 'lucide-react';
import { postsAPI } from '@/lib/api';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';

interface Comment {
  id: string;
  content: string;
  likes_count: number;
  is_liked_by_user: boolean;
  created_at: string;
  updated_at: string;
  username: string;
  full_name: string;
  user_image_url: string;
  is_verified: boolean;
  user_id: string;
}

interface CommentSectionProps {
  postId: string;
  isOpen: boolean;
  onClose: () => void;
}

export function CommentSection({ postId, isOpen, onClose }: CommentSectionProps) {
  const { isSignedIn, user } = useUser();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch comments when section opens
  useEffect(() => {
    if (isOpen && postId) {
      fetchComments();
    }
  }, [isOpen, postId]);

  const fetchComments = async () => {
    setIsLoading(true);
    try {
      const response = await postsAPI.getComments(postId);
      if (response.success) {
        setComments(response.data.comments || []);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
      toast.error('Failed to load comments');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !isSignedIn) return;

    setIsSubmitting(true);
    try {
      const response = await postsAPI.addComment(postId, {
        content: newComment.trim()
      });

      if (response.success) {
        setComments(prev => [...prev, response.data.comment]);
        setNewComment('');
        toast.success('Comment added successfully!');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error('Failed to add comment');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLikeComment = async (commentId: string) => {
    if (!isSignedIn) {
      toast.error('Please sign in to like comments');
      return;
    }

    try {
      // This would need to be implemented in the API
      // const response = await postsAPI.likeComment(commentId);
      // For now, we'll just show a message
      toast.info('Comment liking will be implemented soon');
    } catch (error) {
      console.error('Error liking comment:', error);
      toast.error('Failed to like comment');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[80vh] bg-zinc-900 border-zinc-800 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Comments</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-zinc-400 hover:text-white"
          >
            ✕
          </Button>
        </div>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {isLoading ? (
            <div className="text-center text-zinc-400 py-8">
              Loading comments...
            </div>
          ) : comments.length === 0 ? (
            <div className="text-center text-zinc-400 py-8">
              <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No comments yet</p>
              <p className="text-sm">Be the first to comment!</p>
            </div>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={comment.user_image_url} alt={comment.full_name} />
                  <AvatarFallback>{comment.full_name[0]}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="bg-zinc-800/50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-white text-sm">
                        {comment.full_name}
                      </span>
                      <span className="text-zinc-500 text-xs">
                        @{comment.username}
                      </span>
                      <span className="text-zinc-500 text-xs">
                        {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                      </span>
                    </div>
                    <p className="text-zinc-200 text-sm">{comment.content}</p>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLikeComment(comment.id)}
                      className={`text-xs h-6 px-2 ${
                        comment.is_liked_by_user
                          ? 'text-red-500 hover:text-red-400'
                          : 'text-zinc-400 hover:text-red-400'
                      }`}
                    >
                      <Heart className={`h-3 w-3 mr-1 ${comment.is_liked_by_user ? 'fill-current' : ''}`} />
                      {comment.likes_count}
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Comment Input */}
        {isSignedIn ? (
          <div className="p-4 border-t border-zinc-800">
            <form onSubmit={handleSubmitComment} className="flex gap-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src={user?.imageUrl} alt={user?.fullName || 'User'} />
                <AvatarFallback>{user?.firstName?.[0] || 'U'}</AvatarFallback>
              </Avatar>
              <div className="flex-1 flex gap-2">
                <Input
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write a comment..."
                  className="bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500"
                  maxLength={500}
                />
                <Button
                  type="submit"
                  disabled={!newComment.trim() || isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700 px-3"
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </form>
          </div>
        ) : (
          <div className="p-4 border-t border-zinc-800 text-center">
            <p className="text-zinc-400">Please sign in to comment</p>
          </div>
        )}
      </Card>
    </div>
  );
}