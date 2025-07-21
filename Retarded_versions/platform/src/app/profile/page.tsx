import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { UserIcon, BriefcaseIcon, GlobeIcon, BookOpenIcon, LinkIcon } from 'lucide-react';
import type { Database } from '@/lib/database.types';

type Profile = Database['public']['Tables']['user_profiles']['Row'];
type Project = Database['public']['Tables']['projects']['Row'];

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth();
  const [, setProfile] = useState<Profile | null>(null);
  const [, setProjects] = useState<Project[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [, setActiveTab] = useState("personal");
  const [formData, setFormData] = useState({
    full_name: '',
    bio: '',
    tagline: '',
    country: '',
    city: '',
    state: '',
    current_position: '',
    company: '',
    education_level: '',
    institution: '',
    graduation_year: null as number | null,
    website_url: '',
    github_url: '',
    linkedin_url: '',
    twitter_url: '',
    portfolio_url: '',
    skills: [] as string[],
    interests: [] as string[],
    languages: [] as string[],
    privacy_settings: {
      profile_visibility: 'public',
      show_email: false,
      show_activity: true
    }
  });

  useEffect(() => {
    if (!authLoading && user) {
      console.log('Current auth user:', user);
      fetchProfile();
      fetchProjects();
    }
  }, [user, authLoading]);

  const fetchProfile = async () => {
    if (!user?.id) {
      console.log('No user ID available');
      return;
    }

    try {
      console.log('Attempting to fetch profile for user:', user.id);
      
      // First, let's check if the profile exists
      const { error: checkError } = await supabase
        .from('user_profiles')
        .select('id')
        .eq('id', user.id)
        .single();

      if (checkError) {
        console.error('Error checking profile existence:', checkError);
        // If the profile doesn't exist, let's create it
        if (checkError.code === 'PGRST116') {
          console.log('Profile does not exist, creating new profile...');
          const { error: createError } = await supabase
            .from('user_profiles')
            .insert([
              {
                id: user.id,
                email: user.email,
                username: user.user_metadata?.username || user.email?.split('@')[0],
                full_name: user.user_metadata?.full_name || '',
                avatar_url: user.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.email || 'User')}&background=random`,
                privacy_settings: {
                  profile_visibility: 'public',
                  show_email: false,
                  show_activity: true
                }
              }
            ]);

          if (createError) {
            console.error('Error creating profile:', createError);
            throw createError;
          }
        } else {
          throw checkError;
        }
      }

      // Now fetch the complete profile
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile data:', error);
        throw error;
      }

      console.log('Profile data received:', data);
      setProfile(data);
      setFormData({
        full_name: data.full_name || '',
        bio: data.bio || '',
        tagline: data.tagline || '',
        country: data.country || '',
        city: data.city || '',
        state: data.state || '',
        current_position: data.current_position || '',
        company: data.company || '',
        education_level: data.education_level || '',
        institution: data.institution || '',
        graduation_year: data.graduation_year,
        website_url: data.website_url || '',
        github_url: data.github_url || '',
        linkedin_url: data.linkedin_url || '',
        twitter_url: data.twitter_url || '',
        portfolio_url: data.portfolio_url || '',
        skills: data.skills || [],
        interests: data.interests || [],
        languages: data.languages || [],
        privacy_settings: data.privacy_settings || {
          profile_visibility: 'public',
          show_email: false,
          show_activity: true
        }
      });
    } catch (error) {
      console.error('Error in profile fetch/create process:', error);
      toast.error('Failed to load profile. Please try again.');
    }
  };

  const fetchProjects = async () => {
    if (!user?.id) return;

    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to load projects');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) {
      toast.error('No user ID available');
      return;
    }

    setLoading(true);
    console.log('Updating profile with data:', formData);

    try {
      const { error } = await supabase
        .from('user_profiles')
        .update(formData)
        .eq('id', user.id);

      if (error) {
        console.error('Supabase error updating profile:', error);
        throw error;
      }

      toast.success('Profile updated successfully');
      setIsEditing(false);
      fetchProfile();
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#1f6feb]"></div>
      </div>
    );
  }

  return (
    <ScrollArea className="flex-1 h-full">
      <div className="min-h-full flex flex-col">
        {/* Profile Header */}
        <div className="flex-none border-b border-[#30363d] bg-gradient-to-r from-[#0d1117] to-[#161b22] px-8 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <Avatar className="h-24 w-24 border-4 border-[#30363d] ring-2 ring-[#1f6feb]/20">
                <AvatarImage
                  src={user?.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.email || 'User')}&background=random`}
                  alt={formData.full_name || user?.email}
                />
                <AvatarFallback className="bg-gradient-to-br from-[#1f6feb] to-[#58a6ff] text-2xl text-white">
                  {(formData.full_name?.[0] || user?.email?.[0] || "U").toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-[#e6edf3] mb-2">{formData.full_name || "Your Name"}</h1>
                <p className="text-lg text-[#7d8590] mb-4">{formData.tagline || "Add a tagline to your profile"}</p>
                <div className="flex flex-wrap gap-2">
                  {formData.current_position && (
                    <Badge variant="secondary" className="bg-[#1f6feb]/10 text-[#58a6ff] border-[#1f6feb]/20">
                      <BriefcaseIcon className="w-3 h-3 mr-1" />
                      {formData.current_position} at {formData.company}
                    </Badge>
                  )}
                  {formData.country && formData.city && (
                    <Badge variant="secondary" className="bg-[#1f6feb]/10 text-[#58a6ff] border-[#1f6feb]/20">
                      <GlobeIcon className="w-3 h-3 mr-1" />
                      {formData.city}, {formData.country}
                    </Badge>
                  )}
                </div>
              </div>
              {!isEditing ? (
                <Button 
                  onClick={() => setIsEditing(true)}
                  className="bg-[#1f6feb] hover:bg-[#388bfd] text-[#f0f6fc] transition-colors"
                >
                  Edit Profile
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsEditing(false)}
                    className="border-[#30363d] hover:border-[#6e7681] hover:bg-[#30363d] text-[#7d8590] hover:text-[#e6edf3]"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleSubmit} 
                    disabled={loading}
                    className="bg-[#1f6feb] hover:bg-[#388bfd] text-[#f0f6fc] transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tabs and Content */}
        <div className="flex-1 px-8 py-6 bg-[#0d1117]">
          <div className="max-w-7xl mx-auto">
            <Tabs defaultValue="personal" className="space-y-6" onValueChange={setActiveTab}>
              <TabsList className="bg-[#161b22] border border-[#30363d] p-1">
                <TabsTrigger 
                  value="personal" 
                  className="data-[state=active]:bg-[#1f6feb] data-[state=active]:text-[#f0f6fc] text-[#7d8590] hover:text-[#e6edf3]"
                >
                  <UserIcon className="w-4 h-4 mr-2" />
                  Personal Info
                </TabsTrigger>
                <TabsTrigger 
                  value="professional" 
                  className="data-[state=active]:bg-[#1f6feb] data-[state=active]:text-[#f0f6fc] text-[#7d8590] hover:text-[#e6edf3]"
                >
                  <BriefcaseIcon className="w-4 h-4 mr-2" />
                  Professional
                </TabsTrigger>
                <TabsTrigger 
                  value="social" 
                  className="data-[state=active]:bg-[#1f6feb] data-[state=active]:text-[#f0f6fc] text-[#7d8590] hover:text-[#e6edf3]"
                >
                  <LinkIcon className="w-4 h-4 mr-2" />
                  Social Links
                </TabsTrigger>
                <TabsTrigger 
                  value="education" 
                  className="data-[state=active]:bg-[#1f6feb] data-[state=active]:text-[#f0f6fc] text-[#7d8590] hover:text-[#e6edf3]"
                >
                  <BookOpenIcon className="w-4 h-4 mr-2" />
                  Education
                </TabsTrigger>
              </TabsList>

              <form onSubmit={handleSubmit} className="space-y-6">
                <TabsContent value="personal">
                  <Card className="bg-[#161b22] border-[#30363d] shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-[#e6edf3]">Personal Information</CardTitle>
                      <CardDescription className="text-[#7d8590]">Update your personal details and bio</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label className="text-[#7d8590]">Full Name</Label>
                          <Input
                            type="text"
                            value={formData.full_name}
                            onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                            disabled={!isEditing}
                            className="bg-[#0d1117] border-[#30363d] text-[#e6edf3] focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff]"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[#7d8590]">Tagline</Label>
                          <Input
                            type="text"
                            value={formData.tagline}
                            onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                            disabled={!isEditing}
                            className="bg-[#0d1117] border-[#30363d] text-[#e6edf3] focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff]"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[#7d8590]">Bio</Label>
                        <Textarea
                          value={formData.bio}
                          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                          disabled={!isEditing}
                          className="bg-[#0d1117] border-[#30363d] text-[#e6edf3] focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff] min-h-[100px]"
                          placeholder="Tell us about yourself..."
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <Label className="text-[#7d8590]">Country</Label>
                          <Input
                            type="text"
                            value={formData.country}
                            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                            disabled={!isEditing}
                            className="bg-[#0d1117] border-[#30363d] text-[#e6edf3] focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff]"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[#7d8590]">City</Label>
                          <Input
                            type="text"
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            disabled={!isEditing}
                            className="bg-[#0d1117] border-[#30363d] text-[#e6edf3] focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff]"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[#7d8590]">State</Label>
                          <Input
                            type="text"
                            value={formData.state}
                            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                            disabled={!isEditing}
                            className="bg-[#0d1117] border-[#30363d] text-[#e6edf3] focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff]"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="professional">
                  <Card className="bg-[#161b22] border-[#30363d] shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-[#e6edf3]">Professional Information</CardTitle>
                      <CardDescription className="text-[#7d8590]">Your work experience and skills</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label className="text-[#7d8590]">Current Position</Label>
                          <Input
                            type="text"
                            value={formData.current_position}
                            onChange={(e) => setFormData({ ...formData, current_position: e.target.value })}
                            disabled={!isEditing}
                            className="bg-[#0d1117] border-[#30363d] text-[#e6edf3] focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff]"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[#7d8590]">Company</Label>
                          <Input
                            type="text"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            disabled={!isEditing}
                            className="bg-[#0d1117] border-[#30363d] text-[#e6edf3] focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff]"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[#7d8590]">Skills</Label>
                        <div className="flex flex-wrap gap-2">
                          {formData.skills.map((skill, index) => (
                            <Badge 
                              key={index} 
                              variant="secondary" 
                              className="bg-[#1f6feb]/10 text-[#58a6ff] border-[#1f6feb]/20 hover:bg-[#1f6feb]/20"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="social">
                  <Card className="bg-[#161b22] border-[#30363d] shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-[#e6edf3]">Social Links</CardTitle>
                      <CardDescription className="text-[#7d8590]">Connect your social media profiles</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label className="text-[#7d8590]">GitHub Profile</Label>
                          <Input
                            type="url"
                            value={formData.github_url}
                            onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                            disabled={!isEditing}
                            className="bg-[#0d1117] border-[#30363d] text-[#e6edf3] focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff]"
                            placeholder="https://github.com/username"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[#7d8590]">LinkedIn Profile</Label>
                          <Input
                            type="url"
                            value={formData.linkedin_url}
                            onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                            disabled={!isEditing}
                            className="bg-[#0d1117] border-[#30363d] text-[#e6edf3] focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff]"
                            placeholder="https://linkedin.com/in/username"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[#7d8590]">Twitter Profile</Label>
                          <Input
                            type="url"
                            value={formData.twitter_url}
                            onChange={(e) => setFormData({ ...formData, twitter_url: e.target.value })}
                            disabled={!isEditing}
                            className="bg-[#0d1117] border-[#30363d] text-[#e6edf3] focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff]"
                            placeholder="https://twitter.com/username"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[#7d8590]">Portfolio Website</Label>
                          <Input
                            type="url"
                            value={formData.portfolio_url}
                            onChange={(e) => setFormData({ ...formData, portfolio_url: e.target.value })}
                            disabled={!isEditing}
                            className="bg-[#0d1117] border-[#30363d] text-[#e6edf3] focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff]"
                            placeholder="https://your-portfolio.com"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="education">
                  <Card className="bg-[#161b22] border-[#30363d] shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-[#e6edf3]">Education</CardTitle>
                      <CardDescription className="text-[#7d8590]">Your educational background</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label className="text-[#7d8590]">Education Level</Label>
                          <Input
                            type="text"
                            value={formData.education_level}
                            onChange={(e) => setFormData({ ...formData, education_level: e.target.value })}
                            disabled={!isEditing}
                            className="bg-[#0d1117] border-[#30363d] text-[#e6edf3] focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff]"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[#7d8590]">Institution</Label>
                          <Input
                            type="text"
                            value={formData.institution}
                            onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                            disabled={!isEditing}
                            className="bg-[#0d1117] border-[#30363d] text-[#e6edf3] focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff]"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[#7d8590]">Graduation Year</Label>
                          <Input
                            type="number"
                            value={formData.graduation_year || ''}
                            onChange={(e) => setFormData({ ...formData, graduation_year: parseInt(e.target.value) || null })}
                            disabled={!isEditing}
                            className="bg-[#0d1117] border-[#30363d] text-[#e6edf3] focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff]"
                            min="1900"
                            max="2100"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </form>
            </Tabs>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}