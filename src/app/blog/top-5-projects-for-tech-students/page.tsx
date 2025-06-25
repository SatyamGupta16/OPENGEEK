import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { blogPosts, type BlogPost } from '../data'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { Avatar } from '@/components/ui/avatar'
import { ArrowLeft } from 'lucide-react'
import { notFound } from 'next/navigation'

export default function BlogPost() {
  const post = blogPosts.find((post) => post.slug === 'top-5-projects-for-tech-students')

  if (!post) {
    notFound()
  }

  return (
    <article className="min-h-screen bg-neutral-950">
      {/* Back to Blog Button */}
      <div className="fixed left-0 right-0 z-10 bg-gradient-to-b from-neutral-950 to-transparent">
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
            {post.tags.map((tag: string) => (
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
        </div>
      </div>
    </article>
  )
} 