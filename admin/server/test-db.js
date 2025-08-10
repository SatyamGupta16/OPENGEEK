const db = require('./config/database');

async function testDatabase() {
  try {
    console.log('🔍 Testing database connection and user data...');
    
    // Test basic connection
    const healthCheck = await db.query('SELECT NOW() as current_time');
    console.log('✅ Database connected:', healthCheck.rows[0].current_time);
    
    // Test users table query (same as admin panel uses)
    const usersQuery = `
      SELECT 
        id, 
        email, 
        username, 
        full_name,
        first_name,
        last_name,
        bio,
        location,
        github_username,
        is_verified,
        is_active,
        created_at,
        updated_at
      FROM users 
      ORDER BY created_at DESC
    `;
    
    const result = await db.query(usersQuery);
    console.log(`\n📊 Found ${result.rows.length} users in database:`);
    
    result.rows.forEach((user, index) => {
      console.log(`\n${index + 1}. User ID: ${user.id}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Username: ${user.username || 'N/A'}`);
      console.log(`   Full Name: ${user.full_name || 'N/A'}`);
      console.log(`   Location: ${user.location || 'N/A'}`);
      console.log(`   GitHub: ${user.github_username || 'N/A'}`);
      console.log(`   Verified: ${user.is_verified}`);
      console.log(`   Active: ${user.is_active}`);
      console.log(`   Created: ${user.created_at}`);
    });
    
    console.log('\n✅ Database test completed successfully!');
    console.log('🎯 Admin panel should be able to fetch this data.');
    
  } catch (error) {
    console.error('❌ Database test failed:', error);
    console.error('Error details:', error.message);
  }
  
  process.exit(0);
}

testDatabase();
