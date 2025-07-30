const express = require('express');
const { body, validationResult } = require('express-validator');
const { requireAuth } = require('../middleware/auth');
const { pool } = require('../config/database');
const router = express.Router();

// Validation middleware for claim submission
const validateClaimSubmission = [
  body('perkId').notEmpty().withMessage('Perk ID is required'),
  body('projectName').trim().isLength({ min: 1, max: 100 }).withMessage('Project name is required and must be less than 100 characters'),
  body('currentStage').isIn(['testing', 'production']).withMessage('Project stage must be testing or production'),
  body('problemSolving').trim().isLength({ min: 10, max: 1000 }).withMessage('Problem description must be between 10 and 1000 characters'),
  body('targetAudience').trim().isLength({ min: 1, max: 200 }).withMessage('Target audience is required and must be less than 200 characters'),
  body('uniqueApproach').trim().isLength({ min: 10, max: 1000 }).withMessage('Unique approach description must be between 10 and 1000 characters'),
  body('techStack').trim().isLength({ min: 1, max: 200 }).withMessage('Tech stack is required and must be less than 200 characters'),
  body('githubUrl').isURL().withMessage('Valid GitHub URL is required'),
  body('liveUrl').optional().isURL().withMessage('Live URL must be valid if provided'),
  body('teamSize').isIn(['solo', '2-5', '6-10', '10+']).withMessage('Invalid team size'),
  body('dataSafety').trim().isLength({ min: 10, max: 1000 }).withMessage('Data safety description must be between 10 and 1000 characters'),
  body('privacyPolicyUrl').optional().isURL().withMessage('Privacy policy URL must be valid if provided'),
  body('preferredSubdomain').trim().isLength({ min: 1, max: 50 }).withMessage('Preferred subdomain is required and must be less than 50 characters'),
  body('additionalInfo').optional().isLength({ max: 500 }).withMessage('Additional info must be less than 500 characters'),
  body('agreeToTerms').isBoolean().custom(value => {
    if (!value) {
      throw new Error('You must agree to the terms and conditions');
    }
    return true;
  })
];

// Create claims table if it doesn't exist
const createClaimsTable = async () => {
  try {
    // First, check if the table exists
    const tableExistsQuery = `
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'claims'
      );
    `;
    
    const tableExists = await pool.query(tableExistsQuery);
    
    if (tableExists.rows[0].exists) {
      console.log('✅ Claims table already exists, skipping creation');
      
      // Check if all required columns exist and add missing ones
      const columnsQuery = `
        SELECT column_name 
        FROM information_schema.columns 
        WHERE table_name = 'claims' AND table_schema = 'public'
      `;
      
      const existingColumns = await pool.query(columnsQuery);
      const columnNames = existingColumns.rows.map(row => row.column_name);
      
      // List of required columns
      const requiredColumns = [
        { name: 'current_stage', type: 'VARCHAR(20)', nullable: false, default: "'pending'" },
        { name: 'problem_solving', type: 'TEXT', nullable: false, default: "''" },
        { name: 'target_audience', type: 'VARCHAR(200)', nullable: false, default: "''" },
        { name: 'unique_approach', type: 'TEXT', nullable: false, default: "''" },
        { name: 'tech_stack', type: 'VARCHAR(200)', nullable: false, default: "''" },
        { name: 'data_safety', type: 'TEXT', nullable: false, default: "''" },
        { name: 'privacy_policy_url', type: 'VARCHAR(500)', nullable: true },
        { name: 'preferred_subdomain', type: 'VARCHAR(50)', nullable: false, default: "''" },
        { name: 'live_url', type: 'VARCHAR(500)', nullable: true }
      ];
      
      // Add missing columns
      for (const column of requiredColumns) {
        if (!columnNames.includes(column.name)) {
          const alterQuery = `ALTER TABLE claims ADD COLUMN ${column.name} ${column.type}${column.nullable ? '' : ` NOT NULL DEFAULT ${column.default}`}`;
          try {
            await pool.query(alterQuery);
            console.log(`✅ Added missing column: ${column.name}`);
          } catch (error) {
            console.error(`❌ Error adding column ${column.name}:`, error.message);
          }
        }
      }
      
      return;
    }
    
    // Create the table with the correct structure matching the frontend form
    console.log('🏗️  Creating new claims table...');
    
    const createTableQuery = `
      CREATE TABLE claims (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        perk_id VARCHAR(100) NOT NULL,
        project_name VARCHAR(100) NOT NULL,
        current_stage VARCHAR(20) NOT NULL,
        problem_solving TEXT NOT NULL,
        target_audience VARCHAR(200) NOT NULL,
        unique_approach TEXT NOT NULL,
        tech_stack VARCHAR(200) NOT NULL,
        github_url VARCHAR(500) NOT NULL,
        live_url VARCHAR(500),
        team_size VARCHAR(20) NOT NULL,
        data_safety TEXT NOT NULL,
        privacy_policy_url VARCHAR(500),
        preferred_subdomain VARCHAR(50) NOT NULL,
        additional_info TEXT,
        status VARCHAR(20) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        reviewed_at TIMESTAMP,
        reviewer_notes TEXT
      );
      
      CREATE INDEX IF NOT EXISTS idx_claims_user_id ON claims(user_id);
      CREATE INDEX IF NOT EXISTS idx_claims_perk_id ON claims(perk_id);
      CREATE INDEX IF NOT EXISTS idx_claims_status ON claims(status);
      CREATE INDEX IF NOT EXISTS idx_claims_subdomain ON claims(preferred_subdomain);
    `;
    
    await pool.query(createTableQuery);
    console.log('✅ Claims table created successfully');
  } catch (error) {
    console.error('❌ Error managing claims table:', error);
  }
};

// Initialize table (don't block route registration if it fails)
createClaimsTable().catch(error => {
  console.error('❌ Failed to initialize claims table:', error.message);
  console.log('⚠️  Claims routes will still be available, but database operations may fail');
});

// Root endpoint - provides information about available claims endpoints
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Claims API',
    version: '1.0.0',
    endpoints: {
      'POST /': 'Submit a new claim (requires authentication)',
      'GET /my-claims': 'Get user\'s claims (requires authentication)',
      'GET /test': 'Test endpoint',
      'GET /debug/table-structure': 'Debug table structure',
      'GET /:claimId': 'Get specific claim details (requires authentication)'
    },
    timestamp: new Date().toISOString()
  });
});

// Test endpoint to verify claims routes are working
router.get('/test', (req, res) => {
  res.json({
    success: true,
    message: 'Claims routes are working!',
    timestamp: new Date().toISOString()
  });
});

// Debug endpoint to check table structure
router.get('/debug/table-structure', async (req, res) => {
  try {
    // Check if claims table exists and get its structure
    const tableCheck = await pool.query(`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns 
      WHERE table_name = 'claims' 
      ORDER BY ordinal_position
    `);
    
    // Get table count
    let count = 0;
    try {
      const countResult = await pool.query('SELECT COUNT(*) as count FROM claims');
      count = parseInt(countResult.rows[0].count);
    } catch (error) {
      // Table might not exist
    }
    
    res.json({
      success: true,
      data: {
        tableExists: tableCheck.rows.length > 0,
        columns: tableCheck.rows,
        recordCount: count
      }
    });
    
  } catch (error) {
    console.error('Error checking table structure:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to check table structure',
      error: error.message
    });
  }
});

// Submit a new claim
router.post('/', requireAuth, validateClaimSubmission, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const userId = req.userId || req.auth?.sub;
    
    console.log('Claims submission - User ID extraction:', {
      reqUserId: req.userId,
      reqAuthSub: req.auth?.sub,
      finalUserId: userId,
      hasAuth: !!req.auth,
      authKeys: req.auth ? Object.keys(req.auth) : 'No auth object'
    });
    
    if (!userId) {
      console.error('❌ No user ID found in request');
      return res.status(401).json({
        success: false,
        message: 'User authentication failed - no user ID found'
      });
    }
    
    const {
      perkId,
      projectName,
      currentStage,
      problemSolving,
      targetAudience,
      uniqueApproach,
      techStack,
      githubUrl,
      liveUrl,
      teamSize,
      dataSafety,
      privacyPolicyUrl,
      preferredSubdomain,
      additionalInfo
    } = req.body;

    // Check if user already has a pending or approved claim for this perk
    const existingClaimQuery = `
      SELECT id, status FROM claims 
      WHERE user_id = $1 AND perk_id = $2 AND status IN ('pending', 'approved')
    `;
    const existingClaim = await pool.query(existingClaimQuery, [userId, perkId]);

    if (existingClaim.rows.length > 0) {
      const status = existingClaim.rows[0].status;
      return res.status(400).json({
        success: false,
        message: status === 'approved' 
          ? 'You have already claimed this perk' 
          : 'You already have a pending application for this perk'
      });
    }

    // Check if subdomain is already taken
    const subdomainQuery = `
      SELECT id FROM claims 
      WHERE preferred_subdomain = $1 AND status IN ('pending', 'approved')
    `;
    const existingSubdomain = await pool.query(subdomainQuery, [preferredSubdomain.toLowerCase()]);

    if (existingSubdomain.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'This subdomain is already taken. Please choose a different one.'
      });
    }

    // Insert new claim
    const insertClaimQuery = `
      INSERT INTO claims (
        user_id, perk_id, project_name, current_stage, problem_solving,
        target_audience, unique_approach, tech_stack, github_url, live_url,
        team_size, data_safety, privacy_policy_url, preferred_subdomain, additional_info
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
      RETURNING id, created_at
    `;

    const values = [
      userId,
      perkId,
      projectName,
      currentStage,
      problemSolving,
      targetAudience,
      uniqueApproach,
      techStack,
      githubUrl,
      liveUrl || null,
      teamSize,
      dataSafety,
      privacyPolicyUrl || null,
      preferredSubdomain.toLowerCase(),
      additionalInfo || null
    ];

    const result = await pool.query(insertClaimQuery, values);
    const claim = result.rows[0];

    // Log the claim submission
    console.log(`New claim submitted: User ${userId}, Perk ${perkId}, Claim ID ${claim.id}`);

    res.status(201).json({
      success: true,
      message: 'Claim submitted successfully',
      data: {
        claimId: claim.id,
        submittedAt: claim.created_at,
        status: 'pending'
      }
    });

  } catch (error) {
    console.error('Error submitting claim:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit claim'
    });
  }
});

// Get user's claims
router.get('/my-claims', requireAuth, async (req, res) => {
  try {
    const userId = req.userId || req.auth?.sub;
    
    const query = `
      SELECT 
        id,
        perk_id,
        project_name,
        project_stage,
        status,
        created_at,
        updated_at,
        reviewer_notes
      FROM claims 
      WHERE user_id = $1 
      ORDER BY created_at DESC
    `;

    const result = await pool.query(query, [userId]);

    res.json({
      success: true,
      data: result.rows
    });

  } catch (error) {
    console.error('Error fetching user claims:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch claims'
    });
  }
});

// Get claim details
router.get('/:claimId', requireAuth, async (req, res) => {
  try {
    const userId = req.userId || req.auth?.sub;
    const { claimId } = req.params;

    const query = `
      SELECT * FROM claims 
      WHERE id = $1 AND user_id = $2
    `;

    const result = await pool.query(query, [claimId, userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Claim not found'
      });
    }

    res.json({
      success: true,
      data: result.rows[0]
    });

  } catch (error) {
    console.error('Error fetching claim details:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch claim details'
    });
  }
});

// Admin routes (for reviewing claims)
router.get('/admin/all', requireAuth, async (req, res) => {
  try {
    // Note: In a real application, you'd want to check if the user is an admin
    const { status, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    let query = `
      SELECT 
        c.*,
        u.first_name,
        u.last_name,
        u.email
      FROM claims c
      LEFT JOIN users u ON c.user_id = u.clerk_id
    `;
    
    const queryParams = [];
    
    if (status) {
      query += ` WHERE c.status = $1`;
      queryParams.push(status);
    }
    
    query += ` ORDER BY c.created_at DESC LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2}`;
    queryParams.push(limit, offset);

    const result = await pool.query(query, queryParams);

    // Get total count
    let countQuery = `SELECT COUNT(*) FROM claims`;
    let countParams = [];
    
    if (status) {
      countQuery += ` WHERE status = $1`;
      countParams.push(status);
    }
    
    const countResult = await pool.query(countQuery, countParams);
    const totalCount = parseInt(countResult.rows[0].count);

    res.json({
      success: true,
      data: {
        claims: result.rows,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: totalCount,
          pages: Math.ceil(totalCount / limit)
        }
      }
    });

  } catch (error) {
    console.error('Error fetching admin claims:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch claims'
    });
  }
});

// Update claim status (admin only)
router.patch('/admin/:claimId/status', requireAuth, async (req, res) => {
  try {
    // Note: In a real application, you'd want to check if the user is an admin
    const { claimId } = req.params;
    const { status, reviewerNotes } = req.body;

    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }

    const query = `
      UPDATE claims 
      SET status = $1, reviewer_notes = $2, reviewed_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
      WHERE id = $3
      RETURNING *
    `;

    const result = await pool.query(query, [status, reviewerNotes || null, claimId]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Claim not found'
      });
    }

    res.json({
      success: true,
      message: 'Claim status updated successfully',
      data: result.rows[0]
    });

  } catch (error) {
    console.error('Error updating claim status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update claim status'
    });
  }
});

module.exports = router;