const { pool } = require('./config/database');

async function checkPosts() {
    try {
        console.log('Checking posts table...');

        // Check total posts
        const totalResult = await pool.query('SELECT COUNT(*) as total FROM posts WHERE is_archived = FALSE');
        console.log(`Total posts: ${totalResult.rows[0].total}`);

        // Check for null/undefined data
        const nullCheck = await pool.query(`
      SELECT 
        COUNT(*) as total,
        COUNT(id) as with_id,
        COUNT(content) as with_content,
        COUNT(user_id) as with_user_id
      FROM posts 
      WHERE is_archived = FALSE
    `);
        console.log('Data integrity check:', nullCheck.rows[0]);

        // Get sample posts
        const sampleResult = await pool.query(`
      SELECT p.id, p.content, p.user_id, u.username, u.full_name 
      FROM posts p
      LEFT JOIN users u ON p.user_id = u.id
      WHERE p.is_archived = FALSE 
      LIMIT 3
    `);
        console.log('Sample posts:');
        sampleResult.rows.forEach((post, index) => {
            console.log(`Post ${index + 1}:`, {
                id: post.id,
                content: post.content ? post.content.substring(0, 50) + '...' : 'NULL',
                user_id: post.user_id,
                username: post.username
            });
        });

        process.exit(0);
    } catch (error) {
        console.error('Database check failed:', error);
        process.exit(1);
    }
}

checkPosts();