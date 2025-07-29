require('dotenv').config();
const { pool } = require('./config/database');

async function addSampleProjects() {
  console.log('🌱 Adding sample projects...');
  
  try {
    // First, let's create a sample user
    const sampleUserId = 'user_sample_demo';
    await pool.query(`
      INSERT INTO users (id, email, username, first_name, last_name, full_name, image_url)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      ON CONFLICT (id) DO NOTHING
    `, [
      sampleUserId,
      'demo@opengeek.com',
      'demouser',
      'Demo',
      'User',
      'Demo User',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    ]);

    // Add sample projects
    const projects = [
      {
        title: 'React Task Manager',
        description: 'A modern task management application built with React, TypeScript, and Tailwind CSS. Features include drag-and-drop functionality, real-time updates, and a clean, intuitive interface.',
        github_url: 'https://github.com/example/react-task-manager',
        live_url: 'https://react-task-manager.demo.com',
        tags: ['react', 'typescript', 'tailwind', 'productivity'],
        language: 'TypeScript'
      },
      {
        title: 'Python Data Visualizer',
        description: 'An interactive data visualization tool built with Python, Flask, and D3.js. Supports multiple chart types, real-time data streaming, and export functionality.',
        github_url: 'https://github.com/example/python-data-viz',
        live_url: 'https://data-viz.demo.com',
        tags: ['python', 'flask', 'd3js', 'data-science'],
        language: 'Python'
      },
      {
        title: 'Vue.js E-commerce Store',
        description: 'A full-featured e-commerce platform built with Vue.js, Nuxt.js, and Stripe integration. Features shopping cart, user authentication, and admin dashboard.',
        github_url: 'https://github.com/example/vue-ecommerce',
        live_url: 'https://vue-store.demo.com',
        tags: ['vue', 'nuxt', 'ecommerce', 'stripe'],
        language: 'Vue'
      }
    ];

    for (const project of projects) {
      await pool.query(`
        INSERT INTO projects (
          user_id, title, description, github_url, live_url, 
          tags, language, is_approved, stars_count, forks_count
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      `, [
        sampleUserId,
        project.title,
        project.description,
        project.github_url,
        project.live_url,
        project.tags,
        project.language,
        true, // approved
        Math.floor(Math.random() * 50) + 10, // random stars
        Math.floor(Math.random() * 10) + 1   // random forks
      ]);
    }

    console.log('✅ Sample projects added successfully!');
    
    // Check total count
    const countResult = await pool.query('SELECT COUNT(*) as count FROM projects WHERE is_approved = true');
    console.log(`📊 Total approved projects: ${countResult.rows[0].count}`);
    
  } catch (error) {
    console.error('❌ Error adding projects:', error);
  } finally {
    await pool.end();
  }
}

addSampleProjects();