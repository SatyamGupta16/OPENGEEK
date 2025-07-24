const express = require('express');
const { query, transaction } = require('../config/database');
const { authenticateToken, optionalAuth } = require('../middleware/auth');
const { validatePost, validateComment, validateUUID, validatePagination } = require('../middleware/validation');

const router = express.Router();

// Get all posts (community feed)
router.get('/', optionalAuth, validatePagination, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    
    const { type, author } = req.query;

    let whereClause = 'WHERE 1=1';
    let queryParams = [];
    let paramCount = 0;

    // Filter by post type
    if (type) {
      paramCount++;
      whereClause += ` AND p.post_type = $${paramCount}`;
      queryParams.push(type);
    }

    // Filter by author
    if (author) {
      paramCount++;
      whereClause += ` AND u.username = $${paramCount}`;
      queryParams.push(author);
    }

    const result = await query(
      `SELECT p.id, p.content, p.image_url, p.post_type, p.likes_count,
              p.comments_count, p.shares_count, p.is_pinned, p.created_at, p.updated_at,
              u.id as author_id, u.username, u.first_name, u.last_name, u.avatar_url,
              u.is_verified,
              CASE WHEN l.id IS NOT NULL THEN true ELSE false END as is_liked,
              CASE WHEN b.id IS NOT NULL THEN true ELSE false END as is_bookmarked
       FROM posts p
       JOIN users u ON p.author_id = u.id
       LEFT JOIN likes l ON p.id = l.post_id AND l.user_id = $${paramCount + 1}
       LEFT JOIN bookmarks b ON p.id = b.post_id AND b.user_id = $${paramCount + 1}
       ${whereClause}
       ORDER BY p.is_pinned DESC, p.created_at DESC
       LIMIT $${paramCount + 2} OFFSET $${paramCount + 3}`,
      [...queryParams, req.user?.id || null, limit, offset]
    );

    // Get total count for pagination
    const countResult = await query(
      `SELECT COUNT(*) FROM posts p JOIN users u ON p.author_id = u.id ${whereClause}`,
      queryParams
    );

    const totalCount = parseInt(countResult.rows[0].count);
    const totalPages = Math.ceil(totalCount / limit);

    res.json({
      success: true,
      data: {
        posts: result.rows.map(post => ({
          id: post.id,
          content: post.content,
          imageUrl: post.image_url,
          postType: post.post_type,
          likesCount: post.likes_count,
          commentsCount: post.comments_count,
          sharesCount: post.shares_count,
          isPinned: post.is_pinned,
          createdAt: post.created_at,
          updatedAt: post.updated_at,
          author: {
            id: post.author_id,
            username: post.username,
            firstName: post.first_name,
            lastName: post.last_name,
            avatarUrl: post.avatar_url,
            isVerified: post.is_verified
          },
          isLiked: post.is_liked,
          isBookmarked: post.is_bookmarked
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
    console.error('Get posts error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get single post by ID
router.get('/:id', optionalAuth, validateUUID, async (req, res) => {
  try {
    const { id } = req.params;

    const result = await query(
      `SELECT p.id, p.content, p.image_url, p.post_type, p.likes_count,
              p.comments_count, p.shares_count, p.is_pinned, p.created_at, p.updated_at,
              u.id as author_id, u.username, u.first_name, u.last_name, u.avatar_url,
              u.is_verified,
              CASE WHEN l.id IS NOT NULL THEN true ELSE false END as is_liked,
              CASE WHEN b.id IS NOT NULL THEN true ELSE false END as is_bookmarked
       FROM posts p
       JOIN users u ON p.author_id = u.id
       LEFT JOIN likes l ON p.id = l.post_id AND l.user_id = $2
       LEFT JOIN bookmarks b ON p.id = b.post_id AND b.user_id = $2
       WHERE p.id = $1`,
      [id, req.user?.id || null]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    const post = result.rows[0];

    res.json({
      success: true,
      data: {
        post: {
          id: post.id,
          content: post.content,
          imageUrl: post.image_url,
          postType: post.post_type,
          likesCount: post.likes_count,
          commentsCount: post.comments_count,
          sharesCount: post.shares_count,
          isPinned: post.is_pinned,
          createdAt: post.created_at,
          updatedAt: post.updated_at,
          author: {
            id: post.author_id,
            username: post.username,
            firstName: post.first_name,
            lastName: post.last_name,
            avatarUrl: post.avatar_url,
            isVerified: post.is_verified
          },
          isLiked: post.is_liked,
          isBookmarked: post.is_bookmarked
        }
      }
    });
  } catch (error) {
    console.error('Get post error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Create new post
router.post('/', authenticateToken, validatePost, async (req, res) => {
  try {
    const { content, imageUrl, postType = 'text' } = req.body;

    const result = await query(
      `INSERT INTO posts (content, image_url, post_type, author_id)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [content, imageUrl, postType, req.user.id]
    );

    const post = result.rows[0];

    res.status(201).json({
      success: true,
      message: 'Post created successfully',
      data: {
        post: {
          id: post.id,
          content: post.content,
          imageUrl: post.image_url,
          postType: post.post_type,
          likesCount: post.likes_count,
          commentsCount: post.comments_count,
          sharesCount: post.shares_count,
          isPinned: post.is_pinned,
          createdAt: post.created_at,
          updatedAt: post.updated_at
        }
      }
    });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Update post
router.put('/:id', authenticateToken, validateUUID, validatePost, async (req, res) => {
  try {
    const { id } = req.params;
    const { content, imageUrl } = req.body;

    // Check if user owns the post
    const ownershipResult = await query(
      'SELECT author_id FROM posts WHERE id = $1',
      [id]
    );

    if (ownershipResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    if (ownershipResult.rows[0].author_id !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'You can only edit your own posts'
      });
    }

    const result = await query(
      `UPDATE posts SET
        content = COALESCE($1, content),
        image_url = COALESCE($2, image_url),
        updated_at = CURRENT_TIMESTAMP
       WHERE id = $3
       RETURNING *`,
      [content, imageUrl, id]
    );

    const post = result.rows[0];

    res.json({
      success: true,
      message: 'Post updated successfully',
      data: {
        post: {
          id: post.id,
          content: post.content,
          imageUrl: post.image_url,
          postType: post.post_type,
          likesCount: post.likes_count,
          commentsCount: post.comments_count,
          sharesCount: post.shares_count,
          isPinned: post.is_pinned,
          createdAt: post.created_at,
          updatedAt: post.updated_at
        }
      }
    });
  } catch (error) {
    console.error('Update post error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Delete post
router.delete('/:id', authenticateToken, validateUUID, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if user owns the post or is admin/moderator
    const ownershipResult = await query(
      'SELECT author_id FROM posts WHERE id = $1',
      [id]
    );

    if (ownershipResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    const isOwner = ownershipResult.rows[0].author_id === req.user.id;
    const isModerator = ['admin', 'moderator'].includes(req.user.role);

    if (!isOwner && !isModerator) {
      return res.status(403).json({
        success: false,
        message: 'You can only delete your own posts'
      });
    }

    await query('DELETE FROM posts WHERE id = $1', [id]);

    res.json({
      success: true,
      message: 'Post deleted successfully'
    });
  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Like/Unlike post
router.post('/:id/like', authenticateToken, validateUUID, async (req, res) => {
  try {
    const { id: postId } = req.params;
    const userId = req.user.id;

    // Check if post exists
    const postExists = await query('SELECT id FROM posts WHERE id = $1', [postId]);
    if (postExists.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    // Check if already liked
    const existingLike = await query(
      'SELECT id FROM likes WHERE user_id = $1 AND post_id = $2',
      [userId, postId]
    );

    if (existingLike.rows.length > 0) {
      // Unlike
      await transaction(async (client) => {
        await client.query('DELETE FROM likes WHERE user_id = $1 AND post_id = $2', [userId, postId]);
        await client.query('UPDATE posts SET likes_count = likes_count - 1 WHERE id = $1', [postId]);
      });

      res.json({
        success: true,
        message: 'Post unliked successfully',
        data: { isLiked: false }
      });
    } else {
      // Like
      await transaction(async (client) => {
        await client.query('INSERT INTO likes (user_id, post_id) VALUES ($1, $2)', [userId, postId]);
        await client.query('UPDATE posts SET likes_count = likes_count + 1 WHERE id = $1', [postId]);
      });

      res.json({
        success: true,
        message: 'Post liked successfully',
        data: { isLiked: true }
      });
    }
  } catch (error) {
    console.error('Like/unlike post error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get post comments
router.get('/:id/comments', optionalAuth, validateUUID, validatePagination, async (req, res) => {
  try {
    const { id: postId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    const result = await query(
      `SELECT c.id, c.content, c.likes_count, c.created_at, c.updated_at,
              u.id as author_id, u.username, u.first_name, u.last_name, u.avatar_url,
              u.is_verified,
              CASE WHEN l.id IS NOT NULL THEN true ELSE false END as is_liked
       FROM comments c
       JOIN users u ON c.author_id = u.id
       LEFT JOIN likes l ON c.id = l.comment_id AND l.user_id = $4
       WHERE c.post_id = $1 AND c.parent_id IS NULL
       ORDER BY c.created_at ASC
       LIMIT $2 OFFSET $3`,
      [postId, limit, offset, req.user?.id || null]
    );

    const countResult = await query(
      'SELECT COUNT(*) FROM comments WHERE post_id = $1 AND parent_id IS NULL',
      [postId]
    );

    const totalCount = parseInt(countResult.rows[0].count);
    const totalPages = Math.ceil(totalCount / limit);

    res.json({
      success: true,
      data: {
        comments: result.rows.map(comment => ({
          id: comment.id,
          content: comment.content,
          likesCount: comment.likes_count,
          createdAt: comment.created_at,
          updatedAt: comment.updated_at,
          author: {
            id: comment.author_id,
            username: comment.username,
            firstName: comment.first_name,
            lastName: comment.last_name,
            avatarUrl: comment.avatar_url,
            isVerified: comment.is_verified
          },
          isLiked: comment.is_liked
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
    console.error('Get post comments error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Add comment to post
router.post('/:id/comments', authenticateToken, validateUUID, validateComment, async (req, res) => {
  try {
    const { id: postId } = req.params;
    const { content } = req.body;

    // Check if post exists
    const postExists = await query('SELECT id FROM posts WHERE id = $1', [postId]);
    if (postExists.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    const result = await transaction(async (client) => {
      // Create comment
      const commentResult = await client.query(
        'INSERT INTO comments (content, author_id, post_id) VALUES ($1, $2, $3) RETURNING *',
        [content, req.user.id, postId]
      );

      // Update post comments count
      await client.query(
        'UPDATE posts SET comments_count = comments_count + 1 WHERE id = $1',
        [postId]
      );

      return commentResult.rows[0];
    });

    res.status(201).json({
      success: true,
      message: 'Comment added successfully',
      data: {
        comment: {
          id: result.id,
          content: result.content,
          likesCount: result.likes_count,
          createdAt: result.created_at,
          updatedAt: result.updated_at
        }
      }
    });
  } catch (error) {
    console.error('Add comment error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;