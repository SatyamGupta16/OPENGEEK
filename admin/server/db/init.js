const db = require('../config/database');

const initDatabase = async () => {
  try {
    // Create admin_users table for admin panel (separate from main users table)
    await db.query(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        role VARCHAR(20) NOT NULL DEFAULT 'user',
        password_hash VARCHAR(255),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);
    
    // Create content table
    await db.query(`
      CREATE TABLE IF NOT EXISTS content (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);
    
    // Insert default admin user if it doesn't exist
    await db.query(`
      INSERT INTO admin_users (username, email, role)
      VALUES ('admin', 'admin@example.com', 'admin')
      ON CONFLICT (username) DO NOTHING
    `);
    
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('❌ Database connection error:', error);
  }
};

module.exports = initDatabase;
