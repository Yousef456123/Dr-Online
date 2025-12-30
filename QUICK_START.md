# Dr. Online Phase 2 - Quick Reference

## 🚀 Start Project (Copy & Paste)

```bash
# Terminal 1: Backend
cd backend
npm install
npm run seed           # Populate sample data
npm run dev            # Start server on port 5000

# Terminal 2: Frontend  
cd frontend
npm run dev            # Start on port 5173
```

Visit: **http://localhost:5173**

---

## 🔑 Test Credentials (After Seed)

```
👨‍⚕️  Doctor
Email: sarah.johnson@hospital.com
Pass: password123

👤 Patient
Email: john.patient@email.com
Pass: password123

👨‍💼 Admin
Email: admin@dronline.com
Pass: admin123456
```

---

## 📂 File Locations

### Backend Core Files
- **Server**: `backend/server.js`
- **Routes**: `backend/routes/*.js`
- **Models**: `backend/models/*.js`
- **Controllers**: `backend/controllers/*.js`
- **Config**: `backend/config/env.js`
- **Seed**: `backend/seed.js`

### Frontend API Integration
- **API Client**: `frontend/src/services/api.js`
- **Register**: `frontend/src/pages/Register.jsx` (Updated)
- **Contact**: `frontend/src/pages/Contact.jsx` (Updated)
- **Discussions**: `frontend/src/pages/Discussions.jsx` (Updated)
- **Admin**: `frontend/src/pages/AdminPanel.jsx` (New)

---

## 🔧 Environment Setup

### Backend (.env)
```env
MONGODB_URI=mongodb://localhost:27017/dr-online
PORT=5000
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 📡 API Endpoints Cheat Sheet

### Auth
- `POST /api/auth/register` - Sign up
- `POST /api/auth/login` - Log in
- `GET /api/auth/me` - Get profile (Protected)

### Discussions
- `GET /api/discussions` - List all
- `POST /api/discussions` - Create (Protected)
- `POST /api/discussions/:id/reply` - Add reply (Protected)
- `POST /api/discussions/:id/like` - Like (Protected)

### Contact
- `POST /api/contact` - Submit form
- `POST /api/contact/:id/book-moderator` - Book (Admin)
- `POST /api/contact/:id/assign-doctor` - Assign (Admin)

### Studies
- `GET /api/studies` - List all
- `POST /api/studies` - Create (Doctor only)
- `POST /api/studies/:id/like` - Like (Protected)

---

## 💡 Common Tasks

### Add Authentication to Request
```javascript
const token = localStorage.getItem('authToken')
const headers = {
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json'
}
```

### Register New User
```javascript
import { authAPI } from '../services/api'

const response = await authAPI.register({
  fullName: 'John Doe',
  email: 'john@example.com',
  password: 'password123',
  role: 'patient'
})

localStorage.setItem('authToken', response.data.token)
```

### Submit Contact Form
```javascript
import { contactAPI } from '../services/api'

await contactAPI.submitContact({
  fullName: 'Jane Doe',
  email: 'jane@example.com',
  phoneNumber: '+1-555-1234',
  subject: 'Consultation Request',
  message: 'I need medical advice',
  requestType: 'consultation'
})
```

### Create Discussion
```javascript
import { discussionAPI } from '../services/api'

await discussionAPI.createDiscussion({
  title: 'Topic Title',
  description: 'Topic description',
  category: 'general',
  tags: ['tag1', 'tag2']
})
```

---

## 🐛 Quick Fixes

| Problem | Fix |
|---------|-----|
| "Cannot find module" | Run `npm install` in that directory |
| Port 5000 already in use | Change PORT in .env or kill process |
| MongoDB connection error | Start MongoDB: `mongod` |
| CORS error | Check FRONTEND_URL in backend .env |
| "Invalid token" | Clear localStorage, login again |
| Email not sending | Add Gmail app password to .env |

---

## 📊 Database Models Quick View

```javascript
// User
{ fullName, email, password, role, specialization, phoneNumber, bio }

// Discussion
{ title, description, author, category, replies, likes, views, status }

// Study
{ title, description, condition, author, source, content, likes }

// ContactRequest
{ fullName, email, phoneNumber, subject, message, status, assignedModerator }

// ModeratorBooking
{ patient, moderator, doctor, topic, status, scheduledDate }
```

---

## 🎯 Recommended Testing Flow

1. **Register** as Patient
2. **View** Discussions page
3. **Create** new discussion
4. **Submit** Contact request
5. **Login** as Admin
6. **Book** moderator for request
7. **Check** email (if configured)

---

## 📚 Documentation Files

- **Full Setup**: `SETUP_GUIDE.md`
- **Phase 2 Overview**: `README_PHASE2.md`
- **Backend Details**: `backend/README.md`
- **Phase 1 Report**: `PROJECT_REPORT.md`

---

## 🚢 Deploy Commands

### Backend (Heroku)
```bash
heroku create your-app-name
heroku config:set MONGODB_URI=your_atlas_uri
git push heroku main
```

### Frontend (Vercel)
```bash
npm install -g vercel
vercel --prod
```

---

## 🔍 Debug Mode

### See API Requests
```javascript
// In browser console
localStorage.setItem('debug', 'true')
```

### Check Backend Logs
The terminal running `npm run dev` shows all requests

### MongoDB Compass
GUI tool to view database:
https://www.mongodb.com/products/compass

---

## ❓ Help & Support

- **Stuck?** Check SETUP_GUIDE.md
- **API question?** See backend/README.md
- **Frontend issue?** Check updated component files
- **Database issue?** Verify MongoDB connection

---

## ✅ Checklist Before Deployment

- [ ] Backend running without errors
- [ ] Frontend connects to backend
- [ ] Can register and login
- [ ] Can create discussions
- [ ] Can submit contact form
- [ ] Admin can manage requests
- [ ] Email notifications work (if enabled)
- [ ] No console errors

---

## 📞 Contact & Updates

**Project**: Dr. Online  
**Phase**: 2 (Full Stack)  
**Status**: ✅ Complete  
**Last Updated**: December 2025

---

**Happy Coding! 🚀**
