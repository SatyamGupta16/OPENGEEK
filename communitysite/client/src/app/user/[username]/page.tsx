'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PostCard } from '@/components/ui/post-card';
import {
  MapPin,
  Link as LinkIcon,
  Calendar,
  MessageSquare,
  Heart,
  Settings,
  UserPlus,
  UserCheck,
  Github,
  Twitter
} from 'lucide-react';
import { toast } from 'sonner';
import { usersAPI } from '@/lib/api';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';

interface UserProfile {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  fullName: string;
  imageUrl: string;
  bio?: string;
  location?: string;
  website?: string;
  githubUsername?: string;
  twitterUsername?: string;
  linkedinUsername?: string;
  isVerified: boolean;
  createdAt: string;
  stats?: {
    postsCount: number;
    projectsCount: number;
  };
}

interface Post {
  id: string;
  content: string;
  image_url?: string;
  likes_count: number;
  comments_count: number;
  created_at: string;
  is_liked_by_user: boolean;
  username: string;
  full_name: string;
  user_image_url: string;
  is_verified: boolean;
}

export default function UserProfilePage() {
  const params = useParams();
  const router = useRouter();
  const username = params.username as string;
  const { user: currentUser, isSignedIn } = useUser();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [isFollowLoading, setIsFollowLoading] = useState(false);

  // Check if viewing own profile - use multiple methods for comparison
  const isOwnProfile = isSignedIn && (
    currentUser?.username === username ||
    currentUser?.emailAddresses?.[0]?.emailAddress?.split('@')[0] === username ||
    (currentUser?.firstName && currentUser?.lastName &&
      `${currentUser.firstName}${currentUser.lastName}`.toLowerCase() === username.toLowerCase())
  );

  // Fetch user profile
  const fetchProfile = async () => {
    try {
      const response = await usersAPI.getUserProfile(username);
      if (response.success) {
        setProfile(response.data.user);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Failed to load profile');
    }
  };

  // Fetch user posts
  const fetchUserPosts = async () => {
    try {
      const response = await usersAPI.getUserPosts(username, {
        page: 1,
        limit: 10
      });

      if (response.success) {
        setUserPosts(response.data.posts);
      }
    } catch (error) {
      console.error('Error fetching user posts:', error);
    }
  };

  // Fetch follow status
  const fetchFollowStatus = async () => {
    if (!isSignedIn || isOwnProfile) return;

    try {
      const response = await usersAPI.getFollowStatus(username);
      if (response.success) {
        setIsFollowing(response.data.isFollowing);
        setFollowerCount(response.data.followerCount);
        setFollowingCount(response.data.followingCount);
      }
    } catch (error) {
      console.error('Error fetching follow status:', error);
    }
  };

  // Handle follow/unfollow
  const handleFollowToggle = async () => {
    if (!isSignedIn || isOwnProfile) return;

    setIsFollowLoading(true);
    try {
      const response = await usersAPI.followUser(username);
      if (response.success) {
        setIsFollowing(response.data.isFollowing);
        setFollowerCount(response.data.followerCount);
        setFollowingCount(response.data.followingCount);

        toast.success(
          response.data.isFollowing
            ? `You are now following @${username}`
            : `You unfollowed @${username}`
        );
      }
    } catch (error) {
      console.error('Error toggling follow:', error);
      toast.error('Failed to update follow status');
    } finally {
      setIsFollowLoading(false);
    }
  };

  useEffect(() => {
    if (username) {
      fetchProfile();
      fetchUserPosts();
      fetchFollowStatus();
      setLoading(false);
    }
  }, [username, isSignedIn]);

  // Transform post for PostCard
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
    onLike: () => { } // TODO: Implement like functionality
  });

  // Redirect to own profile if viewing own username
  useEffect(() => {
    if (isOwnProfile) {
      router.push('/profile');
      return;
    }
  }, [isOwnProfile, router]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center py-20">
          <div className="text-white text-lg">Loading profile...</div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center py-20">
          <Card className="bg-zinc-950 border-zinc-800">
            <CardContent className="p-8 text-center">
              <h2 className="text-xl font-semibold text-white mb-4">User Not Found</h2>
              <p className="text-zinc-400 mb-6">The user @{username} could not be found.</p>
              <Button asChild variant="outline" className="border-zinc-600 text-zinc-300 hover:bg-zinc-800">
                <Link href="/">
                  Back to Home
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Don't render if redirecting to own profile
  if (isOwnProfile) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center py-20">
          <div className="text-white text-lg">Redirecting to your profile...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-6">


        {/* Profile Header */}
        <Card className="bg-zinc-950 border-zinc-800">
          <CardContent className="p-8">
            <div className="flex flex-col sm:flex-row gap-6">
              {/* Avatar Section */}
              <div className="flex flex-col items-center sm:items-start">
                <Avatar className="h-24 w-24 sm:h-32 sm:w-32 border-2 border-zinc-700">
                  <AvatarImage src={profile.imageUrl} alt={profile.fullName} className="object-cover" />
                  <AvatarFallback className="bg-zinc-800 text-white text-2xl font-medium">
                    {profile.firstName?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>

                {profile.isVerified && (
                  <Badge variant="secondary" className="mt-3 bg-zinc-800 text-zinc-300 border-zinc-700">
                    Verified
                  </Badge>
                )}
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                      {profile.fullName || `${profile.firstName} ${profile.lastName}`}
                    </h1>
                    <p className="text-zinc-400 text-lg mb-2">@{profile.username}</p>
                    <p className="text-zinc-500 text-sm">
                      Member since {formatDistanceToNow(new Date(profile.createdAt), { addSuffix: true })}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 flex-shrink-0">
                    {isSignedIn && (
                      <Button
                        onClick={handleFollowToggle}
                        disabled={isFollowLoading}
                        size="sm"
                        className={isFollowing
                          ? "bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-600"
                          : "bg-white hover:bg-zinc-100 text-black"
                        }
                      >
                        {isFollowLoading ? (
                          <>
                            <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
                            {isFollowing ? 'Unfollowing...' : 'Following...'}
                          </>
                        ) : isFollowing ? (
                          <>
                            <UserCheck className="h-4 w-4 mr-2" />
                            Following
                          </>
                        ) : (
                          <>
                            <UserPlus className="h-4 w-4 mr-2" />
                            Follow
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </div>

                {/* Bio Section */}
                <div className="mb-6">
                  <p className="text-zinc-300 leading-relaxed">
                    {profile.bio || (
                      <span className="text-zinc-500 italic">
                        No bio added yet.
                      </span>
                    )}
                  </p>
                </div>

                {/* Additional Info */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-4 text-sm">
                    {profile.location && (
                      <div className="flex items-center gap-2 text-zinc-400">
                        <MapPin className="h-4 w-4" />
                        <span>{profile.location}</span>
                      </div>
                    )}
                    {profile.website && (
                      <div className="flex items-center gap-2 text-zinc-400">
                        <LinkIcon className="h-4 w-4" />
                        <a
                          href={profile.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white hover:text-zinc-300 transition-colors"
                        >
                          {profile.website.replace(/^https?:\/\//, '')}
                        </a>
                      </div>
                    )}
                    {profile.githubUsername && (
                      <div className="flex items-center gap-2 text-zinc-400">
                        <Github className="h-4 w-4" />
                        <a
                          href={`https://github.com/${profile.githubUsername}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white hover:text-zinc-300 transition-colors"
                        >
                          github.com/{profile.githubUsername}
                        </a>
                      </div>
                    )}
                    {profile.twitterUsername && (
                      <div className="flex items-center gap-2 text-zinc-400">
                        <Twitter className="h-4 w-4" />
                        <a
                          href={`https://twitter.com/${profile.twitterUsername}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white hover:text-zinc-300 transition-colors"
                        >
                          @{profile.twitterUsername}
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{userPosts.length}</div>
                    <div className="text-sm text-zinc-400">Posts</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{profile.stats?.projectsCount || 0}</div>
                    <div className="text-sm text-zinc-400">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{followerCount}</div>
                    <div className="text-sm text-zinc-400">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{followingCount}</div>
                    <div className="text-sm text-zinc-400">Following</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Tabs */}
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-zinc-950 border border-zinc-800">
            <TabsTrigger
              value="posts"
              className="data-[state=active]:bg-white data-[state=active]:text-black"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Posts
            </TabsTrigger>
            <TabsTrigger
              value="projects"
              className="data-[state=active]:bg-white data-[state=active]:text-black"
            >
              <Settings className="h-4 w-4 mr-2" />
              Projects
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="space-y-4 mt-6">
            {userPosts.length > 0 ? (
              userPosts.map((post) => (
                <PostCard key={post.id} {...transformPostForCard(post)} />
              ))
            ) : (
              <Card className="bg-zinc-950 border-zinc-800">
                <CardContent className="p-12 text-center">
                  <MessageSquare className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-zinc-300 mb-2">No posts yet</h3>
                  <p className="text-zinc-500">
                    @{profile.username} hasn&apos;t posted anything yet.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="projects" className="space-y-4 mt-6">
            <Card className="bg-zinc-950 border-zinc-800">
              <CardContent className="p-12 text-center">
                <Settings className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-zinc-300 mb-2">No projects yet</h3>
                <p className="text-zinc-500">
                  @{profile.username} hasn&apos;t shared any projects yet.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}