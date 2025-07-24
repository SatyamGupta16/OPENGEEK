'use client';

import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { PostCard } from '@/components/ui/post-card';
import { useRouter } from 'next/navigation';
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
  },
  {
    id: 4,
    user: {
      name: 'Sarah Wilson',
      username: 'sarahw',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
    },
    content: 'Learning TypeScript has been a game changer for my development workflow. The type safety and IntelliSense support make coding so much more enjoyable! 🔥 #typescript #javascript #webdev',
    timestamp: '8 hours ago',
    likes: 56,
    comments: 15,
    image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea'
  },
  {
    id: 5,
    user: {
      name: 'Mike Chen',
      username: 'mikechen',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike'
    },
    content: 'Just open-sourced my CLI tool for managing environment variables across different projects. Hope it helps other developers! 🛠️ #opensource #cli #devtools',
    timestamp: '12 hours ago',
    likes: 73,
    comments: 22
  },
  {
    id: 6,
    user: {
      name: 'Emily Davis',
      username: 'emilyd',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily'
    },
    content: 'Attending my first tech conference next week! Excited to learn about the latest trends in AI and machine learning. Any tips for first-time attendees? 🤖 #ai #machinelearning #conference',
    timestamp: '1 day ago',
    likes: 31,
    comments: 18,
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e'
  },
  {
    id: 7,
    user: {
      name: 'David Rodriguez',
      username: 'davidr',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David'
    },
    content: 'Finally mastered Docker containers! The deployment process is now so much smoother. Docker-compose makes multi-service apps a breeze 🐳 #docker #devops #containers',
    timestamp: '1 day ago',
    likes: 89,
    comments: 31
  },
  {
    id: 8,
    user: {
      name: 'Lisa Park',
      username: 'lisap',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa'
    },
    content: 'Working on a mobile app with React Native. The cross-platform development experience is incredible - write once, run everywhere! 📱 #reactnative #mobile #crossplatform',
    timestamp: '2 days ago',
    likes: 45,
    comments: 12,
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c'
  }
];

export default function Home() {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-8">
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
