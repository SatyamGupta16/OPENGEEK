require('dotenv').config();
const db = require('../../server/config/database');

async function createBlogsTable() {
  const createExtension = `CREATE EXTENSION IF NOT EXISTS pgcrypto;`;
  const createSchema = `
  BEGIN;
  CREATE TABLE IF NOT EXISTS blogs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    cover_image_url TEXT,
    tags TEXT[] DEFAULT '{}',
    author_id VARCHAR(255),
    status TEXT NOT NULL DEFAULT 'draft',
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );

  CREATE INDEX IF NOT EXISTS idx_blogs_status_published_at ON blogs(status, published_at DESC);
  CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs(slug);
  COMMIT;`;

  try {
    console.log('🛠️ Ensuring pgcrypto extension...');
    await db.query(createExtension);
  } catch (err) {
    console.warn('⚠️ Could not create/ensure pgcrypto extension:', err?.message || err);
    console.warn('   If gen_random_uuid() is unavailable, ensure pgcrypto is installed by your DB admin.');
  }

  try {
    console.log('🛠️ Creating blogs table and indexes if not exist...');
    await db.query(createSchema);
    console.log('✅ Blogs table ready.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error creating blogs table:', err?.message || err);
    try { await db.query('ROLLBACK;'); } catch {}
    process.exit(1);
  }
}

createBlogsTable();
