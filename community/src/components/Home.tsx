import { PostCard } from './ui/post-card';

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
  return (
    <div className="max-w-2xl mx-auto">
      <div className="space-y-6">
        {/* Create Post Section */}
        <div className="bg-black rounded-lg border border-zinc-800 p-4">
          <textarea
            placeholder="What's on your mind?"
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
          />
          <div className="mt-3 flex justify-end">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
              Post
            </button>
          </div>
        </div>

        {/* Feed */}
        <div className="space-y-6">
          {samplePosts.map((post) => (
            <PostCard key={post.id} {...post} />
          ))}
        </div>
      </div>
    </div>
  );
} 