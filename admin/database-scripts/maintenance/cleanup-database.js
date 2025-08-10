#!/usr/bin/env node

/**
 * Database Cleanup Script
 * 
 * This script provides various cleanup operations for the OpenGeek Community database.
 * Use with caution as these operations are irreversible.
 * 
 * Usage:
 *   node scripts/cleanup-database.js --help
 *   node scripts/cleanup-database.js --posts
 *   node scripts/cleanup-database.js --projects
 *   node scripts/cleanup-database.js --users
 *   node scripts/cleanup-database.js --all
 *   node scripts/cleanup-database.js --custom "DELETE FROM table_name WHERE condition"
 */

require('dotenv').config();
const { Pool } = require('pg');
const readline = require('readline');

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL && process.env.DATABASE_URL.includes('render.com')
    ? { rejectUnauthorized: false }
    : false
});

// Command line interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Colors for console output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  reset: '\x1b[0m'
};

// Utility functions
const log = (message, color = 'white') => {
  console.log(`${colors[color]}${message}${colors.reset}`);
};

const confirm = (message) => {
  return new Promise((resolve) => {
    rl.question(`${colors.yellow}${message} (yes/no): ${colors.reset}`, (answer) => {
      resolve(answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y');
    });
  });
};

// Cleanup operations
const cleanupOperations = {
  posts: {
    name: 'Posts and Comments',
    description: 'Remove all posts, comments, likes, and related data',
    queries: [
      'DELETE FROM post_likes',
      'DELETE FROM comments',
      'DELETE FROM posts',
    ]
  },

  projects: {
    name: 'Projects',
    description: 'Remove all projects and project stars',
    queries: [
      'DELETE FROM project_stars',
      'DELETE FROM projects',
    ]
  },

  users: {
    name: 'Users (DANGEROUS)',
    description: 'Remove all users and ALL related data (posts, projects, follows, etc.)',
    queries: [
      'DELETE FROM post_likes',
      'DELETE FROM comments',
      'DELETE FROM posts',
      'DELETE FROM project_stars',
      'DELETE FROM projects',
      'DELETE FROM follows',
      'DELETE FROM users',
    ]
  },

  follows: {
    name: 'Follow Relationships',
    description: 'Remove all follow/unfollow relationships',
    queries: [
      'DELETE FROM follows',
    ]
  },

  likes: {
    name: 'Likes and Stars',
    description: 'Remove all post likes and project stars',
    queries: [
      'DELETE FROM post_likes',
      'DELETE FROM project_stars',
    ]
  },

  comments: {
    name: 'Comments Only',
    description: 'Remove all comments (keeps posts)',
    queries: [
      'DELETE FROM comments',
    ]
  }
};

// Execute cleanup operation
async function executeCleanup(operationName) {
  const operation = cleanupOperations[operationName];
  if (!operation) {
    log(`Unknown operation: ${operationName}`, 'red');
    return false;
  }

  log(`\n=== ${operation.name} Cleanup ===`, 'cyan');
  log(`Description: ${operation.description}`, 'white');
  log(`Queries to execute:`, 'yellow');
  operation.queries.forEach(query => log(`  - ${query}`, 'white'));

  const confirmed = await confirm(`\nAre you sure you want to proceed with ${operation.name} cleanup?`);
  if (!confirmed) {
    log('Operation cancelled.', 'yellow');
    return false;
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    let totalDeleted = 0;
    for (const query of operation.queries) {
      log(`Executing: ${query}`, 'blue');
      const result = await client.query(query);
      const deletedCount = result.rowCount || 0;
      totalDeleted += deletedCount;
      log(`  → Deleted ${deletedCount} rows`, 'green');
    }

    await client.query('COMMIT');
    log(`\n✅ ${operation.name} cleanup completed successfully!`, 'green');
    log(`Total rows deleted: ${totalDeleted}`, 'green');
    return true;

  } catch (error) {
    await client.query('ROLLBACK');
    log(`\n❌ Error during ${operation.name} cleanup:`, 'red');
    log(error.message, 'red');
    return false;
  } finally {
    client.release();
  }
}

// Execute custom query
async function executeCustomQuery(query) {
  log(`\n=== Custom Query Execution ===`, 'cyan');
  log(`Query: ${query}`, 'white');

  const confirmed = await confirm(`\nAre you sure you want to execute this custom query?`);
  if (!confirmed) {
    log('Operation cancelled.', 'yellow');
    return false;
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    log(`Executing: ${query}`, 'blue');
    const result = await client.query(query);
    const affectedRows = result.rowCount || 0;

    await client.query('COMMIT');
    log(`\n✅ Custom query executed successfully!`, 'green');
    log(`Affected rows: ${affectedRows}`, 'green');
    return true;

  } catch (error) {
    await client.query('ROLLBACK');
    log(`\n❌ Error executing custom query:`, 'red');
    log(error.message, 'red');
    return false;
  } finally {
    client.release();
  }
}

// Show database statistics
async function showStats() {
  log(`\n=== Database Statistics ===`, 'cyan');

  const tables = [
    'users',
    'posts',
    'comments',
    'post_likes',
    'projects',
    'project_stars',
    'follows'
  ];

  const client = await pool.connect();
  try {
    for (const table of tables) {
      try {
        const result = await client.query(`SELECT COUNT(*) as count FROM ${table}`);
        const count = result.rows[0].count;
        log(`${table.padEnd(15)}: ${count} rows`, 'white');
      } catch (error) {
        log(`${table.padEnd(15)}: Table not found or error`, 'red');
      }
    }
  } catch (error) {
    log(`Error fetching statistics: ${error.message}`, 'red');
  } finally {
    client.release();
  }
}

// Reset auto-increment sequences
async function resetSequences() {
  log(`\n=== Resetting Auto-increment Sequences ===`, 'cyan');

  const sequences = [
    'users_id_seq',
    'posts_id_seq',
    'comments_id_seq',
    'projects_id_seq'
  ];

  const confirmed = await confirm(`Reset all auto-increment sequences to 1?`);
  if (!confirmed) {
    log('Operation cancelled.', 'yellow');
    return false;
  }

  const client = await pool.connect();
  try {
    for (const sequence of sequences) {
      try {
        await client.query(`ALTER SEQUENCE ${sequence} RESTART WITH 1`);
        log(`✅ Reset ${sequence}`, 'green');
      } catch (error) {
        log(`❌ Failed to reset ${sequence}: ${error.message}`, 'red');
      }
    }
    log(`\n✅ Sequence reset completed!`, 'green');
    return true;
  } catch (error) {
    log(`\n❌ Error resetting sequences: ${error.message}`, 'red');
    return false;
  } finally {
    client.release();
  }
}

// Show help
function showHelp() {
  log(`\n=== OpenGeek Community Database Cleanup Script ===`, 'cyan');
  log(`\nAvailable operations:`, 'white');

  Object.entries(cleanupOperations).forEach(([key, operation]) => {
    log(`  --${key.padEnd(12)}: ${operation.description}`, 'white');
  });

  log(`\nOther options:`, 'white');
  log(`  --stats      : Show database statistics`, 'white');
  log(`  --reset-seq  : Reset auto-increment sequences`, 'white');
  log(`  --all        : Clean up everything (DANGEROUS)`, 'white');
  log(`  --custom     : Execute custom SQL query`, 'white');
  log(`  --help       : Show this help message`, 'white');

  log(`\nExamples:`, 'yellow');
  log(`  node scripts/cleanup-database.js --posts`, 'white');
  log(`  node scripts/cleanup-database.js --projects`, 'white');
  log(`  node scripts/cleanup-database.js --custom "DELETE FROM posts WHERE created_at < '2024-01-01'"`, 'white');
  log(`  node scripts/cleanup-database.js --all`, 'white');
}

// Main function
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes('--help')) {
    showHelp();
    rl.close();
    return;
  }

  try {
    // Test database connection
    await pool.query('SELECT 1');
    log(`✅ Connected to database: ${process.env.DB_NAME || 'opengeek'}`, 'green');
  } catch (error) {
    log(`❌ Failed to connect to database: ${error.message}`, 'red');
    rl.close();
    return;
  }

  // Show stats first
  if (args.includes('--stats') || args.length > 1) {
    await showStats();
  }

  // Handle different operations
  if (args.includes('--all')) {
    log(`\n⚠️  WARNING: This will delete ALL data from the database!`, 'red');
    const confirmed = await confirm('Are you absolutely sure you want to delete ALL data?');
    if (confirmed) {
      const doubleConfirmed = await confirm('Type "DELETE EVERYTHING" to confirm');
      if (doubleConfirmed) {
        await executeCleanup('users'); // This includes everything
        await resetSequences();
      } else {
        log('Operation cancelled.', 'yellow');
      }
    } else {
      log('Operation cancelled.', 'yellow');
    }
  } else if (args.includes('--reset-seq')) {
    await resetSequences();
  } else if (args.includes('--custom')) {
    const queryIndex = args.indexOf('--custom') + 1;
    if (queryIndex < args.length) {
      await executeCustomQuery(args[queryIndex]);
    } else {
      log('Please provide a custom query after --custom', 'red');
    }
  } else {
    // Handle individual operations
    for (const [key] of Object.entries(cleanupOperations)) {
      if (args.includes(`--${key}`)) {
        await executeCleanup(key);
        break;
      }
    }
  }

  // Show final stats
  if (!args.includes('--stats')) {
    await showStats();
  }

  log(`\n✅ Script completed!`, 'green');
  rl.close();
  await pool.end();
}

// Handle errors and cleanup
process.on('SIGINT', async () => {
  log(`\n\n⚠️  Script interrupted by user`, 'yellow');
  rl.close();
  await pool.end();
  process.exit(0);
});

process.on('unhandledRejection', async (error) => {
  log(`\n❌ Unhandled error: ${error.message}`, 'red');
  rl.close();
  await pool.end();
  process.exit(1);
});

// Run the script
if (require.main === module) {
  main().catch(async (error) => {
    log(`\n❌ Script failed: ${error.message}`, 'red');
    rl.close();
    await pool.end();
    process.exit(1);
  });
}

module.exports = {
  executeCleanup,
  executeCustomQuery,
  showStats,
  resetSequences
};