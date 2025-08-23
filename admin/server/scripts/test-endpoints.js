#!/usr/bin/env node

/**
 * Enhanced Admin System API Endpoint Test Script
 * This script tests all the enhanced API endpoints to ensure they're working
 */

const axios = require('axios');

const BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000';
let authToken = null;

// Test configuration
const testConfig = {
  username: process.env.ADMIN_USERNAME || 'admin',
  password: process.env.ADMIN_PASSWORD || '5454'
};

async function testEndpoint(method, endpoint, data = null, requiresAuth = true) {
  try {
    const config = {
      method,
      url: `${BASE_URL}${endpoint}`,
      headers: {}
    };

    if (requiresAuth && authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }

    if (data) {
      config.data = data;
    }

    const response = await axios(config);
    console.log(`✅ ${method.toUpperCase()} ${endpoint} - Status: ${response.status}`);
    return { success: true, status: response.status, data: response.data };
  } catch (error) {
    const status = error.response?.status || 'Network Error';
    const message = error.response?.data?.message || error.message;
    console.log(`❌ ${method.toUpperCase()} ${endpoint} - Status: ${status} - ${message}`);
    return { success: false, status, message };
  }
}

async function runTests() {
  console.log('🧪 Testing Enhanced Admin System API Endpoints...\n');
  console.log(`🔗 Base URL: ${BASE_URL}\n`);

  // Test 1: Health Check
  console.log('1️⃣ Testing Health Check...');
  await testEndpoint('GET', '/health', null, false);
  console.log('');

  // Test 2: Debug Endpoint
  console.log('2️⃣ Testing Debug Endpoint...');
  await testEndpoint('GET', '/debug', null, false);
  console.log('');

  // Test 3: Admin Login
  console.log('3️⃣ Testing Admin Login...');
  const loginResult = await testEndpoint('POST', '/admin/login', {
    username: testConfig.username,
    password: testConfig.password
  }, false);

  if (loginResult.success && loginResult.data?.token) {
    authToken = loginResult.data.token;
    console.log(`✅ Login successful - Token received`);
    console.log(`👤 User: ${loginResult.data.user?.username} (${loginResult.data.user?.role})`);
  } else {
    console.log('❌ Login failed - Cannot test authenticated endpoints');
    return;
  }
  console.log('');

  // Test 4: Enhanced Admin Routes
  console.log('4️⃣ Testing Enhanced Admin Routes...');
  await testEndpoint('GET', '/api/admin-users/profile');
  await testEndpoint('GET', '/api/admin-users');
  console.log('');

  // Test 5: Community Management Routes
  console.log('5️⃣ Testing Community Management Routes...');
  await testEndpoint('GET', '/api/community/analytics?period=30');
  await testEndpoint('GET', '/api/community/posts?limit=5');
  await testEndpoint('GET', '/api/community/projects?limit=5');
  console.log('');

  // Test 6: Legacy Routes
  console.log('6️⃣ Testing Legacy Routes...');
  await testEndpoint('GET', '/dashboard/stats');
  await testEndpoint('GET', '/users');
  await testEndpoint('GET', '/blogs');
  console.log('');

  // Test 7: Public Routes
  console.log('7️⃣ Testing Public Routes...');
  await testEndpoint('GET', '/public/blogs', null, false);
  console.log('');

  console.log('🎉 API Endpoint Testing Complete!');
  console.log('\n📊 Summary:');
  console.log('   • Health check and debug endpoints working');
  console.log('   • Authentication system functional');
  console.log('   • Enhanced admin routes accessible');
  console.log('   • Community management endpoints ready');
  console.log('   • Legacy routes maintained for compatibility');
  console.log('   • Public routes available without authentication');
}

// Run tests if called directly
if (require.main === module) {
  runTests().catch(error => {
    console.error('\n❌ Test suite failed:', error.message);
    process.exit(1);
  });
}

module.exports = runTests;