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
          interests: string
          why_join: string
          expectations: string
          last_updated: string | null
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
          interests: string
          why_join: string
          expectations: string
          last_updated?: string | null
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
          interests?: string
          why_join?: string
          expectations?: string
          last_updated?: string | null
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