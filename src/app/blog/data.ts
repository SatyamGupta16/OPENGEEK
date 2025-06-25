// Helper function to get formatted date
const getFormattedDate = () => {
  return new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

// Helper function to get formatted time
const getFormattedTime = () => {
  return new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

const currentDate = getFormattedDate()
const currentTime = getFormattedTime()

export interface BlogPost {
  id: string
  slug: string
  title: string
  description: string
  date: string
  time: string
  tags: string[]
  readingTime: string
  author: string
  coverImage: string
  featured?: boolean
}

export const blogPosts: BlogPost[] = [
  {
    id: 'top-5-projects',
    slug: 'top-5-projects-for-tech-students',
    title: 'Top 5 Projects Every Tech Student Should Build Before Graduating',
    description: 'A comprehensive guide to building essential projects that will boost your portfolio and practical skills. Learn what to build and how to showcase your abilities effectively.',
    date: currentDate,
    time: currentTime,
    tags: ['Portfolio', 'Projects', 'Student', 'Learning'],
    readingTime: '8 min read',
    author: 'AI Assistant',
    coverImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop',
    featured: true
  },
  {
    id: 'tech-paths',
    slug: 'frontend-backend-devops-guide',
    title: 'Frontend vs Backend vs DevOps: What Should You Learn First?',
    description: 'An in-depth analysis of different tech career paths and how to choose the right one for you. Get insights into the skills, tools, and learning roadmap for each path.',
    date: currentDate,
    time: currentTime,
    tags: ['Career Guide', 'Frontend', 'Backend', 'DevOps'],
    readingTime: '10 min read',
    author: 'AI Assistant',
    coverImage: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 'dev-resources',
    slug: 'essential-developer-resources-2025',
    title: '10 Free Resources Every Developer Should Bookmark in 2025',
    description: 'Discover the most valuable free tools and resources that will supercharge your development workflow. From learning platforms to productivity tools, we have everything covered.',
    date: currentDate,
    time: currentTime,
    tags: ['Resources', 'Tools', 'Learning', 'Free'],
    readingTime: '7 min read',
    author: 'AI Assistant',
    coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop'
  }
] 