const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { auditLog } = require('../middleware/security');

// Community Site Admin Controls

// GET /community/posts - List all posts with moderation info
router.get('/posts', auditLog('VIEW_POSTS'), async (req, res) => {
  try {
    const { page = 1, limit = 20, status, search } = req.query;
    const offset = (page - 1) * limit;
    
    let whereClause = 'WHERE 1=1';
    const params = [];
    let paramCount = 0;
    
    if (status) {
      paramCount++;
      whereClause += ' AND p.is_archived = $' + paramCount;
      params.push(status === 'archived');
    }
    
    if (search) {
      paramCount++;
      whereClause += ' AND (p.content ILIKE $' + paramCount + ' OR u.username ILIKE $' + paramCount + ' OR u.full_name ILIKE $' + paramCount + ')';
      params.push('%' + search + '%');
    }
    
    const query = 'SELECT p.id, p.content, p.image_url, p.likes_count, p.comments_count, p.is_pinned, p.is_archived, p.created_at, p.updated_at, u.id as user_id, u.username, u.full_name, u.email, u.is_verified, (SELECT COUNT(*) FROM post_likes pl WHERE pl.post_id = p.id) as actual_likes, (SELECT COUNT(*) FROM post_comments pc WHERE pc.post_id = p.id) as actual_comments FROM posts p JOIN users u ON p.user_id = u.id ' + whereClause + ' ORDER BY p.created_at DESC LIMIT $' + (paramCount + 1) + ' OFFSET $' + (paramCount + 2);
    
    params.push(limit, offset);
    
    const result = await db.query(query, params);
    
    // Get total count
    const countQuery = 'SELECT COUNT(*) as total FROM posts p JOIN users u ON p.user_id = u.id ' + whereClause;
    
    const countResult = await db.query(countQuery, params.slice(0, -2));
    const total = parseInt(countResult.rows[0].total);
    
    res.json({
      success: true,
      data: {
        posts: result.rows,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          totalPages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching posts',
      error: error.message
    });
  }
});

// PUT /community/posts/:id/moderate - Moderate a post (pin, archive, etc.)
router.put('/posts/:id/moderate', auditLog('MODERATE_POST'), async (req, res) => {
  try {
    const { id } = req.params;
    const { action, reason } = req.body;
    
    let updateQuery;
    let actionDescription;
    
    switch (action) {
      case 'pin':
        updateQuery = 'UPDATE posts SET is_pinned = true, updated_at = CURRENT_TIMESTAMP WHERE id = $1';
        actionDescription = 'pinned';
        break;
      case 'unpin':
        updateQuery = 'UPDATE posts SET is_pinned = false, updated_at = CURRENT_TIMESTAMP WHERE id = $1';
        actionDescription = 'unpinned';
        break;
      case 'archive':
        updateQuery = 'UPDATE posts SET is_archived = true, updated_at = CURRENT_TIMESTAMP WHERE id = $1';
        actionDescription = 'archived';
        break;
      case 'unarchive':
        updateQuery = 'UPDATE posts SET is_archived = false, updated_at = CURRENT_TIMESTAMP WHERE id = $1';
        actionDescription = 'unarchived';
        break;
      default:
        return res.status(400).json({
          success: false,
          message: 'Invalid action. Use: pin, unpin, archive, unarchive'
        });
    }
    
    const result = await db.query(updateQuery + ' RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }
    
    console.log('Post ' + actionDescription + ' by admin: ' + req.user.username + ', Post ID: ' + id + ', Reason: ' + (reason || 'No reason provided'));
    
    res.json({
      success: true,
      message: 'Post ' + actionDescription + ' successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error moderating post:', error);
    res.status(500).json({
      success: false,
      message: 'Error moderating post',
      error: error.message
    });
  }
});

// DELETE /community/posts/:id - Delete a post permanently
router.delete('/posts/:id', auditLog('DELETE_POST'), async (req, res) => {
  const client = await db.pool.connect();
  
  try {
    await client.query('BEGIN');
    
    const { id } = req.params;
    const { reason } = req.body;
    
    const postResult = await client.query('SELECT * FROM posts WHERE id = $1', [id]);
    if (postResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }
    
    const post = postResult.rows[0];
    
    await client.query('DELETE FROM post_comments WHERE post_id = $1', [id]);
    await client.query('DELETE FROM post_likes WHERE post_id = $1', [id]);
    await client.query('DELETE FROM posts WHERE id = $1', [id]);
    
    await client.query('COMMIT');
    
    console.log('Post deleted by admin: ' + req.user.username + ', Post ID: ' + id + ', User: ' + post.user_id + ', Reason: ' + (reason || 'No reason provided'));
    
    res.json({
      success: true,
      message: 'Post deleted successfully'
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error deleting post:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting post',
      error: error.message
    });
  } finally {
    client.release();
  }
});

// GET /community/projects - List all projects with moderation info
router.get('/projects', auditLog('VIEW_PROJECTS'), async (req, res) => {
  try {
    const { page = 1, limit = 20, status, search } = req.query;
    const offset = (page - 1) * limit;
    
    let whereClause = 'WHERE 1=1';
    const params = [];
    let paramCount = 0;
    
    if (status) {
      paramCount++;
      if (status === 'approved') {
        whereClause += ' AND p.is_approved = $' + paramCount;
        params.push(true);
      } else if (status === 'pending') {
        whereClause += ' AND p.is_approved = $' + paramCount;
        params.push(false);
      } else if (status === 'featured') {
        whereClause += ' AND p.is_featured = $' + paramCount;
        params.push(true);
      }
    }
    
    if (search) {
      paramCount++;
      whereClause += ' AND (p.title ILIKE $' + paramCount + ' OR p.description ILIKE $' + paramCount + ' OR u.username ILIKE $' + paramCount + ')';
      params.push('%' + search + '%');
    }
    
    const query = 'SELECT p.id, p.title, p.description, p.github_url, p.live_url, p.image_url, p.tags, p.language, p.stars_count, p.is_featured, p.is_approved, p.created_at, p.updated_at, u.id as user_id, u.username, u.full_name, u.email, u.is_verified FROM projects p JOIN users u ON p.user_id = u.id ' + whereClause + ' ORDER BY p.created_at DESC LIMIT $' + (paramCount + 1) + ' OFFSET $' + (paramCount + 2);
    
    params.push(limit, offset);
    
    const result = await db.query(query, params);
    
    const countQuery = 'SELECT COUNT(*) as total FROM projects p JOIN users u ON p.user_id = u.id ' + whereClause;
    const countResult = await db.query(countQuery, params.slice(0, -2));
    const total = parseInt(countResult.rows[0].total);
    
    res.json({
      success: true,
      data: {
        projects: result.rows,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          totalPages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching projects',
      error: error.message
    });
  }
});

// PUT /community/projects/:id/moderate - Moderate a project
router.put('/projects/:id/moderate', auditLog('MODERATE_PROJECT'), async (req, res) => {
  try {
    const { id } = req.params;
    const { action, reason } = req.body;
    
    let updateQuery;
    let actionDescription;
    
    switch (action) {
      case 'approve':
        updateQuery = 'UPDATE projects SET is_approved = true, updated_at = CURRENT_TIMESTAMP WHERE id = $1';
        actionDescription = 'approved';
        break;
      case 'reject':
        updateQuery = 'UPDATE projects SET is_approved = false, updated_at = CURRENT_TIMESTAMP WHERE id = $1';
        actionDescription = 'rejected';
        break;
      case 'feature':
        updateQuery = 'UPDATE projects SET is_featured = true, updated_at = CURRENT_TIMESTAMP WHERE id = $1';
        actionDescription = 'featured';
        break;
      case 'unfeature':
        updateQuery = 'UPDATE projects SET is_featured = false, updated_at = CURRENT_TIMESTAMP WHERE id = $1';
        actionDescription = 'unfeatured';
        break;
      default:
        return res.status(400).json({
          success: false,
          message: 'Invalid action. Use: approve, reject, feature, unfeature'
        });
    }
    
    const result = await db.query(updateQuery + ' RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    console.log('Project ' + actionDescription + ' by admin: ' + req.user.username + ', Project ID: ' + id + ', Reason: ' + (reason || 'No reason provided'));
    
    res.json({
      success: true,
      message: 'Project ' + actionDescription + ' successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error moderating project:', error);
    res.status(500).json({
      success: false,
      message: 'Error moderating project',
      error: error.message
    });
  }
});

// GET /community/users/:id/activity - Get user activity summary
router.get('/users/:id/activity', auditLog('VIEW_USER_ACTIVITY'), async (req, res) => {
  try {
    const { id } = req.params;
    
    const userResult = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    if (userResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    const user = userResult.rows[0];
    
    const postsResult = await db.query('SELECT id, content, likes_count, comments_count, is_pinned, is_archived, created_at FROM posts WHERE user_id = $1 ORDER BY created_at DESC LIMIT 10', [id]);
    const projectsResult = await db.query('SELECT id, title, description, github_url, stars_count, is_featured, is_approved, created_at FROM projects WHERE user_id = $1 ORDER BY created_at DESC LIMIT 10', [id]);
    const commentsResult = await db.query('SELECT pc.id, pc.content, pc.created_at, p.id as post_id, p.content as post_content FROM post_comments pc JOIN posts p ON pc.post_id = p.id WHERE pc.user_id = $1 ORDER BY pc.created_at DESC LIMIT 10', [id]);
    const statsResult = await db.query('SELECT (SELECT COUNT(*) FROM posts WHERE user_id = $1) as total_posts, (SELECT COUNT(*) FROM projects WHERE user_id = $1) as total_projects, (SELECT COUNT(*) FROM post_comments WHERE user_id = $1) as total_comments, (SELECT COUNT(*) FROM post_likes WHERE user_id = $1) as total_likes_given, (SELECT COUNT(*) FROM post_likes pl JOIN posts p ON pl.post_id = p.id WHERE p.user_id = $1) as total_likes_received', [id]);
    
    res.json({
      success: true,
      data: {
        user,
        recent_posts: postsResult.rows,
        recent_projects: projectsResult.rows,
        recent_comments: commentsResult.rows,
        stats: statsResult.rows[0]
      }
    });
  } catch (error) {
    console.error('Error fetching user activity:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user activity',
      error: error.message
    });
  }
});

// PUT /community/users/:id/moderate - Moderate a user
router.put('/users/:id/moderate', auditLog('MODERATE_USER'), async (req, res) => {
  try {
    const { id } = req.params;
    const { action, reason } = req.body;
    
    let updateQuery;
    let actionDescription;
    
    switch (action) {
      case 'verify':
        updateQuery = 'UPDATE users SET is_verified = true, updated_at = CURRENT_TIMESTAMP WHERE id = $1';
        actionDescription = 'verified';
        break;
      case 'unverify':
        updateQuery = 'UPDATE users SET is_verified = false, updated_at = CURRENT_TIMESTAMP WHERE id = $1';
        actionDescription = 'unverified';
        break;
      case 'activate':
        updateQuery = 'UPDATE users SET is_active = true, updated_at = CURRENT_TIMESTAMP WHERE id = $1';
        actionDescription = 'activated';
        break;
      case 'deactivate':
        updateQuery = 'UPDATE users SET is_active = false, updated_at = CURRENT_TIMESTAMP WHERE id = $1';
        actionDescription = 'deactivated';
        break;
      default:
        return res.status(400).json({
          success: false,
          message: 'Invalid action. Use: verify, unverify, activate, deactivate'
        });
    }
    
    const result = await db.query(updateQuery + ' RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    console.log('User ' + actionDescription + ' by admin: ' + req.user.username + ', User ID: ' + id + ', Reason: ' + (reason || 'No reason provided'));
    
    res.json({
      success: true,
      message: 'User ' + actionDescription + ' successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error moderating user:', error);
    res.status(500).json({
      success: false,
      message: 'Error moderating user',
      error: error.message
    });
  }
});

// GET /community/analytics - Get community analytics
router.get('/analytics', auditLog('VIEW_ANALYTICS'), async (req, res) => {
  try {
    const { period = '30' } = req.query;
    
    // Use parameterized query to avoid template literal issues
    const analyticsQuery = 'SELECT (SELECT COUNT(*) FROM users WHERE created_at >= NOW() - INTERVAL \'' + period + ' days\') as new_users, (SELECT COUNT(*) FROM users WHERE is_active = true) as active_users, (SELECT COUNT(*) FROM users WHERE is_verified = true) as verified_users, (SELECT COUNT(*) FROM posts WHERE created_at >= NOW() - INTERVAL \'' + period + ' days\') as new_posts, (SELECT COUNT(*) FROM projects WHERE created_at >= NOW() - INTERVAL \'' + period + ' days\') as new_projects, (SELECT COUNT(*) FROM post_comments WHERE created_at >= NOW() - INTERVAL \'' + period + ' days\') as new_comments, (SELECT COUNT(*) FROM post_likes WHERE created_at >= NOW() - INTERVAL \'' + period + ' days\') as new_likes, (SELECT AVG(likes_count) FROM posts WHERE created_at >= NOW() - INTERVAL \'' + period + ' days\') as avg_likes_per_post, (SELECT AVG(comments_count) FROM posts WHERE created_at >= NOW() - INTERVAL \'' + period + ' days\') as avg_comments_per_post, (SELECT COUNT(*) FROM posts WHERE is_archived = true) as archived_posts, (SELECT COUNT(*) FROM posts WHERE is_pinned = true) as pinned_posts, (SELECT COUNT(*) FROM projects WHERE is_approved = false) as pending_projects, (SELECT COUNT(*) FROM projects WHERE is_featured = true) as featured_projects';
    
    const result = await db.query(analyticsQuery);
    
    const dailyActivityQuery = 'SELECT DATE(created_at) as date, COUNT(*) as posts, (SELECT COUNT(*) FROM projects WHERE DATE(created_at) = DATE(p.created_at)) as projects, (SELECT COUNT(*) FROM users WHERE DATE(created_at) = DATE(p.created_at)) as users FROM posts p WHERE created_at >= NOW() - INTERVAL \'' + period + ' days\' GROUP BY DATE(created_at) ORDER BY date DESC';
    
    const dailyResult = await db.query(dailyActivityQuery);
    
    res.json({
      success: true,
      data: {
        summary: result.rows[0],
        daily_activity: dailyResult.rows,
        period: period + ' days'
      }
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching analytics',
      error: error.message
    });
  }
});

module.exports = router;