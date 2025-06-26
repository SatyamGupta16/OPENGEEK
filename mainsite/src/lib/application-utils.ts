import { supabase } from './supabase'

export interface Application {
  id: string
  status: 'pending' | 'approved' | 'rejected'
  submittedAt: string
  name: string
  email: string
  phone: string
  githubProfile: string
  course: string
  semester: string
  username: string
  hashedPassword: string
  experience: string
  skills: string[]
  interests: string
  whyJoin: string
  expectations: string
  lastUpdated?: string
}

// Read all applications
export async function readApplications() {
  try {
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .order('submittedAt', { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error reading applications:', error)
    return []
  }
}

// Save a new application
export async function saveApplications(applications: Application[]) {
  try {
    const { error } = await supabase
      .from('applications')
      .insert(applications)

    if (error) throw error
  } catch (error) {
    console.error('Error saving applications:', error)
    throw error
  }
}

// Get a single application by ID
export async function getApplicationById(id: string) {
  try {
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error getting application:', error)
    return null
  }
}

// Update application status
export async function updateApplicationStatus(id: string, status: 'pending' | 'approved' | 'rejected') {
  try {
    const { data, error } = await supabase
      .from('applications')
      .update({ 
        status, 
        lastUpdated: new Date().toISOString() 
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error updating application status:', error)
    throw error
  }
} 