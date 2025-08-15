const express = require('express');
const router = express.Router();
const db = require('../config/database');

// GET /dashboard/stats → Returns dashboard statistics from existing schema
router.get('/stats', async (req, res) => {
  try {
    console.log('📊 Fetching dashboard statistics from existing database...');

    // Get total users count
    const usersResult = await db.query('SELECT COUNT(*) as count FROM users');
    const totalUsers = parseInt(usersResult.rows[0].count);

    // Get total posts count (content)
    const postsResult = await db.query('SELECT COUNT(*) as count FROM posts');
    const totalPosts = parseInt(postsResult.rows[0].count);

    // Get total projects count
    const projectsResult = await db.query('SELECT COUNT(*) as count FROM projects');
    const totalProjects = parseInt(projectsResult.rows[0].count);

    // Get active users count (users who are marked as active)
    const activeUsersResult = await db.query('SELECT COUNT(*) as count FROM users WHERE is_active = true');
    const activeUsers = parseInt(activeUsersResult.rows[0].count);

    // Get verified users count
    const verifiedUsersResult = await db.query('SELECT COUNT(*) as count FROM users WHERE is_verified = true');
    const verifiedUsers = parseInt(verifiedUsersResult.rows[0].count);

    // Get new signups this month
    const newSignupsResult = await db.query(`
      SELECT COUNT(*) as count 
      FROM users 
      WHERE created_at >= DATE_TRUNC('month', NOW())
    `);
    const newSignups = parseInt(newSignupsResult.rows[0].count);

    // Get recent activity stats
    const recentPostsResult = await db.query(`
      SELECT COUNT(*) as count 
      FROM posts 
      WHERE created_at >= NOW() - INTERVAL '30 days'
    `);
    const recentPosts = parseInt(recentPostsResult.rows[0].count);

    const recentProjectsResult = await db.query(`
      SELECT COUNT(*) as count 
      FROM projects 
      WHERE created_at >= NOW() - INTERVAL '30 days'
    `);
    const recentProjects = parseInt(recentProjectsResult.rows[0].count);

    // Get monthly user registration data for chart
    const monthlySignupsResult = await db.query(`
      SELECT 
        DATE_TRUNC('month', created_at) as month,
        COUNT(*) as count
      FROM users 
      WHERE created_at >= NOW() - INTERVAL '6 months'
      GROUP BY DATE_TRUNC('month', created_at)
      ORDER BY month
    `);

    const monthlyPostsResult = await db.query(`
      SELECT 
        DATE_TRUNC('month', created_at) as month,
        COUNT(*) as count
      FROM posts 
      WHERE created_at >= NOW() - INTERVAL '6 months'
      GROUP BY DATE_TRUNC('month', created_at)
      ORDER BY month
    `);

    res.json({
      success: true,
      data: {
        total_users: totalUsers,
        total_content: totalPosts + totalProjects, // Combined posts and projects as content
        total_posts: totalPosts,
        total_projects: totalProjects,
        active_users: activeUsers,
        verified_users: verifiedUsers,
        new_signups_this_month: newSignups,
        recent_posts: recentPosts,
        recent_projects: recentProjects,
        monthly_signups: monthlySignupsResult.rows,
        monthly_posts: monthlyPostsResult.rows
      }
    });
  } catch (error) {
    console.error('❌ Dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard statistics',
      error: error.message
    });
  }
});

module.exports = router;
