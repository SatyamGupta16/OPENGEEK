const db = require('../config/database');

const initDatabase = async () => {
  try {
    console.log('🔧 Initializing database...');

    // Test database connection
    await db.query('SELECT NOW()');
    console.log('✅ Database connection successful');

    // Check if admin_users table exists, if not create it
    const tableExists = await db.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'admin_users'
      );
    `);

    if (!tableExists.rows[0].exists) {
      console.log('🔧 Creating admin_users table...');
      await db.query(`
        CREATE TABLE admin_users (
          id SERIAL PRIMARY KEY,
          username VARCHAR(50) UNIQUE NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          password_hash VARCHAR(255) NOT NULL,
          role VARCHAR(20) DEFAULT 'admin',
          is_active BOOLEAN DEFAULT true,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          last_login TIMESTAMP,
          last_activity TIMESTAMP,
          login_attempts INTEGER DEFAULT 0,
          locked_until TIMESTAMP
        );
      `);
      console.log('✅ Admin users table created successfully');
    } else {
      console.log('✅ Admin users table already exists');

      // Check and add missing columns if they don't exist
      try {
        // Check for is_active column
        const isActiveExists = await db.query(`
          SELECT column_name FROM information_schema.columns 
          WHERE table_name = 'admin_users' AND column_name = 'is_active'
        `);

        if (isActiveExists.rows.length === 0) {
          console.log('🔧 Adding is_active column to admin_users table...');
          await db.query('ALTER TABLE admin_users ADD COLUMN is_active BOOLEAN DEFAULT true');
          console.log('✅ is_active column added successfully');
        }

        // Check for locked_until column
        const lockedUntilExists = await db.query(`
          SELECT column_name FROM information_schema.columns 
          WHERE table_name = 'admin_users' AND column_name = 'locked_until'
        `);

        if (lockedUntilExists.rows.length === 0) {
          console.log('🔧 Adding locked_until column to admin_users table...');
          await db.query('ALTER TABLE admin_users ADD COLUMN locked_until TIMESTAMP');
          console.log('✅ locked_until column added successfully');
        }

        // Check for login_attempts column
        const loginAttemptsExists = await db.query(`
          SELECT column_name FROM information_schema.columns 
          WHERE table_name = 'admin_users' AND column_name = 'login_attempts'
        `);

        if (loginAttemptsExists.rows.length === 0) {
          console.log('🔧 Adding login_attempts column to admin_users table...');
          await db.query('ALTER TABLE admin_users ADD COLUMN login_attempts INTEGER DEFAULT 0');
          console.log('✅ login_attempts column added successfully');
        }

        // Check for last_login column
        const lastLoginExists = await db.query(`
          SELECT column_name FROM information_schema.columns 
          WHERE table_name = 'admin_users' AND column_name = 'last_login'
        `);

        if (lastLoginExists.rows.length === 0) {
          console.log('🔧 Adding last_login column to admin_users table...');
          await db.query('ALTER TABLE admin_users ADD COLUMN last_login TIMESTAMP');
          console.log('✅ last_login column added successfully');
        }

        // Check for last_activity column
        const lastActivityExists = await db.query(`
          SELECT column_name FROM information_schema.columns 
          WHERE table_name = 'admin_users' AND column_name = 'last_activity'
        `);

        if (lastActivityExists.rows.length === 0) {
          console.log('🔧 Adding last_activity column to admin_users table...');
          await db.query('ALTER TABLE admin_users ADD COLUMN last_activity TIMESTAMP');
          console.log('✅ last_activity column added successfully');
        }

      } catch (error) {
        console.log('⚠️ Error checking/adding columns:', error.message);
      }
    }

    // Check if blogs table exists, if not create it
    const blogsTableExists = await db.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'blogs'
      );
    `);

    if (!blogsTableExists.rows[0].exists) {
      console.log('🔧 Creating blogs table...');
      await db.query(`
        CREATE TABLE blogs (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          slug VARCHAR(255) UNIQUE NOT NULL,
          excerpt TEXT,
          content TEXT NOT NULL,
          cover_image_url VARCHAR(500),
          tags TEXT[] DEFAULT '{}',
          status VARCHAR(20) DEFAULT 'draft',
          published_at TIMESTAMP,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);
      console.log('✅ Blogs table created successfully');
    } else {
      console.log('✅ Blogs table already exists');
    }

    console.log('✅ Database initialization completed successfully');
  } catch (error) {
    console.error('❌ Database initialization error:', error);
    console.log('📝 Note: Some features may not work without proper database setup');
  }
};

module.exports = initDatabase;
