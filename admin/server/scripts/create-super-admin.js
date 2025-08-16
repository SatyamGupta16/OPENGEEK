const db = require('../config/database');
const { hashPassword } = require('../middleware/enhancedAuth');

const createSuperAdmin = async () => {
  try {
    console.log('🔧 Creating super admin user...');
    
    // Check if super admin already exists
    const existingAdmin = await db.query(
      'SELECT id FROM admin_users WHERE role = $1 OR username = $2',
      ['super_admin', 'admin']
    );
    
    if (existingAdmin.rows.length > 0) {
      console.log('✅ Super admin user already exists');
      return;
    }
    
    // Create super admin user
    const hashedPassword = await hashPassword('5454'); // Using the same password as legacy
    
    const result = await db.query(`
      INSERT INTO admin_users (username, email, password_hash, role)
      VALUES ($1, $2, $3, $4)
      RETURNING id, username, email, role
    `, ['admin', 'admin@opengeek.com', hashedPassword, 'super_admin']);
    
    console.log('✅ Super admin user created successfully:', result.rows[0]);
    
  } catch (error) {
    console.error('❌ Error creating super admin:', error);
  } finally {
    process.exit(0);
  }
};

createSuperAdmin();