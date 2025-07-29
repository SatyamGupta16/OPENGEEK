const express = require('express');
const { pool } = require('../config/database');
const { requireAuth, optionalAuth, getUserInfo } = require('../middleware/auth');
const { body, param, query, validationResult } = require('express-validator');
const { ensureUserExists } = require('../utils/userHelpers');

const router = express.Router();

// Validation middleware
const validateProject = [
  body('title').isLength({ min: 5, max: 200 }).withMessage('Title must be between 5 and 200 characters'),
  body('description').isLength({ min: 20, max: 1000 }).withMessage('Description must be between 20 and 1000 characters'),
  body('githubUrl').isURL().withMessage('Please provide a valid GitHub URL'),
  body('liveUrl').optional({ nullable: true, checkFalsy: true }).isURL().withMessage('Please provide a valid live demo URL'),
  body('tags').isArray({ min: 1, max: 10 }).withMessage('Please provide 1-10 tags'),
  body('language').isLength({ min: 2, max: 50 }).withMessage('Language must be between 2 and 50 characters')
];

const validateUUID = [
  param('id').isUUID().withMessage('Invalid project ID format')
];

const validatePagination = [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100')
];

// Handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('Validation errors:', errors.array());
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

// Get all projects with filtering and pagination
router.get('/', optionalAuth, getUserInfo, validatePagination, handleValidationErrors, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 12, 50);
    const offset = (page - 1) * limit;
    
    const { search, language, featured, sortBy = 'created_at' } = req.query;

    // Simple query without complex filtering for now
    let baseQuery = `
      SELECT p.id, p.title, p.description, p.image_url, p.github_url, p.live_url,
             p.tags, p.language, p.is_featured, p.stars_count, p.forks_count,
             p.created_at, p.updated_at,
             u.username, u.full_name, u.image_url as user_image_url, u.is_verified
      FROM projects p
      JOIN users u ON p.user_id = u.id
      WHERE p.is_approved = true
    `;

    let countQuery = `
      SELECT COUNT(*) as total
      FROM projects p
      JOIN users u ON p.user_id = u.id
      WHERE p.is_approved = true
    `;

    let queryParams = [];
    let paramIndex = 0;

    // Add search filter
    if (search) {
      paramIndex++;
      baseQuery += ` AND (p.title ILIKE $${paramIndex} OR p.description ILIKE $${paramIndex})`;
      countQuery += ` AND (p.title ILIKE $${paramIndex} OR p.description ILIKE $${paramIndex})`;
      queryParams.push(`%${search}%`);
    }

    // Add language filter
    if (language) {
      paramIndex++;
      baseQuery += ` AND p.language ILIKE $${paramIndex}`;
      countQuery += ` AND p.language ILIKE $${paramIndex}`;
      queryParams.push(`%${language}%`);
    }

    // Add featured filter
    if (featured === 'true') {
      baseQuery += ' AND p.is_featured = true';
      countQuery += ' AND p.is_featured = true';
    }

    // Add sorting
    switch (sortBy) {
      case 'stars':
        baseQuery += ' ORDER BY p.stars_count DESC, p.created_at DESC';
        break;
      case 'name':
        baseQuery += ' ORDER BY p.title ASC';
        break;
      case 'created_at':
      default:
        baseQuery += ' ORDER BY p.created_at DESC';
        break;
    }

    // Add pagination
    paramIndex++;
    baseQuery += ` LIMIT $${paramIndex}`;
    queryParams.push(limit);
    
    paramIndex++;
    baseQuery += ` OFFSET $${paramIndex}`;
    queryParams.push(offset);

    // Execute queries
    const [projectsResult, countResult] = await Promise.all([
      pool.query(baseQuery, queryParams),
      pool.query(countQuery, queryParams.slice(0, -2)) // Remove limit and offset for count
    ]);

    const total = parseInt(countResult.rows[0].total);
    const totalPages = Math.ceil(total / limit);

    // Transform results
    const projects = projectsResult.rows.map(project => ({
      id: project.id,
      title: project.title,
      description: project.description,
      imageUrl: project.image_url,
      githubUrl: project.github_url,
      liveUrl: project.live_url,
      tags: project.tags || [],
      language: project.language,
      isFeatured: project.is_featured,
      starsCount: project.stars_count,
      forksCount: project.forks_count,
      createdAt: project.created_at,
      updatedAt: project.updated_at,
      author: {
        username: project.username,
        fullName: project.full_name,
        imageUrl: project.user_image_url,
        isVerified: project.is_verified
      },
      isStarredByUser: false // We'll add this functionality later
    }));

    res.json({
      success: true,
      data: {
        projects,
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1
        }
      }
    });
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get projects',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get single project by ID
router.get('/:id', validateUUID, handleValidationErrors, optionalAuth, getUserInfo, async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT p.id, p.title, p.description, p.image_url, p.github_url, p.live_url,
              p.tags, p.language, p.is_featured, p.stars_count, p.forks_count,
              p.created_at, p.updated_at,
              u.username, u.full_name, u.image_url as user_image_url, u.is_verified
       FROM projects p
       JOIN users u ON p.user_id = u.id
       WHERE p.id = $1 AND p.is_approved = true`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    const project = result.rows[0];

    res.json({
      success: true,
      data: {
        project: {
          id: project.id,
          title: project.title,
          description: project.description,
          imageUrl: project.image_url,
          githubUrl: project.github_url,
          liveUrl: project.live_url,
          tags: project.tags || [],
          language: project.language,
          isFeatured: project.is_featured,
          starsCount: project.stars_count,
          forksCount: project.forks_count,
          createdAt: project.created_at,
          updatedAt: project.updated_at,
          author: {
            username: project.username,
            fullName: project.full_name,
            imageUrl: project.user_image_url,
            isVerified: project.is_verified
          },
          isStarredByUser: false // We'll add this functionality later
        }
      }
    });
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get project'
    });
  }
});

// Create new project
router.post('/', requireAuth, getUserInfo, validateProject, handleValidationErrors, async (req, res) => {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    const {
      title,
      description,
      githubUrl,
      liveUrl,
      tags,
      language
    } = req.body;

    console.log('Creating project with data:', {
      title,
      description: description?.substring(0, 50) + '...',
      githubUrl,
      liveUrl,
      tags,
      language,
      userId: req.userId
    });

    // Ensure user exists in database
    await ensureUserExists(client, req.userId, req.user);

    // Create project
    const projectResult = await client.query(
      `INSERT INTO projects (user_id, title, description, github_url, live_url, tags, language, is_approved)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING id, title, description, github_url, live_url, tags, language, 
                 stars_count, forks_count, is_featured, is_approved, created_at, updated_at`,
      [req.userId, title, description, githubUrl, liveUrl || null, tags, language, true] // Auto-approve for now
    );

    await client.query('COMMIT');

    const project = projectResult.rows[0];

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: {
        project: {
          id: project.id,
          title: project.title,
          description: project.description,
          githubUrl: project.github_url,
          liveUrl: project.live_url,
          tags: project.tags || [],
          language: project.language,
          starsCount: project.stars_count,
          forksCount: project.forks_count,
          isFeatured: project.is_featured,
          isApproved: project.is_approved,
          createdAt: project.created_at,
          updatedAt: project.updated_at
        }
      }
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Create project error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create project',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  } finally {
    client.release();
  }
});

// Star/Unstar project (simplified)
router.post('/:id/star', validateUUID, handleValidationErrors, requireAuth, getUserInfo, async (req, res) => {
  try {
    const { id: projectId } = req.params;

    // For now, just return a success response
    // We'll implement the full starring functionality later
    res.json({
      success: true,
      message: 'Star functionality coming soon',
      data: {
        isStarred: true,
        starsCount: 1
      }
    });
  } catch (error) {
    console.error('Star project error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to star project'
    });
  }
});

module.exports = router;