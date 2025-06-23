import { NextResponse } from 'next/server'
import { writeFile, readFile, mkdir } from 'fs/promises'
import path from 'path'
import { existsSync } from 'fs'
import { v4 as uuidv4 } from 'uuid'
import { hash } from 'bcrypt'
import { toast } from 'sonner'

// Store data in public directory which has proper permissions
const DATA_DIR = path.join(process.cwd(), 'public', '_data')
const DATA_FILE = path.join(DATA_DIR, 'applications.json')

// Initialize the data file if it doesn't exist
async function initializeDataFile() {
  try {
    // Create _data directory if it doesn't exist
    if (!existsSync(DATA_DIR)) {
      await mkdir(DATA_DIR, { recursive: true })
    }
    
    // Create applications.json if it doesn't exist
    if (!existsSync(DATA_FILE)) {
      await writeFile(DATA_FILE, JSON.stringify([], null, 2), 'utf-8')
    }
  } catch (error) {
    console.error('Error initializing data file:', error)
    throw error
  }
}

// Read applications from file
async function readApplications() {
  try {
    await initializeDataFile()
    const fileContent = await readFile(DATA_FILE, 'utf-8')
    return JSON.parse(fileContent)
  } catch (error) {
    console.error('Error reading applications:', error)
    return []
  }
}

// Save applications to file
async function saveApplications(applications: any[]) {
  try {
    await initializeDataFile()
    await writeFile(DATA_FILE, JSON.stringify(applications, null, 2), 'utf-8')
  } catch (error) {
    console.error('Error saving applications:', error)
    throw error
  }
}

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

    const filePath = path.join(process.cwd(), 'public', '_data', 'applications.json')
    
    let applications: Application[] = []
    try {
      const fileContent = await readFile(filePath, 'utf-8')
      applications = JSON.parse(fileContent)
    } catch (error) {
      toast.error('File doesnt exist or is empty, start with empty array')
      // File doesn't exist or is empty, start with empty array
    }

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
    await writeFile(filePath, JSON.stringify(applications, null, 2))

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

// Helper function to get a single application by ID
export async function getApplicationById(id: string) {
  const applications = await readApplications()
  return applications.find((app: any) => app.id === id)
}

// Helper function to update application status
export async function updateApplicationStatus(id: string, status: 'pending' | 'approved' | 'rejected') {
  const applications = await readApplications()
  const index = applications.findIndex((app: any) => app.id === id)
  
  if (index === -1) {
    throw new Error('Application not found')
  }

  applications[index] = {
    ...applications[index],
    status,
    lastUpdated: new Date().toISOString()
  }

  await saveApplications(applications)
  return applications[index]
} 