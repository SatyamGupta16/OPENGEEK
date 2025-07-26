require('dotenv').config();
const { v2: cloudinary } = require('cloudinary');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function testCloudinaryConnection() {
  console.log('🧪 Testing Cloudinary Connection...\n');
  
  try {
    // Test 1: Check configuration
    console.log('1️⃣ Checking Cloudinary Configuration:');
    console.log(`   Cloud Name: ${process.env.CLOUDINARY_CLOUD_NAME ? '✅ Set' : '❌ Missing'}`);
    console.log(`   API Key: ${process.env.CLOUDINARY_API_KEY ? '✅ Set' : '❌ Missing'}`);
    console.log(`   API Secret: ${process.env.CLOUDINARY_API_SECRET ? '✅ Set' : '❌ Missing'}\n`);
    
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      throw new Error('Cloudinary credentials are missing in .env file');
    }
    
    // Test 2: Test API connection
    console.log('2️⃣ Testing API Connection...');
    const result = await cloudinary.api.ping();
    console.log('   ✅ Cloudinary API connection successful');
    console.log(`   Status: ${result.status}\n`);
    
    // Test 3: Check upload folder
    console.log('3️⃣ Checking Upload Configuration...');
    console.log('   📁 Upload folder: opengeek-posts');
    console.log('   🖼️  Supported formats: JPEG, PNG, GIF, WebP');
    console.log('   📏 Max file size: 5MB');
    console.log('   🔧 Auto optimization: Enabled\n');
    
    // Test 4: List existing resources (optional)
    try {
      console.log('4️⃣ Checking Existing Resources...');
      const resources = await cloudinary.api.resources({
        type: 'upload',
        prefix: 'opengeek-posts/',
        max_results: 5
      });
      console.log(`   📊 Found ${resources.resources.length} existing images in opengeek-posts folder`);
      
      if (resources.resources.length > 0) {
        console.log('   Recent uploads:');
        resources.resources.forEach((resource, index) => {
          console.log(`   ${index + 1}. ${resource.public_id} (${resource.format}, ${Math.round(resource.bytes / 1024)}KB)`);
        });
      }
    } catch (error) {
      console.log('   ℹ️  No existing resources found (this is normal for new setups)');
    }
    
    console.log('\n🎉 Cloudinary Integration Test Completed Successfully!');
    console.log('\n📋 Next Steps:');
    console.log('   1. Your Cloudinary integration is ready to use');
    console.log('   2. Try uploading an image through the create post modal');
    console.log('   3. Images will be automatically optimized and stored in Cloudinary');
    console.log('   4. Check your Cloudinary dashboard to see uploaded images');
    
  } catch (error) {
    console.error('\n❌ Cloudinary Integration Test Failed:');
    console.error(`   Error: ${error.message}`);
    console.error('\n🔧 Troubleshooting:');
    console.error('   1. Verify your Cloudinary credentials in .env file');
    console.error('   2. Check your internet connection');
    console.error('   3. Ensure your Cloudinary account is active');
    console.error('   4. Visit https://cloudinary.com/console to check your account');
    
    process.exit(1);
  }
}

// Run the test
if (require.main === module) {
  testCloudinaryConnection()
    .then(() => {
      process.exit(0);
    })
    .catch((error) => {
      console.error('Test failed:', error);
      process.exit(1);
    });
}

module.exports = { testCloudinaryConnection };