const db = require('./config/database');
const { comparePassword } = require('./middleware/enhancedAuth');

const checkAdminUser = async () => {
  try {
    console.log('🔍 Checking admin user in database...');
    
    const result = await db.query(
      'SELECT id, username, email, password_hash, role, is_active FROM admin_users WHERE username = $1',
      ['admin']
    );
    
    if (result.rows.length === 0) {
      console.log('❌ No admin user found in database');
      return;
    }
    
    const user = result.rows[0];
    console.log('✅ Admin user found:');
    console.log('  ID:', user.id);
    console.log('  Username:', user.username);
    console.log('  Email:', user.email);
    console.log('  Role:', user.role);
    console.log('  Active:', user.is_active);
    console.log('  Password hash exists:', !!user.password_hash);
    console.log('  Password hash length:', user.password_hash ? user.password_hash.length : 0);
    
    // Test password comparison
    console.log('\n🔍 Testing password comparison...');
    try {
      const isValid = await comparePassword('5454', user.password_hash);
      console.log('✅ Password comparison result:', isValid);
    } catch (error) {
      console.error('❌ Password comparison failed:', error.message);
    }
    
  } catch (error) {
    console.error('❌ Database query failed:', error.message);
  } finally {
    process.exit(0);
  }
};

checkAdminUser();