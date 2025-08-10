const jwt = require('jsonwebtoken');
require('dotenv').config();

// Test JWT token decoding
const testToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwid...'; // Replace with actual token from API test

async function debugMiddleware() {
  try {
    console.log('🔍 Debugging middleware chain...');
    
    // Test JWT secret
    console.log('JWT_SECRET exists:', !!process.env.JWT_SECRET);
    
    // Create a test token
    const testPayload = { id: 1, username: 'admin', role: 'admin' };
    const token = jwt.sign(testPayload, process.env.JWT_SECRET, { expiresIn: '24h' });
    console.log('✅ Test token created:', token.substring(0, 50) + '...');
    
    // Decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('✅ Token decoded successfully:', decoded);
    
    // Test middleware logic
    console.log('🔍 Testing middleware logic:');
    console.log('   - User exists:', !!decoded);
    console.log('   - User role:', decoded.role);
    console.log('   - Is admin?', decoded.role === 'admin');
    
    console.log('\n🎯 Middleware should pass for this token.');
    
  } catch (error) {
    console.error('❌ Middleware debug failed:', error.message);
  }
}

debugMiddleware();
