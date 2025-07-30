#!/usr/bin/env node

require('dotenv').config();
const { Pool } = require('pg');
const readline = require('readline');

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

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Helper function to ask questions
const askQuestion = (question) => {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
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

// Function to display claim summary
const displayClaimSummary = (claim) => {
  console.log(`\n${colors.bright}${colors.blue}📄 CLAIM #${claim.id}${colors.reset}`);
  console.log('═'.repeat(50));
  console.log(`${colors.bright}Project:${colors.reset} ${claim.project_name}`);
  console.log(`${colors.bright}User ID:${colors.reset} ${claim.user_id}`);
  console.log(`${colors.bright}Subdomain:${colors.reset} ${claim.preferred_subdomain}.opengeek.in`);
  console.log(`${colors.bright}Stage:${colors.reset} ${claim.current_stage}`);
  console.log(`${colors.bright}Team Size:${colors.reset} ${claim.team_size}`);
  console.log(`${colors.bright}GitHub:${colors.reset} ${claim.github_url}`);
  console.log(`${colors.bright}Live URL:${colors.reset} ${claim.live_url || 'N/A'}`);
  console.log(`${colors.bright}Tech Stack:${colors.reset} ${claim.tech_stack}`);
  console.log(`${colors.bright}Problem:${colors.reset} ${truncate(claim.problem_solving, 100)}`);
  console.log(`${colors.bright}Target Audience:${colors.reset} ${claim.target_audience}`);
  console.log(`${colors.bright}Unique Approach:${colors.reset} ${truncate(claim.unique_approach, 100)}`);
  console.log(`${colors.bright}Data Safety:${colors.reset} ${truncate(claim.data_safety, 100)}`);
  console.log(`${colors.bright}Privacy Policy:${colors.reset} ${claim.privacy_policy_url || 'N/A'}`);
  console.log(`${colors.bright}Additional Info:${colors.reset} ${claim.additional_info || 'N/A'}`);
  console.log(`${colors.bright}Created:${colors.reset} ${formatDate(claim.created_at)}`);
  console.log(`${colors.bright}Status:${colors.reset} ${claim.status}`);
};

// Function to update claim status
const updateClaimStatus = async (claimId, status, reviewerNotes = null) => {
  try {
    const query = `
      UPDATE claims 
      SET status = $1, reviewer_notes = $2, reviewed_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
      WHERE id = $3
      RETURNING *
    `;
    
    const result = await pool.query(query, [status, reviewerNotes, claimId]);
    
    if (result.rows.length === 0) {
      console.log(`${colors.red}❌ Claim with ID ${claimId} not found${colors.reset}`);
      return false;
    }
    
    const updatedClaim = result.rows[0];
    console.log(`\n${colors.green}✅ Claim #${claimId} status updated to: ${status}${colors.reset}`);
    
    if (reviewerNotes) {
      console.log(`${colors.bright}Reviewer Notes:${colors.reset} ${reviewerNotes}`);
    }
    
    return true;
  } catch (error) {
    console.error(`${colors.red}❌ Error updating claim:${colors.reset}`, error.message);
    return false;
  }
};

// Function to review claims interactively
const reviewClaims = async () => {
  try {
    // Get pending claims
    const pendingClaims = await pool.query(`
      SELECT * FROM claims 
      WHERE status = 'pending' 
      ORDER BY created_at ASC
    `);
    
    if (pendingClaims.rows.length === 0) {
      console.log(`${colors.yellow}🎉 No pending claims to review!${colors.reset}`);
      return;
    }
    
    console.log(`\n${colors.bright}${colors.cyan}📋 CLAIMS REVIEW MODE${colors.reset}`);
    console.log(`${colors.bright}Found ${pendingClaims.rows.length} pending claims${colors.reset}\n`);
    
    for (const claim of pendingClaims.rows) {
      displayClaimSummary(claim);
      
      console.log(`\n${colors.bright}${colors.yellow}What would you like to do with this claim?${colors.reset}`);
      console.log(`${colors.green}[a]${colors.reset} Approve`);
      console.log(`${colors.red}[r]${colors.reset} Reject`);
      console.log(`${colors.blue}[s]${colors.reset} Skip to next`);
      console.log(`${colors.magenta}[q]${colors.reset} Quit review`);
      
      const action = await askQuestion('\nEnter your choice (a/r/s/q): ');
      
      switch (action.toLowerCase()) {
        case 'a':
        case 'approve':
          const approveNotes = await askQuestion('Enter approval notes (optional): ');
          await updateClaimStatus(claim.id, 'approved', approveNotes || 'Approved via admin script');
          break;
          
        case 'r':
        case 'reject':
          const rejectReason = await askQuestion('Enter rejection reason: ');
          if (rejectReason.trim()) {
            await updateClaimStatus(claim.id, 'rejected', rejectReason);
          } else {
            console.log(`${colors.yellow}⚠️  Rejection reason is required. Skipping...${colors.reset}`);
          }
          break;
          
        case 's':
        case 'skip':
          console.log(`${colors.blue}⏭️  Skipping claim #${claim.id}${colors.reset}`);
          break;
          
        case 'q':
        case 'quit':
          console.log(`${colors.magenta}👋 Exiting review mode${colors.reset}`);
          return;
          
        default:
          console.log(`${colors.yellow}⚠️  Invalid choice. Skipping...${colors.reset}`);
          break;
      }
      
      console.log('\n' + '─'.repeat(60));
    }
    
    console.log(`\n${colors.green}✅ Review completed!${colors.reset}`);
    
  } catch (error) {
    console.error(`${colors.red}❌ Error during review:${colors.reset}`, error.message);
  }
};

// Function to bulk approve/reject claims
const bulkUpdateClaims = async (status, claimIds, notes) => {
  try {
    const query = `
      UPDATE claims 
      SET status = $1, reviewer_notes = $2, reviewed_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
      WHERE id = ANY($3::int[])
      RETURNING id, project_name
    `;
    
    const result = await pool.query(query, [status, notes, claimIds]);
    
    console.log(`\n${colors.green}✅ Updated ${result.rows.length} claims to status: ${status}${colors.reset}`);
    result.rows.forEach(claim => {
      console.log(`  - Claim #${claim.id}: ${claim.project_name}`);
    });
    
  } catch (error) {
    console.error(`${colors.red}❌ Error bulk updating claims:${colors.reset}`, error.message);
  }
};

// Main function
const main = async () => {
  try {
    console.log(`${colors.bright}${colors.cyan}🛠️  OPENGEEK CLAIMS MANAGER${colors.reset}`);
    console.log(`${colors.bright}Connecting to database...${colors.reset}`);
    
    // Test database connection
    await pool.query('SELECT 1');
    console.log(`${colors.green}✅ Database connected successfully${colors.reset}`);
    
    // Get command line arguments
    const args = process.argv.slice(2);
    const command = args[0];
    
    switch (command) {
      case 'review':
        // Interactive review mode
        await reviewClaims();
        break;
        
      case 'approve':
        // Approve specific claim
        const approveId = args[1];
        const approveNotes = args.slice(2).join(' ') || 'Approved via admin script';
        
        if (!approveId) {
          console.log(`${colors.red}❌ Please provide a claim ID: node manage-claims.js approve <claim_id> [notes]${colors.reset}`);
          break;
        }
        
        await updateClaimStatus(approveId, 'approved', approveNotes);
        break;
        
      case 'reject':
        // Reject specific claim
        const rejectId = args[1];
        const rejectNotes = args.slice(2).join(' ');
        
        if (!rejectId) {
          console.log(`${colors.red}❌ Please provide a claim ID: node manage-claims.js reject <claim_id> <reason>${colors.reset}`);
          break;
        }
        
        if (!rejectNotes) {
          console.log(`${colors.red}❌ Please provide a rejection reason${colors.reset}`);
          break;
        }
        
        await updateClaimStatus(rejectId, 'rejected', rejectNotes);
        break;
        
      case 'bulk-approve':
        // Bulk approve claims
        const approveIds = args.slice(1).map(id => parseInt(id)).filter(id => !isNaN(id));
        if (approveIds.length === 0) {
          console.log(`${colors.red}❌ Please provide claim IDs: node manage-claims.js bulk-approve <id1> <id2> ...${colors.reset}`);
          break;
        }
        
        await bulkUpdateClaims('approved', approveIds, 'Bulk approved via admin script');
        break;
        
      case 'bulk-reject':
        // Bulk reject claims
        const rejectIds = args.slice(1, -1).map(id => parseInt(id)).filter(id => !isNaN(id));
        const bulkRejectReason = args[args.length - 1];
        
        if (rejectIds.length === 0 || !bulkRejectReason) {
          console.log(`${colors.red}❌ Usage: node manage-claims.js bulk-reject <id1> <id2> ... "<reason>"${colors.reset}`);
          break;
        }
        
        await bulkUpdateClaims('rejected', rejectIds, bulkRejectReason);
        break;
        
      case 'pending':
        // Show pending claims
        const pendingResult = await pool.query(`
          SELECT id, project_name, user_id, preferred_subdomain, created_at 
          FROM claims 
          WHERE status = 'pending' 
          ORDER BY created_at ASC
        `);
        
        console.log(`\n${colors.bright}${colors.yellow}⏳ PENDING CLAIMS (${pendingResult.rows.length})${colors.reset}`);
        console.log('═'.repeat(60));
        
        if (pendingResult.rows.length === 0) {
          console.log(`${colors.green}🎉 No pending claims!${colors.reset}`);
        } else {
          pendingResult.rows.forEach(claim => {
            console.log(`${colors.bright}#${claim.id}${colors.reset} - ${claim.project_name}`);
            console.log(`  Subdomain: ${claim.preferred_subdomain}.opengeek.in`);
            console.log(`  User: ${claim.user_id}`);
            console.log(`  Created: ${formatDate(claim.created_at)}\n`);
          });
        }
        break;
        
      case 'help':
      default:
        // Show help
        console.log(`\n${colors.bright}📖 USAGE:${colors.reset}`);
        console.log(`  ${colors.cyan}node manage-claims.js review${colors.reset}                           - Interactive review mode`);
        console.log(`  ${colors.cyan}node manage-claims.js approve <id> [notes]${colors.reset}             - Approve specific claim`);
        console.log(`  ${colors.cyan}node manage-claims.js reject <id> <reason>${colors.reset}             - Reject specific claim`);
        console.log(`  ${colors.cyan}node manage-claims.js bulk-approve <id1> <id2> ...${colors.reset}     - Bulk approve claims`);
        console.log(`  ${colors.cyan}node manage-claims.js bulk-reject <id1> <id2> ... "<reason>"${colors.reset} - Bulk reject claims`);
        console.log(`  ${colors.cyan}node manage-claims.js pending${colors.reset}                          - Show pending claims`);
        console.log(`  ${colors.cyan}node manage-claims.js help${colors.reset}                             - Show this help`);
        
        console.log(`\n${colors.bright}📋 EXAMPLES:${colors.reset}`);
        console.log(`  ${colors.yellow}node manage-claims.js review${colors.reset}`);
        console.log(`  ${colors.yellow}node manage-claims.js approve 1 "Great project!"${colors.reset}`);
        console.log(`  ${colors.yellow}node manage-claims.js reject 2 "Incomplete GitHub repo"${colors.reset}`);
        console.log(`  ${colors.yellow}node manage-claims.js bulk-approve 1 2 3${colors.reset}`);
        console.log(`  ${colors.yellow}node manage-claims.js pending${colors.reset}`);
        break;
    }
    
  } catch (error) {
    console.error(`${colors.red}❌ Error:${colors.reset}`, error.message);
    console.error(`${colors.red}Stack:${colors.reset}`, error.stack);
  } finally {
    rl.close();
    await pool.end();
    console.log(`\n${colors.bright}Database connection closed.${colors.reset}`);
  }
};

// Run the script
if (require.main === module) {
  main();
}

module.exports = { main, updateClaimStatus, reviewClaims };