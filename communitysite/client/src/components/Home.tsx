'use client';

import { PostCard } from './ui/post-card';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import Image from 'next/image';

// Sample data - in a real app, this would come from an API
const samplePosts = [
  {
    id: 1,
    user: {
      name: 'John Doe',
      username: 'johndoe',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
    },
    content: 'Just finished building my first React component library! 🎉 Check it out and let me know what you think. #webdev #react #opensource',
    timestamp: '2 hours ago',
    likes: 42,
    comments: 8,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c'
  },
  {
    id: 2,
    user: {
      name: 'Jane Smith',
      username: 'janesmith',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane'
    },
    content: 'Working on a new project using Next.js and Tailwind CSS. The developer experience is amazing! 💻✨ #nextjs #tailwindcss #coding',
    timestamp: '4 hours ago',
    likes: 35,
    comments: 5
  },
  {
    id: 3,
    user: {
      name: 'Alex Johnson',
      username: 'alexj',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex'
    },
    content: 'Just deployed my first full-stack application! Built with Node.js, Express, and MongoDB. Learned so much during this journey. 🚀 #nodejs #webdev #mongodb',
    timestamp: '6 hours ago',
    likes: 28,
    comments: 12,
    image: 'https://images.unsplash.com/photo-1661956602116-aa6865609028'
  }
];

export default function Home() {
  const router = useRouter();

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Image
          src="/logo.png"
          alt="OPENGEEK"
          width={48}
          height={48}
          className="rounded-full border-2 border-emerald-500/20"
        />
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            OPENGEEK Community
          </h1>
          <p className="text-zinc-400 text-sm">Lets make magic together ✨</p>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="bg-black/50 border border-zinc-800/50 rounded-xl p-8 text-white mb-8 backdrop-blur-sm">
        <h2 className="text-2xl font-bold mb-3 text-white">Welcome to OPENGEEK Community! 👋</h2>
        <p className="text-zinc-400 mb-6">Join our community of developers, share your projects, and connect with others.</p>
        <Button
          variant="outline"
          className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/50"
          onClick={() => router.push('/login')}
        >
          Get Started
        </Button>
      </div>

      {/* Feed Tabs */}
      <Tabs defaultValue="top" className="w-full">
        <TabsList className="w-full justify-start border-b border-zinc-800 rounded-none h-auto p-0 bg-transparent mb-2">
          <TabsTrigger
            value="top"
            className="data-[state=active]:border-b-2 data-[state=active]:border-emerald-500 data-[state=active]:text-emerald-400 rounded-none px-6 py-3 text-sm font-medium"
          >
            Top Posts
          </TabsTrigger>
          <TabsTrigger
            value="newest"
            className="data-[state=active]:border-b-2 data-[state=active]:border-emerald-500 data-[state=active]:text-emerald-400 rounded-none px-6 py-3 text-sm font-medium"
          >
            Newest
          </TabsTrigger>
          <TabsTrigger
            value="following"
            className="data-[state=active]:border-b-2 data-[state=active]:border-emerald-500 data-[state=active]:text-emerald-400 rounded-none px-6 py-3 text-sm font-medium"
          >
            Following
          </TabsTrigger>
        </TabsList>
        <TabsContent value="top" className="mt-6">
          <div className="space-y-4">
            {samplePosts.map((post) => (
              <PostCard key={post.id} {...post} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="newest" className="mt-6">
          <div className="space-y-4">
            {[...samplePosts].reverse().map((post) => (
              <PostCard key={post.id} {...post} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="following" className="mt-6">
          <div className="space-y-4">
            {samplePosts.slice(0, 2).map((post) => (
              <PostCard key={post.id} {...post} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 