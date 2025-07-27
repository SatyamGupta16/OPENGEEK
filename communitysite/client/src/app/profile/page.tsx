'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PostCard } from '@/components/ui/post-card';
import {
  Edit3,
  Save,
  X,
  MapPin,
  Link as LinkIcon,
  Calendar,
  MessageSquare,
  Heart,
  Settings,
  Camera,
  Github,
  Twitter,
  Globe
} from 'lucide-react';
import { toast } from 'sonner';
import { usersAPI, postsAPI } from '@/lib/api';
import { formatDistanceToNow } from 'date-fns';
import { getAuthToken } from '@/lib/token-manager';

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

export default function ProfilePage() {
  const { user, isSignedIn } = useUser();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  // Editable fields
  const [editedProfile, setEditedProfile] = useState({
    firstName: '',
    lastName: '',
    fullName: '',
    bio: '',
    location: '',
    website: '',
    githubUsername: '',
    twitterUsername: '',
    linkedinUsername: ''
  });

  // Fetch user profile
  const fetchProfile = async () => {
    try {
      const response = await usersAPI.getProfile();
      if (response.success) {
        setProfile(response.data.user);
        setEditedProfile({
          firstName: response.data.user.firstName || '',
          lastName: response.data.user.lastName || '',
          fullName: response.data.user.fullName || '',
          bio: response.data.user.bio || '',
          location: response.data.user.location || '',
          website: response.data.user.website || '',
          githubUsername: response.data.user.githubUsername || '',
          twitterUsername: response.data.user.twitterUsername || '',
          linkedinUsername: response.data.user.linkedinUsername || ''
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Failed to load profile');
    }
  };

  // Fetch user posts
  const fetchUserPosts = async () => {
    try {
      if (profile?.username) {
        const response = await postsAPI.getPosts({
          page: 1,
          limit: 10,
          sort: 'created_at',
          order: 'desc'
        });

        if (response.success) {
          // Filter posts by current user
          const currentUserPosts = response.data.posts.filter(
            (post: Post) => post.username === profile.username
          );
          setUserPosts(currentUserPosts);
        }
      }
    } catch (error) {
      console.error('Error fetching user posts:', error);
    }
  };

  // Fetch follower counts for current user
  const fetchFollowerCounts = async () => {
    try {
      if (profile?.username) {
        const response = await usersAPI.getFollowStatus(profile.username);
        if (response.success) {
          setFollowerCount(response.data.followerCount);
          setFollowingCount(response.data.followingCount);
        }
      }
    } catch (error) {
      // If follow status fails (user not found or not signed in), just use 0 counts
      console.log('Could not fetch follow counts:', error);
    }
  };

  useEffect(() => {
    if (isSignedIn) {
      // Wait for token to be available before making API call
      const checkTokenAndFetch = async () => {
        let attempts = 0;
        const maxAttempts = 50; // 5 seconds max wait
        
        const waitForToken = () => {
          const token = getAuthToken();
          if (token) {
            console.log('Token found, fetching profile...');
            fetchProfile();
            return;
          }
          
          attempts++;
          if (attempts < maxAttempts) {
            setTimeout(waitForToken, 100);
          } else {
            console.error('Token not available after 5 seconds, trying to fetch anyway...');
            fetchProfile();
          }
        };
        
        waitForToken();
      };
      
      checkTokenAndFetch();
    }
  }, [isSignedIn]);

  useEffect(() => {
    if (profile) {
      fetchUserPosts();
      fetchFollowerCounts();
      setLoading(false);
    }
  }, [profile]);

  // Handle profile update
  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      const response = await usersAPI.updateProfile(editedProfile);
      if (response.success) {
        setProfile(response.data.user);
        setIsEditing(false);
        toast.success('Profile updated successfully!');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    if (profile) {
      setEditedProfile({
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        fullName: profile.fullName || '',
        bio: profile.bio || '',
        location: profile.location || '',
        website: profile.website || '',
        githubUsername: profile.githubUsername || '',
        twitterUsername: profile.twitterUsername || '',
        linkedinUsername: profile.linkedinUsername || ''
      });
    }
    setIsEditing(false);
  };

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

  if (!isSignedIn) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center py-20">
          <Card className="bg-zinc-950 border-zinc-800">
            <CardContent className="p-8 text-center">
              <h2 className="text-xl font-semibold text-white mb-4">Sign In Required</h2>
              <p className="text-zinc-400 mb-6">Please sign in to view your profile</p>
              <Button
                onClick={() => window.location.href = '/sign-in'}
                className="bg-white text-black hover:bg-zinc-100"
              >
                Sign In
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

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
              <h2 className="text-xl font-semibold text-white mb-4">Profile Not Found</h2>
              <p className="text-zinc-400">Unable to load your profile information</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div>
        {/* Profile Header */}
        <Card className="bg-zinc-950 border-zinc-800 mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col sm:flex-row gap-6">
              {/* Avatar Section */}
              <div className="flex flex-col items-center sm:items-start">
                <div className="relative">
                  <Avatar className="h-24 w-24 sm:h-32 sm:w-32 border-2 border-zinc-700">
                    <AvatarImage src={profile.imageUrl} alt={profile.fullName} className="object-cover" />
                    <AvatarFallback className="bg-zinc-800 text-white text-2xl font-medium">
                      {profile.firstName?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute -bottom-1 -right-1 h-8 w-8 bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 rounded-full"
                  >
                    <Camera className="h-3 w-3 text-zinc-300" />
                  </Button>
                </div>

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
                    {isEditing ? (
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium text-zinc-300 mb-2 block">Display Name</label>
                          <Input
                            value={editedProfile.fullName}
                            onChange={(e) => setEditedProfile(prev => ({ ...prev, fullName: e.target.value }))}
                            placeholder="Your display name"
                            className="bg-zinc-900 border-zinc-700 text-white"
                          />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="text-sm font-medium text-zinc-300 mb-2 block">First Name</label>
                            <Input
                              value={editedProfile.firstName}
                              onChange={(e) => setEditedProfile(prev => ({ ...prev, firstName: e.target.value }))}
                              placeholder="First Name"
                              className="bg-zinc-900 border-zinc-700 text-white"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-zinc-300 mb-2 block">Last Name</label>
                            <Input
                              value={editedProfile.lastName}
                              onChange={(e) => setEditedProfile(prev => ({ ...prev, lastName: e.target.value }))}
                              placeholder="Last Name"
                              className="bg-zinc-900 border-zinc-700 text-white"
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                          {profile.fullName || `${profile.firstName} ${profile.lastName}`}
                        </h1>
                        <p className="text-zinc-400 text-lg mb-2">@{profile.username}</p>
                        <p className="text-zinc-500 text-sm">
                          Member since {formatDistanceToNow(new Date(profile.createdAt), { addSuffix: true })}
                        </p>
                      </>
                    )}
                  </div>

                  <div className="flex gap-2">
                    {isEditing ? (
                      <>
                        <Button
                          onClick={handleSaveProfile}
                          disabled={isSaving}
                          size="sm"
                          className="bg-white text-black hover:bg-zinc-100"
                        >
                          <Save className="h-4 w-4 mr-2" />
                          {isSaving ? 'Saving...' : 'Save'}
                        </Button>
                        <Button
                          onClick={handleCancelEdit}
                          variant="outline"
                          size="sm"
                          className="border-zinc-600 text-zinc-300 hover:bg-zinc-800"
                        >
                          <X className="h-4 w-4 mr-2" />
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <Button
                        onClick={() => setIsEditing(true)}
                        variant="outline"
                        size="sm"
                        className="border-zinc-600 text-zinc-300 hover:bg-zinc-800"
                      >
                        <Edit3 className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Button>
                    )}
                  </div>
                </div>

                {/* Bio Section */}
                <div className="mb-6">
                  {isEditing ? (
                    <div>
                      <label className="text-sm font-medium text-zinc-300 mb-2 block">Bio</label>
                      <textarea
                        value={editedProfile.bio}
                        onChange={(e) => setEditedProfile(prev => ({ ...prev, bio: e.target.value }))}
                        placeholder="Tell us about yourself..."
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-md p-3 text-white placeholder:text-zinc-500 resize-none"
                        rows={3}
                        maxLength={500}
                      />
                      <p className="text-xs text-zinc-500 mt-1">{editedProfile.bio.length}/500</p>
                    </div>
                  ) : (
                    <p className="text-zinc-300 leading-relaxed">
                      {profile.bio || (
                        <span className="text-zinc-500 italic">
                          No bio added yet.
                        </span>
                      )}
                    </p>
                  )}
                </div>

                {/* Additional Info */}
                <div className="mb-6">
                  {isEditing ? (
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-zinc-300 block">Links</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <Input
                          value={editedProfile.location}
                          onChange={(e) => setEditedProfile(prev => ({ ...prev, location: e.target.value }))}
                          placeholder="Location"
                          className="bg-zinc-900 border-zinc-700 text-white"
                        />
                        <Input
                          value={editedProfile.website}
                          onChange={(e) => setEditedProfile(prev => ({ ...prev, website: e.target.value }))}
                          placeholder="Website"
                          className="bg-zinc-900 border-zinc-700 text-white"
                        />
                        <Input
                          value={editedProfile.githubUsername}
                          onChange={(e) => setEditedProfile(prev => ({ ...prev, githubUsername: e.target.value }))}
                          placeholder="GitHub Username"
                          className="bg-zinc-900 border-zinc-700 text-white"
                        />
                        <Input
                          value={editedProfile.twitterUsername}
                          onChange={(e) => setEditedProfile(prev => ({ ...prev, twitterUsername: e.target.value }))}
                          placeholder="Twitter Username"
                          className="bg-zinc-900 border-zinc-700 text-white"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-4 text-sm">
                      {profile.location && (
                        <div className="flex items-center gap-2 text-zinc-400">
                          <MapPin className="h-4 w-4" />
                          <span>{profile.location}</span>
                        </div>
                      )}
                      {profile.website && (
                        <div className="flex items-center gap-2 text-zinc-400">
                          <Globe className="h-4 w-4" />
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
                  )}
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
          <TabsList className="grid w-full grid-cols-3 bg-zinc-950 border border-zinc-800">
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
              <Card className="bg-zinc-950 border-zinc-800">
                <CardContent className="p-12 text-center">
                  <MessageSquare className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-zinc-300 mb-2">No posts yet</h3>
                  <p className="text-zinc-500">Start sharing your thoughts with the community!</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="projects" className="space-y-4 mt-6">
            <Card className="bg-zinc-950 border-zinc-800">
              <CardContent className="p-12 text-center">
                <Settings className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-zinc-300 mb-2">No projects yet</h3>
                <p className="text-zinc-500">Showcase your amazing projects here!</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="liked" className="space-y-4 mt-6">
            <Card className="bg-zinc-950 border-zinc-800">
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