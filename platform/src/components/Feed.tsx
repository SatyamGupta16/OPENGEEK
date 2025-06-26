import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface Post {
  id: number;
  created_at: string;
  title: string;
  content: string;
  user_id: string;
  user_email: string;
}

export default function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [newPost, setNewPost] = useState({ title: '', content: '' });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase.from('posts').insert([
        {
          title: newPost.title,
          content: newPost.content,
          user_id: user.id,
          user_email: user.email,
        },
      ]);

      if (error) throw error;

      setNewPost({ title: '', content: '' });
      fetchPosts();
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Create a Post</h2>
        <form onSubmit={handleSubmitPost} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Post title"
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <textarea
              placeholder="What's on your mind?"
              value={newPost.content}
              onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md h-24"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Post
          </button>
        </form>
      </div>

      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
            <p className="text-gray-600 mb-4">{post.content}</p>
            <div className="text-sm text-gray-500">
              Posted by {post.user_email} on{' '}
              {new Date(post.created_at).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 