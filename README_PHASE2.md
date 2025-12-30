# Dr. Online - Phase 2: Full Stack Implementation

## 🎓 Project Summary

**Phase 2** completes the Dr. Online healthcare platform with a complete Node.js/MongoDB backend, enabling full client-server communication, database integration, and user authentication.

### What's Included

✅ **Backend API** - Express.js server with RESTful endpoints  
✅ **Database** - MongoDB with 5 core models  
✅ **Authentication** - JWT-based login/signup with bcrypt  
✅ **CRUD Operations** - Complete data management for all entities  
✅ **Email Notifications** - Automated emails for key events (Bonus)  
✅ **Frontend Integration** - API client and updated components  
✅ **Admin Panel** - Dashboard for request management  
✅ **Documentation** - Complete setup and deployment guides  

---

## 📁 Project Structure

```
Dr.online/
├── backend/                    # Node.js/Express Backend
│   ├── config/
│   │   ├── database.js        # MongoDB connection
│   │   └── env.js             # Environment configuration
│   ├── controllers/           # Business logic
│   ├── models/                # MongoDB schemas
│   ├── routes/                # API endpoints
│   ├── middleware/            # Auth, error handling
│   ├── utils/                 # Helper functions
│   ├── server.js              # Main server entry point
│   ├── seed.js                # Database seeder
│   ├── package.json
│   ├── .env.example
│   ├── README.md
│   └── .gitignore
│
├── frontend/                  # React Frontend
│   ├── src/
│   │   ├── services/
│   │   │   └── api.js         # API client with axios
│   │   ├── pages/
│   │   │   ├── Register.jsx   # Updated: Backend integration
│   │   │   ├── Contact.jsx    # Updated: API form submission
│   │   │   ├── Discussions.jsx # Updated: Real API data
│   │   │   └── AdminPanel.jsx # New: Admin dashboard
│   │   └── ...
│   ├── .env                   # Frontend config
│   └── package.json
│
├── SETUP_GUIDE.md             # Complete setup instructions
├── PROJECT_REPORT.md          # Phase 1 report
└── README.md                  # This file
```

---

## 🚀 Quick Start (5 Minutes)

### Prerequisites
- Node.js v14+ 
- MongoDB (local or Atlas)
- npm/yarn

### 1. Install Backend Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment
```bash
# Copy example config
cp .env.example .env

# Edit .env with your values:
# MONGODB_URI=mongodb://localhost:27017/dr-online
# JWT_SECRET=your_secret_key
# PORT=5000
```

### 3. Start Backend
```bash
npm run dev
```
Backend runs at `http://localhost:5000`

### 4. Seed Sample Data (Optional)
```bash
npm run seed
```
Populates database with sample users, discussions, and studies for testing.

### 5. Start Frontend
```bash
cd ../frontend
npm run dev
```
Frontend runs at `http://localhost:5173`

### 6. Test in Browser
- Visit `http://localhost:5173`
- Register as Patient or Doctor
- Create discussions, view studies, submit contact requests

---

## 🔐 Authentication

### User Roles
| Role | Permissions |
|------|-------------|
| **Patient** | Register, view discussions, submit requests |
| **Doctor** | All patient + create studies, moderate discussions |
| **Admin** | Full access, manage moderators, view all requests |

### How It Works
1. User registers/logs in → JWT token generated
2. Token stored in localStorage
3. Included in all API requests
4. Validated on backend for protected routes
5. Auto-logout on token expiry

### Test Credentials (After Seeding)
```
Doctor: sarah.johnson@hospital.com / password123
Patient: john.patient@email.com / password123
Admin: admin@dronline.com / admin123456
```

---

## 📡 API Documentation

### Authentication
```
POST   /api/auth/register       Register new user
POST   /api/auth/login          Login and get JWT token
GET    /api/auth/me             Get current user profile
```

### Users
```
GET    /api/users               All users (Admin only)
GET    /api/users/:id           User profile
GET    /api/users/role/doctor   All doctors list
PUT    /api/users/:id           Update profile
DELETE /api/users/:id           Delete account
```

### Discussions (Community Hub)
```
GET    /api/discussions         All discussions with filters
POST   /api/discussions         Create new discussion
GET    /api/discussions/:id     Get discussion with replies
PUT    /api/discussions/:id     Update discussion
DELETE /api/discussions/:id     Delete discussion
POST   /api/discussions/:id/reply       Add reply to discussion
POST   /api/discussions/:id/like        Like/unlike discussion
```

### Studies (Medical Research)
```
GET    /api/studies             All studies
POST   /api/studies             Create study (Doctor only)
GET    /api/studies/:id         Get study details
PUT    /api/studies/:id         Update study
DELETE /api/studies/:id         Delete study
POST   /api/studies/:id/like    Like study
```

### Contact Requests
```
POST   /api/contact             Submit new request (Public)
GET    /api/contact             All requests (Admin only)
GET    /api/contact/:id         Request details
POST   /api/contact/:id/book-moderator    Assign moderator (Admin)
POST   /api/contact/:id/assign-doctor     Assign doctor (Admin)
POST   /api/contact/:id/reply             Add response
PUT    /api/contact/:id/status            Update status
```

---

## 🗄️ Database Models

### 1. User Model
Stores authentication and profile information
- Email (unique), password (hashed), full name
- Role: patient, doctor, or admin
- For doctors: specialization field
- Profile: bio, phone, image, verification status

### 2. Discussion Model
Community discussion threads with replies
- Author, title, description, category
- Replies array with nested responses
- Likes counter, view counter
- Status: open, closed, resolved

### 3. Study Model
Medical research and study updates
- Author (doctor), title, content, condition
- Source and publication date
- Tags, likes, share count
- Attachments support

### 4. ContactRequest Model
Support and consultation requests
- User info: name, email, phone
- Request type and message
- Status tracking: pending → resolved
- Assigned moderator/doctor
- Replies thread

### 5. ModeratorBooking Model
Tracks moderator and doctor assignments
- Links patient, moderator, doctor, request
- Topic, status, scheduled date
- Audit trail for assignments

---

## 🔧 Configuration

### Backend (.env)

```env
# Database Connection
MONGODB_URI=mongodb://localhost:27017/dr-online

# Server
PORT=5000
NODE_ENV=development

# JWT Authentication
JWT_SECRET=your_very_secret_key_change_in_production
JWT_EXPIRE=7d

# Email Service (Optional)
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_specific_password
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587

# CORS
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api
```

---

## ✉️ Email Notifications (Bonus Feature)

Automated emails are sent for:

1. **Moderator Booked** - Confirmation to user
2. **Moderator Assigned** - Notification to moderator
3. **Doctor Assigned** - Referral to doctor

### Setup Gmail SMTP
1. Enable 2-Step Verification in Google Account
2. Generate App Password (not regular password)
3. Add credentials to `.env`:
   ```env
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=16_character_app_password
   ```

Emails are sent automatically when:
- Contact request → moderator booked
- Moderator assigned → notification
- Doctor assigned → referral

---

## 📊 Frontend Components Updated

### Register Page (`/register`)
- Tab-based signup for Patient/Doctor
- Form validation
- Role selection
- Specialization field for doctors
- Error/success messages
- Auto-redirect after registration

### Contact Page (`/contact`)
- Form submission to backend
- Request type selection
- Phone number field
- Success notifications
- Moderator booking flow

### Discussions Page (`/discussions`)
- Fetch discussions from API
- Real-time topic creation
- Reply system
- Like/unlike functionality
- Filter by category
- View counter

### Admin Panel (`/admin`)
- Dashboard with statistics
- Contact request management
- Moderator booking interface
- Status updates
- User management

---

## 🧪 Testing

### Using cURL

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "role": "patient"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'

# Get discussions (requires token)
curl -X GET http://localhost:5000/api/discussions \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Using Postman
1. Download [Postman](https://www.postman.com/downloads/)
2. Import collection (available in docs)
3. Set environment variables (BASE_URL, TOKEN)
4. Run requests

### Sample Data
Run seeder to populate database:
```bash
npm run seed
```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| MongoDB Connection Error | Start MongoDB service or use Atlas URI |
| CORS Error | Verify FRONTEND_URL in backend .env |
| Email Not Sending | Check Gmail App Password and SMTP settings |
| Token Expired | Clear localStorage and login again |
| API Not Responding | Check backend is running on port 5000 |

See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed troubleshooting.

---

## 🚢 Deployment

### Deploy Backend (Heroku/Railway)

```bash
# Configure environment variables
# MONGODB_URI, JWT_SECRET, NODE_ENV=production

# Deploy
git push heroku main
```

### Deploy Frontend (Vercel/Netlify)

```bash
# Configure environment
# VITE_API_URL=https://your-backend.com/api

# Deploy
vercel --prod
```

### Production Checklist
- [ ] Strong JWT_SECRET
- [ ] MongoDB Atlas cluster secured
- [ ] Email credentials set
- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] Logs monitored
- [ ] Backups scheduled

---

## 📚 Key Technologies

| Technology | Purpose |
|-----------|---------|
| **Node.js** | Runtime environment |
| **Express.js** | Web framework |
| **MongoDB** | NoSQL database |
| **Mongoose** | MongoDB ODM |
| **JWT** | Authentication tokens |
| **bcryptjs** | Password hashing |
| **Nodemailer** | Email service |
| **axios** | HTTP client |
| **React** | UI framework |
| **Tailwind CSS** | Styling |

---

## ✨ Features Implemented

### Core Requirements ✅
- [x] Node.js backend
- [x] MongoDB database
- [x] User authentication (Login/Signup)
- [x] CRUD operations on all entities
- [x] Role-based access control
- [x] Data validation and error handling

### Bonus Features ✅
- [x] Email notifications
- [x] Moderator booking system
- [x] Admin panel/dashboard
- [x] Discussion replies and likes
- [x] Study filtering and search

---

## 🎯 Project Objectives Met

### Objective 1: Web Design & Development with Node.js ✅
- Complete backend architecture with Express.js
- RESTful API following best practices
- Proper separation of concerns (models, controllers, routes)

### Objective 2: Client-Server Communication ✅
- Axios-based API client
- JWT token management
- Request/response handling
- CORS configuration

### Objective 3: Database Integration ✅
- MongoDB schemas and models
- Mongoose ODM for validation
- Data relationships (references)
- CRUD operations on all entities

---

## 📞 Support & Resources

- **Backend README**: [backend/README.md](./backend/README.md)
- **Setup Guide**: [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- **API Documentation**: Available in backend README
- **MongoDB Docs**: https://docs.mongodb.com
- **Express Docs**: https://expressjs.com

---

## 👥 Team

- **Youssef Younes**
- **Bashir Saad**

**Date**: December 2025  
**Course**: Frontend Web Development  
**Phase**: 2 (Backend Development)

---

## 📝 License

MIT License - Free to use and modify

---

## 🎉 Next Steps

1. **Run the backend**: `cd backend && npm run dev`
2. **Seed sample data**: `npm run seed`
3. **Start the frontend**: `cd frontend && npm run dev`
4. **Visit the app**: http://localhost:5173
5. **Test with sample credentials** (see above)
6. **Review API endpoints** in backend README
7. **Deploy** when ready (see deployment section)

**Happy coding! 🚀**
