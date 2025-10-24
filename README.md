# Complaint Management System

A full-stack web application built with Next.js, MongoDB, and SendGrid for managing user complaints with admin oversight.

## 🚀 Features

- **User Authentication**: JWT-based login/register system
- **Complaint Submission**: Users can submit complaints with categories and priorities
- **Admin Dashboard**: Complete complaint management interface
- **Email Notifications**: SendGrid integration for status updates
- **Responsive Design**: Mobile-first Tailwind CSS UI
- **Role-based Access**: Separate interfaces for users and admins

## 🛠️ Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Node.js
- **Database**: MongoDB Atlas with Mongoose
- **Authentication**: JWT tokens with httpOnly cookies
- **Email**: SendGrid API
- **Deployment**: Vercel-ready

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Shubham00-3/Complaint-Management-System.git
   cd Complaint-Management-System
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Fill in your credentials:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   SENDGRID_API_KEY=your_sendgrid_api_key
   SENDGRID_FROM_EMAIL=your_verified_email
   ADMIN_EMAIL=admin_notification_email
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Create admin user**
   ```bash
   npm run create-admin
   ```

## 🎯 Usage

### For Users
1. Register an account at `/register`
2. Login at `/login`
3. Submit complaints with title, description, category, and priority
4. Receive email confirmations

### For Admins
1. Login with admin credentials
2. Access admin dashboard at `/admin`
3. View, filter, and manage all complaints
4. Update complaint status (Pending → In Progress → Resolved)
5. Delete complaints
6. Receive email notifications for new complaints and status updates

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

## 🚀 Deployment

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Deploy to production"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables
   - Deploy

3. **Environment Variables for Production**
   ```env
   MONGODB_URI=your_production_mongodb_uri
   JWT_SECRET=your_production_jwt_secret
   SENDGRID_API_KEY=your_sendgrid_api_key
   SENDGRID_FROM_EMAIL=your_verified_email
   ADMIN_EMAIL=admin_notification_email
   NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
   ```

## 🔐 Security Features

- Password hashing with bcryptjs
- JWT tokens with expiration
- HttpOnly cookies for XSS protection
- Role-based authorization
- Input validation and sanitization
- MongoDB injection prevention

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