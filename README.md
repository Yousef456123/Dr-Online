# Dr. Online - Healthcare Communication Platform

A modern, responsive web application designed to bridge the communication gap between healthcare providers and patients.

## 🏥 Project Overview

**Dr. Online** is a full-stack healthcare communication platform built with React.js on the frontend and Node.js/Express with MongoDB on the backend. The platform enables doctors and patients to register, share medical studies, and engage in collaborative discussions about diseases and treatments.

**Project Title:** Dr. Online - Healthcare Communication Platform  
**Date:** December 2025  
**Authors:** Youssef Younes / Bashir Saad

---

## 🎯 Key Features

- **User Registration & Authentication**: Separate registration flows for doctors and patients with JWT-based authentication
- **Discussion Forum**: Real-time topic creation and collaborative discussions between healthcare professionals and patients
- **Medical Study Updates**: Doctors can share and update recent medical research findings on specific conditions
- **User Profiles**: Customizable profiles with role-based access control (Patient, Doctor, Admin)
- **File Uploads**: Avatar uploads and medical document attachments
- **Responsive Design**: Fully responsive design that works seamlessly across desktop, tablet, and mobile devices
- **Dynamic Topic Details**: Click-through pages for individual discussion topics with related studies

---

## 🏗️ Project Structure

```
Dr-Online/
├── frontend/                 # React.js frontend application
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API service calls
│   │   ├── data/            # Mock data
│   │   ├── assets/          # Images and static files
│   │   ├── App.jsx          # Main app component
│   │   └── main.jsx         # React entry point
│   ├── package.json
│   ├── vite.config.js       # Vite configuration
│   ├── tailwind.config.js   # Tailwind CSS configuration
│   └── README.md            # Frontend documentation
│
├── backend/                  # Node.js/Express backend
│   ├── config/              # Configuration files
│   ├── controllers/         # Route controllers
│   ├── models/              # MongoDB schemas
│   ├── routes/              # API routes
│   ├── middleware/          # Express middleware
│   ├── utils/               # Utility functions
│   ├── uploads/             # File storage
│   ├── package.json
│   ├── server.js            # Server entry point
│   └── seed.js              # Database seeding
│
└── docs/                     # Documentation files
```

---

## 🚀 Tech Stack

### Frontend
- **React.js** (v19.2.0) - UI library
- **React Router DOM** (v6.x) - Client-side routing
- **Tailwind CSS** (v3.4.14) - Utility-first CSS framework
- **Vite** (v7.2.2) - Build tool
- **PostCSS** & **Autoprefixer** - CSS processing

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** (v4.18.2) - Web framework
- **MongoDB** (via Mongoose v8.0.0) - NoSQL database
- **JWT** (jsonwebtoken v9.0.2) - Authentication
- **Bcryptjs** (v2.4.3) - Password hashing
- **Multer** (v1.4.5) - File upload handling
- **Nodemailer** (v6.9.7) - Email service
- **Express Validator** (v7.0.0) - Input validation
- **CORS** (v2.8.5) - Cross-origin support

---

## 📋 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB (local or MongoDB Atlas)
- Git

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

Development server runs at `http://localhost:5173`

### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file with configuration
# Copy .env.example and update with your values
cp .env.example .env

# Start development server
npm run dev

# Start production server
npm start

# Seed database with sample data
npm run seed
```

Backend API runs at `http://localhost:5000`

### Environment Configuration

**Frontend (.env)**
```
VITE_API_URL=http://localhost:5000/api
```

**Backend (.env)**
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/dr-online
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
```

---

## 📱 Pages & Routes

### Frontend Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Landing page with hero, features, and stats |
| `/about` | About | Platform information and team details |
| `/services` | Services | Features and medical specialties |
| `/discussions` | Discussions | Forum with topic creation and filtering |
| `/discussions/:topicId` | Topic Detail | Individual discussion thread |
| `/contact` | Contact | Contact form and support information |
| `/register` | Register | User registration (Doctor/Patient) |

### Backend API Endpoints

#### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

#### Users
- `GET /api/users/profile/:userId` - Get user profile
- `PUT /api/users/profile/:userId` - Update profile
- `GET /api/users/doctors` - List all doctors

#### Discussions
- `GET /api/discussions` - List all discussions
- `GET /api/discussions/:id` - Get discussion details
- `POST /api/discussions` - Create discussion
- `POST /api/discussions/:id/reply` - Add reply
- `POST /api/discussions/:id/like` - Like discussion

#### Studies
- `GET /api/studies` - List all studies
- `GET /api/studies/:id` - Get study details
- `POST /api/studies` - Create study (doctor only)
- `POST /api/studies/:id/like` - Like study

#### Contact
- `POST /api/contact/submit` - Submit contact form
- `GET /api/contact/submissions` - Get submissions (admin)

---

## 🔐 Authentication & Security

- **JWT Tokens**: 7-day expiration for secure sessions
- **Password Hashing**: Bcrypt with 10 salt rounds
- **Role-Based Access Control**: Patient, Doctor, and Admin roles
- **Protected Routes**: Authorization middleware for sensitive operations
- **CORS Configuration**: Restricted to configured frontend URL
- **Input Validation**: Express-validator for request sanitization
- **File Upload Security**: Multer with type and size restrictions

---

## 📊 Database Models

### User
- Full name, email, password
- Role (patient/doctor/admin)
- Specialization (for doctors)
- Phone, bio, profile image
- Email verification status
- Timestamps

### Discussion
- Title, description, category
- Author reference
- Tags, replies, views
- Likes, sentiment, status
- Creation and update dates

### Study
- Title, description, medical condition
- Author (doctor) reference
- Source, publication date, content
- Attachments, tags
- Likes, shares, views

### ContactRequest
- Name, email, subject, message
- Status (pending/reviewed/resolved)
- Timestamps

### ModeratorBooking
- Doctor and patient references
- Booking date and time
- Status, notes
- Creation date

---

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#0c63db - #1f7eff)
- **Accent**: Cyan (#00d2ff)
- **Background**: Midnight (#081f3b)
- **Text**: Slate grays

### Typography
- **Font**: Poppins (system fallback)
- **Responsive scaling**: Mobile, Tablet, Desktop breakpoints

### Components
- Reusable card components
- Responsive grid layouts
- Hero sections
- Navigation bar and footer
- Form inputs and validation
- Modal dialogs (prepared)

---

## 📝 Documentation

For detailed documentation, see:
- [Frontend README](frontend/README.md) - Complete frontend implementation details
- [Backend README](backend/README.md) - Backend API documentation
- [Project Report](PROJECT_REPORT.md) - Comprehensive project analysis
- [Phase 2 README](README_PHASE2.md) - Backend implementation details
- [Quick Start Guide](QUICK_START.md) - Quick setup instructions

---

## 🚀 Deployment

### Frontend Deployment
- Build: `npm run build`
- Output: `dist/` directory
- Platforms: Vercel, Netlify, GitHub Pages, AWS S3
- Static hosting with automatic optimization

### Backend Deployment
- Platforms: Heroku, AWS, DigitalOcean, Render
- Database: MongoDB Atlas (cloud) or self-hosted
- Environment variables must be configured on host
- Consider adding rate limiting and logging

### Production Checklist
- [ ] Environment variables configured
- [ ] HTTPS/SSL enabled
- [ ] CORS settings updated for production URLs
- [ ] Database backups configured
- [ ] Logging and monitoring setup
- [ ] Rate limiting implemented
- [ ] Security headers configured
- [ ] API documentation deployed

---

## 🔄 Development Workflow

```bash
# 1. Create a feature branch
git checkout -b feature/your-feature

# 2. Make changes and commit
git add .
git commit -m "Add your feature"

# 3. Push to GitHub
git push origin feature/your-feature

# 4. Create a Pull Request
# (via GitHub web interface)

# 5. After PR approval and merge
git checkout main
git pull origin main
```

---

## 📈 Future Enhancements

### Short-term
- Email verification and password reset functionality
- Enhanced form validation and error handling
- Real-time notifications system
- Advanced search and filtering capabilities
- User dashboard with personalized content

### Medium-term
- Comment threads and nested replies in discussions
- User following/subscription system
- Advanced analytics and reporting dashboard
- File upload improvements (cloud storage integration)
- Rate limiting and API throttling

### Long-term
- Video consultation capabilities
- AI-powered recommendations and insights
- Mobile native applications (iOS/Android)
- Multilingual support (i18n)
- Progressive Web App (PWA) features
- Appointment scheduling system
- Telemedicine integration

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

---

## 👥 Authors

**Youssef Younes** - Full-stack development  
**Bashir Saad** - Full-stack development

---

## 📧 Support

For questions or support, please:
- Open an issue on GitHub
- Contact us via the contact form on the platform
- Email: support@dr-online.com

---

## 🔗 Links

- **GitHub Repository**: [https://github.com/Yousef456123/Dr-Online](https://github.com/Yousef456123/Dr-Online)
- **Frontend Documentation**: [frontend/README.md](frontend/README.md)
- **Backend Documentation**: [backend/README.md](backend/README.md)
- **Project Report**: [docs/PROJECT_REPORT.md](docs/PROJECT_REPORT.md)

---

**Last Updated:** December 2025  
**Project Status:** Active Development
