import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { hash } from 'bcrypt'

import { readApplications, saveApplications } from '@/lib/application-utils'

interface Application {
  id: string
  status: 'pending' | 'approved' | 'rejected'
  submittedAt: string
  
  // Personal Details
  name: string
  email: string
  phone: string
  githubProfile: string
  course: string
  semester: string
  
  // Login Credentials (hashed)
  username: string
  hashedPassword: string

  // Technical Background
  experience: string
  skills: string[]
  interests: string
  
  // Community Interest
  whyJoin: string
  expectations: string
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      name, email, phone, githubProfile, course, semester,
      username, password,
      experience, skills, interests,
      whyJoin, expectations,
      submittedAt
    } = body

    // Hash the password
    const hashedPassword = await hash(password, 10)

    const application: Application = {
      id: uuidv4(),
      status: 'pending',
      submittedAt,
      name,
      email,
      phone,
      githubProfile,
      course,
      semester,
      username,
      hashedPassword,
      experience,
      skills: skills || [],
      interests,
      whyJoin,
      expectations,
    }

    let applications: Application[] = await readApplications()

    // Check if username is already taken
    if (applications.some(app => app.username === username)) {
      return NextResponse.json(
        { error: 'Username is already taken' },
        { status: 400 }
      )
    }

    // Check if email is already registered
    if (applications.some(app => app.email === email)) {
      return NextResponse.json(
        { error: 'Email is already registered' },
        { status: 400 }
      )
    }

    applications.push(application)
    await saveApplications(applications)

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
    const applications = await readApplications()
    return NextResponse.json(applications)
  } catch (error) {
    console.error('Error fetching applications:', error)
    return NextResponse.json(
      { error: 'Failed to fetch applications' },
      { status: 500 }
    )
  }
}

