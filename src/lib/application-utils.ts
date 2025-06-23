import { readFile, writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

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
export async function readApplications() {
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
export async function saveApplications(applications: any[]) {
  try {
    await initializeDataFile()
    await writeFile(DATA_FILE, JSON.stringify(applications, null, 2), 'utf-8')
  } catch (error) {
    console.error('Error saving applications:', error)
    throw error
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