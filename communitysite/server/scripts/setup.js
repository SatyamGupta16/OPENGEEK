const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const setup = async () => {
  console.log('🚀 Setting up OPENGEEK Community Server...\n');

  try {
    // Check if .env file exists
    const envPath = path.join(__dirname, '..', '.env');
    if (!fs.existsSync(envPath)) {
      console.log('📝 Creating .env file from template...');
      const envExamplePath = path.join(__dirname, '..', '.env.example');
      fs.copyFileSync(envExamplePath, envPath);
      console.log('✅ .env file created! Please update it with your configuration.\n');
    }

    // Check if node_modules exists
    const nodeModulesPath = path.join(__dirname, '..', 'node_modules');
    if (!fs.existsSync(nodeModulesPath)) {
      console.log('📦 Installing dependencies...');
      execSync('npm install', { stdio: 'inherit', cwd: path.join(__dirname, '..') });
      console.log('✅ Dependencies installed!\n');
    }

    console.log('🗄️  Database setup:');
    console.log('1. Make sure PostgreSQL is running');
    console.log('2. Create database: createdb opengeek_community');
    console.log('3. Update .env file with your database credentials');
    console.log('4. Run migrations: npm run migrate');
    console.log('5. Seed sample data: npm run seed\n');

    console.log('🎯 Next steps:');
    console.log('1. Update your .env file with the correct values');
    console.log('2. Set up your PostgreSQL database');
    console.log('3. Run: npm run migrate');
    console.log('4. Run: npm run seed (optional)');
    console.log('5. Start the server: npm run dev\n');

    console.log('📚 Available scripts:');
    console.log('- npm run dev      : Start development server');
    console.log('- npm start        : Start production server');
    console.log('- npm run migrate  : Run database migrations');
    console.log('- npm run seed     : Seed sample data');
    console.log('- npm test         : Run tests\n');

    console.log('✅ Setup completed! Happy coding! 🎉');

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
  }
};

setup();