"use client";

import { motion } from "framer-motion";
import { Calendar, User, Clock, ArrowRight, Tag } from "lucide-react";
import { GridPattern } from "@/components/ui/grid-pattern";
import { SpaceBackground } from "@/components/ui/space-background";

const featuredPosts = [
  {
    title: "Building Scalable Web Applications with Next.js and TypeScript",
    excerpt: "Learn how to create performant and maintainable web applications using Next.js 14 and TypeScript. We'll cover best practices, common pitfalls, and advanced techniques.",
    author: "Alex Johnson",
    date: "February 15, 2024",
    readTime: "12 min read",
    category: "Development",
    tags: ["Next.js", "TypeScript", "Web Development"],
    image: "/blog/nextjs.jpg"
  },
  {
    title: "The Future of AI in Web Development",
    excerpt: "Explore how artificial intelligence is transforming web development, from code generation to automated testing and optimization.",
    author: "Sarah Chen",
    date: "February 12, 2024",
    readTime: "8 min read",
    category: "AI & Tech",
    tags: ["AI", "Future Tech", "Web Development"],
    image: "/blog/ai-web.jpg"
  }
];

const recentPosts = [
  {
    title: "Mastering CSS Grid and Flexbox",
    excerpt: "A comprehensive guide to modern CSS layout techniques, with practical examples and best practices.",
    author: "Mike Wilson",
    date: "February 10, 2024",
    readTime: "10 min read",
    category: "CSS",
    tags: ["CSS", "Web Design", "Layout"]
  },
  {
    title: "Introduction to System Design",
    excerpt: "Learn the fundamentals of system design and how to approach complex architectural decisions.",
    author: "Priya Sharma",
    date: "February 8, 2024",
    readTime: "15 min read",
    category: "System Design",
    tags: ["Architecture", "Backend", "Scalability"]
  },
  {
    title: "Getting Started with Open Source",
    excerpt: "A beginner's guide to contributing to open source projects and building your developer portfolio.",
    author: "David Lee",
    date: "February 5, 2024",
    readTime: "7 min read",
    category: "Open Source",
    tags: ["GitHub", "Community", "Career"]
  }
];

export default function BlogPage() {
  return (
    <div className="relative">
      <SpaceBackground />
      <div className="relative z-10 pt-24 pb-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl mb-16 sm:mb-24">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/70 mb-6">
              Tech Blog & Insights
            </h1>
            <p className="text-white/70 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
              Deep dives into web development, system design, and tech career advice. Written by developers, for developers.
            </p>
          </motion.div>
        </section>

        {/* Featured Posts */}
        <section className="px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl mb-16 sm:mb-24">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-8">Featured Posts</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {featuredPosts.map((post, index) => (
              <motion.article
                key={post.title}
                className="relative group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="relative overflow-hidden rounded-2xl bg-black/20 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-colors h-full">
                  <GridPattern
                    width={12}
                    height={12}
                    x={-1}
                    y={-1}
                    className="absolute inset-0 h-full w-full fill-white/[0.02] stroke-white/[0.02] [mask-image:linear-gradient(to_bottom_left,white,transparent,transparent)]"
                  />
                  <div className="relative z-10 p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-2 py-1 rounded-full bg-white/5 text-white/70 text-xs">
                        {post.category}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3 group-hover:text-white/90 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-white/70 text-sm mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-white/60">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        {post.author}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {post.date}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        {post.readTime}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Recent Posts */}
        <section className="px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-8">Recent Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post, index) => (
              <motion.article
                key={post.title}
                className="relative group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="relative overflow-hidden rounded-2xl bg-black/20 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-colors h-full">
                  <GridPattern
                    width={12}
                    height={12}
                    x={-1}
                    y={-1}
                    className="absolute inset-0 h-full w-full fill-white/[0.02] stroke-white/[0.02] [mask-image:linear-gradient(to_bottom_left,white,transparent,transparent)]"
                  />
                  <div className="relative z-10 p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-2 py-1 rounded-full bg-white/5 text-white/70 text-xs">
                        {post.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-white/90 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-white/70 text-sm mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-white/60">
                        <Calendar className="w-4 h-4 mr-2" />
                        {post.date}
                      </div>
                      <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-white/70 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
} 