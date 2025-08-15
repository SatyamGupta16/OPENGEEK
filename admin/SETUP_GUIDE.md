# 🚀 Enhanced Admin System Setup Guide

## 📋 Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database (same as communitysite)
- Environment variables configured

## 🔧 Installation Steps

### 1. Install Dependencies
```bash
cd admin/server
npm install
```

### 2. Environment Configuration
Create or update your `.env` file:

```env
# Database (same as communitysite)
DATABASE_URL=your_database_url
DB_HOST=localhost
DB_PORT=5432
DB_NAME=opengeek_community
DB_USER=your_db_user
DB_PASSWORD=your_db_password

# JWT Configuration
JWT_SECRET=your_super_secure_jwt_secret_here
JWT_EXPIRES_IN=24h

# Default Admin User (for initial setup)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password_here
ADMIN_EMAIL=admin@opengeek.in

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

### 3. Start the Server
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## 🎯 First Time Setup

### 1. Automatic Database Setup
On first run, the system will automatically:
- ✅ Create the `admin_users` table
- ✅ Create a default super_admin user
- ✅ Display the credentials in the console

### 2. Login Process
1. Navigate to your admin frontend
2. Login with the credentials from step 1
3. **Important**: Change the default password immediately!

### 3. Create Additional Admin Users
1. Go to Admin Users section (super_admin only)
2. Create additional admin/moderator accounts
3. Assign appropriate roles

## 🔐 Security Features Active

### ✅ Enhanced Authentication
- Password hashing with bcrypt
- Account lockout after 5 failed attempts
- Login attempt tracking
- Role-based access control

### ✅ Rate Limiting
- Login attempts: 5 per 15 minutes
- Admin operations: 30 per minute
- User management: 10 per minute

### ✅ Input Security
- XSS prevention
- Input sanitization
- Security headers
- CORS protection

### ✅ Audit Logging
- All admin actions logged
- IP address tracking
- Timestamp recording
- Success/failure tracking

## 🏛️ Community Management Features

### 📝 Post Management
- View all community posts
- Pin/unpin important posts
- Archive inappropriate content
- Delete posts with reason logging

### 📁 Project Management
- Approve/reject project submissions
- Feature outstanding projects
- Monitor project quality
- Track project statistics

### 👥 User Management
- Verify user accounts
- Activate/deactivate users
- View user activity
- Monitor user engagement

### 📊 Analytics Dashboard
- Community growth metrics
- Content creation trends
- User engagement statistics
- Moderation activity reports

## 🔄 API Endpoints Available

### Admin User Management
```
GET    /api/admin-users           - List admin users
POST   /api/admin-users           - Create admin user
PUT    /api/admin-users/:id       - Update admin user
DELETE /api/admin-users/:id       - Delete admin user
PUT    /api/admin-users/:id/password - Change password
```

### Community Management
```
GET    /api/community/posts       - List posts
PUT    /api/community/posts/:id/moderate - Moderate post
DELETE /api/community/posts/:id   - Delete post

GET    /api/community/projects    - List projects
PUT    /api/community/projects/:id/moderate - Moderate project

GET    /api/community/users/:id/activity - User activity
PUT    /api/community/users/:id/moderate - Moderate user

GET    /api/community/analytics   - Community analytics
```

## 🚨 Important Security Notes

### 🔒 Password Security
- Minimum 8 characters required
- Passwords are hashed with bcrypt (12 salt rounds)
- Change default passwords immediately

### 🛡️ Account Security
- Accounts lock after 5 failed login attempts
- 15-minute lockout period
- All login attempts are logged

### 📝 Audit Trail
- Every admin action is logged
- Includes timestamp, user, IP, and action details
- Cannot be modified by admin users

## 🔧 Troubleshooting

### Database Connection Issues
```bash
# Test database connection
node -e "require('./config/database').testConnection()"
```

### Missing Environment Variables
Check that all required environment variables are set:
- `DATABASE_URL` or individual DB connection vars
- `JWT_SECRET`
- `ADMIN_USERNAME` and `ADMIN_PASSWORD`

### Permission Issues
- Ensure database user has CREATE TABLE permissions
- Check that the database exists
- Verify network connectivity to database

### Port Conflicts
Default port is 3000. Change with:
```env
PORT=3001
```

## 📞 Support

If you encounter issues:
1. Check the console logs for detailed error messages
2. Verify all environment variables are set correctly
3. Ensure database connectivity
4. Check that all dependencies are installed

## 🎉 You're Ready!

Your enhanced admin system is now:
- ✅ **Secure** with enterprise-grade authentication
- ✅ **Scalable** with role-based access control
- ✅ **Comprehensive** with full community management
- ✅ **Auditable** with complete action logging
- ✅ **User-friendly** with intuitive dashboard

Welcome to your new secure admin system! 🚀