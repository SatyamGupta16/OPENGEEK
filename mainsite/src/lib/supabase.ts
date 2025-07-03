import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

// Validate environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceRoleKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl) {
  throw new Error('Missing environment variable: NEXT_PUBLIC_SUPABASE_URL')
}

if (!supabaseAnonKey) {
  throw new Error('Missing environment variable: NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

if (!supabaseServiceRoleKey) {
  throw new Error('Missing environment variable: SUPABASE_SERVICE_ROLE_KEY')
}

console.log('Initializing Supabase client with URL:', supabaseUrl)



export const supabaseAdmin = createClient<Database>(supabaseUrl, supabaseServiceRoleKey)

// Create Supabase client with anon key for client-side operations
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Create admin client with service role key for server-side operations
 