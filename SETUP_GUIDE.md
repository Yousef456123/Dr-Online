# Dr. Online - Phase 2 Backend Setup Guide

## 📋 Project Overview

This document provides complete setup and deployment instructions for the Dr. Online healthcare platform backend (Node.js/Express with MongoDB).

## 🎯 Project Objectives

✅ Apply web design and development principles using Node.js as backend  
✅ Understand client-server communication and database integration  
✅ Implement complete CRUD operations on MongoDB database  
✅ User authentication with JWT and role-based access control  
✅ Email notifications for contact requests (Bonus)  

## 📦 Features Implemented

### Core Features
- **Authentication**: Signup/Login with JWT and bcrypt password hashing
- **User Management**: Patient, Doctor, and Admin roles
- **Discussions**: Full CRUD with replies, likes, and filtering
- **Medical Studies**: Doctor-only creation and management
- **Contact Requests**: Form submission with moderator booking
- **Email Notifications**: Automated emails for key events (Bonus)

### Database Models
1. **User** - Authentication and profile management
2. **Discussion** - Community discussions with replies
3. **Study** - Medical studies and research updates
4. **ContactRequest** - Support requests with assignment
5. **ModeratorBooking** - Booking management

## 🚀 Quick Start

### Prerequisites
- **Node.js** v14+ ([Download](https://nodejs.org/))
- **MongoDB** ([Local](https://www.mongodb.com/try/download/community) or [Atlas Cloud](https://www.mongodb.com/cloud/atlas))
- **npm** or **yarn**
- **Git**

### Step 1: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your configuration
# See Configuration section below
```

### Step 2: Configure Environment

Edit `backend/.env`:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/dr-online

# Server
PORT=5000
NODE_ENV=development

# JWT
JWT_SECRET=your_very_secret_key_change_this_in_production
JWT_EXPIRE=7d

# Email (Optional - for notifications)
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_specific_password
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587

# Frontend
FRONTEND_URL=http://localhost:5173
```

### Step 3: Start Backend

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

Server will run at `http://localhost:5000`

### Step 4: Frontend Configuration

Edit `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

## 🔐 Authentication System

### User Roles
- **Patient**: Can access discussions, view studies, submit contact requests
- **Doctor**: Can create studies, moderate discussions, view patient requests
- **Admin**: Full access, manage moderators, contact requests, all users

### JWT Implementation
- Tokens stored in `localStorage` as `authToken`
- Included in Authorization header: `Bearer <token>`
- Auto-logout on 401 Unauthorized
- Token expires after 7 days (configurable)

### Password Security
- Hashed with bcryptjs (10 salt rounds)
- Never stored in plain text
- Compared securely with bcryptjs.compare()

## 📡 API Endpoints

### Authentication
```
POST   /api/auth/register       - Register new user
POST   /api/auth/login          - Login user
GET    /api/auth/me             - Get current user (Protected)
```

### Users
```
GET    /api/users               - Get all users (Admin)
GET    /api/users/:id           - Get user profile
GET    /api/users/role/doctor   - Get all doctors
PUT    /api/users/:id           - Update profile (Protected)
DELETE /api/users/:id           - Delete account (Protected)
```

### Discussions
```
GET    /api/discussions         - Get all discussions
POST   /api/discussions         - Create discussion (Protected)
GET    /api/discussions/:id     - Get single discussion
PUT    /api/discussions/:id     - Update discussion (Protected)
DELETE /api/discussions/:id     - Delete discussion (Protected)
POST   /api/discussions/:id/reply      - Add reply (Protected)
POST   /api/discussions/:id/like       - Like discussion (Protected)
```

### Studies
```
GET    /api/studies             - Get all studies
POST   /api/studies             - Create study (Doctor only)
GET    /api/studies/:id         - Get single study
PUT    /api/studies/:id         - Update study (Protected)
DELETE /api/studies/:id         - Delete study (Protected)
POST   /api/studies/:id/like    - Like study (Protected)
```

### Contact Requests
```
POST   /api/contact             - Submit contact request (Public)
GET    /api/contact             - Get all requests (Admin)
GET    /api/contact/:id         - Get single request (Protected)
POST   /api/contact/:id/book-moderator    - Book moderator (Admin)
POST   /api/contact/:id/assign-doctor     - Assign doctor (Admin)
POST   /api/contact/:id/reply             - Add reply (Protected)
PUT    /api/contact/:id/status            - Update status (Admin)
```

## ✉️ Email Notifications (Bonus Feature)

### Setup Gmail for Emails

1. **Enable 2-Step Verification**
   - Go to [myaccount.google.com](https://myaccount.google.com)
   - Security → 2-Step Verification

2. **Generate App Password**
   - Security → App passwords
   - Select Mail and Windows Computer
   - Copy generated 16-character password

3. **Configure in .env**
   ```env
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=xxxx xxxx xxxx xxxx
   ```

### Email Events
- **Moderator Booked**: Sent when user books moderator from contact form
- **Moderator Assignment**: Sent to assigned moderator
- **Doctor Assignment**: Sent to assigned doctor for patient referral

## 🗄️ Database Schema

### User
```javascript
{
  fullName: String (required),
  email: String (unique, required),
  password: String (hashed),
  role: 'patient' | 'doctor' | 'admin',
  specialization: String,      // For doctors
  phoneNumber: String,
  bio: String,
  profileImage: String,
  isVerified: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Discussion
```javascript
{
  title: String (required),
  description: String (required),
  category: 'general' | 'research' | 'questions' | 'experiences',
  author: ObjectId (User ref),
  replies: [{user, content, createdAt}],
  views: Number,
  likes: [ObjectId],
  status: 'open' | 'closed' | 'resolved',
  tags: [String],
  createdAt: Date,
  updatedAt: Date
}
```

### Study
```javascript
{
  title: String (required),
  description: String (required),
  condition: String (required),
  author: ObjectId (User ref),
  source: String,
  content: String,
  publicationDate: Date,
  tags: [String],
  likes: [ObjectId],
  shares: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### ContactRequest
```javascript
{
  fullName: String (required),
  email: String (required),
  phoneNumber: String (required),
  subject: String (required),
  message: String (required),
  requestType: 'consultation' | 'question' | 'feedback' | 'booking',
  status: 'pending' | 'acknowledged' | 'moderator-assigned' | 'doctor-assigned' | 'resolved',
  assignedModerator: ObjectId (User ref),
  assignedDoctor: ObjectId (User ref),
  replies: [{sender, senderRole, message, timestamp}],
  createdAt: Date,
  updatedAt: Date
}
```

## 📱 Frontend Integration

### API Service (`frontend/src/services/api.js`)
Pre-configured axios instance with:
- Automatic JWT token injection
- CORS handling
- Error response handling
- Auto-logout on 401

### Updated Components
1. **Register.jsx** - Signup with Doctor/Patient tabs
2. **Contact.jsx** - Contact form with API submission
3. **Discussions.jsx** - Discussion creation and listing from API
4. **AdminPanel.jsx** - Admin dashboard for managing requests

### Usage Example
```javascript
import { authAPI, contactAPI } from '../services/api'

// Register
const response = await authAPI.register({
  fullName: 'John Doe',
  email: 'john@example.com',
  password: 'password123',
  role: 'patient'
})

localStorage.setItem('authToken', response.data.token)
```

## 🛠️ Admin Panel

Located at: `frontend/src/pages/AdminPanel.jsx`

### Features
- Dashboard with request statistics
- Contact request management
- Moderator booking
- Status updates
- Email notifications

### Access
- Only admin users can access
- Route protection via role check
- Admin dashboard at `/admin` (can be added to routing)

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Start MongoDB service or use Atlas cloud connection

### Email Not Sending
- Verify Gmail App Password (not regular password)
- Check 2-Step Verification is enabled
- Ensure EMAIL_USER and EMAIL_PASSWORD are in .env
- Check firewall/antivirus blocking SMTP port 587

### CORS Errors
- Verify `FRONTEND_URL` in backend .env matches frontend domain
- Check frontend .env has correct `VITE_API_URL`
- Ensure backend has `cors()` middleware enabled

### JWT Token Errors
- Clear localStorage and login again
- Verify `JWT_SECRET` is consistent
- Check token expiry: `JWT_EXPIRE` in .env

### Validation Errors
- All required fields must be filled
- Email must be valid format
- Password minimum 6 characters
- Message minimum 10 characters

## 📊 Testing API Endpoints

### Using cURL
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "patient"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'

# Get discussions (with auth)
curl -X GET http://localhost:5000/api/discussions \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Using Postman
1. Import collection from API documentation
2. Set environment variables (BASE_URL, TOKEN)
3. Test endpoints individually or via collection runner

## 🚢 Deployment

### Deploy Backend (Heroku)

```bash
# Install Heroku CLI
npm install -g heroku

# Login to Heroku
heroku login

# Create Heroku app
heroku create your-app-name

# Set environment variables
heroku config:set MONGODB_URI=your_atlas_uri
heroku config:set JWT_SECRET=your_production_secret
heroku config:set NODE_ENV=production

# Deploy
git push heroku main
```

### Deploy Frontend (Vercel)

```bash
# Install Vercel CLI
npm install -g vercel

# Login and deploy
vercel --prod

# Configure VITE_API_URL environment variable in Vercel dashboard
```

### MongoDB Atlas Setup
1. Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Create free tier cluster
3. Create database user
4. Whitelist IP addresses
5. Copy connection string to MONGODB_URI

## 📝 Project Structure

```
Dr.online/
├── backend/
│   ├── config/
│   │   ├── database.js
│   │   └── env.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── discussionController.js
│   │   ├── studyController.js
│   │   └── contactController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Discussion.js
│   │   ├── Study.js
│   │   ├── ContactRequest.js
│   │   └── ModeratorBooking.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   ├── discussionRoutes.js
│   │   ├── studyRoutes.js
│   │   └── contactRoutes.js
│   ├── utils/
│   │   └── emailService.js
│   ├── server.js
│   ├── package.json
│   ├── .env
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── services/
    │   │   └── api.js
    │   ├── pages/
    │   │   ├── Register.jsx
    │   │   ├── Contact.jsx
    │   │   ├── Discussions.jsx
    │   │   └── AdminPanel.jsx
    │   └── ...
    ├── .env
    └── package.json
```

## 🔄 Development Workflow

1. **Start MongoDB** (local or use Atlas)
2. **Start Backend**: `cd backend && npm run dev`
3. **Start Frontend**: `cd frontend && npm run dev`
4. **Test in Browser**: http://localhost:5173
5. **Monitor Backend**: Terminal shows request logs

## 📚 Documentation

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [JWT Documentation](https://jwt.io/)
- [Nodemailer Documentation](https://nodemailer.com/)

## 💡 Future Enhancements

- [ ] Real-time notifications with Socket.io
- [ ] Video consultation scheduling
- [ ] Payment integration
- [ ] Advanced search and filters
- [ ] User ratings and reviews
- [ ] Appointment management
- [ ] Medical records storage
- [ ] Mobile app (React Native)

## 📞 Support

For issues or questions:
1. Check troubleshooting section
2. Review server logs
3. Check MongoDB connection
4. Verify environment variables

## ✅ Checklist

Before deployment:
- [ ] MongoDB connection tested
- [ ] All .env variables configured
- [ ] JWT_SECRET is strong and unique
- [ ] Email credentials set (if using emails)
- [ ] CORS configured for frontend domain
- [ ] Frontend API URL points to backend
- [ ] All dependencies installed
- [ ] No console errors or warnings
- [ ] API endpoints tested
- [ ] Database backups created

## 📄 License

MIT License

---

**Project completed**: December 2025  
**Technologies**: Node.js, Express, MongoDB, React, Tailwind CSS  
**Authors**: Youssef Younes, Bashir Saad
