# 🚀 Enhanced Admin Backend - Complete Setup Guide

## 📋 Overview

The enhanced admin backend provides a comprehensive security and community management system with:

- **🔐 Enhanced Authentication** - Database-based admin users with role-based access
- **🏛️ Community Management** - Full control over posts, projects, and users
- **📊 Analytics & Monitoring** - Detailed community insights and metrics
- **🛡️ Enterprise Security** - Rate limiting, audit logging, and input sanitization
- **🔄 Backward Compatibility** - Legacy routes maintained for existing functionality

## 🗂️ Backend Architecture

### **Enhanced Components Added:**

```
admin/server/
├── middleware/
│   ├── enhancedAuth.js      - Database-based authentication with roles
│   └── security.js          - Rate limiting, sanitization, audit logging
├── routes/
│   ├── adminUsers.js        - Admin user management (CRUD operations)
│   └── communityAdmin.js    - Community management (posts, projects, users)
├── scripts/
│   ├── setup.js            - Database initialization and setup
│   └── test-endpoints.js   - API endpoint testing
└── db/
    └── init.js             - Enhanced database initialization
```

### **API Endpoints Available:**

#### **Enhanced Admin Routes** (New)
```
POST   /admin/login                    - Enhanced login with account lockout
GET    /api/admin-users/profile        - Get current admin profile
GET    /api/admin-users                - List admin users (super_admin only)
POST   /api/admin-users                - Create admin user (super_admin only)
PUT    /api/admin-users/:id            - Update admin user
PUT    /api/admin-users/:id/password   - Change password
DELETE /api/admin-users/:id            - Delete admin user (super_admin only)
```

#### **Community Management Routes** (New)
```
GET    /api/community/analytics        - Community analytics and metrics
GET    /api/community/posts            - List posts with moderation info
PUT    /api/community/posts/:id/moderate - Moderate post (pin/archive)
DELETE /api/community/posts/:id        - Delete post permanently
GET    /api/community/projects         - List projects with status
PUT    /api/community/projects/:id/moderate - Moderate project (approve/feature)
GET    /api/community/users/:id/activity - Get user activity
PUT    /api/community/users/:id/moderate - Moderate user (verify/activate)
```

#### **Legacy Routes** (Maintained)
```
GET    /dashboard/stats               - Dashboard statistics
GET    /users                        - List community users
GET    /blogs                        - List blogs
POST   /blogs                        - Create blog
GET    /public/blogs                 - Public blog access
```

## 🔧 Installation & Setup

### **1. Install Dependencies**
```bash
cd admin/server
npm install
```

### **2. Environment Configuration**
Ensure your `.env` file has all required variables:

```env
# Database Configuration (same as communitysite)
DATABASE_URL=your_database_url
DB_HOST=your_db_host
DB_PORT=5432
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password

# JWT Configuration
JWT_SECRET=your_super_secure_jwt_secret
JWT_EXPIRES_IN=24h

# Default Admin User (for initial setup)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password
ADMIN_EMAIL=admin@opengeek.in

# Server Configuration
PORT=3000
FRONTEND_URL=http://localhost:5173
```

### **3. Database Setup**
Run the setup script to initialize the database:

```bash
npm run setup
```

This will:
- ✅ Test database connection
- ✅ Create `admin_users` table
- ✅ Create `blogs` table
- ✅ Create default super_admin user
- ✅ Verify community tables exist

### **4. Start the Server**
```bash
# Development mode
npm run dev

# Production mode
npm start
```

### **5. Test the API**
Verify all endpoints are working:

```bash
npm run test
```

## 🔐 Security Features

### **Enhanced Authentication**
- **Password Hashing**: bcrypt with 12 salt rounds
- **Account Lockout**: 5 failed attempts = 15-minute lockout
- **Login Tracking**: IP address and attempt logging
- **Role-Based Access**: Super Admin, Admin, Moderator roles
- **JWT Security**: Configurable expiration and secure secrets

### **Rate Limiting**
- **Authentication**: 5 attempts per 15 minutes
- **Admin Operations**: 30 requests per minute
- **User Management**: 10 operations per minute
- **IP-Based**: Per-IP address limiting

### **Input Security**
- **XSS Prevention**: Script tag and JavaScript injection removal
- **Input Sanitization**: Recursive object cleaning
- **Request Size Limits**: 10MB limit for uploads
- **CORS Protection**: Specific origin control

### **Audit Logging**
- **All Admin Actions**: Logged with timestamps and reasons
- **IP Address Tracking**: Full request origin logging
- **User Agent Logging**: Device and browser information
- **Success/Failure Tracking**: Complete audit trail

## 👥 Role-Based Access Control

### **Super Admin** (Full Access)
- ✅ Manage admin users (create, edit, delete)
- ✅ Full community management
- ✅ System configuration
- ✅ All analytics and reports

### **Admin** (Community Management)
- ✅ Community moderation (posts, projects, users)
- ✅ User verification and management
- ✅ Content approval and featuring
- ✅ Analytics access
- ❌ Cannot manage admin users

### **Moderator** (Content Only)
- ✅ Content moderation (posts, projects)
- ✅ Basic user actions
- ❌ Cannot manage users or admin accounts
- ❌ Limited analytics access

## 📊 Database Schema

### **Admin Users Table**
```sql
CREATE TABLE admin_users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'admin',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP,
  last_activity TIMESTAMP,
  login_attempts INTEGER DEFAULT 0,
  locked_until TIMESTAMP
);
```

### **Blogs Table**
```sql
CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  cover_image_url VARCHAR(500),
  tags TEXT[] DEFAULT '{}',
  status VARCHAR(20) DEFAULT 'draft',
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔄 Integration with Community Site

The admin backend connects to the same database as the communitysite and manages:

### **Community Tables** (from communitysite)
- `users` - Community members
- `posts` - Community posts
- `projects` - Community projects
- `post_comments` - Post comments
- `post_likes` - Post likes
- `project_stars` - Project stars
- `user_follows` - User relationships

### **Admin-Specific Tables** (new)
- `admin_users` - Admin user accounts
- `blogs` - Blog management

## 🚨 Security Best Practices

### **Implemented Security Measures**
1. ✅ **Password Security** - Strong hashing and complexity requirements
2. ✅ **Account Protection** - Lockout mechanisms and attempt tracking
3. ✅ **Input Validation** - Comprehensive sanitization and validation
4. ✅ **Rate Limiting** - Multi-tier protection against abuse
5. ✅ **Audit Logging** - Complete action tracking for compliance
6. ✅ **Role-Based Access** - Principle of least privilege
7. ✅ **Secure Headers** - Helmet.js with CSP configuration
8. ✅ **CORS Protection** - Controlled cross-origin requests

### **Recommended Additional Security**
1. **HTTPS Enforcement** - Use SSL certificates in production
2. **Database SSL** - Enable SSL connections to database
3. **Environment Security** - Secure environment variable storage
4. **Regular Updates** - Keep dependencies updated
5. **Monitoring** - Set up log aggregation and alerting

## 🔧 Troubleshooting

### **Common Issues**

#### **Database Connection Failed**
```bash
# Test database connection
npm run setup
```
- Check DATABASE_URL or individual DB_* variables
- Verify database server is running
- Check network connectivity and firewall settings

#### **Authentication Issues**
```bash
# Test login endpoint
curl -X POST http://localhost:3000/admin/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"your_password"}'
```
- Verify ADMIN_USERNAME and ADMIN_PASSWORD in .env
- Check JWT_SECRET is set
- Ensure admin user exists in database

#### **Permission Errors**
- Check user role in admin_users table
- Verify JWT token contains correct role
- Ensure route requires appropriate role level

#### **Rate Limiting Issues**
- Wait for rate limit window to reset
- Check IP address if behind proxy
- Adjust rate limits in security.js if needed

### **Debug Commands**
```bash
# Test all endpoints
npm run test:endpoints

# Check database setup
npm run setup

# View server logs
npm run dev
```

## 📈 Monitoring & Maintenance

### **Health Checks**
- `GET /health` - Server and database status
- `GET /debug` - Route information and server status

### **Log Monitoring**
- All admin actions are logged to console
- Failed login attempts tracked
- Database errors logged with details

### **Performance Monitoring**
- Rate limiting statistics
- Database query performance
- Memory and CPU usage

## 🎉 Summary

Your enhanced admin backend now provides:

- **🔒 Enterprise Security** - Multi-layer protection with audit trails
- **👥 Multi-Admin Support** - Role-based user management
- **🏛️ Community Control** - Complete moderation and management tools
- **📊 Comprehensive Analytics** - Detailed insights and reporting
- **🔄 Backward Compatibility** - Existing functionality preserved
- **🚀 Production Ready** - Scalable architecture with proper error handling

## 🚀 Next Steps

1. **Start the server**: `npm run dev`
2. **Run setup**: `npm run setup` (if not done already)
3. **Test endpoints**: `npm run test`
4. **Start the client**: `cd ../client && npm run dev`
5. **Login and explore**: Access the enhanced admin features

Your enhanced admin backend is now ready for production use! 🎊