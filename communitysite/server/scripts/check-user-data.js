require('dotenv').config();
const { pool } = require('../config/database');

async function checkUserData() {
  try {
    console.log('📊 Checking current database state...');
    console.log('🔗 Database:', process.env.DB_NAME || 'opengeek_community');
    console.log('🌐 Host:', process.env.DB_HOST || 'localhost');
    console.log('');
    
    // Check users count
    const usersResult = await pool.query('SELECT COUNT(*) as count FROM users');
    const usersCount = parseInt(usersResult.rows[0].count);
    
    // Check posts count
    const postsResult = await pool.query('SELECT COUNT(*) as count FROM posts');
    const postsCount = parseInt(postsResult.rows[0].count);
    
    // Check projects count
    const projectsResult = await pool.query('SELECT COUNT(*) as count FROM projects');
    const projectsCount = parseInt(projectsResult.rows[0].count);
    
    // Check follows count
    const followsResult = await pool.query('SELECT COUNT(*) as count FROM user_follows');
    const followsCount = parseInt(followsResult.rows[0].count);
    
    console.log('📈 Current Data Count:');
    console.log(`   👥 Users: ${usersCount}`);
    console.log(`   📝 Posts: ${postsCount}`);
    console.log(`   🚀 Projects: ${projectsCount}`);
    console.log(`   🤝 Follows: ${followsCount}`);
    console.log('');
    
    if (usersCount > 0) {
      console.log('👤 Sample Users:');
      const sampleUsers = await pool.query(
        'SELECT username, email, full_name, created_at FROM users ORDER BY created_at DESC LIMIT 5'
      );
      
      sampleUsers.rows.forEach((user, index) => {
        console.log(`   ${index + 1}. ${user.username} (${user.full_name || 'No name'}) - ${user.email}`);
      });
    }
    
    const totalRecords = usersCount + postsCount + projectsCount + followsCount;
    
    if (totalRecords === 0) {
      console.log('✅ Database is already clean - no user data found');
    } else {
      console.log('');
      console.log(`⚠️  Total records that would be deleted: ${totalRecords}`);
    }
    
  } catch (error) {
    console.error('❌ Error checking database:', error.message);
    
    // Check if tables exist
    try {
      const tablesResult = await pool.query(`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name IN ('users', 'posts', 'projects', 'user_follows')
        ORDER BY table_name
      `);
      
      console.log('📋 Available tables:');
      if (tablesResult.rows.length === 0) {
        console.log('   No relevant tables found. Database might not be initialized.');
      } else {
        tablesResult.rows.forEach(row => {
          console.log(`   - ${row.table_name}`);
        });
      }
    } catch (tableError) {
      console.error('❌ Could not check tables:', tableError.message);
    }
  }
}

// Run the script
if (require.main === module) {
  checkUserData()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('💥 Script failed:', error.message);
      process.exit(1);
    });
}

module.exports = { checkUserData };