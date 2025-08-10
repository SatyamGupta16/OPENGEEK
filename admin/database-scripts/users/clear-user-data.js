require('dotenv').config();
const { pool } = require('../../config/database');

async function clearAllUserData() {
  const client = await pool.connect();
  
  try {
    console.log('🚨 Starting database cleanup...');
    
    // Start transaction
    await client.query('BEGIN');
    
    // Clear user-related data in the correct order (respecting foreign key constraints)
    console.log('📝 Clearing user follows...');
    const followsResult = await client.query('DELETE FROM user_follows');
    console.log(`✅ Deleted ${followsResult.rowCount} user follows`);
    
    console.log('📝 Clearing user posts...');
    const postsResult = await client.query('DELETE FROM posts');
    console.log(`✅ Deleted ${postsResult.rowCount} posts`);
    
    console.log('📝 Clearing user projects...');
    const projectsResult = await client.query('DELETE FROM projects');
    console.log(`✅ Deleted ${projectsResult.rowCount} projects`);
    
    console.log('📝 Clearing users...');
    const usersResult = await client.query('DELETE FROM users');
    console.log(`✅ Deleted ${usersResult.rowCount} users`);
    
    // Reset auto-increment sequences if they exist
    console.log('📝 Resetting sequences...');
    try {
      await client.query('ALTER SEQUENCE IF EXISTS users_id_seq RESTART WITH 1');
      await client.query('ALTER SEQUENCE IF EXISTS posts_id_seq RESTART WITH 1');
      await client.query('ALTER SEQUENCE IF EXISTS projects_id_seq RESTART WITH 1');
      await client.query('ALTER SEQUENCE IF EXISTS user_follows_id_seq RESTART WITH 1');
      console.log('✅ Sequences reset');
    } catch (seqError) {
      console.log('ℹ️  No sequences to reset (using UUIDs)');
    }
    
    // Commit transaction
    await client.query('COMMIT');
    
    console.log('🎉 Database cleanup completed successfully!');
    console.log('📊 Summary:');
    console.log(`   - Users deleted: ${usersResult.rowCount}`);
    console.log(`   - Posts deleted: ${postsResult.rowCount}`);
    console.log(`   - Projects deleted: ${projectsResult.rowCount}`);
    console.log(`   - Follows deleted: ${followsResult.rowCount}`);
    
  } catch (error) {
    // Rollback on error
    await client.query('ROLLBACK');
    console.error('❌ Error clearing database:', error);
    throw error;
  } finally {
    client.release();
  }
}

// Confirmation prompt
async function confirmAndClear() {
  console.log('⚠️  WARNING: This will permanently delete ALL user data from the database!');
  console.log('📋 This includes:');
  console.log('   - All user accounts');
  console.log('   - All posts');
  console.log('   - All projects');
  console.log('   - All follow relationships');
  console.log('');
  console.log('🔗 Database:', process.env.DB_NAME || 'opengeek_community');
  console.log('🌐 Host:', process.env.DB_HOST || 'localhost');
  console.log('');
  
  // In a real scenario, you'd want to add a confirmation prompt
  // For now, we'll proceed directly
  
  try {
    await clearAllUserData();
    process.exit(0);
  } catch (error) {
    console.error('💥 Failed to clear database:', error.message);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  confirmAndClear();
}

module.exports = { clearAllUserData };