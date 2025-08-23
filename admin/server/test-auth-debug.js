const axios = require('axios');

const testAuth = async () => {
  try {
    console.log('🔍 Testing authentication debug...');
    
    // First, login to get a token
    console.log('1️⃣ Logging in...');
    const loginResponse = await axios.post('http://localhost:3000/admin/login', {
      username: 'admin',
      password: '5454'
    });
    
    if (!loginResponse.data.success) {
      console.error('❌ Login failed:', loginResponse.data.message);
      return;
    }
    
    const token = loginResponse.data.token;
    console.log('✅ Login successful, token received');
    console.log('Token preview:', token.substring(0, 50) + '...');
    
    // Test the debug endpoint
    console.log('\n2️⃣ Testing debug endpoint...');
    const debugResponse = await axios.get('http://localhost:3000/debug/auth', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    console.log('✅ Debug response:', JSON.stringify(debugResponse.data, null, 2));
    
    // Test admin users endpoint
    console.log('\n3️⃣ Testing admin users endpoint...');
    try {
      const adminUsersResponse = await axios.get('http://localhost:3000/api/admin-users', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('✅ Admin users response:', adminUsersResponse.data);
    } catch (error) {
      console.error('❌ Admin users failed:', error.response?.data || error.message);
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
};

testAuth();