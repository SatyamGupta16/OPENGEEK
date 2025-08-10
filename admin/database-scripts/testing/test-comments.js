// Simple test script to verify comment functionality
require('dotenv').config();
const { pool } = require('../../config/database');

async function testCommentFunctionality() {
  console.log('🧪 Testing comment functionality...');
  
  try {
    // Test 1: Check if post_comments table exists
    const tableCheck = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'post_comments'
      );
    `);
    
    console.log('✅ post_comments table exists:', tableCheck.rows[0].exists);
    
    // Test 2: Check table structure
    const structureCheck = await pool.query(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'post_comments'
      ORDER BY ordinal_position;
    `);
    
    console.log('📋 post_comments table structure:');
    structureCheck.rows.forEach(row => {
      console.log(`  - ${row.column_name}: ${row.data_type} (nullable: ${row.is_nullable})`);
    });
    
    // Test 3: Check if there are any existing comments
    const commentCount = await pool.query('SELECT COUNT(*) as count FROM post_comments');
    console.log('💬 Existing comments count:', commentCount.rows[0].count);
    
    // Test 4: Check if there are any posts to comment on
    const postCount = await pool.query('SELECT COUNT(*) as count FROM posts WHERE is_archived = FALSE');
    console.log('📝 Available posts count:', postCount.rows[0].count);
    
    console.log('✅ Comment functionality test completed!');
    
  } catch (error) {
    console.error('❌ Error testing comment functionality:', error);
  } finally {
    await pool.end();
  }
}

// Run test if this file is executed directly
if (require.main === module) {
  testCommentFunctionality();
}