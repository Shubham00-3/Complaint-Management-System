# Deployment Guide - Vercel

This guide will walk you through deploying the Complaint Management System to Vercel.

## Prerequisites

- GitHub account
- Vercel account (sign up at [vercel.com](https://vercel.com))
- MongoDB Atlas cluster set up
- SendGrid account with verified sender

## Step 1: Prepare Your Repository

### 1.1 Initialize Git (if not already done)

```bash
git init
git add .
git commit -m "Initial commit - Complaint Management System"
```

### 1.2 Create a GitHub Repository

1. Go to [github.com](https://github.com) and create a new repository
2. Name it `complaint-management-system`
3. Don't initialize with README (we already have one)

### 1.3 Push to GitHub

```bash
git remote add origin https://github.com/YOUR-USERNAME/complaint-management-system.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy to Vercel

### 2.1 Connect Your Repository

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Select the `complaint-management-system` repository

### 2.2 Configure Project Settings

Vercel will auto-detect Next.js. Keep these default settings:
- **Framework Preset**: Next.js
- **Root Directory**: `./`
- **Build Command**: `next build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### 2.3 Configure Environment Variables

Click on "Environment Variables" and add the following:

| Name | Value | Example |
|------|-------|---------|
| `MONGODB_URI` | Your MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `JWT_SECRET` | A random secure string | `openssl rand -base64 32` |
| `SENDGRID_API_KEY` | Your SendGrid API key | `SG.xxxxxxxxxxxxxxxxxxxx` |
| `SENDGRID_FROM_EMAIL` | Verified sender email | `noreply@yourdomain.com` |
| `ADMIN_EMAIL` | Admin notification email | `admin@yourdomain.com` |
| `NEXT_PUBLIC_APP_URL` | Your Vercel deployment URL | `https://your-app.vercel.app` |

**Important**: Make sure all variables are added for "Production", "Preview", and "Development" environments.

### 2.4 Deploy

1. Click "Deploy"
2. Wait for the deployment to complete (usually 2-3 minutes)
3. Once done, you'll get a deployment URL like `https://your-app.vercel.app`

## Step 3: Post-Deployment Configuration

### 3.1 Update NEXT_PUBLIC_APP_URL

1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Update `NEXT_PUBLIC_APP_URL` with your actual Vercel URL
4. Redeploy the application

### 3.2 MongoDB Atlas Configuration

1. Go to MongoDB Atlas → Network Access
2. Add your Vercel deployment to the IP whitelist:
   - Option 1: Add `0.0.0.0/0` to allow all IPs (easier but less secure)
   - Option 2: Add Vercel's IP ranges (more secure but requires maintenance)

### 3.3 SendGrid Domain Verification (Optional but Recommended)

For production, it's recommended to verify your domain in SendGrid:

1. Go to SendGrid → Settings → Sender Authentication
2. Click "Authenticate Your Domain"
3. Follow the DNS configuration steps
4. Once verified, update `SENDGRID_FROM_EMAIL` to use your domain

## Step 4: Create Admin User

### Option 1: Using the Script Locally

```bash
# Set up environment variables in .env.local
# Make sure MONGODB_URI points to your production database
npm run create-admin
```

### Option 2: Using API Endpoint

Make a POST request to your deployed application:

```bash
curl -X POST https://your-app.vercel.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@example.com",
    "password": "securepassword123",
    "role": "admin"
  }'
```

### Option 3: Using MongoDB Atlas UI

1. Go to MongoDB Atlas → Browse Collections
2. Select your database → `users` collection
3. Create a new document or edit an existing user
4. Set the `role` field to `"admin"`

## Step 5: Test Your Deployment

### 5.1 Test User Flow

1. Visit `https://your-app.vercel.app/register`
2. Create a new user account
3. Login and submit a test complaint
4. Check if admin email notification is received

### 5.2 Test Admin Flow

1. Login with admin credentials at `https://your-app.vercel.app/login`
2. Verify redirect to `/admin` dashboard
3. Check if the test complaint appears in the table
4. Update the complaint status
5. Verify status update email notification

## Step 6: Custom Domain (Optional)

### 6.1 Add Custom Domain

1. Go to Vercel project → Settings → Domains
2. Add your custom domain (e.g., `complaints.yourdomain.com`)
3. Configure DNS records as instructed by Vercel

### 6.2 Update Environment Variables

Once domain is configured:
1. Update `NEXT_PUBLIC_APP_URL` to your custom domain
2. Update `SENDGRID_FROM_EMAIL` if using custom domain
3. Redeploy

## Troubleshooting

### Build Fails

**Error**: Module not found or TypeScript errors
- **Solution**: Check `package.json` dependencies are correct
- Run `npm install` locally and commit any changes
- Check Vercel build logs for specific errors

### Database Connection Failed

**Error**: MongoDB connection timeout
- **Solution**: Check MongoDB Atlas Network Access whitelist
- Verify `MONGODB_URI` is correctly set in Vercel environment variables
- Test connection string locally first

### Email Not Sending

**Error**: SendGrid authentication failed
- **Solution**: Verify `SENDGRID_API_KEY` is correct
- Check sender email is verified in SendGrid
- Review SendGrid activity logs for errors

### Authentication Issues

**Error**: JWT token errors or login failures
- **Solution**: Verify `JWT_SECRET` is set in environment variables
- Clear browser cookies and try again
- Check that cookies are being set (check browser dev tools)

### 404 on Dynamic Routes

**Error**: API routes return 404
- **Solution**: Ensure you're using Next.js 14+ App Router
- Check file structure matches: `app/api/complaints/[id]/route.ts`
- Redeploy the application

## Monitoring and Logs

### View Deployment Logs

1. Go to Vercel Dashboard → Your Project
2. Click on the deployment
3. View "Building" and "Runtime Logs" tabs

### Monitor Application

- **Analytics**: Vercel provides built-in analytics
- **Error Tracking**: Check runtime logs for errors
- **Performance**: Monitor Web Vitals in Vercel dashboard

## Continuous Deployment

Vercel automatically deploys when you push to your repository:

- **Push to `main` branch** → Production deployment
- **Push to other branches** → Preview deployment
- **Pull Requests** → Automatic preview deployments

## Security Checklist

- [ ] All environment variables are properly set
- [ ] JWT_SECRET is a strong random string
- [ ] MongoDB Atlas has proper network access controls
- [ ] SendGrid API key has minimum required permissions
- [ ] Admin users are properly created and secured
- [ ] HTTPS is enabled (automatic with Vercel)
- [ ] No sensitive data in GitHub repository

## Performance Optimization

### Enable Vercel Features

1. **Edge Functions**: Already enabled with Next.js
2. **Image Optimization**: Built-in with Next.js
3. **Caching**: Configured automatically

### MongoDB Optimization

1. Create indexes for frequently queried fields:
   ```javascript
   // In MongoDB Atlas or Compass
   db.complaints.createIndex({ status: 1, dateSubmitted: -1 })
   db.complaints.createIndex({ userId: 1 })
   db.users.createIndex({ email: 1 }, { unique: true })
   ```

## Backup Strategy

### Database Backups

1. MongoDB Atlas automatically backs up your data
2. Configure backup schedule in Atlas → Backup tab
3. Test restore procedures periodically

### Code Backups

- GitHub serves as your code repository backup
- Consider enabling GitHub's backup features
- Tag releases for easy rollback: `git tag v1.0.0`

## Updating the Application

### Deploy Updates

```bash
# Make your changes
git add .
git commit -m "Description of changes"
git push origin main

# Vercel automatically deploys
```

### Rollback

If something goes wrong:
1. Go to Vercel Dashboard → Deployments
2. Find a working deployment
3. Click "..." → "Promote to Production"

## Cost Considerations

### Free Tier Limits

- **Vercel**: Generous free tier for personal projects
- **MongoDB Atlas**: M0 free tier (512 MB storage)
- **SendGrid**: 100 emails/day free

### Upgrade Considerations

Consider upgrading when you exceed:
- MongoDB: 512 MB storage or need better performance
- SendGrid: More than 100 emails/day
- Vercel: Need team features or higher limits

## Support and Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com)
- [SendGrid Documentation](https://docs.sendgrid.com)

---

## Quick Reference

### Environment Variables Template

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/complaint-management
JWT_SECRET=generate-with-openssl-rand-base64-32
SENDGRID_API_KEY=SG.your-api-key
SENDGRID_FROM_EMAIL=noreply@yourdomain.com
ADMIN_EMAIL=admin@yourdomain.com
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

### Essential Commands

```bash
# Local development
npm run dev

# Build for production
npm run build

# Create admin user
npm run create-admin

# Deploy to Vercel
git push origin main
```

---

**Congratulations! Your Complaint Management System is now live on Vercel! 🎉**


