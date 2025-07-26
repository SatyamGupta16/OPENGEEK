'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
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
  ArrowLeft,
  UserPlus,
  UserCheck
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
  const username = params.username as string;
  const { user: currentUser, isSignedIn } = useUser();
  
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  // Check if viewing own profile
  const isOwnProfile = isSignedIn && currentUser?.username === username;

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

  useEffect(() => {
    if (username) {
      fetchProfile();
      fetchUserPosts();
      setLoading(false);
    }
  }, [username]);

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
    onLike: () => {} // TODO: Implement like functionality
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white">Loading profile...</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="bg-black border-zinc-800/50 p-8 text-center">
          <CardContent>
            <h2 className="text-xl font-semibold text-white mb-4">User Not Found</h2>
            <p className="text-zinc-400 mb-4">The user @{username} could not be found.</p>
            <Button asChild variant="outline" className="border-zinc-600 text-zinc-300">
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 py-8">
      <div className="max-w-4xl mx-auto px-4 space-y-6">
        {/* Back Button */}
        <Button 
          asChild 
          variant="ghost" 
          className="text-zinc-400 hover:text-white mb-4"
        >
          <Link href="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Link>
        </Button>

        {/* Profile Header */}
        <Card className="bg-black border-zinc-800/50">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Avatar Section */}
              <div className="flex flex-col items-center md:items-start">
                <Avatar className="h-32 w-32 border-4 border-zinc-700">
                  <AvatarImage src={profile.imageUrl} alt={profile.fullName} />
                  <AvatarFallback className="bg-zinc-800 text-zinc-300 text-2xl">
                    {profile.firstName?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                
                {profile.isVerified && (
                  <Badge className="mt-2 bg-emerald-500/10 text-emerald-400 border-emerald-500/50">
                    Verified
                  </Badge>
                )}
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-white mb-1">
                      {profile.fullName || `${profile.firstName} ${profile.lastName}`}
                    </h1>
                    <p className="text-zinc-400">@{profile.username}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    {isOwnProfile ? (
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="border-zinc-600 text-zinc-300 hover:bg-zinc-800"
                      >
                        <Link href="/profile">
                          Edit Profile
                        </Link>
                      </Button>
                    ) : isSignedIn ? (
                      <Button
                        onClick={() => setIsFollowing(!isFollowing)}
                        size="sm"
                        className={isFollowing 
                          ? "bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-600" 
                          : "bg-white hover:bg-zinc-100 text-black"
                        }
                      >
                        {isFollowing ? (
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
                    ) : null}
                  </div>
                </div>

                {/* Bio Section */}
                <div className="mb-4">
                  <p className="text-zinc-300 leading-relaxed">
                    {profile.bio || 'No bio added yet.'}
                  </p>
                </div>

                {/* Additional Info */}
                <div className="space-y-2 text-sm text-zinc-400">
                  {profile.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{profile.location}</span>
                    </div>
                  )}
                  {profile.website && (
                    <div className="flex items-center gap-2">
                      <LinkIcon className="h-4 w-4" />
                      <a 
                        href={profile.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-emerald-400 hover:underline"
                      >
                        {profile.website}
                      </a>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Joined {formatDistanceToNow(new Date(profile.createdAt), { addSuffix: true })}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex gap-6 mt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{userPosts.length}</div>
                    <div className="text-sm text-zinc-400">Posts</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{profile.stats?.projectsCount || 0}</div>
                    <div className="text-sm text-zinc-400">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">0</div>
                    <div className="text-sm text-zinc-400">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">0</div>
                    <div className="text-sm text-zinc-400">Following</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Tabs */}
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-zinc-900 border border-zinc-800">
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
            <TabsTrigger 
              value="liked" 
              className="data-[state=active]:bg-white data-[state=active]:text-black"
              disabled={!isOwnProfile}
            >
              <Heart className="h-4 w-4 mr-2" />
              Liked
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="space-y-4 mt-6">
            {userPosts.length > 0 ? (
              userPosts.map((post) => (
                <PostCard key={post.id} {...transformPostForCard(post)} />
              ))
            ) : (
              <Card className="bg-black border-zinc-800/50">
                <CardContent className="p-12 text-center">
                  <MessageSquare className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-zinc-300 mb-2">No posts yet</h3>
                  <p className="text-zinc-500">
                    {isOwnProfile 
                      ? "Start sharing your thoughts with the community!" 
                      : `@${profile.username} hasn't posted anything yet.`
                    }
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="projects" className="space-y-4 mt-6">
            <Card className="bg-black border-zinc-800/50">
              <CardContent className="p-12 text-center">
                <Settings className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-zinc-300 mb-2">No projects yet</h3>
                <p className="text-zinc-500">
                  {isOwnProfile 
                    ? "Showcase your amazing projects here!" 
                    : `@${profile.username} hasn't shared any projects yet.`
                  }
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="liked" className="space-y-4 mt-6">
            <Card className="bg-black border-zinc-800/50">
              <CardContent className="p-12 text-center">
                <Heart className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-zinc-300 mb-2">No liked posts yet</h3>
                <p className="text-zinc-500">Posts you like will appear here!</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}