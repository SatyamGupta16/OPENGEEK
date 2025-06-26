import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { blogPosts, type BlogPost } from '../data'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { Avatar } from '@/components/ui/avatar'
import { ArrowLeft } from 'lucide-react'
import { notFound } from 'next/navigation'

export default function BlogPost() {
  const post = blogPosts.find((post) => post.slug === 'essential-developer-resources-2025')

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
            In today's fast-paced tech world, having the right resources at your fingertips can significantly boost your productivity and learning. Here are our top picks for 2025.
          </p>

          <section className="my-12">
            <h2 className="text-3xl font-bold text-neutral-100 mb-8">Learning Platforms</h2>
            <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6 mb-6">
              <ul className="space-y-3 text-neutral-300">
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 text-xl">•</span>
                  <span><strong className="text-neutral-200">freeCodeCamp:</strong> Comprehensive coding curriculum with certificates</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 text-xl">•</span>
                  <span><strong className="text-neutral-200">MDN Web Docs:</strong> Detailed documentation and tutorials for web technologies</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 text-xl">•</span>
                  <span><strong className="text-neutral-200">DevDocs:</strong> Unified API documentation browser</span>
                </li>
              </ul>
            </div>
          </section>

          <section className="my-12">
            <h2 className="text-3xl font-bold text-neutral-100 mb-8">Development Tools</h2>
            <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6 mb-6">
              <ul className="space-y-3 text-neutral-300">
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 text-xl">•</span>
                  <span><strong className="text-neutral-200">GitHub Copilot:</strong> AI-powered code completion and generation</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 text-xl">•</span>
                  <span><strong className="text-neutral-200">VS Code:</strong> Powerful, extensible code editor with rich ecosystem</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 text-xl">•</span>
                  <span><strong className="text-neutral-200">Postman:</strong> API development and testing platform</span>
                </li>
              </ul>
            </div>
          </section>

          <section className="my-12">
            <h2 className="text-3xl font-bold text-neutral-100 mb-8">Community Resources</h2>
            <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6 mb-6">
              <ul className="space-y-3 text-neutral-300">
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 text-xl">•</span>
                  <span><strong className="text-neutral-200">Stack Overflow:</strong> Q&A platform for programming problems</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 text-xl">•</span>
                  <span><strong className="text-neutral-200">Dev.to:</strong> Community blogging platform for developers</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 text-xl">•</span>
                  <span><strong className="text-neutral-200">Discord Communities:</strong> Real-time chat with developer groups</span>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </article>
  )
} 