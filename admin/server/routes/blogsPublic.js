const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Public: list published blogs
router.get('/list', async (_req, res) => {
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

// Public: get by slug
router.get('/by-slug/:slug', async (req, res) => {
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
