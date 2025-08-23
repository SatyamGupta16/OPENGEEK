const jwt = require('jsonwebtoken');
require('dotenv').config();

// Debug function to decode and check JWT token
const debugToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('🔍 Token decoded successfully:', decoded);
    return decoded;
  } catch (error) {
    console.error('❌ Token verification failed:', error.message);
    return null;
  }
};

// Debug function to check user in database
const debugUser = async (userId) => {
  const db = require('./config/database');
  try {
    const result = await db.query(
      'SELECT id, username, email, role, is_active FROM admin_users WHERE id = $1',
      [userId]
    );
    console.log('🔍 User from database:', result.rows[0]);
    return result.rows[0];
  } catch (error) {
    console.error('❌ Database query failed:', error.message);
    return null;
  }
};

module.exports = { debugToken, debugUser };