const axios = require('axios');

async function testAPI() {
  try {
    console.log('🔍 Testing Admin Panel API endpoints...');
    
    // Test 1: Login to get JWT token
    console.log('\n1️⃣ Testing admin login...');
    const loginResponse = await axios.post('http://localhost:3000/admin/login', {
      username: 'admin',
      password: 'password123'
    }, {
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (loginResponse.data.success) {
      console.log('✅ Login successful');
      const token = loginResponse.data.token;
      console.log('🔑 JWT Token received:', token.substring(0, 50) + '...');
      
      // Test 2: Fetch users with JWT token
      console.log('\n2️⃣ Testing users API with JWT token...');
      const usersResponse = await axios.get('http://localhost:3000/users', {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (usersResponse.data.success) {
        console.log('✅ Users API successful');
        console.log(`📊 Found ${usersResponse.data.data.length} users:`);
        
        usersResponse.data.data.forEach((user, index) => {
          console.log(`\n   ${index + 1}. ${user.full_name || user.username || user.email}`);
          console.log(`      Email: ${user.email}`);
          console.log(`      Username: ${user.username || 'N/A'}`);
          console.log(`      Location: ${user.location || 'N/A'}`);
          console.log(`      Active: ${user.is_active}`);
        });
        
        console.log('\n🎉 API test completed successfully!');
        console.log('✅ The admin panel should be able to display this data.');
        
      } else {
        console.error('❌ Users API failed:', usersResponse.data);
      }
      
    } else {
      console.error('❌ Login failed:', loginResponse.data);
    }
    
  } catch (error) {
    console.error('❌ API test failed:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

testAPI();
