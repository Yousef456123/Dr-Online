# Dr.Online - Healthcare Consultation Platform

A full-stack MERN application connecting doctors and patients for real-time healthcare consultations, discussions, and medical insights.

![Status](https://img.shields.io/badge/Status-Active-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)
![Node Version](https://img.shields.io/badge/Node-18%2B-success)

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Future Scope](#future-scope)

---

## ✨ Features

### User Management
- User registration and authentication (JWT-based)
- Role-based access control (Patient, Doctor, Admin)
- Profile management with avatar upload/removal
- User authorization middleware

### Discussion Forum
- Create, read, update, delete (CRUD) discussions
- Category-based filtering (General, Research, Questions, Experiences)
- Real-time discussion threads with replies
- Author-only edit/delete permissions
- Discussion views and engagement tracking

### Studies & Research
- Medical study updates and resources
- Study management by admin/doctors
- Categorized by medical conditions
- Linked medical research materials

### Contact & Booking
- Contact request submission
- Moderator booking system
- Doctor assignment for consultations
- Status tracking (pending, in-progress, resolved)
- Email notifications

### Admin Panel
- User management dashboard
- Discussion and study moderation
- Contact request management
- System statistics and reports

---

## 🛠 Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client with interceptors
- **ESLint** - Code quality

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB & Mongoose** - Database and ODM
- **JWT (jsonwebtoken 9.0.2)** - Authentication
- **bcryptjs** - Password hashing
- **Multer** - File upload handling
- **express-validator** - Input validation
- **Nodemailer** - Email notifications
- **CORS** - Cross-origin resource sharing

### DevOps & Deployment
- **Git** - Version control
- **GitHub** - Repository hosting
- **Render/Railway** - Backend hosting
- **GitHub Pages/Vercel** - Frontend hosting
- **MongoDB Atlas** - Cloud database

---

## 📁 Project Structure

```
Dr.online/
├── backend/
│   ├── config/
│   │   ├── database.js          # MongoDB connection
│   │   └── env.js               # Environment config
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── discussionController.js
│   │   ├── studyController.js
│   │   └── contactController.js
│   ├── middleware/
│   │   ├── auth.js              # JWT protection & authorization
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Discussion.js
│   │   ├── Study.js
│   │   ├── ContactRequest.js
│   │   └── ModeratorBooking.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   ├── discussionRoutes.js
│   │   ├── studyRoutes.js
│   │   └── contactRoutes.js
│   ├── utils/
│   │   └── emailService.js      # Email notifications
│   ├── uploads/
│   │   └── avatars/             # User profile images
│   ├── server.js                # Express app setup
│   ├── package.json
│   └── seed.js                  # Database seeding
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Layout.jsx
│   │   │   └── PageHero.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Discussions.jsx
│   │   │   ├── TopicDetail.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── AdminPanel.jsx
│   │   ├── services/
│   │   │   └── api.js           # Axios client & API endpoints
│   │   ├── data/
│   │   │   ├── discussions.js
│   │   │   └── studies.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── index.html
│
├── README.md
├── .gitignore
└── docs/
    └── PROJECT_REPORT.md
```

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js v18 or higher
- npm or yarn
- MongoDB (local or MongoDB Atlas)
- Git

### Backend Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/Dr.online.git
   cd Dr.online/backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file in `backend/` directory:**
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dronline
   JWT_SECRET=your_jwt_secret_key_here
   FRONTEND_URL=http://localhost:5173
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_app_password
   ```

4. **Seed the database (optional):**
   ```bash
   npm run seed
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```
   Server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd ../frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env.local` file (if needed):**
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

---

## 🔐 Environment Variables

### Backend (.env)
```env
PORT                    # Server port (default: 5000)
NODE_ENV               # environment (development/production)
MONGODB_URI            # MongoDB connection string
JWT_SECRET             # Secret key for JWT tokens
FRONTEND_URL           # Frontend origin for CORS
SMTP_USER              # Email for notifications
SMTP_PASS              # Email app password
```

### Frontend (.env.local)
```env
VITE_API_URL          # Backend API base URL
```

---

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (protected)

### Users
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user profile (protected)
- `DELETE /api/users/:id` - Delete user (protected)
- `POST /api/users/:id/avatar` - Upload avatar (protected)
- `DELETE /api/users/:id/avatar` - Remove avatar (protected)
- `GET /api/users/role/doctor` - Get all doctors

### Discussions
- `GET /api/discussions` - Get all discussions
- `POST /api/discussions` - Create discussion (protected)
- `GET /api/discussions/:id` - Get discussion by ID
- `PUT /api/discussions/:id` - Update discussion (protected, author only)
- `DELETE /api/discussions/:id` - Delete discussion (protected, author only)
- `POST /api/discussions/:id/reply` - Add reply (protected)

### Studies
- `GET /api/studies` - Get all studies
- `POST /api/studies` - Create study (protected)
- `GET /api/studies/:id` - Get study by ID
- `PUT /api/studies/:id` - Update study (protected)
- `DELETE /api/studies/:id` - Delete study (protected)

### Contact Requests
- `POST /api/contact` - Submit contact request
- `GET /api/contact` - Get all contacts (admin only)
- `GET /api/contact/mine` - Get user's contacts (protected)
- `GET /api/contact/:id` - Get contact by ID (protected)
- `POST /api/contact/:id/reply` - Add reply (protected)

---

## 📸 Screenshots

### Home Page
Home page with hero section, key features, and call-to-action buttons.

### Discussion Forum
![Discussions Page - Shows collapsible topic creation form and existing discussions](./docs/screenshots/discussions.png)

Features:
- Compact "+ Start a Discussion" button that expands to full form
- Category filtering
- Author-only edit/delete
- Real-time discussion threads

### User Profile
![Profile Page - Shows user avatar with change/remove buttons and topics](./docs/screenshots/profile.png)

Features:
- Avatar upload/remove functionality
- User topics display
- Contact messages
- Edit/delete own topics

### Login & Registration
- Secure authentication with JWT
- Form validation
- Error handling and user feedback

### Admin Panel
Dashboard for:
- User management
- Discussion moderation
- Study management
- Contact request handling

---

## 🌐 Deployment

### Frontend Deployment (GitHub Pages / Vercel)

**Option 1: GitHub Pages**
```bash
# Build the frontend
cd frontend
npm run build

# Deploy using GitHub Pages
npm run deploy
```

**Option 2: Vercel**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Backend Deployment (Render / Railway)

**Option 1: Render**
1. Push code to GitHub
2. Connect GitHub repo to Render
3. Set environment variables in Render dashboard
4. Deploy

**Option 2: Railway**
1. Sign up at railway.app
2. Connect GitHub repo
3. Configure environment variables
4. Auto-deploy on push

**Environment Variables Required:**
- `MONGODB_URI` - MongoDB Atlas connection
- `JWT_SECRET` - Secret key
- `NODE_ENV=production`
- `FRONTEND_URL` - Production frontend URL
- `SMTP_USER` & `SMTP_PASS` - Email config

---

## 🔄 Git Commit History

```bash
# View commit history
git log --oneline

# Key commits:
# - Initial project scaffold
# - Add authentication system
# - Implement discussion forum
# - Add avatar upload/remove feature
# - Create admin panel
# - Add email notifications
# - Setup environment configuration
```

---

## 💻 Development Workflow

### Running Both Servers Simultaneously (Terminal 1 & 2)

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Then visit: `http://localhost:5173`

---

## 🧪 Testing

### Backend Testing
```bash
# Run seed script to populate test data
cd backend
npm run seed
```

### Test Credentials (After Seeding)
- **Patient Account:** patient@example.com / password123
- **Doctor Account:** doctor@example.com / password123
- **Admin Account:** admin@example.com / password123

---

## 🚀 Future Scope

### Phase 2 Features
1. **Real-time Chat** - WebSocket integration for instant messaging
2. **Video Consultation** - WebRTC for video calls between doctors and patients
3. **Appointment Booking** - Calendar integration and scheduling
4. **Prescription Management** - Digital prescriptions with pharmacy integration
5. **Medical Records** - Secure file storage and retrieval
6. **Mobile App** - React Native mobile application
7. **AI-Powered Assistant** - Chatbot for initial consultation
8. **Payment Integration** - Stripe/PayPal for paid consultations
9. **Analytics Dashboard** - Advanced metrics and reporting
10. **Multi-language Support** - i18n implementation

### Technical Improvements
- Unit and integration tests (Jest, Supertest)
- API rate limiting and security hardening
- CDN integration for static assets
- Database query optimization
- Caching layer (Redis)
- Elasticsearch for advanced search
- Kubernetes deployment configuration

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👥 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📧 Contact & Support

For questions or support, please contact:
- Email: hello@dronline.health
- Phone: +961 81 925 158
- Website: www.dronline.health

---

## 🙏 Acknowledgments

- React and Vite communities
- Tailwind CSS for styling utilities
- MongoDB for database excellence
- All contributors and testers

---

**Last Updated:** December 30, 2025  
**Version:** 1.0.0
