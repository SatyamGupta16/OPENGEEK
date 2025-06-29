import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import type { Database } from '@/lib/database.types';

type Profile = Database['public']['Tables']['user_profiles']['Row'];
type Project = Database['public']['Tables']['projects']['Row'];

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
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
      const { data: profileExists, error: checkError } = await supabase
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
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Please Sign In</h2>
          <p className="text-gray-400">You need to be signed in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="bg-[#1f2937] rounded-lg shadow-lg overflow-hidden">
        {/* Profile Header */}
        <div className="relative h-32 bg-gradient-to-r from-blue-600 to-blue-800">
          <div className="absolute -bottom-16 left-8">
            <div className="w-32 h-32 rounded-full border-4 border-[#1f2937] overflow-hidden bg-[#1f2937]">
              <img
                src={profile?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile?.full_name || 'User')}&background=random`}
                alt={profile?.full_name || 'Profile'}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="pt-20 px-8 pb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold text-white">
                {profile?.full_name || 'Anonymous User'}
              </h1>
              <p className="text-gray-400">@{profile?.username}</p>
              {profile?.tagline && (
                <p className="text-gray-300 mt-2">{profile.tagline}</p>
              )}
            </div>
            <Button
              onClick={() => setIsEditing(!isEditing)}
              variant="outline"
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </Button>
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    Full Name
                  </label>
                  <Input
                    value={formData.full_name}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      full_name: e.target.value
                    }))}
                    placeholder="Your full name"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    Tagline
                  </label>
                  <Input
                    value={formData.tagline}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      tagline: e.target.value
                    }))}
                    placeholder="A brief description of yourself"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-gray-300">
                    Bio
                  </label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      bio: e.target.value
                    }))}
                    placeholder="Tell us about yourself"
                    className="w-full px-3 py-2 bg-[#2d3748] text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    Current Position
                  </label>
                  <Input
                    value={formData.current_position}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      current_position: e.target.value
                    }))}
                    placeholder="Your current role"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    Company
                  </label>
                  <Input
                    value={formData.company}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      company: e.target.value
                    }))}
                    placeholder="Your company"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    Country
                  </label>
                  <Input
                    value={formData.country}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      country: e.target.value
                    }))}
                    placeholder="Your country"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    City
                  </label>
                  <Input
                    value={formData.city}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      city: e.target.value
                    }))}
                    placeholder="Your city"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    Website
                  </label>
                  <Input
                    value={formData.website_url}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      website_url: e.target.value
                    }))}
                    placeholder="Your website URL"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    GitHub
                  </label>
                  <Input
                    value={formData.github_url}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      github_url: e.target.value
                    }))}
                    placeholder="Your GitHub URL"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    LinkedIn
                  </label>
                  <Input
                    value={formData.linkedin_url}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      linkedin_url: e.target.value
                    }))}
                    placeholder="Your LinkedIn URL"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    Twitter
                  </label>
                  <Input
                    value={formData.twitter_url}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      twitter_url: e.target.value
                    }))}
                    placeholder="Your Twitter URL"
                  />
                </div>

                <div className="md:col-span-2 flex justify-end space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              {/* Bio Section */}
              {profile?.bio && (
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-white">About</h3>
                  <p className="text-gray-300">{profile.bio}</p>
                </div>
              )}

              {/* Work & Education */}
              <div className="space-y-4">
                {(profile?.current_position || profile?.company) && (
                  <div>
                    <h3 className="text-lg font-semibold text-white">Work</h3>
                    <p className="text-gray-300">
                      {profile.current_position}
                      {profile.company && ` at ${profile.company}`}
                    </p>
                  </div>
                )}

                {(profile?.education_level || profile?.institution) && (
                  <div>
                    <h3 className="text-lg font-semibold text-white">Education</h3>
                    <p className="text-gray-300">
                      {profile.education_level}
                      {profile.institution && ` at ${profile.institution}`}
                      {profile.graduation_year && ` (${profile.graduation_year})`}
                    </p>
                  </div>
                )}
              </div>

              {/* Location */}
              {(profile?.city || profile?.country) && (
                <div>
                  <h3 className="text-lg font-semibold text-white">Location</h3>
                  <p className="text-gray-300">
                    {[profile.city, profile.state, profile.country].filter(Boolean).join(', ')}
                  </p>
                </div>
              )}

              {/* Skills & Interests */}
              {profile?.skills && profile.skills.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-white">Skills</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {profile.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects */}
              {projects.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-white">Projects</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    {projects.map((project) => (
                      <div
                        key={project.id}
                        className="bg-[#2d3748] rounded-lg p-4"
                      >
                        <h4 className="text-white font-medium">{project.title}</h4>
                        {project.description && (
                          <p className="text-gray-400 text-sm mt-1">{project.description}</p>
                        )}
                        {project.technologies && project.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {project.technologies.map((tech, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-[#374151] text-gray-300 rounded text-xs"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 