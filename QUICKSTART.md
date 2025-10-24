# Quick Start Guide

Get the Complaint Management System up and running in 10 minutes!

## Prerequisites

- ✅ Node.js 18+ installed
- ✅ Git installed
- ✅ Code editor (VS Code recommended)

## 1. Clone & Install (2 minutes)

```bash
# Clone the repository
git clone <your-repo-url>
cd complaint-management-system

# Install dependencies
npm install
```

## 2. Set Up MongoDB Atlas (3 minutes)

### Option A: Quick Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Sign up for free account
3. Create a cluster (choose free M0 tier)
4. Click "Connect" → "Connect your application"
5. Copy the connection string

### Option B: Detailed Steps

1. **Create Account**: Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. **Create Cluster**: 
   - Click "Build a Database"
   - Choose "Free" tier (M0)
   - Select region closest to you
   - Click "Create"
3. **Create Database User**:
   - Go to "Database Access"
   - Click "Add New Database User"
   - Username: `admin`, Password: (generate secure password)
   - Click "Add User"
4. **Whitelist IP**:
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Click "Confirm"
5. **Get Connection String**:
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your user password

## 3. Set Up SendGrid (3 minutes)

### Option A: Quick Setup

1. Sign up at [SendGrid](https://signup.sendgrid.com/)
2. Create an API key (Settings → API Keys)
3. Verify a sender email (Settings → Sender Authentication)

### Option B: Detailed Steps

1. **Create Account**:
   - Go to [SendGrid](https://signup.sendgrid.com/)
   - Sign up for free account (100 emails/day)
   - Verify your email

2. **Create API Key**:
   - Go to Settings → API Keys
   - Click "Create API Key"
   - Name: "Complaint System"
   - Permissions: "Full Access"
   - Click "Create & View"
   - **Copy the API key** (you won't see it again!)

3. **Verify Sender Email**:
   - Go to Settings → Sender Authentication
   - Click "Verify a Single Sender"
   - Fill in your email details
   - Click "Create"
   - Check your email and verify

## 4. Configure Environment Variables (1 minute)

Create a `.env.local` file in the project root:

```bash
# Copy and paste this, then replace with your values
MONGODB_URI=mongodb+srv://admin:YOUR_PASSWORD@cluster.mongodb.net/complaints
JWT_SECRET=your-long-random-string-here
SENDGRID_API_KEY=SG.your-sendgrid-api-key
SENDGRID_FROM_EMAIL=your-verified-email@example.com
ADMIN_EMAIL=your-admin-email@example.com
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Generate JWT Secret

```bash
# On Mac/Linux:
openssl rand -base64 32

# On Windows (PowerShell):
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))

# Or use any random 32+ character string
```

## 5. Run the Application (1 minute)

```bash
# Start development server
npm run dev

# Open in browser
# http://localhost:3000
```

## 6. Create Your First Users

### Create a Regular User

1. Open [http://localhost:3000/register](http://localhost:3000/register)
2. Fill in:
   - Name: John Doe
   - Email: user@example.com
   - Password: password123
3. Click "Sign Up"

### Create an Admin User

**Option 1: Using npm script** (Recommended)

```bash
npm run create-admin

# Follow the prompts:
# Name: Admin User
# Email: admin@example.com
# Password: admin123
```

**Option 2: Using API request**

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@example.com",
    "password": "admin123",
    "role": "admin"
  }'
```

**Option 3: Using MongoDB Atlas UI**

1. Go to MongoDB Atlas → Browse Collections
2. Select `complaints` database → `users` collection
3. Find your user and click Edit
4. Change `"role": "user"` to `"role": "admin"`
5. Click Update

## 7. Test the System

### Test User Flow

1. **Login as User**:
   - Go to [http://localhost:3000/login](http://localhost:3000/login)
   - Email: user@example.com
   - Password: password123

2. **Submit a Complaint**:
   - Fill in the form:
     - Title: "Test Complaint"
     - Description: "This is a test complaint"
     - Category: "Product"
     - Priority: "High"
   - Click "Submit Complaint"

3. **Check Admin Email**:
   - Check the inbox of your ADMIN_EMAIL
   - You should receive a "New Complaint" notification

### Test Admin Flow

1. **Login as Admin**:
   - Logout if logged in
   - Go to [http://localhost:3000/login](http://localhost:3000/login)
   - Email: admin@example.com
   - Password: admin123
   - Should redirect to `/admin` dashboard

2. **View Complaints**:
   - See the test complaint in the table
   - Try filters (status, priority)

3. **Update Status**:
   - Change status from "Pending" to "In Progress"
   - Check admin email for status update notification

4. **View Details**:
   - Click on the complaint title
   - See full details in modal

5. **Delete Complaint**:
   - Click "Delete"
   - Confirm deletion

## 🎉 You're Done!

The system is now fully functional!

## Common Issues & Solutions

### MongoDB Connection Error

**Error**: "MongoServerError: bad auth"
- **Fix**: Check username and password in connection string
- **Fix**: Make sure you replaced `<password>` with actual password

**Error**: "Connection timeout"
- **Fix**: Add 0.0.0.0/0 to Network Access whitelist in MongoDB Atlas

### SendGrid Email Not Sending

**Error**: "Unauthorized"
- **Fix**: Verify SENDGRID_API_KEY is correct
- **Fix**: Check API key has "Full Access" permissions

**Error**: "Sender not verified"
- **Fix**: Verify sender email in SendGrid dashboard
- **Fix**: Use the exact verified email in SENDGRID_FROM_EMAIL

### JWT Token Error

**Error**: "JWT malformed" or "Invalid token"
- **Fix**: Make sure JWT_SECRET is set in .env.local
- **Fix**: Clear browser cookies and login again

### Module Not Found

**Error**: "Cannot find module"
- **Fix**: Delete `node_modules` and `.next` folders
- **Fix**: Run `npm install` again
- **Fix**: Restart development server

### Port Already in Use

**Error**: "Port 3000 is already in use"
- **Fix**: Kill the process using port 3000:
  ```bash
  # Mac/Linux:
  lsof -ti:3000 | xargs kill
  
  # Windows:
  netstat -ano | findstr :3000
  taskkill /PID <PID> /F
  ```
- **Or**: Use a different port:
  ```bash
  npm run dev -- -p 3001
  ```

## Next Steps

- [ ] Read [README.md](README.md) for full documentation
- [ ] Review [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for API details
- [ ] Check [DEPLOYMENT.md](DEPLOYMENT.md) for deployment to Vercel
- [ ] Customize the UI to match your brand
- [ ] Add more features (see CONTRIBUTING.md)

## Development Tips

### Useful Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Create admin user
npm run create-admin

# Run linter
npm run lint
```

### Recommended VS Code Extensions

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- MongoDB for VS Code

### Hot Reload

Changes to files will automatically reload:
- `.tsx`, `.ts` files - Fast refresh
- `.css` files - Instant update
- `API routes` - Requires manual refresh

## Project Structure Quick Reference

```
/app
  /api              # Backend API routes
    /auth          # Authentication endpoints
    /complaints    # Complaint CRUD endpoints
  /admin           # Admin dashboard page
  /login           # Login page
  /register        # Register page
  page.tsx         # User dashboard

/components        # React components
  ComplaintForm.tsx
  ComplaintTable.tsx
  FilterBar.tsx

/lib               # Utilities
  auth.ts          # JWT helpers
  db.ts            # MongoDB connection
  email.ts         # SendGrid functions
  models/          # Mongoose schemas
```

## Getting Help

- **Documentation**: Check README.md and other docs
- **Issues**: Search existing GitHub issues
- **Community**: Open a discussion on GitHub
- **Email**: Contact the maintainer

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)
- [SendGrid API Docs](https://docs.sendgrid.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

---

**Need more help?** Open an issue on GitHub or check the full documentation!

**Ready to deploy?** Follow the [DEPLOYMENT.md](DEPLOYMENT.md) guide!

