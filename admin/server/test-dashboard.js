const axios = require('axios');

const API_BASE = 'http://localhost:3000';
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'password123';

async function testDashboardAPI() {
  try {
    console.log('🔍 Testing Dashboard API endpoints...\n');

    // Step 1: Login to get JWT token
    console.log('1️⃣ Testing admin login...');
    const loginResponse = await axios.post(`${API_BASE}/admin/login`, {
      username: ADMIN_USERNAME,
      password: ADMIN_PASSWORD
    });

    if (!loginResponse.data.success) {
      throw new Error('Login failed');
    }

    const token = loginResponse.data.token;
    console.log('✅ Login successful');
    console.log(`🔑 JWT Token received: ${token.substring(0, 50)}...\n`);

    // Step 2: Test dashboard stats endpoint
    console.log('2️⃣ Testing dashboard stats endpoint...');
    const dashboardResponse = await axios.get(`${API_BASE}/dashboard/stats`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!dashboardResponse.data.success) {
      throw new Error('Dashboard stats failed');
    }

    const stats = dashboardResponse.data.data;
    console.log('✅ Dashboard stats retrieved successfully');
    console.log('\n📊 Dashboard Statistics:');
    console.log(`   👥 Total Users: ${stats.total_users}`);
    console.log(`   ✅ Active Users: ${stats.active_users}`);
    console.log(`   ✔️ Verified Users: ${stats.verified_users}`);
    console.log(`   📝 Total Posts: ${stats.total_posts}`);
    console.log(`   🚀 Total Projects: ${stats.total_projects}`);
    console.log(`   📊 Total Content: ${stats.total_content}`);
    console.log(`   🆕 New Signups This Month: ${stats.new_signups_this_month}`);
    console.log(`   📈 Recent Posts (30 days): ${stats.recent_posts}`);
    console.log(`   🔥 Recent Projects (30 days): ${stats.recent_projects}`);
    
    if (stats.monthly_signups && stats.monthly_signups.length > 0) {
      console.log('\n📅 Monthly Signup Data:');
      stats.monthly_signups.forEach(item => {
        const date = new Date(item.month);
        const monthName = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        console.log(`   ${monthName}: ${item.count} users`);
      });
    }

    if (stats.monthly_posts && stats.monthly_posts.length > 0) {
      console.log('\n📝 Monthly Posts Data:');
      stats.monthly_posts.forEach(item => {
        const date = new Date(item.month);
        const monthName = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        console.log(`   ${monthName}: ${item.count} posts`);
      });
    }

    console.log('\n🎉 Dashboard API test completed successfully!');
    console.log('✅ Your admin panel dashboard is now fully functional with real database statistics.');

  } catch (error) {
    console.error('❌ Dashboard API test failed:', error.message);
    if (error.response) {
      console.error('   Response status:', error.response.status);
      console.error('   Response data:', error.response.data);
    }
    process.exit(1);
  }
}

// Load environment variables
require('dotenv').config();

// Run the test
testDashboardAPI();
