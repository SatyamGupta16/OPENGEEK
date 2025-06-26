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
          experience: string
          skills: string[]
          additional_skills: string[]
          interests: string
          why_join: string
          expectations: string
          last_updated: string | null
          gender: 'male' | 'female' | 'other'
          has_laptop: boolean
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
          experience: string
          skills?: string[]
          additional_skills?: string[]
          interests: string
          why_join: string
          expectations: string
          last_updated?: string | null
          gender?: 'male' | 'female' | 'other'
          has_laptop?: boolean
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
          experience?: string
          skills?: string[]
          additional_skills?: string[]
          interests?: string
          why_join?: string
          expectations?: string
          last_updated?: string | null
          gender?: 'male' | 'female' | 'other'
          has_laptop?: boolean
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