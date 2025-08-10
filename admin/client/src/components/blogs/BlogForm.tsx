import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface BlogPayload {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image_url?: string;
  tags?: string[];
  status: 'draft' | 'published';
}

export default function BlogForm() {
  const params = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(params.id);

  const [form, setForm] = useState<BlogPayload>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    cover_image_url: '',
    tags: [],
    status: 'draft',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      if (!isEdit) return;
      try {
        const api = import.meta.env.VITE_API_URL;
        const token = localStorage.getItem('admin_token');
        const { id } = params as { id: string };
        if (!api) throw new Error('VITE_API_URL not set');
        if (!token) throw new Error('Missing admin token');
        const res = await axios.get(`${api}/blogs/${id}`, { headers: { Authorization: `Bearer ${token}` } });
        if (res.data?.success) {
          const d = res.data.data;
          setForm({
            title: d.title || '',
            slug: d.slug || '',
            excerpt: d.excerpt || '',
            content: d.content || '',
            cover_image_url: d.cover_image_url || '',
            tags: d.tags || [],
            status: d.status || 'draft',
          });
        }
      } catch (e: any) {
        setError(e?.message || 'Failed to load post');
      }
    };
    load();
  }, [isEdit, params]);

  const onChange = (key: keyof BlogPayload, value: any) => setForm(prev => ({ ...prev, [key]: value }));

  const save = async (publish = false) => {
    setLoading(true);
    setError('');
    try {
      const api = import.meta.env.VITE_API_URL;
      const token = localStorage.getItem('admin_token');
      if (!api) throw new Error('VITE_API_URL not set');
      if (!token) throw new Error('Missing admin token');
      const payload = { ...form, status: publish ? 'published' : form.status };
      if (isEdit) {
        const { id } = params as { id: string };
        await axios.put(`${api}/blogs/${id}`, payload, { headers: { Authorization: `Bearer ${token}` } });
      } else {
        await axios.post(`${api}/blogs`, payload, { headers: { Authorization: `Bearer ${token}` } });
      }
      navigate('/admin/blogs');
    } catch (e: any) {
      setError(e?.message || 'Failed to save post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{isEdit ? 'Edit Post' : 'New Post'}</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Blog Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && <div className="text-sm text-red-600">{error}</div>}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm mb-1">Title</label>
              <Input value={form.title} onChange={e => onChange('title', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm mb-1">Slug</label>
              <Input value={form.slug} onChange={e => onChange('slug', e.target.value)} placeholder="my-awesome-post" />
            </div>
          </div>
          <div>
            <label className="block text-sm mb-1">Excerpt</label>
            <Textarea value={form.excerpt} onChange={e => onChange('excerpt', e.target.value)} rows={3} />
          </div>
          <div>
            <label className="block text-sm mb-1">Cover Image URL</label>
            <Input value={form.cover_image_url} onChange={e => onChange('cover_image_url', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm mb-1">Tags (comma separated)</label>
            <Input value={(form.tags || []).join(', ')} onChange={e => onChange('tags', e.target.value.split(',').map(t => t.trim()).filter(Boolean))} />
          </div>
          <div>
            <label className="block text-sm mb-1">Content (Markdown supported)</label>
            <Textarea value={form.content} onChange={e => onChange('content', e.target.value)} rows={12} />
          </div>
          <div className="flex gap-3">
            <Select value={form.status} onValueChange={v => onChange('status', v as 'draft' | 'published')}>
              <SelectTrigger className="w-40"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
              </SelectContent>
            </Select>
            <Button disabled={loading} onClick={() => save(false)}>Save Draft</Button>
            <Button disabled={loading} onClick={() => save(true)} variant="secondary">Publish</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
