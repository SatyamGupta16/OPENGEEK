require('dotenv').config();
const { pool } = require('../config/database');

const sampleProjects = [
  {
    title: 'React Task Manager',
    description: 'A modern task management application built with React, TypeScript, and Tailwind CSS. Features include drag-and-drop functionality, real-time updates, and a clean, intuitive interface.',
    github_url: 'https://github.com/example/react-task-manager',
    live_url: 'https://react-task-manager.demo.com',
    tags: ['react', 'typescript', 'tailwind', 'productivity'],
    language: 'TypeScript',
    is_featured: true
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
    title: 'Go Microservices API',
    description: 'A scalable microservices architecture built with Go, Docker, and Kubernetes. Includes authentication, rate limiting, and comprehensive monitoring.',
    github_url: 'https://github.com/example/go-microservices',
    tags: ['go', 'microservices', 'docker', 'kubernetes'],
    language: 'Go'
  },
  {
    title: 'Vue.js E-commerce Store',
    description: 'A full-featured e-commerce platform built with Vue.js, Nuxt.js, and Stripe integration. Features shopping cart, user authentication, and admin dashboard.',
    github_url: 'https://github.com/example/vue-ecommerce',
    live_url: 'https://vue-store.demo.com',
    tags: ['vue', 'nuxt', 'ecommerce', 'stripe'],
    language: 'Vue',
    is_featured: true
  },
  {
    title: 'Rust CLI Tool',
    description: 'A high-performance command-line tool for file processing and text manipulation. Built with Rust for maximum speed and memory safety.',
    github_url: 'https://github.com/example/rust-cli-tool',
    tags: ['rust', 'cli', 'performance', 'tools'],
    language: 'Rust'
  },
  {
    title: 'Next.js Blog Platform',
    description: 'A modern blog platform with MDX support, dark mode, and SEO optimization. Built with Next.js, TypeScript, and Tailwind CSS.',
    github_url: 'https://github.com/example/nextjs-blog',
    live_url: 'https://nextjs-blog.demo.com',
    tags: ['nextjs', 'blog', 'mdx', 'seo'],
    language: 'TypeScript'
  }
];

async function seedProjects() {
  console.log('🌱 Seeding sample projects...');
  
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    // Create a sample user if it doesn't exist
    const sampleUserId = 'user_sample_projects';
    await client.query(`
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
    
    // Insert sample projects
    for (const project of sampleProjects) {
      await client.query(`
        INSERT INTO projects (
          user_id, title, description, github_url, live_url, 
          tags, language, is_featured, is_approved, stars_count, forks_count
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        ON CONFLICT DO NOTHING
      `, [
        sampleUserId,
        project.title,
        project.description,
        project.github_url,
        project.live_url || null,
        project.tags,
        project.language,
        project.is_featured || false,
        true, // Auto-approve sample projects
        Math.floor(Math.random() * 100) + 10, // Random stars between 10-110
        Math.floor(Math.random() * 20) + 1    // Random forks between 1-21
      ]);
    }
    
    await client.query('COMMIT');
    console.log('✅ Sample projects seeded successfully!');
    
    // Show summary
    const countResult = await client.query('SELECT COUNT(*) as count FROM projects WHERE is_approved = true');
    console.log(`📊 Total approved projects: ${countResult.rows[0].count}`);
    
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Error seeding projects:', error);
  } finally {
    client.release();
    await pool.end();
  }
}

// Run seeding if this file is executed directly
if (require.main === module) {
  seedProjects();
}

module.exports = { seedProjects };