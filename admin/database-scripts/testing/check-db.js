require('dotenv').config();
const { Pool } = require('pg');

// Create a new pool for this test
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function checkDatabase() {
  try {
    console.log('🔍 Testing database connection...');
    
    // Test connection
    const testResult = await pool.query('SELECT NOW() as current_time');
    console.log('✅ Database connection successful');
    console.log('📅 Current time:', testResult.rows[0].current_time);
    
    // Check if claims table exists
    const tableCheck = await pool.query(`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns 
      WHERE table_name = 'claims' 
      ORDER BY ordinal_position
    `);
    
    if (tableCheck.rows.length > 0) {
      console.log('\n📋 Claims table structure:');
      tableCheck.rows.forEach(col => {
        const nullable = col.is_nullable === 'YES' ? 'nullable' : 'not null';
        const defaultVal = col.column_default ? ` (default: ${col.column_default})` : '';
        console.log(`  - ${col.column_name}: ${col.data_type} (${nullable})${defaultVal}`);
      });
    } else {
      console.log('❌ Claims table does not exist');
    }
    
    // Check existing claims count
    try {
      const countResult = await pool.query('SELECT COUNT(*) as count FROM claims');
      console.log(`\n📊 Total claims in database: ${countResult.rows[0].count}`);
    } catch (error) {
      console.log('\n❌ Claims table might not exist yet:', error.message);
    }
    
    // Check all tables in the database
    const tablesResult = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    `);
    
    console.log('\n📋 All tables in database:');
    tablesResult.rows.forEach(table => {
      console.log(`  - ${table.table_name}`);
    });
    
    await pool.end();
    console.log('\n✅ Database check completed');
    
  } catch (error) {
    console.error('❌ Database error:', error.message);
    console.error('Full error:', error);
    process.exit(1);
  }
}

checkDatabase();