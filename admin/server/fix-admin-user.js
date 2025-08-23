const db = require('./config/database');
const { hashPassword } = require('./middleware/enhancedAuth');

const fixAdminUser = async () => {
  try {
    console.log('🔧 Fixing admin user...');
    
    // Hash the password
    const hashedPassword = await hashPassword('5454');
    console.log('✅ Password hashed successfully');
    
    // Update the admin user with proper password hash and role
    const result = await db.query(`
      UPDATE admin_users 
      SET password_hash = $1, role = $2, updated_at = CURRENT_TIMESTAMP 
      WHERE username = $3
      RETURNING id, username, email, role, is_active
    `, [hashedPassword, 'super_admin', 'admin']);
    
    if (result.rows.length === 0) {
      console.log('❌ Admin user not found');
      return;
    }
    
    console.log('✅ Admin user updated successfully:');
    console.log('  ID:', result.rows[0].id);
    console.log('  Username:', result.rows[0].username);
    console.log('  Email:', result.rows[0].email);
    console.log('  Role:', result.rows[0].role);
    console.log('  Active:', result.rows[0].is_active);
    
    console.log('\n🎉 Admin user is now ready for enhanced authentication!');
    
  } catch (error) {
    console.error('❌ Failed to fix admin user:', error.message);
  } finally {
    process.exit(0);
  }
};

fixAdminUser();