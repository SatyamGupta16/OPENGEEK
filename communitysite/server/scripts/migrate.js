const { query } = require('../config/database');

const createTables = async () => {
  try {
    console.log('🚀 Starting database migration...');

    // Users table
    await query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        bio TEXT,
        avatar_url VARCHAR(500),
        github_username VARCHAR(100),
        linkedin_url VARCHAR(500),
        twitter_username VARCHAR(100),
        website_url VARCHAR(500),
        location VARCHAR(100),
        skills TEXT[], -- Array of skills
        role VARCHAR(20) DEFAULT 'member' CHECK (role IN ('admin', 'moderator', 'member')),
        is_verified BOOLEAN DEFAULT false,
        is_active BOOLEAN DEFAULT true,
        reputation_score INTEGER DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Projects table
    await query(`
      CREATE TABLE IF NOT EXISTS projects (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(200) NOT NULL,
        description TEXT NOT NULL,
        content TEXT,
        image_url VARCHAR(500),
        github_url VARCHAR(500) NOT NULL,
        live_url VARCHAR(500),
        tags TEXT[] NOT NULL,
        language VARCHAR(50) NOT NULL,
        difficulty_level VARCHAR(20) DEFAULT 'beginner' CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
        status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'completed', 'archived')),
        is_featured BOOLEAN DEFAULT false,
        stars_count INTEGER DEFAULT 0,
        forks_count INTEGER DEFAULT 0,
        views_count INTEGER DEFAULT 0,
        author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Posts table (for community feed)
    await query(`
      CREATE TABLE IF NOT EXISTS posts (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        content TEXT NOT NULL,
        image_url VARCHAR(500),
        post_type VARCHAR(20) DEFAULT 'text' CHECK (post_type IN ('text', 'image', 'link', 'project')),
        author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        likes_count INTEGER DEFAULT 0,
        comments_count INTEGER DEFAULT 0,
        shares_count INTEGER DEFAULT 0,
        is_pinned BOOLEAN DEFAULT false,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Comments table
    await query(`
      CREATE TABLE IF NOT EXISTS comments (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        content TEXT NOT NULL,
        author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
        project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
        parent_id UUID REFERENCES comments(id) ON DELETE CASCADE,
        likes_count INTEGER DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT comment_target_check CHECK (
          (post_id IS NOT NULL AND project_id IS NULL) OR
          (post_id IS NULL AND project_id IS NOT NULL)
        )
      );
    `);

    // Likes table (for posts, comments, projects)
    await query(`
      CREATE TABLE IF NOT EXISTS likes (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
        comment_id UUID REFERENCES comments(id) ON DELETE CASCADE,
        project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT like_target_check CHECK (
          (post_id IS NOT NULL AND comment_id IS NULL AND project_id IS NULL) OR
          (post_id IS NULL AND comment_id IS NOT NULL AND project_id IS NULL) OR
          (post_id IS NULL AND comment_id IS NULL AND project_id IS NOT NULL)
        ),
        UNIQUE(user_id, post_id),
        UNIQUE(user_id, comment_id),
        UNIQUE(user_id, project_id)
      );
    `);

    // Follows table (user following system)
    await query(`
      CREATE TABLE IF NOT EXISTS follows (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        follower_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        following_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(follower_id, following_id),
        CONSTRAINT no_self_follow CHECK (follower_id != following_id)
      );
    `);

    // Project collaborators table
    await query(`
      CREATE TABLE IF NOT EXISTS project_collaborators (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        role VARCHAR(20) DEFAULT 'contributor' CHECK (role IN ('owner', 'maintainer', 'contributor')),
        joined_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(project_id, user_id)
      );
    `);

    // Bookmarks table
    await query(`
      CREATE TABLE IF NOT EXISTS bookmarks (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
        project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT bookmark_target_check CHECK (
          (post_id IS NOT NULL AND project_id IS NULL) OR
          (post_id IS NULL AND project_id IS NOT NULL)
        ),
        UNIQUE(user_id, post_id),
        UNIQUE(user_id, project_id)
      );
    `);

    // Notifications table
    await query(`
      CREATE TABLE IF NOT EXISTS notifications (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        recipient_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        sender_id UUID REFERENCES users(id) ON DELETE CASCADE,
        type VARCHAR(50) NOT NULL,
        title VARCHAR(200) NOT NULL,
        message TEXT NOT NULL,
        data JSONB,
        is_read BOOLEAN DEFAULT false,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create indexes for better performance
    await query('CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);');
    await query('CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);');
    await query('CREATE INDEX IF NOT EXISTS idx_projects_author ON projects(author_id);');
    await query('CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(is_featured);');
    await query('CREATE INDEX IF NOT EXISTS idx_posts_author ON posts(author_id);');
    await query('CREATE INDEX IF NOT EXISTS idx_comments_post ON comments(post_id);');
    await query('CREATE INDEX IF NOT EXISTS idx_comments_project ON comments(project_id);');
    await query('CREATE INDEX IF NOT EXISTS idx_likes_user ON likes(user_id);');
    await query('CREATE INDEX IF NOT EXISTS idx_follows_follower ON follows(follower_id);');
    await query('CREATE INDEX IF NOT EXISTS idx_follows_following ON follows(following_id);');
    await query('CREATE INDEX IF NOT EXISTS idx_notifications_recipient ON notifications(recipient_id);');

    console.log('✅ Database migration completed successfully!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
};

// Run migration if this file is executed directly
if (require.main === module) {
  createTables().then(() => {
    process.exit(0);
  });
}

module.exports = { createTables };