#!/usr/bin/env node

require('dotenv').config();
const { Pool } = require('pg');

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

// Helper function to format dates
const formatDate = (date) => {
  if (!date) return 'N/A';
  return new Date(date).toLocaleString();
};

// Helper function to truncate long text
const truncate = (text, maxLength = 50) => {
  if (!text) return 'N/A';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

// Helper function to get status color
const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'approved': return colors.green;
    case 'rejected': return colors.red;
    case 'pending': return colors.yellow;
    default: return colors.reset;
  }
};

// Function to display claims in a table format
const displayClaims = (claims) => {
  console.log(`\n${colors.bright}${colors.cyan}📋 CLAIMS DATABASE RECORDS${colors.reset}`);
  console.log(`${colors.bright}Total Records: ${claims.length}${colors.reset}\n`);

  if (claims.length === 0) {
    console.log(`${colors.yellow}No claims found in the database.${colors.reset}`);
    return;
  }

  // Table header
  console.log(`${colors.bright}${'ID'.padEnd(4)} ${'USER_ID'.padEnd(20)} ${'PROJECT'.padEnd(20)} ${'SUBDOMAIN'.padEnd(15)} ${'STATUS'.padEnd(10)} ${'CREATED'.padEnd(20)}${colors.reset}`);
  console.log('─'.repeat(95));

  // Table rows
  claims.forEach(claim => {
    const statusColor = getStatusColor(claim.status);
    console.log(
      `${claim.id.toString().padEnd(4)} ` +
      `${truncate(claim.user_id, 20).padEnd(20)} ` +
      `${truncate(claim.project_name, 20).padEnd(20)} ` +
      `${truncate(claim.preferred_subdomain, 15).padEnd(15)} ` +
      `${statusColor}${claim.status.padEnd(10)}${colors.reset} ` +
      `${formatDate(claim.created_at).padEnd(20)}`
    );
  });
};

// Function to display detailed claim information
const displayClaimDetails = (claim) => {
  console.log(`\n${colors.bright}${colors.blue}📄 CLAIM DETAILS - ID: ${claim.id}${colors.reset}`);
  console.log('═'.repeat(60));
  
  console.log(`${colors.bright}Basic Information:${colors.reset}`);
  console.log(`  User ID: ${claim.user_id}`);
  console.log(`  Perk ID: ${claim.perk_id}`);
  console.log(`  Project Name: ${claim.project_name}`);
  console.log(`  Current Stage: ${claim.current_stage}`);
  console.log(`  Team Size: ${claim.team_size}`);
  console.log(`  Preferred Subdomain: ${claim.preferred_subdomain}`);
  
  console.log(`\n${colors.bright}Project Details:${colors.reset}`);
  console.log(`  Problem Solving: ${truncate(claim.problem_solving, 100)}`);
  console.log(`  Target Audience: ${claim.target_audience}`);
  console.log(`  Unique Approach: ${truncate(claim.unique_approach, 100)}`);
  console.log(`  Tech Stack: ${claim.tech_stack}`);
  
  console.log(`\n${colors.bright}Links:${colors.reset}`);
  console.log(`  GitHub URL: ${claim.github_url}`);
  console.log(`  Live URL: ${claim.live_url || 'N/A'}`);
  console.log(`  Privacy Policy URL: ${claim.privacy_policy_url || 'N/A'}`);
  
  console.log(`\n${colors.bright}Security & Data:${colors.reset}`);
  console.log(`  Data Safety: ${truncate(claim.data_safety, 100)}`);
  
  console.log(`\n${colors.bright}Status Information:${colors.reset}`);
  const statusColor = getStatusColor(claim.status);
  console.log(`  Status: ${statusColor}${claim.status}${colors.reset}`);
  console.log(`  Created At: ${formatDate(claim.created_at)}`);
  console.log(`  Updated At: ${formatDate(claim.updated_at)}`);
  console.log(`  Reviewed At: ${formatDate(claim.reviewed_at)}`);
  
  if (claim.reviewer_notes) {
    console.log(`\n${colors.bright}Reviewer Notes:${colors.reset}`);
    console.log(`  ${claim.reviewer_notes}`);
  }
  
  if (claim.additional_info) {
    console.log(`\n${colors.bright}Additional Info:${colors.reset}`);
    console.log(`  ${claim.additional_info}`);
  }
};

// Function to export claims to JSON
const exportToJSON = (claims, filename = 'claims-export.json') => {
  const fs = require('fs');
  const exportData = {
    exportDate: new Date().toISOString(),
    totalRecords: claims.length,
    claims: claims
  };
  
  fs.writeFileSync(filename, JSON.stringify(exportData, null, 2));
  console.log(`\n${colors.green}✅ Claims exported to ${filename}${colors.reset}`);
};

// Function to export claims to CSV
const exportToCSV = (claims, filename = 'claims-export.csv') => {
  const fs = require('fs');
  
  if (claims.length === 0) {
    console.log(`${colors.yellow}No claims to export.${colors.reset}`);
    return;
  }
  
  // CSV headers
  const headers = [
    'id', 'user_id', 'perk_id', 'project_name', 'current_stage', 'problem_solving',
    'target_audience', 'unique_approach', 'tech_stack', 'github_url', 'live_url',
    'team_size', 'data_safety', 'privacy_policy_url', 'preferred_subdomain',
    'additional_info', 'status', 'created_at', 'updated_at', 'reviewed_at', 'reviewer_notes'
  ];
  
  // Create CSV content
  let csvContent = headers.join(',') + '\n';
  
  claims.forEach(claim => {
    const row = headers.map(header => {
      let value = claim[header] || '';
      // Escape quotes and wrap in quotes if contains comma or quote
      if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
        value = '"' + value.replace(/"/g, '""') + '"';
      }
      return value;
    });
    csvContent += row.join(',') + '\n';
  });
  
  fs.writeFileSync(filename, csvContent);
  console.log(`\n${colors.green}✅ Claims exported to ${filename}${colors.reset}`);
};

// Main function
const main = async () => {
  try {
    console.log(`${colors.bright}${colors.cyan}🚀 OPENGEEK CLAIMS VIEWER${colors.reset}`);
    console.log(`${colors.bright}Connecting to database...${colors.reset}`);
    
    // Test database connection
    await pool.query('SELECT 1');
    console.log(`${colors.green}✅ Database connected successfully${colors.reset}`);
    
    // Get command line arguments
    const args = process.argv.slice(2);
    const command = args[0];
    const param = args[1];
    
    switch (command) {
      case 'list':
      case 'ls':
        // List all claims
        const allClaims = await pool.query(`
          SELECT * FROM claims 
          ORDER BY created_at DESC
        `);
        displayClaims(allClaims.rows);
        break;
        
      case 'view':
      case 'show':
        // View specific claim details
        if (!param) {
          console.log(`${colors.red}❌ Please provide a claim ID: node view-claims.js view <claim_id>${colors.reset}`);
          break;
        }
        
        const claimResult = await pool.query('SELECT * FROM claims WHERE id = $1', [param]);
        if (claimResult.rows.length === 0) {
          console.log(`${colors.red}❌ Claim with ID ${param} not found${colors.reset}`);
        } else {
          displayClaimDetails(claimResult.rows[0]);
        }
        break;
        
      case 'status':
        // Filter by status
        const status = param || 'pending';
        const statusClaims = await pool.query(`
          SELECT * FROM claims 
          WHERE status = $1 
          ORDER BY created_at DESC
        `, [status]);
        
        console.log(`\n${colors.bright}Claims with status: ${getStatusColor(status)}${status}${colors.reset}`);
        displayClaims(statusClaims.rows);
        break;
        
      case 'export-json':
        // Export to JSON
        const jsonClaims = await pool.query('SELECT * FROM claims ORDER BY created_at DESC');
        const jsonFilename = param || 'claims-export.json';
        exportToJSON(jsonClaims.rows, jsonFilename);
        break;
        
      case 'export-csv':
        // Export to CSV
        const csvClaims = await pool.query('SELECT * FROM claims ORDER BY created_at DESC');
        const csvFilename = param || 'claims-export.csv';
        exportToCSV(csvClaims.rows, csvFilename);
        break;
        
      case 'stats':
        // Show statistics
        const statsQuery = await pool.query(`
          SELECT 
            status,
            COUNT(*) as count,
            MIN(created_at) as first_claim,
            MAX(created_at) as latest_claim
          FROM claims 
          GROUP BY status
          ORDER BY count DESC
        `);
        
        console.log(`\n${colors.bright}${colors.cyan}📊 CLAIMS STATISTICS${colors.reset}`);
        console.log('═'.repeat(60));
        
        let totalClaims = 0;
        statsQuery.rows.forEach(stat => {
          totalClaims += parseInt(stat.count);
          const statusColor = getStatusColor(stat.status);
          console.log(`${statusColor}${stat.status.toUpperCase()}${colors.reset}: ${stat.count} claims`);
          console.log(`  First: ${formatDate(stat.first_claim)}`);
          console.log(`  Latest: ${formatDate(stat.latest_claim)}\n`);
        });
        
        console.log(`${colors.bright}Total Claims: ${totalClaims}${colors.reset}`);
        break;
        
      case 'help':
      default:
        // Show help
        console.log(`\n${colors.bright}📖 USAGE:${colors.reset}`);
        console.log(`  ${colors.cyan}node view-claims.js list${colors.reset}                    - List all claims`);
        console.log(`  ${colors.cyan}node view-claims.js view <id>${colors.reset}               - View specific claim details`);
        console.log(`  ${colors.cyan}node view-claims.js status <status>${colors.reset}         - Filter by status (pending/approved/rejected)`);
        console.log(`  ${colors.cyan}node view-claims.js export-json [filename]${colors.reset}  - Export to JSON file`);
        console.log(`  ${colors.cyan}node view-claims.js export-csv [filename]${colors.reset}   - Export to CSV file`);
        console.log(`  ${colors.cyan}node view-claims.js stats${colors.reset}                   - Show statistics`);
        console.log(`  ${colors.cyan}node view-claims.js help${colors.reset}                    - Show this help`);
        
        console.log(`\n${colors.bright}📋 EXAMPLES:${colors.reset}`);
        console.log(`  ${colors.yellow}node view-claims.js list${colors.reset}`);
        console.log(`  ${colors.yellow}node view-claims.js view 1${colors.reset}`);
        console.log(`  ${colors.yellow}node view-claims.js status pending${colors.reset}`);
        console.log(`  ${colors.yellow}node view-claims.js export-json my-claims.json${colors.reset}`);
        console.log(`  ${colors.yellow}node view-claims.js stats${colors.reset}`);
        break;
    }
    
  } catch (error) {
    console.error(`${colors.red}❌ Error:${colors.reset}`, error.message);
    console.error(`${colors.red}Stack:${colors.reset}`, error.stack);
  } finally {
    await pool.end();
    console.log(`\n${colors.bright}Database connection closed.${colors.reset}`);
  }
};

// Run the script
if (require.main === module) {
  main();
}

module.exports = { main, displayClaims, displayClaimDetails, exportToJSON, exportToCSV };