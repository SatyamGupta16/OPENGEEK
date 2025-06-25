'use client'

import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { blogPosts } from '../page'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { Avatar } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { ArrowLeft } from 'lucide-react'

interface PageProps {
  params: {
    slug: string
  }
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default async function BlogPost({ params, searchParams }: PageProps) {
  const post = blogPosts.find((post) => post.slug === params.slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="min-h-screen bg-neutral-950">
      {/* Back to Blog Button */}
      <div className="fixed  left-0 right-0 z-10 bg-gradient-to-b from-neutral-950 to-transparent">
        <div className="max-w-7xl mx-auto px-4 py-24">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 text-neutral-200 transition-all group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Blog
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative w-full h-[60vh]">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-950/60 to-neutral-950" />
        <div className="absolute bottom-0 left-0 right-0 max-w-4xl mx-auto px-4 py-12">
          <div className="flex gap-2 mb-6">
            {post.tags.map((tag) => (
              <Badge 
                key={tag} 
                variant="secondary" 
                className="bg-neutral-900/80 text-neutral-200 border border-neutral-700"
              >
                {tag}
              </Badge>
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-6 text-neutral-200">
            <HoverCard>
              <HoverCardTrigger>
                <div className="flex items-center gap-3 cursor-pointer">
                  <Avatar className="border-2 border-neutral-700">
                    <Image
                      src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=200&auto=format&fit=crop"
                      alt={post.author}
                      width={44}
                      height={44}
                      className="rounded-full"
                    />
                  </Avatar>
                  <div>
                    <p className="font-medium">{post.author}</p>
                    <p className="text-sm text-neutral-400">Technical Writer & Developer</p>
                  </div>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="bg-neutral-900 border-neutral-800">
                <div className="flex flex-col gap-2">
                  <h4 className="font-semibold text-neutral-200">{post.author}</h4>
                  <p className="text-sm text-neutral-400">Passionate about teaching and technology</p>
                  <p className="text-sm text-neutral-400">Writing tutorials and guides for developers</p>
                </div>
              </HoverCardContent>
            </HoverCard>
            <div className="flex items-center gap-2 text-sm text-neutral-400">
              <time>{post.date}</time>
              <span>•</span>
              <span>{post.readingTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-lg prose-invert max-w-none">
          <p className="lead text-xl text-neutral-300 mb-8">
            {post.description}
          </p>

          {post.slug === 'top-5-projects-for-tech-students' && (
            <>
              <p className="text-neutral-300">
                As a tech student preparing to enter the industry, having a strong portfolio is crucial. Here are five essential projects that will not only enhance your skills but also make you stand out to potential employers.
              </p>

              <section className="my-12">
                <h2 className="text-3xl font-bold text-neutral-100 mb-8">1. Full-Stack Social Media Platform</h2>
                <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6 mb-6">
                  <p className="text-neutral-300 mb-4">
                    Building a social media platform teaches you crucial concepts that are highly valued in the industry. This project will give you hands-on experience with:
                  </p>
                  <ul className="space-y-3 text-neutral-300">
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 text-xl">•</span>
                      <span><strong className="text-neutral-200">User Authentication:</strong> Implement secure login, registration, and OAuth integration</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 text-xl">•</span>
                      <span><strong className="text-neutral-200">Real-time Features:</strong> Add WebSocket functionality for live updates and chat</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 text-xl">•</span>
                      <span><strong className="text-neutral-200">Database Design:</strong> Create efficient schemas and handle complex relationships</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 text-xl">•</span>
                      <span><strong className="text-neutral-200">API Development:</strong> Build RESTful APIs with proper documentation</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 text-xl">•</span>
                      <span><strong className="text-neutral-200">State Management:</strong> Handle complex frontend state with modern solutions</span>
                    </li>
                  </ul>
                </div>
              </section>

              <section className="my-12">
                <h2 className="text-3xl font-bold text-neutral-100 mb-8">2. E-Commerce Website</h2>
                <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6 mb-6">
                  <p className="text-neutral-300 mb-4">
                    An e-commerce project demonstrates your ability to handle complex business logic and integrations:
                  </p>
                  <ul className="space-y-3 text-neutral-300">
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 text-xl">•</span>
                      <span><strong className="text-neutral-200">Payment Processing:</strong> Integrate payment gateways and handle transactions</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 text-xl">•</span>
                      <span><strong className="text-neutral-200">Shopping Cart:</strong> Implement cart functionality with local storage</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 text-xl">•</span>
                      <span><strong className="text-neutral-200">Product Management:</strong> Create admin dashboard for inventory</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 text-xl">•</span>
                      <span><strong className="text-neutral-200">Order System:</strong> Handle order processing and status updates</span>
                    </li>
                  </ul>
                </div>
              </section>

              <section className="my-12">
                <h2 className="text-3xl font-bold text-neutral-100 mb-8">3. Task Management Application</h2>
                <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6 mb-6">
                  <p className="text-neutral-300 mb-4">
                    This project showcases your understanding of essential web development concepts:
                  </p>
                  <ul className="space-y-3 text-neutral-300">
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 text-xl">•</span>
                      <span><strong className="text-neutral-200">CRUD Operations:</strong> Implement create, read, update, delete functionality</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 text-xl">•</span>
                      <span><strong className="text-neutral-200">UI/UX Design:</strong> Create intuitive user interfaces with modern design patterns</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 text-xl">•</span>
                      <span><strong className="text-neutral-200">Data Persistence:</strong> Handle data storage and state management</span>
                    </li>
                  </ul>
                </div>
              </section>

              <section className="my-12">
                <h2 className="text-3xl font-bold text-neutral-100 mb-8">4. Weather Application</h2>
                <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6 mb-6">
                  <p className="text-neutral-300 mb-4">
                    A weather app demonstrates your ability to work with external APIs and handle data:
                  </p>
                  <ul className="space-y-3 text-neutral-300">
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 text-xl">•</span>
                      <span><strong className="text-neutral-200">API Integration:</strong> Connect with weather APIs and handle responses</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 text-xl">•</span>
                      <span><strong className="text-neutral-200">Geolocation:</strong> Implement location-based features</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 text-xl">•</span>
                      <span><strong className="text-neutral-200">Data Visualization:</strong> Display weather data with charts and icons</span>
                    </li>
                  </ul>
                </div>
              </section>

              <section className="my-12">
                <h2 className="text-3xl font-bold text-neutral-100 mb-8">5. Personal Portfolio Website</h2>
                <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6 mb-6">
                  <p className="text-neutral-300 mb-4">
                    Your portfolio website should showcase your best work and skills:
                  </p>
                  <ul className="space-y-3 text-neutral-300">
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 text-xl">•</span>
                      <span><strong className="text-neutral-200">Professional Design:</strong> Create a clean, modern layout</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 text-xl">•</span>
                      <span><strong className="text-neutral-200">Project Showcase:</strong> Display your work with detailed case studies</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 text-xl">•</span>
                      <span><strong className="text-neutral-200">SEO:</strong> Implement best practices for visibility</span>
                    </li>
                  </ul>
                </div>
              </section>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 my-12">
                <h2 className="text-2xl font-bold text-blue-400 mb-4">Pro Tips for Success</h2>
                <ul className="space-y-3 text-neutral-300">
                  <li className="flex items-start gap-3">
                    <span className="text-blue-400 text-xl">→</span>
                    <span>Document your development process and decisions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-400 text-xl">→</span>
                    <span>Use modern frameworks and tools popular in the industry</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-400 text-xl">→</span>
                    <span>Write clean, well-documented code with proper Git practices</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-400 text-xl">→</span>
                    <span>Deploy your projects and make them accessible online</span>
                  </li>
                </ul>
              </div>

              <div className="border-t border-neutral-800 pt-8 mt-12">
                <h2 className="text-2xl font-bold text-neutral-100 mb-4">Conclusion</h2>
                <p className="text-neutral-300">
                  These projects will give you hands-on experience with modern technologies and best practices. Remember to document your development process, challenges faced, and solutions implemented. This documentation will be valuable during job interviews and demonstrates your problem-solving abilities.
                </p>
              </div>
            </>
          )}

          {post.slug === 'frontend-backend-devops-guide' && (
            <>
              <p className="text-neutral-300">
                Choosing your first specialization in tech can be overwhelming. Let's break down each path and help you make an informed decision based on your interests and career goals.
              </p>

              <section className="my-12">
                <h2 className="text-3xl font-bold text-neutral-100 mb-8">Frontend Development</h2>
                <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6 mb-6">
                  <h3 className="text-xl font-semibold text-neutral-200 mb-4">What is Frontend Development?</h3>
                  <p className="text-neutral-300 mb-4">
                    Frontend development focuses on everything users see and interact with in a web application. It's the art of creating responsive, intuitive, and engaging user interfaces.
                  </p>
                  <h4 className="text-lg font-semibold text-neutral-200 mb-3">Key Skills Required:</h4>
                  <ul className="space-y-3 text-neutral-300">
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 text-xl">•</span>
                      <div>
                        <strong className="text-neutral-200">HTML, CSS, and JavaScript:</strong>
                        <p>The fundamental building blocks of web development. Master these before moving to frameworks.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 text-xl">•</span>
                      <div>
                        <strong className="text-neutral-200">Modern Frameworks:</strong>
                        <p>React, Vue, or Angular - each with its own ecosystem and best practices.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 text-xl">•</span>
                      <div>
                        <strong className="text-neutral-200">Responsive Design:</strong>
                        <p>Creating layouts that work seamlessly across all device sizes.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 text-xl">•</span>
                      <div>
                        <strong className="text-neutral-200">UI/UX Fundamentals:</strong>
                        <p>Understanding user experience principles and design systems.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </section>

              <section className="my-12">
                <h2 className="text-3xl font-bold text-neutral-100 mb-8">Backend Development</h2>
                <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6 mb-6">
                  <h3 className="text-xl font-semibold text-neutral-200 mb-4">What is Backend Development?</h3>
                  <p className="text-neutral-300 mb-4">
                    Backend development involves building and maintaining the server-side of web applications. It's about handling data, business logic, and system architecture.
                  </p>
                  <h4 className="text-lg font-semibold text-neutral-200 mb-3">Key Skills Required:</h4>
                  <ul className="space-y-3 text-neutral-300">
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 text-xl">•</span>
                      <div>
                        <strong className="text-neutral-200">Server-side Languages:</strong>
                        <p>Node.js, Python, Java, or similar technologies with their frameworks.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 text-xl">•</span>
                      <div>
                        <strong className="text-neutral-200">Database Management:</strong>
                        <p>SQL and NoSQL databases, data modeling, and optimization.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 text-xl">•</span>
                      <div>
                        <strong className="text-neutral-200">API Development:</strong>
                        <p>RESTful APIs, GraphQL, and API security best practices.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 text-xl">•</span>
                      <div>
                        <strong className="text-neutral-200">Security:</strong>
                        <p>Authentication, authorization, and data protection.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </section>

              <section className="my-12">
                <h2 className="text-3xl font-bold text-neutral-100 mb-8">DevOps</h2>
                <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6 mb-6">
                  <h3 className="text-xl font-semibold text-neutral-200 mb-4">What is DevOps?</h3>
                  <p className="text-neutral-300 mb-4">
                    DevOps bridges the gap between development and operations, focusing on continuous integration, delivery, and deployment of software.
                  </p>
                  <h4 className="text-lg font-semibold text-neutral-200 mb-3">Key Skills Required:</h4>
                  <ul className="space-y-3 text-neutral-300">
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 text-xl">•</span>
                      <div>
                        <strong className="text-neutral-200">Cloud Platforms:</strong>
                        <p>AWS, Azure, or GCP - understanding cloud infrastructure and services.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 text-xl">•</span>
                      <div>
                        <strong className="text-neutral-200">Container Orchestration:</strong>
                        <p>Docker, Kubernetes, and container management strategies.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 text-xl">•</span>
                      <div>
                        <strong className="text-neutral-200">CI/CD:</strong>
                        <p>Setting up and maintaining automated deployment pipelines.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 text-xl">•</span>
                      <div>
                        <strong className="text-neutral-200">Monitoring:</strong>
                        <p>System monitoring, logging, and performance optimization.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </section>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 my-12">
                <h2 className="text-2xl font-bold text-blue-400 mb-4">Making Your Decision</h2>
                <p className="text-neutral-300 mb-4">Consider these factors when choosing your path:</p>
                <ul className="space-y-3 text-neutral-300">
                  <li className="flex items-start gap-3">
                    <span className="text-blue-400 text-xl">→</span>
                    <div>
                      <strong className="text-neutral-200">Visual Creativity:</strong>
                      <p>If you enjoy design and user interaction, frontend development might be your calling.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-400 text-xl">→</span>
                    <div>
                      <strong className="text-neutral-200">Problem Solving:</strong>
                      <p>Backend development might suit you if you enjoy complex logic and system architecture.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-400 text-xl">→</span>
                    <div>
                      <strong className="text-neutral-200">Automation & Infrastructure:</strong>
                      <p>DevOps could be perfect if you like automating processes and managing systems.</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="border-t border-neutral-800 pt-8 mt-12">
                <h2 className="text-2xl font-bold text-neutral-100 mb-4">Conclusion</h2>
                <p className="text-neutral-300">
                  Remember, these paths are not mutually exclusive. Many developers start in one area and expand their skills over time. The key is to start somewhere and keep learning. Choose the path that aligns with your interests and career goals, but don't feel locked into your initial choice.
                </p>
              </div>
            </>
          )}

          {post.slug === 'essential-developer-resources-2025' && (
            <>
              <p className="text-neutral-300">
                In the fast-paced world of software development, having the right resources at your fingertips can significantly boost your productivity and learning. Here's our curated list of must-bookmark resources for 2025.
              </p>

              <section className="my-12">
                <h2 className="text-3xl font-bold text-neutral-100 mb-8">1. Learning Platforms</h2>
                <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6 mb-6">
                  <ul className="space-y-4 text-neutral-300">
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 text-xl">•</span>
                      <div>
                        <strong className="text-neutral-200">freeCodeCamp</strong>
                        <p>A comprehensive platform offering structured learning paths for web development, with hands-on projects and certifications.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 text-xl">•</span>
                      <div>
                        <strong className="text-neutral-200">MDN Web Docs</strong>
                        <p>The definitive source for web development documentation, tutorials, and guides.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 text-xl">•</span>
                      <div>
                        <strong className="text-neutral-200">Dev.to</strong>
                        <p>A community-driven platform where developers share knowledge through articles and discussions.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </section>

              <section className="my-12">
                <h2 className="text-3xl font-bold text-neutral-100 mb-8">2. Development Tools</h2>
                <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6 mb-6">
                  <ul className="space-y-4 text-neutral-300">
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 text-xl">•</span>
                      <div>
                        <strong className="text-neutral-200">VS Code</strong>
                        <p>The most popular code editor with extensive plugin support and customization options.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 text-xl">•</span>
                      <div>
                        <strong className="text-neutral-200">GitHub Copilot</strong>
                        <p>AI-powered code completion tool that helps you write code faster and more efficiently.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 text-xl">•</span>
                      <div>
                        <strong className="text-neutral-200">Postman</strong>
                        <p>Essential tool for API development and testing with collaboration features.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </section>

              <section className="my-12">
                <h2 className="text-3xl font-bold text-neutral-100 mb-8">3. Design Resources</h2>
                <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6 mb-6">
                  <ul className="space-y-4 text-neutral-300">
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 text-xl">•</span>
                      <div>
                        <strong className="text-neutral-200">Figma</strong>
                        <p>The industry-standard design tool for UI/UX design and prototyping.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 text-xl">•</span>
                      <div>
                        <strong className="text-neutral-200">Tailwind CSS</strong>
                        <p>A utility-first CSS framework that speeds up the development process.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 text-xl">•</span>
                      <div>
                        <strong className="text-neutral-200">Dribbble</strong>
                        <p>Platform for design inspiration and keeping up with design trends.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </section>

              <section className="my-12">
                <h2 className="text-3xl font-bold text-neutral-100 mb-8">4. Productivity Tools</h2>
                <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6 mb-6">
                  <ul className="space-y-4 text-neutral-300">
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 text-xl">•</span>
                      <div>
                        <strong className="text-neutral-200">Notion</strong>
                        <p>All-in-one workspace for notes, documentation, and project management.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 text-xl">•</span>
                      <div>
                        <strong className="text-neutral-200">Linear</strong>
                        <p>Modern issue tracking and project management tool built for speed.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 text-xl">•</span>
                      <div>
                        <strong className="text-neutral-200">Rectangle</strong>
                        <p>Window management tool for improved productivity and screen organization.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </section>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 my-12">
                <h2 className="text-2xl font-bold text-blue-400 mb-4">Pro Tips for Maximum Productivity</h2>
                <ul className="space-y-3 text-neutral-300">
                  <li className="flex items-start gap-3">
                    <span className="text-blue-400 text-xl">→</span>
                    <div>
                      <strong className="text-neutral-200">Create a Learning Schedule:</strong>
                      <p>Dedicate specific time slots for learning and experimenting with new tools.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-400 text-xl">→</span>
                    <div>
                      <strong className="text-neutral-200">Build a Workflow:</strong>
                      <p>Combine these tools effectively to create a streamlined development process.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-400 text-xl">→</span>
                    <div>
                      <strong className="text-neutral-200">Stay Updated:</strong>
                      <p>Follow relevant blogs and newsletters to discover new tools and best practices.</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="border-t border-neutral-800 pt-8 mt-12">
                <h2 className="text-2xl font-bold text-neutral-100 mb-4">Conclusion</h2>
                <p className="text-neutral-300">
                  These resources will help you stay updated with the latest trends, solve problems efficiently, and continue learning in your development journey. Remember to bookmark these sites and make them part of your daily workflow. The key is not just having access to these resources, but knowing how to use them effectively to improve your development process.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Share Section */}
        <div className="mt-16 pt-8 border-t border-neutral-800">
          <h3 className="text-2xl font-bold text-neutral-100 mb-6">Share this article</h3>
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1a8cd8] transition flex items-center gap-2">
              Twitter
            </button>
            <button className="px-6 py-3 bg-[#0077B5] text-white rounded-lg hover:bg-[#006396] transition flex items-center gap-2">
              LinkedIn
            </button>
            <button className="px-6 py-3 bg-neutral-800 text-white rounded-lg hover:bg-neutral-700 transition flex items-center gap-2">
              Copy Link
            </button>
          </div>
        </div>

        {/* Related Posts */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-neutral-100 mb-8">Related Articles</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {blogPosts
              .filter((relatedPost) => relatedPost.slug !== post.slug)
              .slice(0, 2)
              .map((relatedPost) => (
                <Card 
                  key={relatedPost.slug} 
                  className="bg-neutral-900/50 border-neutral-800 hover:bg-neutral-900/80 transition-all duration-300"
                >
                  <a href={`/blog/${relatedPost.slug}`} className="block group">
                    <div className="relative h-48 mb-4">
                      <Image
                        src={relatedPost.coverImage}
                        alt={relatedPost.title}
                        fill
                        className="object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, 384px"
                      />
                    </div>
                    <div className="p-6">
                      <h4 className="text-xl font-semibold mb-2 text-neutral-200 group-hover:text-blue-400 transition">
                        {relatedPost.title}
                      </h4>
                      <p className="text-neutral-400 line-clamp-2">{relatedPost.description}</p>
                      <div className="flex items-center gap-2 mt-4 text-sm text-neutral-400">
                        <span>{relatedPost.readingTime}</span>
                        <span>•</span>
                        <span>{relatedPost.date}</span>
                      </div>
                    </div>
                  </a>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </article>
  )
} 