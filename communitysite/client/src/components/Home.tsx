'use client';

import { useState, useEffect } from 'react';
import { PostCard } from './ui/post-card';
import { CreatePost } from './ui/create-post';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { RefreshCw, MessageSquare } from 'lucide-react';
import Image from 'next/image';
import { postsAPI } from '@/lib/api';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';
import { PostSkeletonList } from './ui/post-skeleton';
import { ErrorBoundary } from './ui/error-boundary';

interface Post {
  id: string;
  content: string;
  image_url?: string;
  likes_count: number;
  comments_count: number;
  created_at: string;
  updated_at: string;
  is_liked_by_user: boolean;
  username: string;
  full_name: string;
  user_image_url: string;
  is_verified: boolean;
}

export default function Home() {
  const router = useRouter();
  const { isSignedIn } = useUser();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('newest');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Fetch posts from backend
  const fetchPosts = async (sortBy: 'created_at' | 'likes_count' = 'created_at', pageNum = 1) => {
    try {
      const response = await postsAPI.getPosts({
        page: pageNum,
        limit: 10,
        sort: sortBy,
        order: 'desc'
      });

      if (response.success) {
        const fetchedPosts = response.data.posts;
        
        if (pageNum === 1) {
          setPosts(fetchedPosts);
        } else {
          setPosts(prev => [...prev, ...fetchedPosts]);
        }
        
        setHasMore(response.data.pagination.hasNext);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast.error('Failed to load posts');
    }
  };

  // Load initial posts
  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      const sortBy = activeTab === 'top' ? 'likes_count' : 'created_at';
      await fetchPosts(sortBy);
      setLoading(false);
    };

    loadPosts();
  }, [activeTab]);

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setPage(1);
    setPosts([]);
  };

  // Handle refresh
  const handleRefresh = async () => {
    setRefreshing(true);
    setPage(1);
    const sortBy = activeTab === 'top' ? 'likes_count' : 'created_at';
    await fetchPosts(sortBy, 1);
    setRefreshing(false);
  };

  // Handle new post created
  const handlePostCreated = (newPost: Post) => {
    setPosts(prev => [newPost, ...prev]);
    toast.success('Post shared successfully!');
  };

  // Handle post like
  const handlePostLike = async (postId: string) => {
    try {
      const response = await postsAPI.likePost(postId);
      if (response.success) {
        setPosts(prev => prev.map(post => 
          post.id === postId 
            ? { 
                ...post, 
                is_liked_by_user: response.data.isLiked,
                likes_count: response.data.likesCount 
              }
            : post
        ));
      }
    } catch (error) {
      console.error('Error liking post:', error);
      toast.error('Failed to like post');
    }
  };

  // Transform post data for PostCard component
  const transformPostForCard = (post: Post) => ({
    id: post.id,
    user: {
      name: post.full_name || post.username,
      username: post.username,
      avatarUrl: post.user_image_url
    },
    content: post.content,
    timestamp: formatDistanceToNow(new Date(post.created_at), { addSuffix: true }),
    likes: post.likes_count,
    comments: post.comments_count,
    image: post.image_url,
    isLiked: post.is_liked_by_user,
    onLike: () => handlePostLike(post.id)
  });

  return (
    <ErrorBoundary>
      <div className="space-y-6">
        {/* Simple Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="OPENGEEK"
              width={40}
              height={40}
              className="rounded-full border border-emerald-500/30"
            />
            <div>
              <h1 className="text-xl font-bold text-white">Community Feed</h1>
              <p className="text-sm text-zinc-400">Share and discover amazing projects</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRefresh}
            disabled={refreshing}
            className="text-zinc-400 hover:text-emerald-400"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
          </Button>
        </div>

        {/* Welcome Message for Non-signed Users */}
        {!isSignedIn && (
          <Card className="bg-emerald-500/5 border-emerald-500/20">
            <CardContent className="p-4 text-center">
              <h2 className="text-lg font-semibold text-white mb-2">Welcome to OPENGEEK! 👋</h2>
              <p className="text-zinc-400 text-sm mb-3">Join our community to share projects and connect with developers.</p>
              <Button
                size="sm"
                className="bg-emerald-500 hover:bg-emerald-600 text-white"
                onClick={() => router.push('/sign-in')}
              >
                Get Started
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Create Post */}
        <CreatePost onPostCreated={handlePostCreated} />

        {/* Feed Tabs */}
        <div className="border-b border-zinc-800">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-transparent border-0 h-auto p-0">
              <TabsTrigger
                value="newest"
                className="data-[state=active]:border-b-2 data-[state=active]:border-emerald-500 data-[state=active]:text-emerald-400 rounded-none px-4 py-3 text-sm font-medium border-b-2 border-transparent"
              >
                Newest
              </TabsTrigger>
              <TabsTrigger
                value="top"
                className="data-[state=active]:border-b-2 data-[state=active]:border-emerald-500 data-[state=active]:text-emerald-400 rounded-none px-4 py-3 text-sm font-medium border-b-2 border-transparent"
              >
                Top Posts
              </TabsTrigger>
              <TabsTrigger
                value="following"
                className="data-[state=active]:border-b-2 data-[state=active]:border-emerald-500 data-[state=active]:text-emerald-400 rounded-none px-4 py-3 text-sm font-medium border-b-2 border-transparent"
              >
                Following
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Posts Feed */}
        <div className="space-y-4">
          {loading ? (
            <PostSkeletonList count={3} />
          ) : posts.length === 0 ? (
            <Card className="bg-black/30 border-zinc-800/50">
              <CardContent className="p-12 text-center">
                <MessageSquare className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-zinc-300 mb-2">No posts yet</h3>
                <p className="text-zinc-500 mb-4">Be the first to share something with the community!</p>
                {isSignedIn && (
                  <Button
                    variant="outline"
                    className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10"
                    onClick={() => document.querySelector('textarea')?.focus()}
                  >
                    Create First Post
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <>
              {posts.map((post) => (
                <PostCard key={post.id} {...transformPostForCard(post)} />
              ))}
              
              {hasMore && (
                <div className="flex justify-center pt-6">
                  <Button
                    variant="outline"
                    onClick={() => {
                      const nextPage = page + 1;
                      setPage(nextPage);
                      const sortBy = activeTab === 'top' ? 'likes_count' : 'created_at';
                      fetchPosts(sortBy, nextPage);
                    }}
                    className="border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-600"
                  >
                    Load More Posts
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
} 