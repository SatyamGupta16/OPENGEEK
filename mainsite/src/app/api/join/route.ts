import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { hash } from 'bcrypt'
import { supabase } from '@/lib/supabase'
import type { Database } from '@/lib/database.types'

type Application = Database['public']['Tables']['applications']['Insert']

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      name, email, phone, githubProfile, course, semester,
      username, password,
      experience, skills, additionalSkills, interests,
      whyJoin, expectations,
      gender, hasLaptop,
      submittedAt
    } = body

    // Check if username or email already exists
    const { data: existing, error: checkError } = await supabase
      .from('applications')
      .select('username, email')
      .or(`username.eq."${username}",email.eq."${email}"`)
      .maybeSingle()

    if (checkError) {
      console.error('Error checking existing user:', checkError)
      return NextResponse.json(
        { error: 'Failed to check existing user' },
        { status: 500 }
      )
    }

    if (existing) {
      if (existing.username === username) {
        return NextResponse.json(
          { error: 'Username is already taken' },
          { status: 400 }
        )
      }
      if (existing.email === email) {
        return NextResponse.json(
          { error: 'Email is already registered' },
          { status: 400 }
        )
      }
    }

    // Store both hashed and temporary original password
    const hashedPassword = await hash(password, 10)

    const application: Application = {
      id: uuidv4(),
      status: 'pending',
      submitted_at: submittedAt,
      name,
      email,
      phone,
      github_profile: githubProfile,
      course,
      semester,
      username,
      hashed_password: hashedPassword,
      temp_password: password, // This will be used for welcome email and then removed
      experience,
      skills: skills || [],
      additional_skills: additionalSkills || [],
      interests,
      why_join: whyJoin,
      expectations,
      gender: gender || 'other',
      has_laptop: hasLaptop || false,
    }

    const { error: insertError } = await supabase
      .from('applications')
      .insert([application])

    if (insertError) {
      console.error('Error inserting application:', insertError)
      return NextResponse.json(
        { error: 'Failed to save application' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving application:', error)
    return NextResponse.json(
      { error: 'Failed to save application' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    console.log('Fetching applications from Supabase...')
    
    // First, let's check if we can connect to Supabase
    const { data: testConnection, error: connectionError } = await supabase
      .from('applications')
      .select('count')
      .single()

    if (connectionError) {
      console.error('Connection test failed:', connectionError)
      return NextResponse.json(
        { error: 'Failed to connect to database' },
        { status: 500 }
      )
    }

    console.log('Connection test successful, row count:', testConnection)

    // Now fetch all applications
    const { data: applications, error } = await supabase
      .from('applications')
      .select(`
        id,
        status,
        submitted_at,
        name,
        email,
        phone,
        github_profile,
        course,
        semester,
        username,
        experience,
        skills,
        additional_skills,
        interests,
        why_join,
        expectations,
        gender,
        has_laptop,
        last_updated
      `)
      .order('submitted_at', { ascending: false })

    if (error) {
      console.error('Supabase error fetching applications:', error)
      return NextResponse.json(
        { error: 'Failed to fetch applications' },
        { status: 500 }
      )
    }

    console.log('Applications fetched successfully:', applications?.length || 0, 'records')
    console.log('First record:', applications?.[0])

    return NextResponse.json(applications || [])
  } catch (error) {
    console.error('Error in GET /api/join:', error)
    return NextResponse.json(
      { error: 'Failed to fetch applications' },
      { status: 500 }
    )
  }
}

