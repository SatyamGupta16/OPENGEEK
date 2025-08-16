const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Admin: list all blogs (any status)
router.get('/', async (req, res) => {
  try {
    const result = await db.query(
      `SELECT id, title, slug, excerpt, cover_image_url, tags, status, published_at, created_at, updated_at
       FROM blogs
       ORDER BY created_at DESC`
    );
    res.json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching blogs', error: error.message });
  }
});

// Admin: get one
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query(
      `SELECT id, title, slug, excerpt, content, cover_image_url, tags, status, published_at, created_at, updated_at
       FROM blogs WHERE id = $1`,
      [id]
    );
    if (result.rows.length === 0) return res.status(404).json({ success: false, message: 'Blog not found' });
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching blog', error: error.message });
  }
});

// Admin: create (draft or published)
router.post('/', async (req, res) => {
  try {
    const { title, slug, excerpt, content, cover_image_url, tags = [], status = 'draft' } = req.body;
    if (!title || !slug || !content) {
      return res.status(400).json({ success: false, message: 'title, slug, and content are required' });
    }
    const pubAt = status === 'published' ? 'NOW()' : 'NULL';
    const result = await db.query(
      'INSERT INTO blogs (title, slug, excerpt, content, cover_image_url, tags, status, published_at) VALUES ($1, $2, $3, $4, $5, $6, $7, ' + pubAt + ') RETURNING id, title, slug, excerpt, cover_image_url, tags, status, published_at, created_at, updated_at',
      [title, slug, excerpt || null, content, cover_image_url || null, tags, status]
    );
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating blog', error: error.message });
  }
});

// Admin: update
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, slug, excerpt, content, cover_image_url, tags = [], status } = req.body;

    const result = await db.query(
      `UPDATE blogs SET 
         title = COALESCE($1, title),
         slug = COALESCE($2, slug),
         excerpt = COALESCE($3, excerpt),
         content = COALESCE($4, content),
         cover_image_url = COALESCE($5, cover_image_url),
         tags = COALESCE($6, tags),
         status = COALESCE($7, status),
         published_at = CASE WHEN $7 = 'published' AND published_at IS NULL THEN NOW() WHEN $7 = 'draft' THEN NULL ELSE published_at END,
         updated_at = NOW()
       WHERE id = $8
       RETURNING id, title, slug, excerpt, cover_image_url, tags, status, published_at, created_at, updated_at`,
      [title ?? null, slug ?? null, excerpt ?? null, content ?? null, cover_image_url ?? null, tags, status ?? null, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ success: false, message: 'Blog not found' });
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating blog', error: error.message });
  }
});

// Admin: delete
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM blogs WHERE id = $1', [id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting blog', error: error.message });
  }
});

// Public: list published (no auth)
router.get('/public/list', async (req, res) => {
  try {
    const result = await db.query(
      `SELECT title, slug, excerpt, cover_image_url, tags, published_at
       FROM blogs WHERE status = 'published'
       ORDER BY published_at DESC`
    );
    res.json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching published blogs', error: error.message });
  }
});

// Public: get by slug (no auth)
router.get('/public/by-slug/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const result = await db.query(
      `SELECT title, slug, excerpt, content, cover_image_url, tags, published_at
       FROM blogs WHERE slug = $1 AND status = 'published'`,
      [slug]
    );
    if (result.rows.length === 0) return res.status(404).json({ success: false, message: 'Blog not found' });
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching blog', error: error.message });
  }
});

module.exports = router;
