# Getting Started

Welcome to the Complaint Management System! This guide will help you get started quickly.

## 📚 Documentation Overview

We have comprehensive documentation to help you:

1. **[QUICKSTART.md](QUICKSTART.md)** - Get up and running in 10 minutes
   - Perfect for first-time setup
   - Step-by-step instructions
   - Quick troubleshooting

2. **[README.md](README.md)** - Complete documentation
   - Full feature list
   - Detailed setup guide
   - API documentation
   - Usage instructions

3. **[DEPLOYMENT.md](DEPLOYMENT.md)** - Deploy to production
   - Vercel deployment guide
   - Environment configuration
   - Post-deployment setup

4. **[API_DOCUMENTATION.md](API_DOCUMENTATION.md)** - API reference
   - All endpoints documented
   - Request/response examples
   - Authentication details

5. **[CONTRIBUTING.md](CONTRIBUTING.md)** - For developers
   - Development workflow
   - Code guidelines
   - How to contribute

6. **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Project overview
   - What's been built
   - Technology stack
   - Future enhancements

## 🚀 Quick Links

### For First-Time Users
👉 Start here: [QUICKSTART.md](QUICKSTART.md)

### For Developers
👉 Read: [CONTRIBUTING.md](CONTRIBUTING.md)

### For Deployment
👉 Follow: [DEPLOYMENT.md](DEPLOYMENT.md)

### For API Integration
👉 Reference: [API_DOCUMENTATION.md](API_DOCUMENTATION.md)

## ⚡ Super Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy environment file
cp env.example .env.local

# 3. Edit .env.local with your credentials
# - MongoDB Atlas connection string
# - JWT secret
# - SendGrid API key

# 4. Run development server
npm run dev

# 5. Open http://localhost:3000
```

## 🎯 What Can You Do?

### As a User
- Register an account
- Login to the system
- Submit complaints
- View submission confirmation

### As an Admin
- Login with admin credentials
- View all complaints
- Filter by status/priority
- Update complaint status
- Delete complaints
- Receive email notifications

## 🔑 Environment Variables Required

```env
MONGODB_URI=          # MongoDB Atlas connection string
JWT_SECRET=           # Random secure string for JWT
SENDGRID_API_KEY=     # SendGrid API key
SENDGRID_FROM_EMAIL=  # Verified sender email
ADMIN_EMAIL=          # Admin notification email
NEXT_PUBLIC_APP_URL=  # Application URL
```

## 📦 What's Included?

- ✅ Full-stack Next.js application
- ✅ TypeScript throughout
- ✅ MongoDB database integration
- ✅ JWT authentication
- ✅ Role-based authorization
- ✅ Email notifications (SendGrid)
- ✅ Responsive Tailwind CSS UI
- ✅ Complete API
- ✅ Admin dashboard
- ✅ User dashboard

## 🛠️ Prerequisites

Before you start, make sure you have:

- ✅ Node.js 18 or higher
- ✅ npm or yarn
- ✅ Git (for version control)
- ✅ MongoDB Atlas account (free)
- ✅ SendGrid account (free)
- ✅ Code editor (VS Code recommended)

## 📱 Routes

### Public Routes
- `/login` - Login page
- `/register` - Registration page

### Protected Routes (Authenticated Users)
- `/` - User dashboard (complaint submission)

### Admin Routes (Admin Role Required)
- `/admin` - Admin dashboard (complaint management)

### API Routes
- `/api/auth/*` - Authentication endpoints
- `/api/complaints` - Complaint management

## 🔐 Default Setup

### Creating First Admin User

After setup, create an admin user:

```bash
# Using npm script (recommended)
npm run create-admin

# Or via API
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@example.com",
    "password": "admin123",
    "role": "admin"
  }'
```

## 🎨 Features

### User Features
- ✅ User registration and login
- ✅ Submit complaints with:
  - Title
  - Description
  - Category (Product/Service/Support)
  - Priority (Low/Medium/High)
- ✅ Automatic email notifications to admin

### Admin Features
- ✅ View all complaints
- ✅ Filter by status (Pending/In Progress/Resolved)
- ✅ Filter by priority (Low/Medium/High)
- ✅ Update complaint status
- ✅ Delete complaints
- ✅ View detailed complaint information
- ✅ Email notifications on status updates

## 🐛 Common Issues

### Port Already in Use
```bash
# Kill process on port 3000
npm run dev -- -p 3001  # Use different port
```

### MongoDB Connection Error
- Check your connection string
- Verify IP whitelist in MongoDB Atlas
- Ensure database user has correct permissions

### SendGrid Emails Not Sending
- Verify API key is correct
- Check sender email is verified
- Review SendGrid activity logs

## 📚 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Atlas Guide](https://docs.atlas.mongodb.com/)
- [SendGrid API Docs](https://docs.sendgrid.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 💬 Getting Help

1. **Check Documentation** - Most answers are in our docs
2. **Review Issues** - Search existing GitHub issues
3. **Ask Questions** - Open a new issue with details
4. **Read Code** - Code is well-commented

## 🎯 Next Steps

1. ✅ Complete setup following [QUICKSTART.md](QUICKSTART.md)
2. ✅ Test the application locally
3. ✅ Create test users and complaints
4. ✅ Verify email notifications work
5. ✅ Deploy to Vercel following [DEPLOYMENT.md](DEPLOYMENT.md)
6. ✅ Configure production environment
7. ✅ Test production deployment

## 🌟 Pro Tips

- Use environment variables for all sensitive data
- Test locally before deploying
- Keep dependencies updated
- Monitor email delivery in SendGrid dashboard
- Use MongoDB Compass for database visualization
- Enable Vercel analytics after deployment

## 📞 Support

- **Documentation Issues**: Open a GitHub issue
- **Bug Reports**: Use the bug report template
- **Feature Requests**: Open a feature request
- **Questions**: Check existing discussions

## 🎉 You're Ready!

Follow the [QUICKSTART.md](QUICKSTART.md) guide to get your application running in minutes!

---

**Happy coding!** 🚀


