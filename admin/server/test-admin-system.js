const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

async function testAdminSystem() {
  console.log('🧪 Testing Admin System...\n');

  try {
    // Test 1: Health Check
    console.log('1️⃣ Testing health check...');
    const healthResponse = await axios.get(`${BASE_URL}/health`);
    console.log('✅ Health check:', healthResponse.data);
    console.log('');

    // Test 2: Login with environment variables (legacy)
    console.log('2️⃣ Testing legacy login...');
    const loginResponse = await axios.post(`${BASE_URL}/admin/login`, {
      username: process.env.ADMIN_USERNAME || 'admin',
      password: process.env.ADMIN_PASSWORD || 'admin123'
    });
    
    if (loginResponse.data.success) {
      console.log('✅ Legacy login successful');
      console.log('   Token received:', loginResponse.data.token ? 'Yes' : 'No');
      console.log('   User info:', loginResponse.data.user);
      
      const token = loginResponse.data.token;
      
      // Test 3: Access protected route
      console.log('\n3️⃣ Testing protected route access...');
      try {
        const dashboardResponse = await axios.get(`${BASE_URL}/dashboard/stats`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('✅ Dashboard access successful');
        console.log('   Total users:', dashboardResponse.data.data.total_users);
        console.log('   Total posts:', dashboardResponse.data.data.total_posts);
      } catch (error) {
        console.log('❌ Dashboard access failed:', error.response?.data?.message || error.message);
      }

      // Test 4: Test enhanced routes (if available)
      console.log('\n4️⃣ Testing enhanced admin routes...');
      try {
        const communityResponse = await axios.get(`${BASE_URL}/api/community/analytics`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('✅ Community analytics access successful');
        console.log('   New users (30d):', communityResponse.data.data.summary.new_users);
      } catch (error) {
        console.log('⚠️ Enhanced routes not available yet:', error.response?.data?.message || error.message);
        console.log('   This is expected if admin_users table is not created yet');
      }

    } else {
      console.log('❌ Legacy login failed:', loginResponse.data.message);
    }

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }

  console.log('\n🏁 Admin system test completed!');
}

// Run the test
testAdminSystem();