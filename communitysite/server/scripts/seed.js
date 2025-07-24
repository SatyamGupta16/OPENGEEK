const bcrypt = require('bcryptjs');
const { query } = require('../config/database');

const seedData = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 12);
    await query(
      `INSERT INTO users (username, email, password_hash, first_name, last_name, role, is_verified)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       ON CONFLICT (email) DO NOTHING`,
      ['admin', 'admin@opengeek.in', adminPassword, 'Admin', 'User', 'admin', true]
    );

    // Create sample users
    const sampleUsers = [
      {
        username: 'johndoe',
        email: 'john@example.com',
        firstName: 'John',
        lastName: 'Doe',
        bio: 'Full-stack developer passionate about React and Node.js',
        skills: ['JavaScript', 'React', 'Node.js', 'TypeScript'],
        githubUsername: 'johndoe'
      },
      {
        username: 'sarahwilson',
        email: 'sarah@example.com',
        firstName: 'Sarah',
        lastName: 'Wilson',
        bio: 'AI/ML enthusiast and Python developer',
        skills: ['Python', 'Machine Learning', 'TensorFlow', 'Data Science'],
        githubUsername: 'sarahwilson'
      },
      {
        username: 'mikechen',
        email: 'mike@example.com',
        firstName: 'Mike',
        lastName: 'Chen',
        bio: 'DevOps engineer and cloud architect',
        skills: ['Docker', 'Kubernetes', 'AWS', 'Go'],
        githubUsername: 'mikechen'
      },
      {
        username: 'emilydavis',
        email: 'emily@example.com',
        firstName: 'Emily',
        lastName: 'Davis',
        bio: 'Mobile app developer specializing in React Native',
        skills: ['React Native', 'iOS', 'Android', 'Firebase'],
        githubUsername: 'emilydavis'
      },
      {
        username: 'davidrodriguez',
        email: 'david@example.com',
        firstName: 'David',
        lastName: 'Rodriguez',
        bio: 'Backend developer and system architect',
        skills: ['Java', 'Spring Boot', 'PostgreSQL', 'Microservices'],
        githubUsername: 'davidrodriguez'
      },
      {
        username: 'lisapark',
        email: 'lisa@example.com',
        firstName: 'Lisa',
        lastName: 'Park',
        bio: 'Data visualization expert and frontend developer',
        skills: ['D3.js', 'Vue.js', 'Python', 'Data Visualization'],
        githubUsername: 'lisapark'
      }
    ];

    const userIds = [];
    const defaultPassword = await bcrypt.hash('password123', 12);

    for (const user of sampleUsers) {
      const result = await query(
        `INSERT INTO users (username, email, password_hash, first_name, last_name, bio, skills, github_username)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         ON CONFLICT (email) DO UPDATE SET
           bio = EXCLUDED.bio,
           skills = EXCLUDED.skills,
           github_username = EXCLUDED.github_username
         RETURNING id`,
        [user.username, user.email, defaultPassword, user.firstName, user.lastName, 
         user.bio, user.skills, user.githubUsername]
      );
      userIds.push(result.rows[0].id);
    }

    // Create sample projects
    const sampleProjects = [
      {
        title: 'React Component Library',
        description: 'A comprehensive UI component library built with React, TypeScript, and Tailwind CSS. Features 50+ components with full accessibility support.',
        content: 'This project aims to provide developers with a complete set of reusable UI components...',
        imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
        githubUrl: 'https://github.com/johndoe/react-ui-lib',
        liveUrl: 'https://react-ui-lib.vercel.app',
        tags: ['React', 'TypeScript', 'Tailwind CSS', 'UI Library'],
        language: 'TypeScript',
        difficultyLevel: 'intermediate',
        isFeatured: true,
        starsCount: 1247,
        forksCount: 89,
        authorIndex: 0
      },
      {
        title: 'AI Chat Application',
        description: 'Real-time chat application with AI integration using OpenAI API. Features include message history, user authentication, and responsive design.',
        content: 'Built with Next.js and Socket.io for real-time communication...',
        imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
        githubUrl: 'https://github.com/sarahwilson/ai-chat-app',
        liveUrl: 'https://ai-chat-demo.vercel.app',
        tags: ['Next.js', 'OpenAI', 'Socket.io', 'MongoDB'],
        language: 'JavaScript',
        difficultyLevel: 'advanced',
        isFeatured: true,
        starsCount: 892,
        forksCount: 156,
        authorIndex: 1
      },
      {
        title: 'E-commerce Dashboard',
        description: 'Modern admin dashboard for e-commerce platforms with analytics, inventory management, and order tracking capabilities.',
        content: 'A comprehensive dashboard solution for e-commerce businesses...',
        imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
        githubUrl: 'https://github.com/mikechen/ecommerce-dashboard',
        liveUrl: 'https://ecommerce-dash.netlify.app',
        tags: ['Vue.js', 'Node.js', 'PostgreSQL', 'Chart.js'],
        language: 'Vue',
        difficultyLevel: 'intermediate',
        isFeatured: false,
        starsCount: 634,
        forksCount: 78,
        authorIndex: 2
      },
      {
        title: 'Mobile Fitness Tracker',
        description: 'Cross-platform mobile app for fitness tracking with workout plans, progress monitoring, and social features.',
        content: 'A comprehensive fitness tracking application...',
        imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop',
        githubUrl: 'https://github.com/emilydavis/fitness-tracker',
        liveUrl: null,
        tags: ['React Native', 'Firebase', 'Redux', 'Health API'],
        language: 'JavaScript',
        difficultyLevel: 'intermediate',
        isFeatured: true,
        starsCount: 445,
        forksCount: 67,
        authorIndex: 3
      },
      {
        title: 'DevOps Automation Tool',
        description: 'CLI tool for automating deployment pipelines with Docker, Kubernetes, and CI/CD integration.',
        content: 'Streamline your deployment process with this powerful CLI tool...',
        imageUrl: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=400&fit=crop',
        githubUrl: 'https://github.com/davidrodriguez/devops-cli',
        liveUrl: null,
        tags: ['Go', 'Docker', 'Kubernetes', 'CLI'],
        language: 'Go',
        difficultyLevel: 'advanced',
        isFeatured: false,
        starsCount: 789,
        forksCount: 123,
        authorIndex: 4
      },
      {
        title: 'Data Visualization Platform',
        description: 'Interactive data visualization platform with support for multiple chart types, real-time updates, and collaborative features.',
        content: 'Create stunning data visualizations with this powerful platform...',
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
        githubUrl: 'https://github.com/lisapark/data-viz-platform',
        liveUrl: 'https://dataviz-demo.herokuapp.com',
        tags: ['D3.js', 'Python', 'Flask', 'WebSocket'],
        language: 'Python',
        difficultyLevel: 'advanced',
        isFeatured: false,
        starsCount: 567,
        forksCount: 89,
        authorIndex: 5
      }
    ];

    const projectIds = [];
    for (const project of sampleProjects) {
      const result = await query(
        `INSERT INTO projects (title, description, content, image_url, github_url, live_url,
                              tags, language, difficulty_level, is_featured, stars_count,
                              forks_count, author_id)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
         ON CONFLICT DO NOTHING
         RETURNING id`,
        [project.title, project.description, project.content, project.imageUrl,
         project.githubUrl, project.liveUrl, project.tags, project.language,
         project.difficultyLevel, project.isFeatured, project.starsCount,
         project.forksCount, userIds[project.authorIndex]]
      );
      
      if (result.rows.length > 0) {
        projectIds.push(result.rows[0].id);
        
        // Add project owner as collaborator
        await query(
          'INSERT INTO project_collaborators (project_id, user_id, role) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING',
          [result.rows[0].id, userIds[project.authorIndex], 'owner']
        );
      }
    }

    // Create sample posts
    const samplePosts = [
      {
        content: 'Just finished building my first React component library! 🎉 Check it out and let me know what you think. #webdev #react #opensource',
        postType: 'text',
        authorIndex: 0
      },
      {
        content: 'Working on a new project using Next.js and Tailwind CSS. The developer experience is amazing! 💻✨ #nextjs #tailwindcss #coding',
        postType: 'text',
        authorIndex: 1
      },
      {
        content: 'Just deployed my first full-stack application! Built with Node.js, Express, and MongoDB. Learned so much during this journey. 🚀 #nodejs #webdev #mongodb',
        postType: 'text',
        authorIndex: 2
      },
      {
        content: 'Learning TypeScript has been a game changer for my development workflow. The type safety and IntelliSense support make coding so much more enjoyable! 🔥 #typescript #javascript #webdev',
        postType: 'text',
        authorIndex: 3
      },
      {
        content: 'Just open-sourced my CLI tool for managing environment variables across different projects. Hope it helps other developers! 🛠️ #opensource #cli #devtools',
        postType: 'text',
        authorIndex: 4
      }
    ];

    for (const post of samplePosts) {
      await query(
        `INSERT INTO posts (content, post_type, author_id)
         VALUES ($1, $2, $3)
         ON CONFLICT DO NOTHING`,
        [post.content, post.postType, userIds[post.authorIndex]]
      );
    }

    // Create some follow relationships
    const followRelationships = [
      [0, 1], [0, 2], [1, 0], [1, 3], [2, 0], [2, 4], [3, 1], [3, 5], [4, 2], [5, 3]
    ];

    for (const [followerIndex, followingIndex] of followRelationships) {
      await query(
        'INSERT INTO follows (follower_id, following_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
        [userIds[followerIndex], userIds[followingIndex]]
      );
    }

    console.log('✅ Database seeding completed successfully!');
    console.log(`
📊 Seeded data:
- 1 Admin user (admin@opengeek.in / admin123)
- ${sampleUsers.length} Sample users (password: password123)
- ${sampleProjects.length} Sample projects
- ${samplePosts.length} Sample posts
- ${followRelationships.length} Follow relationships
    `);

  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

// Run seeding if this file is executed directly
if (require.main === module) {
  seedData().then(() => {
    process.exit(0);
  });
}

module.exports = { seedData };