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
      applications: {
        Row: {
          id: string
          status: 'pending' | 'approved' | 'rejected'
          submitted_at: string
          name: string
          email: string
          phone: string
          github_profile: string
          course: string
          semester: string
          username: string
          hashed_password: string
          temp_password: string | null
          experience: string
          skills: string[]
          additional_skills: string[]
          interests: string
          why_join: string
          expectations: string
          last_updated: string | null
          gender: 'male' | 'female' | 'other'
          has_laptop: boolean
          is_email_sent: boolean
          email_sent_at: string | null
        }
        Insert: {
          id: string
          status?: 'pending' | 'approved' | 'rejected'
          submitted_at?: string
          name: string
          email: string
          phone: string
          github_profile: string
          course: string
          semester: string
          username: string
          hashed_password: string
          temp_password?: string | null
          experience: string
          skills?: string[]
          additional_skills?: string[]
          interests: string
          why_join: string
          expectations: string
          last_updated?: string | null
          gender?: 'male' | 'female' | 'other'
          has_laptop?: boolean
          is_email_sent?: boolean
          email_sent_at?: string | null
        }
        Update: {
          id?: string
          status?: 'pending' | 'approved' | 'rejected'
          submitted_at?: string
          name?: string
          email?: string
          phone?: string
          github_profile?: string
          course?: string
          semester?: string
          username?: string
          hashed_password?: string
          temp_password?: string | null
          experience?: string
          skills?: string[]
          additional_skills?: string[]
          interests?: string
          why_join?: string
          expectations?: string
          last_updated?: string | null
          gender?: 'male' | 'female' | 'other'
          has_laptop?: boolean
          is_email_sent?: boolean
          email_sent_at?: string | null
        }
      }
      messages: {
        Row: {
          id: string
          content: string
          user_name: string
          created_at: string
          user_avatar_url: string | null
        }
        Insert: {
          id?: string
          content: string
          user_name: string
          created_at?: string
          user_avatar_url?: string | null
        }
        Update: {
          id?: string
          content?: string
          user_name?: string
          created_at?: string
          user_avatar_url?: string | null
        }
      }
      leaderboards: {
        Row: {
          id: string
          name: string
          tier: 'Luminary' | 'Virtuoso' | 'Apprentice'
          rank: number
          avatar_url: string | null
          github_url: string | null
          points: number
          achievements: Json
          created_at: string
          updated_at: string
          tag: string | null
        }
        Insert: {
          id?: string
          name: string
          tier: 'Luminary' | 'Virtuoso' | 'Apprentice'
          rank: number
          avatar_url?: string | null
          github_url?: string | null
          points?: number
          achievements?: Json
          created_at?: string
          updated_at?: string
          tag?: string | null
        }
        Update: {
          id?: string
          name?: string
          tier?: 'Luminary' | 'Virtuoso' | 'Apprentice'
          rank?: number
          avatar_url?: string | null
          github_url?: string | null
          points?: number
          achievements?: Json
          created_at?: string
          updated_at?: string
          tag?: string | null
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
      member_tier: 'Luminary' | 'Virtuoso' | 'Apprentice'
    }
  }
} 