const express = require('express');
const { query, transaction } = require('../config/database');
const { authenticateToken, optionalAuth } = require('../middleware/auth');
const { validateProject, validateUUID, validatePagination } = require('../middleware/validation');

const router = express.Router();

// Get all projects with filtering and pagination
router.get('/', optionalAuth, validatePagination, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const offset = (page - 1) * limit;
    
    const { search, language, difficulty, featured, sortBy = 'stars' } = req.query;

    let whereClause = 'WHERE p.status = $1';
    let queryParams = ['active'];
    let paramCount = 1;

    // Add search filter
    if (search) {
      paramCount++;
      whereClause += ` AND (p.title ILIKE $${paramCount} OR p.description ILIKE $${paramCount} OR $${paramCount} = ANY(p.tags))`;
      queryParams.push(`%${search}%`);
    }

    // Add language filter
    if (language) {
      paramCount++;
      whereClause += ` AND p.language ILIKE $${paramCount}`;
      queryParams.push(`%${language}%`);
    }

    // Add difficulty filter
    if (difficulty) {
      paramCount++;
      whereClause += ` AND p.difficulty_level = $${paramCount}`;
      queryParams.push(difficulty);
    }

    // Add featured filter
    if (featured === 'true') {
      whereClause += ' AND p.is_featured = true';
    }

    // Determine sort order
    let orderClause;
    switch (sortBy) {
      case 'recent':
        orderClause = 'ORDER BY p.created_at DESC';
        break;
      case 'name':
        orderClause = 'ORDER BY p.title ASC';
        break;
      case 'stars':
      default:
        orderClause = 'ORDER BY p.stars_count DESC, p.created_at DESC';
        break;
    }

    const result = await query(
      `SELECT p.id, p.title, p.description, p.image_url, p.github_url, p.live_url,
              p.tags, p.language, p.difficulty_level, p.is_featured, p.stars_count,
              p.forks_count, p.views_count, p.created_at, p.updated_at,
              u.id as author_id, u.username, u.first_name, u.last_name, u.avatar_url,
              CASE WHEN l.id IS NOT NULL THEN true ELSE false END as is_liked,
              CASE WHEN b.id IS NOT NULL THEN true ELSE false END as is_bookmarked
       FROM projects p
       JOIN users u ON p.author_id = u.id
       LEFT JOIN likes l ON p.id = l.project_id AND l.user_id = $${paramCount + 1}
       LEFT JOIN bookmarks b ON p.id = b.project_id AND b.user_id = $${paramCount + 1}
       ${whereClause}
       ${orderClause}
       LIMIT $${paramCount + 2} OFFSET $${paramCount + 3}`,
      [...queryParams, req.user?.id || null, limit, offset]
    );

    // Get total count for pagination
    const countResult = await query(
      `SELECT COUNT(*) FROM projects p JOIN users u ON p.author_id = u.id ${whereClause}`,
      queryParams
    );

    const totalCount = parseInt(countResult.rows[0].count);
    const totalPages = Math.ceil(totalCount / limit);

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
          difficultyLevel: project.difficulty_level,
          isFeatured: project.is_featured,
          starsCount: project.stars_count,
          forksCount: project.forks_count,
          viewsCount: project.views_count,
          createdAt: project.created_at,
          updatedAt: project.updated_at,
          author: {
            id: project.author_id,
            username: project.username,
            firstName: project.first_name,
            lastName: project.last_name,
            avatarUrl: project.avatar_url
          },
          isLiked: project.is_liked,
          isBookmarked: project.is_bookmarked
        })),
        pagination: {
          currentPage: page,
          totalPages,
          totalCount,
          hasNext: page < totalPages,
          hasPrev: page > 1
        }
      }
    });
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get single project by ID
router.get('/:id', optionalAuth, validateUUID, async (req, res) => {
  try {
    const { id } = req.params;

    // Increment view count
    await query('UPDATE projects SET views_count = views_count + 1 WHERE id = $1', [id]);

    const result = await query(
      `SELECT p.id, p.title, p.description, p.content, p.image_url, p.github_url,
              p.live_url, p.tags, p.language, p.difficulty_level, p.status,
              p.is_featured, p.stars_count, p.forks_count, p.views_count,
              p.created_at, p.updated_at,
              u.id as author_id, u.username, u.first_name, u.last_name, u.avatar_url,
              u.bio, u.is_verified,
              CASE WHEN l.id IS NOT NULL THEN true ELSE false END as is_liked,
              CASE WHEN b.id IS NOT NULL THEN true ELSE false END as is_bookmarked
       FROM projects p
       JOIN users u ON p.author_id = u.id
       LEFT JOIN likes l ON p.id = l.project_id AND l.user_id = $2
       LEFT JOIN bookmarks b ON p.id = b.project_id AND b.user_id = $2
       WHERE p.id = $1`,
      [id, req.user?.id || null]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    const project = result.rows[0];

    // Get project collaborators
    const collaboratorsResult = await query(
      `SELECT u.id, u.username, u.first_name, u.last_name, u.avatar_url,
              pc.role, pc.joined_at
       FROM project_collaborators pc
       JOIN users u ON pc.user_id = u.id
       WHERE pc.project_id = $1
       ORDER BY pc.joined_at ASC`,
      [id]
    );

    res.json({
      success: true,
      data: {
        project: {
          id: project.id,
          title: project.title,
          description: project.description,
          content: project.content,
          imageUrl: project.image_url,
          githubUrl: project.github_url,
          liveUrl: project.live_url,
          tags: project.tags,
          language: project.language,
          difficultyLevel: project.difficulty_level,
          status: project.status,
          isFeatured: project.is_featured,
          starsCount: project.stars_count,
          forksCount: project.forks_count,
          viewsCount: project.views_count,
          createdAt: project.created_at,
          updatedAt: project.updated_at,
          author: {
            id: project.author_id,
            username: project.username,
            firstName: project.first_name,
            lastName: project.last_name,
            avatarUrl: project.avatar_url,
            bio: project.bio,
            isVerified: project.is_verified
          },
          collaborators: collaboratorsResult.rows.map(collab => ({
            id: collab.id,
            username: collab.username,
            firstName: collab.first_name,
            lastName: collab.last_name,
            avatarUrl: collab.avatar_url,
            role: collab.role,
            joinedAt: collab.joined_at
          })),
          isLiked: project.is_liked,
          isBookmarked: project.is_bookmarked
        }
      }
    });
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Create new project
router.post('/', authenticateToken, validateProject, async (req, res) => {
  try {
    const {
      title,
      description,
      content,
      imageUrl,
      githubUrl,
      liveUrl,
      tags,
      language,
      difficultyLevel = 'beginner'
    } = req.body;

    const result = await transaction(async (client) => {
      // Create project
      const projectResult = await client.query(
        `INSERT INTO projects (title, description, content, image_url, github_url,
                              live_url, tags, language, difficulty_level, author_id)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
         RETURNING *`,
        [title, description, content, imageUrl, githubUrl, liveUrl, tags, language, difficultyLevel, req.user.id]
      );

      const project = projectResult.rows[0];

      // Add author as owner collaborator
      await client.query(
        'INSERT INTO project_collaborators (project_id, user_id, role) VALUES ($1, $2, $3)',
        [project.id, req.user.id, 'owner']
      );

      return project;
    });

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: {
        project: {
          id: result.id,
          title: result.title,
          description: result.description,
          content: result.content,
          imageUrl: result.image_url,
          githubUrl: result.github_url,
          liveUrl: result.live_url,
          tags: result.tags,
          language: result.language,
          difficultyLevel: result.difficulty_level,
          status: result.status,
          isFeatured: result.is_featured,
          starsCount: result.stars_count,
          forksCount: result.forks_count,
          viewsCount: result.views_count,
          createdAt: result.created_at,
          updatedAt: result.updated_at
        }
      }
    });
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Update project
router.put('/:id', authenticateToken, validateUUID, validateProject, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      content,
      imageUrl,
      githubUrl,
      liveUrl,
      tags,
      language,
      difficultyLevel,
      status
    } = req.body;

    // Check if user owns the project or is a collaborator
    const ownershipResult = await query(
      `SELECT p.author_id, pc.role FROM projects p
       LEFT JOIN project_collaborators pc ON p.id = pc.project_id AND pc.user_id = $2
       WHERE p.id = $1`,
      [id, req.user.id]
    );

    if (ownershipResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    const { author_id, role } = ownershipResult.rows[0];
    const isOwner = author_id === req.user.id;
    const isMaintainer = role === 'maintainer';

    if (!isOwner && !isMaintainer) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to update this project'
      });
    }

    const result = await query(
      `UPDATE projects SET
        title = COALESCE($1, title),
        description = COALESCE($2, description),
        content = COALESCE($3, content),
        image_url = COALESCE($4, image_url),
        github_url = COALESCE($5, github_url),
        live_url = COALESCE($6, live_url),
        tags = COALESCE($7, tags),
        language = COALESCE($8, language),
        difficulty_level = COALESCE($9, difficulty_level),
        status = COALESCE($10, status),
        updated_at = CURRENT_TIMESTAMP
       WHERE id = $11
       RETURNING *`,
      [title, description, content, imageUrl, githubUrl, liveUrl, tags, language, difficultyLevel, status, id]
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
          content: project.content,
          imageUrl: project.image_url,
          githubUrl: project.github_url,
          liveUrl: project.live_url,
          tags: project.tags,
          language: project.language,
          difficultyLevel: project.difficulty_level,
          status: project.status,
          isFeatured: project.is_featured,
          starsCount: project.stars_count,
          forksCount: project.forks_count,
          viewsCount: project.views_count,
          createdAt: project.created_at,
          updatedAt: project.updated_at
        }
      }
    });
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Like/Unlike project
router.post('/:id/like', authenticateToken, validateUUID, async (req, res) => {
  try {
    const { id: projectId } = req.params;
    const userId = req.user.id;

    // Check if project exists
    const projectExists = await query('SELECT id FROM projects WHERE id = $1', [projectId]);
    if (projectExists.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Check if already liked
    const existingLike = await query(
      'SELECT id FROM likes WHERE user_id = $1 AND project_id = $2',
      [userId, projectId]
    );

    if (existingLike.rows.length > 0) {
      // Unlike
      await transaction(async (client) => {
        await client.query('DELETE FROM likes WHERE user_id = $1 AND project_id = $2', [userId, projectId]);
        await client.query('UPDATE projects SET stars_count = stars_count - 1 WHERE id = $1', [projectId]);
      });

      res.json({
        success: true,
        message: 'Project unliked successfully',
        data: { isLiked: false }
      });
    } else {
      // Like
      await transaction(async (client) => {
        await client.query('INSERT INTO likes (user_id, project_id) VALUES ($1, $2)', [userId, projectId]);
        await client.query('UPDATE projects SET stars_count = stars_count + 1 WHERE id = $1', [projectId]);
      });

      res.json({
        success: true,
        message: 'Project liked successfully',
        data: { isLiked: true }
      });
    }
  } catch (error) {
    console.error('Like/unlike project error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Bookmark/Unbookmark project
router.post('/:id/bookmark', authenticateToken, validateUUID, async (req, res) => {
  try {
    const { id: projectId } = req.params;
    const userId = req.user.id;

    // Check if project exists
    const projectExists = await query('SELECT id FROM projects WHERE id = $1', [projectId]);
    if (projectExists.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Check if already bookmarked
    const existingBookmark = await query(
      'SELECT id FROM bookmarks WHERE user_id = $1 AND project_id = $2',
      [userId, projectId]
    );

    if (existingBookmark.rows.length > 0) {
      // Remove bookmark
      await query('DELETE FROM bookmarks WHERE user_id = $1 AND project_id = $2', [userId, projectId]);

      res.json({
        success: true,
        message: 'Project unbookmarked successfully',
        data: { isBookmarked: false }
      });
    } else {
      // Add bookmark
      await query('INSERT INTO bookmarks (user_id, project_id) VALUES ($1, $2)', [userId, projectId]);

      res.json({
        success: true,
        message: 'Project bookmarked successfully',
        data: { isBookmarked: true }
      });
    }
  } catch (error) {
    console.error('Bookmark/unbookmark project error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;