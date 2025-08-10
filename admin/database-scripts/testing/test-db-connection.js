#!/usr/bin/env node

require('dotenv').config();
const { Pool } = require('pg');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

const testConnection = async () => {
  console.log(`${colors.bright}${colors.cyan}🔍 DATABASE CONNECTION TEST${colors.reset}\n`);
  
  // Show current configuration
  console.log(`${colors.bright}Configuration:${colors.reset}`);
  console.log(`  Database URL: ${process.env.DATABASE_URL ? 'Present' : 'Missing'}`);
  console.log(`  DB Host: ${process.env.DB_HOST || 'Not set'}`);
  console.log(`  DB Port: ${process.env.DB_PORT || 'Not set'}`);
  console.log(`  DB Name: ${process.env.DB_NAME || 'Not set'}`);
  console.log(`  DB User: ${process.env.DB_USER || 'Not set'}`);
  console.log(`  Node ENV: ${process.env.NODE_ENV || 'development'}\n`);
  
  // Test different connection configurations
  const configs = [
    {
      name: 'Primary (DATABASE_URL)',
      config: {
        connectionString: process.env.DATABASE_URL,
        ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
        connectionTimeoutMillis: 10000,
        idleTimeoutMillis: 30000,
        max: 1
      }
    },
    {
      name: 'Alternative (Individual params)',
      config: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
        connectionTimeoutMillis: 10000,
        idleTimeoutMillis: 30000,
        max: 1
      }
    },
    {
      name: 'With SSL disabled',
      config: {
        connectionString: process.env.DATABASE_URL,
        ssl: false,
        connectionTimeoutMillis: 10000,
        idleTimeoutMillis: 30000,
        max: 1
      }
    }
  ];
  
  for (const { name, config } of configs) {
    console.log(`${colors.bright}Testing ${name}...${colors.reset}`);
    
    const pool = new Pool(config);
    
    try {
      const start = Date.now();
      const result = await pool.query('SELECT NOW() as current_time, version() as db_version');
      const duration = Date.now() - start;
      
      console.log(`${colors.green}✅ Success! (${duration}ms)${colors.reset}`);
      console.log(`  Current Time: ${result.rows[0].current_time}`);
      console.log(`  DB Version: ${result.rows[0].db_version.split(' ').slice(0, 2).join(' ')}\n`);
      
      // Test claims table
      try {
        const claimsResult = await pool.query('SELECT COUNT(*) as count FROM claims');
        console.log(`${colors.green}✅ Claims table accessible: ${claimsResult.rows[0].count} records${colors.reset}\n`);
        
        // If this works, we can use this configuration
        await pool.end();
        return config;
        
      } catch (tableError) {
        console.log(`${colors.yellow}⚠️  Claims table not accessible: ${tableError.message}${colors.reset}\n`);
      }
      
    } catch (error) {
      console.log(`${colors.red}❌ Failed: ${error.message}${colors.reset}`);
      console.log(`   Code: ${error.code || 'Unknown'}`);
      console.log(`   Errno: ${error.errno || 'Unknown'}\n`);
    } finally {
      try {
        await pool.end();
      } catch (e) {
        // Ignore cleanup errors
      }
    }
  }
  
  return null;
};

// Alternative: Create a local SQLite fallback
const createSQLiteFallback = async () => {
  console.log(`${colors.bright}${colors.yellow}🔄 Creating SQLite fallback database...${colors.reset}`);
  
  try {
    const sqlite3 = require('sqlite3').verbose();
    const path = require('path');
    
    const dbPath = path.join(__dirname, 'claims-local.db');
    const db = new sqlite3.Database(dbPath);
    
    // Create claims table
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS claims (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT NOT NULL,
        perk_id TEXT NOT NULL,
        project_name TEXT NOT NULL,
        current_stage TEXT NOT NULL,
        problem_solving TEXT NOT NULL,
        target_audience TEXT NOT NULL,
        unique_approach TEXT NOT NULL,
        tech_stack TEXT NOT NULL,
        github_url TEXT NOT NULL,
        live_url TEXT,
        team_size TEXT NOT NULL,
        data_safety TEXT NOT NULL,
        privacy_policy_url TEXT,
        preferred_subdomain TEXT NOT NULL,
        additional_info TEXT,
        status TEXT DEFAULT 'pending',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        reviewed_at DATETIME,
        reviewer_notes TEXT
      )
    `;
    
    return new Promise((resolve, reject) => {
      db.run(createTableSQL, (err) => {
        if (err) {
          reject(err);
        } else {
          console.log(`${colors.green}✅ SQLite database created at: ${dbPath}${colors.reset}`);
          db.close();
          resolve(dbPath);
        }
      });
    });
    
  } catch (error) {
    if (error.code === 'MODULE_NOT_FOUND') {
      console.log(`${colors.yellow}⚠️  SQLite3 not installed. Install with: npm install sqlite3${colors.reset}`);
    } else {
      console.log(`${colors.red}❌ SQLite fallback failed: ${error.message}${colors.reset}`);
    }
    return null;
  }
};

const main = async () => {
  try {
    const workingConfig = await testConnection();
    
    if (workingConfig) {
      console.log(`${colors.bright}${colors.green}🎉 Found working database configuration!${colors.reset}`);
      console.log(`${colors.bright}You can now use the view-claims.js and manage-claims.js scripts.${colors.reset}`);
    } else {
      console.log(`${colors.bright}${colors.red}❌ No working database configuration found.${colors.reset}`);
      console.log(`${colors.bright}${colors.yellow}Possible solutions:${colors.reset}`);
      console.log(`  1. Check if the database server is running`);
      console.log(`  2. Verify your .env file has correct database credentials`);
      console.log(`  3. Check your network connection`);
      console.log(`  4. Try connecting from a different network`);
      console.log(`  5. Contact your database provider (Render) for support\n`);
      
      // Offer SQLite fallback
      const answer = await new Promise(resolve => {
        const readline = require('readline');
        const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout
        });
        
        rl.question(`${colors.bright}Would you like to create a local SQLite database for testing? (y/n): ${colors.reset}`, (answer) => {
          rl.close();
          resolve(answer.toLowerCase());
        });
      });
      
      if (answer === 'y' || answer === 'yes') {
        await createSQLiteFallback();
      }
    }
    
  } catch (error) {
    console.error(`${colors.red}❌ Test failed:${colors.reset}`, error.message);
  }
};

if (require.main === module) {
  main();
}

module.exports = { testConnection, createSQLiteFallback };