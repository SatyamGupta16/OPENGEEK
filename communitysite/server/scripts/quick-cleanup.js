#!/usr/bin/env node

/**
 * Quick Database Cleanup Script
 * 
 * Simple script for common cleanup operations without confirmations.
 * Use for development only!
 */

require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL && process.env.DATABASE_URL.includes('render.com') 
    ? { rejectUnauthorized: false } 
    : false
});

const operations = {
  'clear-posts': [
    'DELETE FROM post_likes',
    'DELETE FROM comments', 
    'DELETE FROM posts'
  ],
  
  'clear-projects': [
    'DELETE FROM project_stars',
    'DELETE FROM projects'
  ],
  
  'clear-follows': [
    'DELETE FROM follows'
  ],
  
  'clear-all': [
    'DELETE FROM post_likes',
    'DELETE FROM comments',
    'DELETE FROM posts',
    'DELETE FROM project_stars', 
    'DELETE FROM projects',
    'DELETE FROM follows'
  ],
  
  'reset-sequences': [
    'ALTER SEQUENCE users_id_seq RESTART WITH 1',
    'ALTER SEQUENCE posts_id_seq RESTART WITH 1', 
    'ALTER SEQUENCE comments_id_seq RESTART WITH 1',
    'ALTER SEQUENCE projects_id_seq RESTART WITH 1'
  ]
};

async function executeOperation(operationName) {
  const queries = operations[operationName];
  if (!queries) {
    console.log(`❌ Unknown operation: ${operationName}`);
    console.log(`Available operations: ${Object.keys(operations).join(', ')}`);
    return;
  }

  console.log(`🧹 Executing ${operationName}...`);
  
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    let totalDeleted = 0;
    for (const query of queries) {
      console.log(`  → ${query}`);
      const result = await client.query(query);
      totalDeleted += result.rowCount || 0;
    }
    
    await client.query('COMMIT');
    console.log(`✅ ${operationName} completed! Affected rows: ${totalDeleted}`);
    
  } catch (error) {
    await client.query('ROLLBACK');
    console.log(`❌ Error: ${error.message}`);
  } finally {
    client.release();
  }
}

async function showStats() {
  const tables = ['users', 'posts', 'comments', 'post_likes', 'projects', 'project_stars', 'follows'];
  
  console.log('\n📊 Database Statistics:');
  const client = await pool.connect();
  try {
    for (const table of tables) {
      try {
        const result = await client.query(`SELECT COUNT(*) as count FROM ${table}`);
        console.log(`  ${table}: ${result.rows[0].count} rows`);
      } catch (error) {
        console.log(`  ${table}: Table not found`);
      }
    }
  } finally {
    client.release();
  }
}

async function main() {
  const operation = process.argv[2];
  
  if (!operation) {
    console.log('Usage: node scripts/quick-cleanup.js <operation>');
    console.log('Operations:', Object.keys(operations).join(', '));
    return;
  }

  try {
    await pool.query('SELECT 1');
    console.log(`✅ Connected to database`);
    
    await showStats();
    await executeOperation(operation);
    await showStats();
    
  } catch (error) {
    console.log(`❌ Database error: ${error.message}`);
  } finally {
    await pool.end();
  }
}

main().catch(console.error);