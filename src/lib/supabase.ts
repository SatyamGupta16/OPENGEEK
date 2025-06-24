import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

// Validate environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl) {
  throw new Error(
    'Missing environment variable: NEXT_PUBLIC_SUPABASE_URL'
  )
}

if (!supabaseKey) {
  throw new Error(
    'Missing environment variable: SUPABASE_SERVICE_ROLE_KEY'
  )
}

console.log('Initializing Supabase client with URL:', supabaseUrl)

// Create Supabase client with types
export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
  },
  db: {
    schema: 'public'
  }
}) 