#!/usr/bin/env node

/**
 * Enhanced Admin System Setup Script
 * This script initializes the database and creates the default admin user
 */

const db = require('../config/database');
const { createDefaultAdmin } = require('../middleware/enhancedAuth');

async function setupDatabase() {
    console.log('🚀 Starting Enhanced Admin System Setup...\n');

    try {
        // Test database connection
        console.log('1️⃣ Testing database connection...');
        const result = await db.query('SELECT NOW() as current_time, version() as pg_version');
        console.log(`✅ Database connected successfully`);
        console.log(`   📅 Current time: ${result.rows[0].current_time}`);
        console.log(`   🗄️  PostgreSQL version: ${result.rows[0].pg_version.split(' ')[0]}\n`);

        // Initialize database tables
        console.log('2️⃣ Initializing database tables...');
        const initDatabase = require('../db/init');
        await initDatabase();
        console.log('');

        // Create default admin user
        console.log('3️⃣ Setting up admin users...');
        await createDefaultAdmin();
        console.log('');

        // Verify setup
        console.log('4️⃣ Verifying setup...');

        // Check admin users
        const adminCount = await db.query('SELECT COUNT(*) as count FROM admin_users');
        console.log(`✅ Admin users in database: ${adminCount.rows[0].count}`);

        // Check if main community tables exist (from communitysite)
        const communityTables = ['users', 'posts', 'projects'];
        for (const table of communityTables) {
            try {
                const tableExists = await db.query(`
          SELECT EXISTS (
            SELECT FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_name = $1
          );
        `, [table]);

                if (tableExists.rows[0].exists) {
                    const count = await db.query(`SELECT COUNT(*) as count FROM ${table}`);
                    console.log(`✅ Community table '${table}': ${count.rows[0].count} records`);
                } else {
                    console.log(`⚠️  Community table '${table}': Not found (will be created by communitysite)`);
                }
            } catch (error) {
                console.log(`⚠️  Community table '${table}': Error checking (${error.message})`);
            }
        }

        console.log('\n🎉 Enhanced Admin System Setup Complete!');
        console.log('\n📋 Next Steps:');
        console.log('   1. Start the admin server: npm run dev');
        console.log('   2. Start the admin client: cd ../client && npm run dev');
        console.log('   3. Login with your admin credentials');
        console.log('   4. Create additional admin users as needed');
        console.log('\n🔐 Security Notes:');
        console.log('   • Change default passwords immediately after first login');
        console.log('   • Use strong, unique passwords for all admin accounts');
        console.log('   • Regularly review admin user access and permissions');

    } catch (error) {
        console.error('\n❌ Setup failed:', error.message);
        console.log('\n🔧 Troubleshooting:');
        console.log('   • Check your database connection settings in .env');
        console.log('   • Ensure PostgreSQL is running and accessible');
        console.log('   • Verify database credentials and permissions');
        console.log('   • Check network connectivity to database server');
        process.exit(1);
    } finally {
        // Close database connection
        if (db.pool) {
            await db.pool.end();
        }
    }
}

// Run setup if called directly
if (require.main === module) {
    setupDatabase();
}

module.exports = setupDatabase;