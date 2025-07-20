export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      notifications: {
        Row: {
          id: string
          user_id: string
          title: string
          content: string
          read: boolean
          created_at: string
          type: 'update' | 'event' | 'feature' | 'mention' | 'reply' | 'system'
          link?: string | null
          icon?: string | null
          category?: 'system' | 'community' | 'learning' | 'achievement' | 'announcement' | null
          priority?: 'low' | 'normal' | 'high' | 'urgent' | null
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          content: string
          read?: boolean
          created_at?: string
          type: 'update' | 'event' | 'feature' | 'mention' | 'reply' | 'system'
          link?: string | null
          icon?: string | null
          category?: 'system' | 'community' | 'learning' | 'achievement' | 'announcement' | null
          priority?: 'low' | 'normal' | 'high' | 'urgent' | null
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          content?: string
          read?: boolean
          created_at?: string
          type?: 'update' | 'event' | 'feature' | 'mention' | 'reply' | 'system'
          link?: string | null
          icon?: string | null
          category?: 'system' | 'community' | 'learning' | 'achievement' | 'announcement' | null
          priority?: 'low' | 'normal' | 'high' | 'urgent' | null
        }
      }
      profiles: {
        Row: {
          id: string
          username: string
          full_name: string
          avatar_url: string | null
          bio: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username: string
          full_name: string
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string
          full_name?: string
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      user_profiles: {
        Row: {
          id: string
          email: string | null
          username: string | null
          full_name: string | null
          avatar_url: string | null
          is_active: boolean
          is_verified: boolean
          account_type: 'personal' | 'student' | 'professional' | 'educator'
          bio: string | null
          tagline: string | null
          date_of_birth: string | null
          gender: string | null
          phone: string | null
          country: string | null
          city: string | null
          state: string | null
          current_position: string | null
          company: string | null
          education_level: string | null
          institution: string | null
          graduation_year: number | null
          website_url: string | null
          github_url: string | null
          linkedin_url: string | null
          twitter_url: string | null
          portfolio_url: string | null
          theme_preference: 'light' | 'dark' | 'system'
          language_preference: string
          notification_preferences: Json
          privacy_settings: Json
          reputation_points: number
          activity_score: number
          last_active_at: string | null
          profile_views: number
          skills: string[]
          interests: string[]
          languages: string[]
          certifications: Json[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email?: string | null
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          is_active?: boolean
          is_verified?: boolean
          account_type?: 'personal' | 'student' | 'professional' | 'educator'
          bio?: string | null
          tagline?: string | null
          date_of_birth?: string | null
          gender?: string | null
          phone?: string | null
          country?: string | null
          city?: string | null
          state?: string | null
          current_position?: string | null
          company?: string | null
          education_level?: string | null
          institution?: string | null
          graduation_year?: number | null
          website_url?: string | null
          github_url?: string | null
          linkedin_url?: string | null
          twitter_url?: string | null
          portfolio_url?: string | null
          theme_preference?: 'light' | 'dark' | 'system'
          language_preference?: string
          notification_preferences?: Json
          privacy_settings?: Json
          reputation_points?: number
          activity_score?: number
          last_active_at?: string | null
          profile_views?: number
          skills?: string[]
          interests?: string[]
          languages?: string[]
          certifications?: Json[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string | null
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          is_active?: boolean
          is_verified?: boolean
          account_type?: 'personal' | 'student' | 'professional' | 'educator'
          bio?: string | null
          tagline?: string | null
          date_of_birth?: string | null
          gender?: string | null
          phone?: string | null
          country?: string | null
          city?: string | null
          state?: string | null
          current_position?: string | null
          company?: string | null
          education_level?: string | null
          institution?: string | null
          graduation_year?: number | null
          website_url?: string | null
          github_url?: string | null
          linkedin_url?: string | null
          twitter_url?: string | null
          portfolio_url?: string | null
          theme_preference?: 'light' | 'dark' | 'system'
          language_preference?: string
          notification_preferences?: Json
          privacy_settings?: Json
          reputation_points?: number
          activity_score?: number
          last_active_at?: string | null
          profile_views?: number
          skills?: string[]
          interests?: string[]
          languages?: string[]
          certifications?: Json[]
          created_at?: string
          updated_at?: string
        }
      }
      achievements: {
        Row: {
          id: string
          name: string
          description: string | null
          icon_url: string | null
          badge_url: string | null
          points: number
          category: string | null
          requirements: Json | null
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          icon_url?: string | null
          badge_url?: string | null
          points?: number
          category?: string | null
          requirements?: Json | null
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          icon_url?: string | null
          badge_url?: string | null
          points?: number
          category?: string | null
          requirements?: Json | null
          is_active?: boolean
          created_at?: string
        }
      }
      user_achievements: {
        Row: {
          user_id: string
          achievement_id: string
          earned_at: string
          progress: Json
        }
        Insert: {
          user_id: string
          achievement_id: string
          earned_at?: string
          progress?: Json
        }
        Update: {
          user_id?: string
          achievement_id?: string
          earned_at?: string
          progress?: Json
        }
      }
      projects: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          project_url: string | null
          repository_url: string | null
          technologies: string[]
          thumbnail_url: string | null
          is_featured: boolean
          visibility: 'public' | 'private' | 'unlisted'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          project_url?: string | null
          repository_url?: string | null
          technologies?: string[]
          thumbnail_url?: string | null
          is_featured?: boolean
          visibility?: 'public' | 'private' | 'unlisted'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          project_url?: string | null
          repository_url?: string | null
          technologies?: string[]
          thumbnail_url?: string | null
          is_featured?: boolean
          visibility?: 'public' | 'private' | 'unlisted'
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 