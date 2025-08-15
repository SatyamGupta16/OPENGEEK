import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';

interface BlogRow {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image_url: string | null;
  tags: string[] | null;
  status: 'draft' | 'published';
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export default function BlogList() {
  const [blogs, setBlogs] = useState<BlogRow[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const api = import.meta.env.VITE_API_URL;
        const token = localStorage.getItem('admin_token');
        if (!api) throw new Error('VITE_API_URL not set');
        if (!token) throw new Error('Missing admin token');
        const res = await axios.get(`${api}/blogs`, { headers: { Authorization: `Bearer ${token}` } });
        if (res.data?.success) setBlogs(res.data.data);
        else throw new Error('Failed to fetch blogs');
      } catch (e: any) {
        setError(e?.message || 'Failed to fetch blogs');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return blogs.filter(b =>
      b.title.toLowerCase().includes(q) ||
      b.slug.toLowerCase().includes(q) ||
      (b.excerpt?.toLowerCase().includes(q) ?? false) ||
      (b.tags || []).some(t => t.toLowerCase().includes(q))
    );
  }, [blogs, search]);

  if (loading) return <div className="p-6">Loading blogs...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Blogs</h1>
        <Link to="/admin/blogs/new"><Button>New Post</Button></Link>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>All Posts</CardTitle>
          <Input placeholder="Search by title, slug, tag..." value={search} onChange={e => setSearch(e.target.value)} className="max-w-xs" />
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>{filtered.length} posts</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Published</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(b => (
                <TableRow key={b.id}>
                  <TableCell className="font-medium">{b.title}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs ${b.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                      {b.status}
                    </span>
                  </TableCell>
                  <TableCell>/{b.slug}</TableCell>
                  <TableCell>{b.published_at ? new Date(b.published_at).toLocaleString() : '-'}</TableCell>
                  <TableCell>
                    <Link to={`/admin/blogs/edit/${b.id}`} className="text-blue-600 hover:underline">Edit</Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
