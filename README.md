# 🎯 Complaint Management System

> A full-stack web application built with Next.js 16, MongoDB, and SendGrid for managing user complaints with comprehensive admin oversight.

**Live Demo**: [https://complaint-shubham-management-system.vercel.app](https://complaint-shubham-management-system.vercel.app)

---

## 🚀 Features

- ✅ **User Authentication**: Secure JWT-based login/register system with httpOnly cookies
- ✅ **Complaint Submission**: Users can submit complaints with categories and priorities
- ✅ **Admin Dashboard**: Complete complaint management interface with filtering
- ✅ **Email Notifications**: Real-time SendGrid integration for status updates
- ✅ **Responsive Design**: Mobile-first Tailwind CSS UI that works on all devices
- ✅ **Role-based Access**: Separate interfaces for users and admins with middleware protection
- ✅ **Real-time Updates**: Live status updates and notifications

## 🛠️ Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Node.js
- **Database**: MongoDB Atlas with Mongoose
- **Authentication**: JWT tokens with httpOnly cookies
- **Email**: SendGrid API
- **Deployment**: Vercel-ready

## 📦 Quick Start Guide

### Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account (free tier works)
- SendGrid account (optional, for email notifications)

### Installation Steps

**1. Clone the repository**
```bash
git clone https://github.com/Shubham00-3/Complaint-Management-System.git
cd Complaint-Management-System
```

**2. Install dependencies**
```bash
npm install
```

**3. Set up MongoDB Atlas**
- Go to [MongoDB Atlas](https://cloud.mongodb.com/)
- Create a free cluster
- Click "Connect" → "Connect your application"
- Copy your connection string
- Go to "Network Access" → Add IP `0.0.0.0/0` (allow from anywhere)
- Go to "Database Access" → Create a database user with read/write permissions

**4. Set up environment variables**
```bash
cp env.example .env.local
```

Edit `.env.local` with your credentials:
```env
# MongoDB Connection (REQUIRED)
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/complaint-management?retryWrites=true&w=majority

# JWT Secret (REQUIRED) - Use a long random string
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# SendGrid Email (OPTIONAL - only if you want email notifications)
SENDGRID_API_KEY=SG.your-sendgrid-api-key
SENDGRID_FROM_EMAIL=noreply@yourdomain.com
ADMIN_EMAIL=admin@yourdomain.com

# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**5. Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

**6. Create your first admin user**

**Option A: Using the script (if it works)**
```bash
npm run create-admin
```

**Option B: Manual method (recommended)**
1. Go to `http://localhost:3000/register`
2. Register a new user with your desired email and password
3. Go to MongoDB Atlas → Browse Collections → `users` collection
4. Find your user and click "Edit Document"
5. Change `"role": "user"` to `"role": "admin"`
6. Click "Update"
7. Logout and login again - you'll be redirected to `/admin`

## 🎯 How to Use the Application

### 👤 For Regular Users

1. **Register an Account**
   - Go to `/register` or click "Sign up" on login page
   - Fill in your name, email, and password (minimum 6 characters)
   - Click "Sign Up"

2. **Login**
   - Go to `/login`
   - Enter your email and password
   - You'll be redirected to the main dashboard

3. **Submit a Complaint**
   - Fill out the complaint form with:
     - **Title**: Brief description of your issue
     - **Description**: Detailed explanation
     - **Category**: Product, Service, or Support
     - **Priority**: Low, Medium, or High
   - Click "Submit Complaint"
   - You'll receive a success message

4. **What Happens Next?**
   - Admin receives an email notification (if SendGrid is configured)
   - Admin will review and update the status
   - You'll be notified when status changes

### 👨‍💼 For Administrators

1. **Login with Admin Account**
   - Go to `/login`
   - Enter your admin email and password
   - You'll be automatically redirected to `/admin` dashboard

2. **Admin Dashboard Features**
   - **View All Complaints**: See complaints from all users in a table
   - **Statistics**: View counts for Total, Pending, In Progress, and Resolved complaints
   - **Filter Complaints**: Filter by status or priority using dropdown menus
   - **View Details**: Click on any complaint title to see full details in a modal
   - **Update Status**: Change complaint status using the dropdown in the table
   - **Delete Complaints**: Remove complaints using the "Delete" button
   - **Email Notifications**: Receive emails for new complaints and status updates (if configured)

3. **Managing Complaints**
   - **Pending**: Newly submitted complaints awaiting review
   - **In Progress**: Complaints currently being addressed
   - **Resolved**: Completed complaints

4. **Switch to User View**
   - Click "User View" button to see the user interface
   - Useful for testing or submitting test complaints

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Complaints
- `GET /api/complaints` - Get all complaints (admin only)
- `POST /api/complaints` - Create new complaint
- `PATCH /api/complaints/[id]` - Update complaint status (admin only)
- `DELETE /api/complaints/[id]` - Delete complaint (admin only)

## 🚀 Deployment on Vercel

### Step-by-Step Deployment Guide

**1. Prepare Your Code**
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

**2. Deploy to Vercel**
- Go to [vercel.com](https://vercel.com) and sign up/login
- Click "Add New Project"
- Import your GitHub repository
- Click "Import"

**3. Configure Environment Variables**

In Vercel project settings → Environment Variables, add:

| Variable | Value | Required |
|----------|-------|----------|
| `MONGODB_URI` | Your MongoDB Atlas connection string | ✅ Required |
| `JWT_SECRET` | Any long random string (e.g., generated from [passwordsgenerator.net](https://passwordsgenerator.net/)) | ✅ Required |
| `SENDGRID_API_KEY` | Your SendGrid API key | ⚠️ Optional |
| `SENDGRID_FROM_EMAIL` | Your verified sender email | ⚠️ Optional |
| `ADMIN_EMAIL` | Email to receive notifications | ⚠️ Optional |
| `NEXT_PUBLIC_APP_URL` | Your Vercel app URL (e.g., `https://your-app.vercel.app`) | ✅ Required |

**Important**: Make sure to add these variables for all environments (Production, Preview, Development).

**4. Deploy**
- Click "Deploy"
- Wait 2-3 minutes for deployment to complete
- Click on your live URL to test the application

**5. Create Admin User on Production**
1. Register a user on your live site
2. Go to MongoDB Atlas → Browse Collections
3. Find the user and change `"role": "user"` to `"role": "admin"`
4. Logout and login again

### Update Domain After Deployment

After deployment, update `NEXT_PUBLIC_APP_URL`:
1. Go to Vercel Project → Settings → Environment Variables
2. Update `NEXT_PUBLIC_APP_URL` with your actual Vercel URL
3. Redeploy the project

## 🧪 Testing the Application

### Quick Test (Using Live Demo)

Visit the live demo: [https://complaint-shubham-management-system.vercel.app](https://complaint-shubham-management-system.vercel.app)

**Test as User:**
1. Register a new account
2. Login with your credentials
3. Submit a test complaint
4. Logout

**Test as Admin:**
1. You'll need to create an admin account following the steps in "Create your first admin user" section
2. Or contact the repository owner for demo admin credentials

### Local Testing

1. Start the development server: `npm run dev`
2. Open `http://localhost:3000`
3. Register a user account
4. Create an admin user using the manual method
5. Test both user and admin functionalities

## 🔐 Security Features

- ✅ Password hashing with bcryptjs (10 rounds)
- ✅ JWT tokens with 7-day expiration
- ✅ HttpOnly cookies for XSS protection
- ✅ Role-based authorization (user/admin)
- ✅ Input validation and sanitization
- ✅ MongoDB injection prevention
- ✅ Protected API routes with middleware
- ✅ Secure cookie settings in production

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Failed**
- Check your connection string
- Verify IP whitelist in MongoDB Atlas
- Ensure database user has correct permissions

**SendGrid Emails Not Sending**
- Verify API key is correct
- Check sender email is verified
- Review SendGrid activity logs

**Authentication Issues**
- Clear browser cookies and try again
- Verify JWT_SECRET is set in environment variables
- Check if user exists in database with correct role

## 📝 Project Structure

```
complaint-management-system/
├── app/
│   ├── api/           # API routes
│   ├── admin/         # Admin dashboard
│   ├── login/         # Login page
│   ├── register/      # Registration page
│   └── page.tsx      # User dashboard
├── components/        # React components
├── lib/              # Utility functions
│   ├── models/       # Database models
│   ├── auth.ts       # Authentication helpers
│   ├── db.ts         # Database connection
│   └── email.ts      # Email service
├── middleware.ts     # Route protection
└── package.json
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Developer

Developed as a full-stack demonstration project showcasing Next.js 16, MongoDB, JWT authentication, and SendGrid integration.

---

Made with ❤️ using Next.js, TypeScript, MongoDB, and SendGrid