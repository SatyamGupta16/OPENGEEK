'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  Users,
  Settings,
  Camera
} from 'lucide-react';
import { toast } from 'sonner';
import { usersAPI, postsAPI } from '@/lib/api';
import { formatDistanceToNow } from 'date-fns';

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

  useEffect(() => {
    if (isSignedIn) {
      fetchProfile();
    }
  }, [isSignedIn]);

  useEffect(() => {
    if (profile) {
      fetchUserPosts();
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
    onLike: () => {} // TODO: Implement like functionality
  });

  if (!isSignedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="bg-black border-zinc-800/50 p-8 text-center">
          <CardContent>
            <h2 className="text-xl font-semibold text-white mb-4">Sign In Required</h2>
            <p className="text-zinc-400 mb-4">Please sign in to view your profile</p>
            <Button onClick={() => window.location.href = '/sign-in'}>
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

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
            <h2 className="text-xl font-semibold text-white mb-4">Profile Not Found</h2>
            <p className="text-zinc-400">Unable to load your profile information</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 py-8">
      <div className="max-w-4xl mx-auto px-4 space-y-6">
        {/* Profile Header */}
        <Card className="bg-black border-zinc-800/50">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Avatar Section */}
              <div className="flex flex-col items-center md:items-start">
                <div className="relative">
                  <Avatar className="h-32 w-32 border-4 border-zinc-700">
                    <AvatarImage src={profile.imageUrl} alt={profile.fullName} />
                    <AvatarFallback className="bg-zinc-800 text-zinc-300 text-2xl">
                      {profile.firstName?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute bottom-0 right-0 h-8 w-8 bg-zinc-800 hover:bg-zinc-700 border border-zinc-600"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                
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
                    {isEditing ? (
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm text-zinc-400 mb-1 block">Display Name</label>
                          <Input
                            value={editedProfile.fullName}
                            onChange={(e) => setEditedProfile(prev => ({ ...prev, fullName: e.target.value }))}
                            placeholder="Your display name (e.g., John Doe)"
                            className="bg-zinc-900 border-zinc-700 text-white"
                          />
                        </div>
                        <div className="flex gap-2">
                          <div className="flex-1">
                            <label className="text-sm text-zinc-400 mb-1 block">First Name</label>
                            <Input
                              value={editedProfile.firstName}
                              onChange={(e) => setEditedProfile(prev => ({ ...prev, firstName: e.target.value }))}
                              placeholder="First Name"
                              className="bg-zinc-900 border-zinc-700 text-white"
                            />
                          </div>
                          <div className="flex-1">
                            <label className="text-sm text-zinc-400 mb-1 block">Last Name</label>
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
                        <h1 className="text-3xl font-bold text-white mb-1">
                          {profile.fullName || `${profile.firstName} ${profile.lastName}`}
                        </h1>
                        <p className="text-zinc-400">@{profile.username}</p>
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
                          className="bg-emerald-500 hover:bg-emerald-600"
                        >
                          <Save className="h-4 w-4 mr-2" />
                          {isSaving ? 'Saving...' : 'Save'}
                        </Button>
                        <Button
                          onClick={handleCancelEdit}
                          variant="outline"
                          size="sm"
                          className="border-zinc-600 text-zinc-300"
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
                <div className="mb-4">
                  {isEditing ? (
                    <textarea
                      value={editedProfile.bio}
                      onChange={(e) => setEditedProfile(prev => ({ ...prev, bio: e.target.value }))}
                      placeholder="Tell us about yourself..."
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-3 text-white placeholder:text-zinc-500 resize-none"
                      rows={3}
                      maxLength={500}
                    />
                  ) : (
                    <p className="text-zinc-300 leading-relaxed">
                      {profile.bio || 'No bio added yet.'}
                    </p>
                  )}
                </div>

                {/* Additional Info */}
                <div className="space-y-2 text-sm text-zinc-400">
                  {isEditing ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
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
                  ) : (
                    <>
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
                    </>
                  )}
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
                  <p className="text-zinc-500">Start sharing your thoughts with the community!</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="projects" className="space-y-4 mt-6">
            <Card className="bg-black border-zinc-800/50">
              <CardContent className="p-12 text-center">
                <Settings className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-zinc-300 mb-2">No projects yet</h3>
                <p className="text-zinc-500">Showcase your amazing projects here!</p>
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