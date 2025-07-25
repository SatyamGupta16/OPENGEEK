const express = require('express');
const { pool } = require('../config/database');
const { requireAuth, optionalAuth, getUserInfo } = require('../middleware/auth');
const { body, param, query, validationResult } = require('express-validator');

const router = express.Router();

// Validation middleware
const validateProject = [
  body('title').isLength({ min: 5, max: 200 }).withMessage('Title must be between 5 and 200 characters'),
  body('description').isLength({ min: 20, max: 1000 }).withMessage('Description must be between 20 and 1000 characters'),
  body('githubUrl').isURL().withMessage('Please provide a valid GitHub URL'),
  body('liveUrl').optional().isURL().withMessage('Please provide a valid live demo URL'),
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
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

// Get all projects with filtering and pagination
router.get('/', optionalAuth, validatePagination, handleValidationErrors, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 12, 50);
    const offset = (page - 1) * limit;
    
    const { search, language, featured, sortBy = 'created_at' } = req.query;

    let whereClause = 'WHERE p.is_approved = true';
    let queryParams = [];
    let paramCount = 0;

    // Add search filter
    if (search) {
      paramCount++;
      whereClause += ` AND (p.title ILIKE $${paramCount} OR p.description ILIKE $${paramCount})`;
      queryParams.push(`%${search}%`);
    }

    // Add language filter
    if (language) {
      paramCount++;
      whereClause += ` AND p.language ILIKE $${paramCount}`;
      queryParams.push(`%${language}%`);
    }

    // Add featured filter
    if (featured === 'true') {
      whereClause += ' AND p.is_featured = true';
    }

    // Determine sort order
    let orderClause;
    switch (sortBy) {
      case 'stars':
        orderClause = 'ORDER BY p.stars_count DESC, p.created_at DESC';
        break;
      case 'name':
        orderClause = 'ORDER BY p.title ASC';
        break;
      case 'created_at':
      default:
        orderClause = 'ORDER BY p.created_at DESC';
        break;
    }

    // Add user ID for likes check
    paramCount++;
    const userIdParam = paramCount;
    queryParams.push(req.userId || null);

    // Add pagination params
    paramCount++;
    queryParams.push(limit);
    paramCount++;
    queryParams.push(offset);

    const result = await pool.query(
      `SELECT p.id, p.title, p.description, p.image_url, p.github_url, p.live_url,
              p.tags, p.language, p.is_featured, p.stars_count, p.forks_count,
              p.created_at, p.updated_at,
              u.username, u.full_name, u.image_url as user_image_url, u.is_verified,
              EXISTS(SELECT 1 FROM project_stars ps WHERE ps.project_id = p.id AND ps.user_id = $${userIdParam}) as is_starred_by_user
       FROM projects p
       JOIN users u ON p.user_id = u.id
       ${whereClause}
       ${orderClause}
       LIMIT $${paramCount - 1} OFFSET $${paramCount}`,
      queryParams
    );

    // Get total count for pagination
    const countResult = await pool.query(
      `SELECT COUNT(*) as total FROM projects p JOIN users u ON p.user_id = u.id ${whereClause}`,
      queryParams.slice(0, -2) // Remove limit and offset params
    );

    const total = parseInt(countResult.rows[0].total);
    const totalPages = Math.ceil(total / limit);

    res.json({
      success: true,
      data: {
        projects: result.rows.map(project => ({
          id: project.id,
          title: project.title,
          description: project.description,
          imageUrl: project.image_url,
          githubUrl: project.github_url,
          liveUrl: project.live_url,
          tags: project.tags,
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
          isStarredByUser: project.is_starred_by_user
        })),
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
      message: 'Failed to get projects'
    });
  }
});

// Get single project by ID
router.get('/:id', validateUUID, handleValidationErrors, optionalAuth, async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT p.id, p.title, p.description, p.image_url, p.github_url, p.live_url,
              p.tags, p.language, p.is_featured, p.stars_count, p.forks_count,
              p.created_at, p.updated_at,
              u.username, u.full_name, u.image_url as user_image_url, u.is_verified,
              EXISTS(SELECT 1 FROM project_stars ps WHERE ps.project_id = p.id AND ps.user_id = $2) as is_starred_by_user
       FROM projects p
       JOIN users u ON p.user_id = u.id
       WHERE p.id = $1 AND p.is_approved = true`,
      [id, req.userId || null]
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
          tags: project.tags,
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
          isStarredByUser: project.is_starred_by_user
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

    // Ensure user exists in database
    const userUpsertQuery = `
      INSERT INTO users (id, email, username, first_name, last_name, full_name, image_url)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      ON CONFLICT (id) DO UPDATE SET
        email = EXCLUDED.email,
        username = EXCLUDED.username,
        first_name = EXCLUDED.first_name,
        last_name = EXCLUDED.last_name,
        full_name = EXCLUDED.full_name,
        image_url = EXCLUDED.image_url,
        updated_at = CURRENT_TIMESTAMP
    `;
    
    await client.query(userUpsertQuery, [
      req.userId,
      req.user.email,
      req.user.username,
      req.user.firstName,
      req.user.lastName,
      req.user.fullName,
      req.user.imageUrl
    ]);

    // Create project
    const projectResult = await client.query(
      `INSERT INTO projects (user_id, title, description, github_url, live_url, tags, language)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id, title, description, github_url, live_url, tags, language, 
                 stars_count, forks_count, is_featured, is_approved, created_at, updated_at`,
      [req.userId, title, description, githubUrl, liveUrl, tags, language]
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
          tags: project.tags,
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
      message: 'Failed to create project'
    });
  } finally {
    client.release();
  }
});

// Update project
router.put('/:id', validateUUID, handleValidationErrors, requireAuth, getUserInfo, validateProject, handleValidationErrors, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      githubUrl,
      liveUrl,
      tags,
      language
    } = req.body;

    // Check if user owns the project
    const ownershipResult = await pool.query(
      'SELECT user_id FROM projects WHERE id = $1',
      [id]
    );

    if (ownershipResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    if (ownershipResult.rows[0].user_id !== req.userId) {
      return res.status(403).json({
        success: false,
        message: 'You can only update your own projects'
      });
    }

    const result = await pool.query(
      `UPDATE projects SET
        title = COALESCE($1, title),
        description = COALESCE($2, description),
        github_url = COALESCE($3, github_url),
        live_url = COALESCE($4, live_url),
        tags = COALESCE($5, tags),
        language = COALESCE($6, language),
        updated_at = CURRENT_TIMESTAMP
       WHERE id = $7
       RETURNING id, title, description, github_url, live_url, tags, language,
                 stars_count, forks_count, is_featured, is_approved, created_at, updated_at`,
      [title, description, githubUrl, liveUrl, tags, language, id]
    );

    const project = result.rows[0];

    res.json({
      success: true,
      message: 'Project updated successfully',
      data: {
        project: {
          id: project.id,
          title: project.title,
          description: project.description,
          githubUrl: project.github_url,
          liveUrl: project.live_url,
          tags: project.tags,
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
    console.error('Update project error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update project'
    });
  }
});

// Star/Unstar project
router.post('/:id/star', validateUUID, handleValidationErrors, requireAuth, async (req, res) => {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    const { id: projectId } = req.params;

    // Check if project exists
    const projectExists = await client.query(
      'SELECT id FROM projects WHERE id = $1 AND is_approved = true',
      [projectId]
    );
    
    if (projectExists.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Check if already starred
    const existingStar = await client.query(
      'SELECT id FROM project_stars WHERE user_id = $1 AND project_id = $2',
      [req.userId, projectId]
    );

    let isStarred;

    if (existingStar.rows.length > 0) {
      // Unstar
      await client.query(
        'DELETE FROM project_stars WHERE user_id = $1 AND project_id = $2',
        [req.userId, projectId]
      );
      
      await client.query(
        'UPDATE projects SET stars_count = stars_count - 1 WHERE id = $1',
        [projectId]
      );
      
      isStarred = false;
    } else {
      // Star
      await client.query(
        'INSERT INTO project_stars (user_id, project_id) VALUES ($1, $2)',
        [req.userId, projectId]
      );
      
      await client.query(
        'UPDATE projects SET stars_count = stars_count + 1 WHERE id = $1',
        [projectId]
      );
      
      isStarred = true;
    }

    // Get updated stars count
    const countResult = await client.query(
      'SELECT stars_count FROM projects WHERE id = $1',
      [projectId]
    );

    await client.query('COMMIT');

    res.json({
      success: true,
      message: isStarred ? 'Project starred' : 'Project unstarred',
      data: {
        isStarred,
        starsCount: countResult.rows[0].stars_count
      }
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Star/unstar project error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to star/unstar project'
    });
  } finally {
    client.release();
  }
});

// Delete project
router.delete('/:id', validateUUID, handleValidationErrors, requireAuth, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if user owns the project
    const ownershipResult = await pool.query(
      'SELECT user_id FROM projects WHERE id = $1',
      [id]
    );

    if (ownershipResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    if (ownershipResult.rows[0].user_id !== req.userId) {
      return res.status(403).json({
        success: false,
        message: 'You can only delete your own projects'
      });
    }

    // Soft delete by setting is_approved to false
    await pool.query(
      'UPDATE projects SET is_approved = FALSE, updated_at = CURRENT_TIMESTAMP WHERE id = $1',
      [id]
    );

    res.json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete project'
    });
  }
});

module.exports = router;