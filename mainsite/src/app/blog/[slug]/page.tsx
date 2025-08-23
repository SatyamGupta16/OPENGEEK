"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

type BlogPost = {
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image_url: string | null;
  tags: string[] | null;
  published_at: string;
};

export default function BlogDetailPage() {
  const params = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!params?.slug) return;
      setLoading(true);
      setError('');
      try {
        const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
        const res = await fetch(`${base}/public/blogs/by-slug/${params.slug}`, { cache: 'no-store' });
        if (!res.ok) throw new Error(`Failed to load post: ${res.status}`);
        const json = await res.json();
        if (!json?.success) throw new Error('Failed to load post');
        setPost(json.data);
      } catch (e: any) {
        setError(e?.message || 'Failed to load post');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [params?.slug]);

  if (loading) return <div className="max-w-3xl mx-auto p-6 text-neutral-400">Loading...</div>;
  if (error) return <div className="max-w-3xl mx-auto p-6 text-red-500">{error}</div>;
  if (!post) return <div className="max-w-3xl mx-auto p-6 text-neutral-400">Post not found.</div>;

  return (
    <div className="min-h-screen bg-neutral-950">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <Link href="/blog" className="text-neutral-400 hover:text-neutral-200">← Back to Blog</Link>
        <h1 className="mt-4 text-4xl font-bold text-neutral-100">{post.title}</h1>
        <div className="mt-3 text-neutral-500">{new Date(post.published_at).toLocaleDateString()}</div>
        <div className="mt-4 flex flex-wrap gap-2">
          {(post.tags || []).map(t => (
            <Badge key={t} variant="secondary" className="bg-neutral-800 text-neutral-300">{t}</Badge>
          ))}
        </div>
        {post.cover_image_url && (
          <div className="mt-6 relative h-80 w-full rounded-lg overflow-hidden border border-neutral-800">
            <Image src={post.cover_image_url} alt={post.title} fill className="object-cover" />
          </div>
        )}
        <article className="prose prose-invert mt-8 max-w-none">
          {/* Render markdown/plain content. For now, display as-is. */}
          <div style={{ whiteSpace: 'pre-wrap' }}>{post.content}</div>
        </article>
      </div>
    </div>
  );
}
