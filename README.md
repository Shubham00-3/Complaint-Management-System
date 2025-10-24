# Complaint Management System

A full-stack web application built with Next.js 14, TypeScript, MongoDB, and SendGrid that allows users to raise complaints and administrators to manage them with email notifications.

> **Quick Start**: New to this project? Check out [GETTING_STARTED.md](GETTING_STARTED.md) or [QUICKSTART.md](QUICKSTART.md) for a fast setup guide!

## 🚀 Features

- **JWT Authentication**: Secure authentication system with httpOnly cookies
- **Role-Based Access Control**: Separate interfaces for users and administrators
- **Complaint Management**: Complete CRUD operations for complaints
- **Email Notifications**: Automated emails using SendGrid for new complaints and status updates
- **Real-time Filtering**: Filter complaints by status and priority
- **Responsive Design**: Beautiful UI built with Tailwind CSS that works on all devices
- **MongoDB Integration**: Cloud-based database with MongoDB Atlas

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB Atlas with Mongoose ODM
- **Authentication**: JWT (jsonwebtoken) with bcryptjs for password hashing
- **Email Service**: SendGrid API
- **Deployment**: Vercel

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js 18.x or higher
- npm or yarn package manager
- MongoDB Atlas account (free tier available)
- SendGrid account (free tier available)

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd complaint-management-system
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/complaint-management?retryWrites=true&w=majority

# JWT Secret (use a long random string)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# SendGrid Email Configuration
SENDGRID_API_KEY=SG.your-sendgrid-api-key
SENDGRID_FROM_EMAIL=noreply@yourdomain.com
ADMIN_EMAIL=admin@yourdomain.com

# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account or log in
3. Create a new cluster (free tier M0 is sufficient)
4. Click "Connect" and choose "Connect your application"
5. Copy the connection string and replace `<password>` with your database user password
6. Paste the connection string in your `.env.local` file as `MONGODB_URI`
7. Make sure to whitelist your IP address or allow access from anywhere (0.0.0.0/0) for development

### 5. SendGrid Setup

1. Go to [SendGrid](https://sendgrid.com/)
2. Create a free account (100 emails/day free)
3. Navigate to Settings → API Keys
4. Create a new API key with "Full Access" permissions
5. Copy the API key and add it to your `.env.local` file as `SENDGRID_API_KEY`
6. Verify a sender email address:
   - Go to Settings → Sender Authentication
   - Verify a Single Sender
   - Use this verified email as `SENDGRID_FROM_EMAIL`
7. Set your admin email address in `ADMIN_EMAIL` (where notifications will be sent)

### 6. Generate JWT Secret

Generate a secure random string for JWT_SECRET:

```bash
# On Linux/Mac:
openssl rand -base64 32

# Or use any random string generator
```

### 7. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 👥 Creating Users

### Create a Regular User

1. Navigate to [http://localhost:3000/register](http://localhost:3000/register)
2. Fill in the registration form
3. The user will be created with role: `user` by default

### Create an Admin User

You need to manually create an admin user via API or MongoDB directly:

**Option 1: Using API Tool (Postman/Thunder Client)**

```bash
POST http://localhost:3000/api/auth/register
Content-Type: application/json

{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "admin123",
  "role": "admin"
}
```

**Option 2: Using MongoDB Compass or Atlas UI**

1. Connect to your MongoDB database
2. Find the `users` collection
3. Edit a user document and change `role` from `"user"` to `"admin"`

## 📱 Application Usage

### User Flow

1. **Register/Login**: Create an account or log in at `/login`
2. **Submit Complaint**: Fill out the complaint form on the home page
3. **Receive Confirmation**: Admin receives an email notification about the new complaint

### Admin Flow

1. **Login**: Log in with admin credentials
2. **View Dashboard**: Access the admin dashboard at `/admin`
3. **Manage Complaints**: 
   - View all complaints in a table
   - Filter by status (Pending, In Progress, Resolved) or priority (Low, Medium, High)
   - Update complaint status using the dropdown
   - Delete complaints with confirmation
   - View detailed complaint information by clicking the title
4. **Email Notifications**: Receive emails when new complaints are submitted or status is updated

## 📧 Email Notifications

The system sends two types of emails:

1. **New Complaint Notification**: Sent to admin when a user submits a complaint
   - Includes: Title, Category, Priority, Description, User Email, Date
   
2. **Status Update Notification**: Sent to admin when complaint status changes
   - Includes: Complaint Title, Old Status → New Status, Update Date

## 🔐 API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and receive JWT cookie
- `POST /api/auth/logout` - Logout and clear cookie
- `GET /api/auth/me` - Get current authenticated user

### Complaints

- `POST /api/complaints` - Create a complaint (authenticated users)
- `GET /api/complaints` - Get all complaints with filters (admin only)
- `PATCH /api/complaints/[id]` - Update complaint status (admin only)
- `DELETE /api/complaints/[id]` - Delete complaint (admin only)

## 🗄️ Database Schema

### User Collection

```typescript
{
  email: string (unique)
  password: string (hashed)
  name: string
  role: 'user' | 'admin'
  createdAt: Date
  updatedAt: Date
}
```

### Complaint Collection

```typescript
{
  title: string
  description: string
  category: 'Product' | 'Service' | 'Support'
  priority: 'Low' | 'Medium' | 'High'
  status: 'Pending' | 'In Progress' | 'Resolved'
  dateSubmitted: Date
  userId: ObjectId (reference to User)
  userEmail: string
  createdAt: Date
  updatedAt: Date
}
```

## 🚀 Deployment to Vercel

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo-url>
git push -u origin main
```

### 2. Deploy to Vercel

1. Go to [Vercel](https://vercel.com/)
2. Sign in with GitHub
3. Click "New Project"
4. Import your repository
5. Configure environment variables (same as `.env.local`)
6. Click "Deploy"

### 3. Configure Environment Variables in Vercel

In your Vercel project settings:
- Go to Settings → Environment Variables
- Add all variables from your `.env.local` file
- Make sure to update `NEXT_PUBLIC_APP_URL` to your Vercel domain

### 4. Update SendGrid Settings

- Update the `SENDGRID_FROM_EMAIL` if needed for production
- Ensure your domain is verified in SendGrid for production use

## 📸 Screenshots

### User Dashboard
![User Dashboard](screenshots/user-dashboard.png)
*Users can submit complaints with title, description, category, and priority*

### Admin Dashboard
![Admin Dashboard](screenshots/admin-dashboard.png)
*Admins can view, filter, update status, and delete complaints*

### Login Page
![Login Page](screenshots/login.png)
*Secure authentication with JWT tokens*

## 🧪 Testing the Application

### Test User Flow

1. Register a new user
2. Login with user credentials
3. Submit a complaint
4. Check admin email for notification

### Test Admin Flow

1. Create an admin user
2. Login with admin credentials
3. View complaints in the admin dashboard
4. Update a complaint status
5. Check admin email for status update notification
6. Delete a complaint

## 🔒 Security Features

- Passwords hashed with bcryptjs (10 salt rounds)
- JWT tokens stored in httpOnly cookies (XSS protection)
- Role-based access control with middleware
- Input validation on both client and server
- MongoDB injection prevention with Mongoose
- Secure environment variable management

## 🐛 Troubleshooting

### MongoDB Connection Issues

- Check if your IP address is whitelisted in MongoDB Atlas
- Verify the connection string format
- Ensure database user has proper permissions

### SendGrid Email Not Sending

- Verify your API key has "Full Access" permissions
- Check if sender email is verified in SendGrid
- Look for error messages in the console
- Check SendGrid dashboard for activity logs

### Authentication Issues

- Clear browser cookies and try again
- Verify JWT_SECRET is set in environment variables
- Check if user exists in database with correct role

## 📝 Project Structure

```
complaint-management-system/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/route.ts
│   │   │   ├── register/route.ts
│   │   │   ├── logout/route.ts
│   │   │   └── me/route.ts
│   │   └── complaints/
│   │       ├── route.ts
│   │       └── [id]/route.ts
│   ├── admin/
│   │   └── page.tsx
│   ├── login/
│   │   └── page.tsx
│   ├── register/
│   │   └── page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── ComplaintForm.tsx
│   ├── ComplaintTable.tsx
│   └── FilterBar.tsx
├── lib/
│   ├── db.ts
│   ├── auth.ts
│   ├── email.ts
│   ├── api-client.ts
│   └── models/
│       ├── User.ts
│       └── Complaint.ts
├── middleware.ts
├── env.example
└── package.json
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Developer

Developed as a full-stack demonstration project showcasing Next.js 14, MongoDB, JWT authentication, and SendGrid integration.

## 🔗 Links

- Live Demo: [Your Vercel URL]
- GitHub Repository: [Your GitHub URL]

## 📞 Support

For issues or questions, please open an issue on GitHub or contact the developer.

---

Made with ❤️ using Next.js, TypeScript, MongoDB, and SendGrid
#   C o m p l a i n t - M a n a g e m e n t - S y s t e m  
 