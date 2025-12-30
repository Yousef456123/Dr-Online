# Dr. Online - Customer Setup Guide

Welcome to Dr. Online! This guide will walk you through setting up the platform for your healthcare organization.

---

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **MongoDB** - Either [Atlas Cloud](https://www.mongodb.com/cloud/atlas) or local installation
- **Git** - [Download](https://git-scm.com/)
- **Gmail Account** - For email notifications
- **Text Editor** - VS Code, Sublime Text, or any editor
- **Terminal/Command Prompt** - For running commands

---

## 🚀 Step 1: Get Your Code

### Clone or Download the Repository

```bash
# Option 1: Clone from GitHub (if you have the repository)
git clone https://github.com/your-repo/Dr-Online.git
cd Dr-Online

# Option 2: Extract from zip file
# Extract the provided zip file to your desired location
# Navigate to the folder in terminal
cd path/to/Dr-Online
```

---

## 📧 Step 2: Email Configuration (Gmail Setup)

The platform uses Gmail to send emails (password reset, contact form replies, notifications).

### 2.1 Enable 2-Step Verification on Gmail

1. Go to https://myaccount.google.com/
2. Click **Security** in the left menu
3. Scroll down to find **2-Step Verification**
4. Click **Get Started**
5. Follow Google's verification process
6. Complete 2-Step Verification

### 2.2 Generate App Password

1. Go back to **Security** page (https://myaccount.google.com/security)
2. Scroll down and find **App passwords** (only appears after 2FA is enabled)
3. Select:
   - **App**: Mail
   - **Device**: Windows Computer / Mac / Linux (your device type)
4. Click **Generate**
5. **Copy the 16-character password** that appears
6. Save it somewhere safe - you'll need it

**Example Password Format:**
```
abcd efgh ijkl mnop
```

> **Security Note:** This password is different from your Gmail password and can only be used for this app.

---

## ⚙️ Step 3: Backend Configuration

### 3.1 Navigate to Backend Folder

```bash
cd backend
```

### 3.2 Install Dependencies

```bash
npm install
```

Wait for all packages to install (this may take a few minutes).

### 3.3 Create Environment File

```bash
# Copy the example file (Windows)
copy .env.example .env

# OR on Mac/Linux
cp .env.example .env
```

### 3.4 Edit the .env File

Open `.env` in your text editor and update the values:

```dotenv
# Database Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dr-online
# OR if using local MongoDB:
# MONGODB_URI=mongodb://localhost:27017/dr-online
PORT=5000

# JWT Configuration (Secret key for authentication)
JWT_SECRET=your_very_long_random_secret_key_at_least_32_characters
JWT_EXPIRE=7d

# Email Configuration
EMAIL_USER=your_gmail_address@gmail.com
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587

# Frontend URL (where your frontend will be hosted)
FRONTEND_URL=http://localhost:5173
# For production: https://yourdomain.com

# Node Environment
NODE_ENV=development
# For production: NODE_ENV=production
```

**Fill in each field:**

| Field | Example | Description |
|-------|---------|-------------|
| `MONGODB_URI` | `mongodb+srv://user:pass@cluster.mongodb.net/dr-online` | Your MongoDB connection string |
| `PORT` | `5000` | Server port (keep default or change if port is in use) |
| `JWT_SECRET` | `your_random_key_min_32_chars` | Secret key for token generation (make it long and random) |
| `EMAIL_USER` | `myemail@gmail.com` | Your Gmail address |
| `EMAIL_PASSWORD` | `abcd efgh ijkl mnop` | Gmail App Password (16 chars with spaces) |
| `FRONTEND_URL` | `http://localhost:5173` | Where frontend runs (during development) |

### 3.5 Database Setup

#### Option A: MongoDB Atlas (Cloud) - RECOMMENDED

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new project
4. Create a cluster (M0 Free tier is fine)
5. Add your IP address to network access
6. Create a database user
7. Copy connection string:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/dr-online?retryWrites=true&w=majority
   ```
8. Paste into `.env` as `MONGODB_URI`

#### Option B: Local MongoDB

1. Download and install [MongoDB Community](https://www.mongodb.com/try/download/community)
2. Start MongoDB:
   ```bash
   # Windows
   mongod
   
   # Mac/Linux
   brew services start mongodb-community
   ```
3. Use connection string:
   ```
   MONGODB_URI=mongodb://localhost:27017/dr-online
   ```

### 3.6 Generate Secure JWT Secret

Use this command to generate a strong random secret:

**Windows PowerShell:**
```powershell
-join((65..90) + (97..122) | Get-Random -Count 32 | % {[char]$_})
```

**Mac/Linux Terminal:**
```bash
openssl rand -base64 32
```

**Or use an online generator:** https://randomkeygen.com/

Copy the generated key and paste it as your `JWT_SECRET`.

### 3.7 Test Backend

```bash
# Start development server
npm run dev

# You should see:
# Server running on port 5000
# MongoDB Connected: cluster0.mongodb.net
```

Open http://localhost:5000/api/health in your browser - you should see:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2025-12-30T10:30:00.000Z"
}
```

✅ **Backend is ready!** Leave it running in this terminal.

---

## 🎨 Step 4: Frontend Configuration

### 4.1 Open New Terminal

Open a new terminal/command prompt window.

### 4.2 Navigate to Frontend

```bash
cd frontend
```

### 4.3 Install Dependencies

```bash
npm install
```

### 4.4 Start Development Server

```bash
npm run dev
```

You should see:
```
VITE v7.2.2  ready in XXX ms

➜  Local:   http://localhost:5173/
```

✅ **Frontend is ready!** Open http://localhost:5173 in your browser.

---

## 🧪 Step 5: Testing the Setup

### 5.1 Test Registration

1. Go to http://localhost:5173/register
2. Click "Doctor" or "Patient" enrollment
3. (You can test but registration may not fully work until you configure all settings)

### 5.2 Test Contact Form

1. Go to http://localhost:5173/contact
2. Fill out the form
3. Submit
4. Check your email - you should receive a confirmation
5. If you don't receive email, check:
   - Email/password in `.env` is correct
   - Gmail 2FA is enabled
   - App Password is correct (16 characters with spaces)

### 5.3 Test Discussions

1. Go to http://localhost:5173/discussions
2. Create a discussion topic
3. View topic details
4. Check if data persists (if you set up MongoDB correctly)

---

## 🛠️ Troubleshooting

### "Cannot connect to MongoDB"
- **Check**: MongoDB_URI in `.env` is correct
- **Check**: Internet connection is working
- **Check**: If using MongoDB Atlas, your IP is whitelisted
- **Solution**: Test connection string in MongoDB Compass

### "Email not sending"
- **Check**: EMAIL_USER and EMAIL_PASSWORD are correct
- **Check**: Gmail 2FA is enabled
- **Check**: You used an App Password (not regular Gmail password)
- **Solution**: Test credentials here: https://nodemailer.com/smtp/testing/

### "Port 5000 already in use"
- **Solution 1**: Change PORT in `.env` to 5001, 5002, etc.
- **Solution 2**: Kill the process using port 5000:
  ```bash
  # Windows
  netstat -ano | findstr :5000
  taskkill /PID <PID> /F
  ```

### "Frontend won't connect to backend"
- **Check**: Both servers are running
- **Check**: Backend is on http://localhost:5000
- **Check**: Frontend is on http://localhost:5173
- **Check**: CORS is not blocking (should show error in browser console)

### "Dependencies not installing"
```bash
# Clear cache and try again
npm cache clean --force
npm install
```

---

## 📦 Step 6: Prepare for Production

### 6.1 Build Frontend

```bash
cd frontend
npm run build
```

This creates an optimized `dist/` folder.

### 6.2 Environment for Production

Update `.env` for production:

```dotenv
NODE_ENV=production
FRONTEND_URL=https://yourdomain.com
JWT_EXPIRE=30d
```

### 6.3 Choose Hosting Provider

**Frontend Hosting:**
- Vercel (easiest, free tier)
- Netlify
- AWS S3 + CloudFront
- GitHub Pages

**Backend Hosting:**
- Heroku (simple, has free tier)
- AWS
- DigitalOcean
- Render
- Railway

### 6.4 Database for Production

- Use MongoDB Atlas (cloud)
- Enable backups
- Set up monitoring
- Use strong passwords

---

## 🚀 Deployment Quick Start

### Deploy Frontend (Vercel)

```bash
npm install -g vercel
vercel login
cd frontend
vercel
```

### Deploy Backend (Render)

1. Go to https://render.com
2. Create new Web Service
3. Connect your repository
4. Set environment variables
5. Deploy

---

## 📞 Support & Help

### Common Questions

**Q: Can I change the color scheme?**  
A: Yes! Edit `frontend/tailwind.config.js` for colors.

**Q: How do I add more features?**  
A: Check `frontend/README.md` and `backend/README.md` for development guides.

**Q: Where are my users stored?**  
A: All user data is in MongoDB (check your connection string).

**Q: Can I backup my data?**  
A: Yes! MongoDB Atlas provides automatic backups.

### Need Help?

1. **Check Logs**: Look at terminal output for error messages
2. **Read Documentation**: 
   - [Frontend README](../frontend/README.md)
   - [Backend README](../backend/README.md)
3. **Test Endpoints**: Use Postman to test API
4. **Contact Support**: (Your support email/contact here)

---

## 📝 Checklist Before Going Live

- [ ] MongoDB set up (Atlas or local)
- [ ] Gmail configured with App Password
- [ ] `.env` file configured with all required values
- [ ] Backend tested (health check passes)
- [ ] Frontend builds without errors
- [ ] Contact form sends emails successfully
- [ ] User registration works
- [ ] Discussions can be created
- [ ] Data persists in database
- [ ] HTTPS/SSL configured for production
- [ ] Environment variables set on production server
- [ ] Database backups configured
- [ ] Email notifications working

---

## 🎓 Learning Resources

- [Node.js Documentation](https://nodejs.org/docs/)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Guide](https://docs.mongodb.com/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

---

## 📄 Customization Examples

### Change App Name

Search and replace "Dr. Online" in:
- `frontend/index.html`
- `frontend/src/App.jsx`
- `backend/server.js`

### Change Colors

Edit `frontend/tailwind.config.js`:
```javascript
colors: {
  primary: '#YOUR_COLOR_HEX',
  accent: '#YOUR_COLOR_HEX',
}
```

### Change Email Sender Name

Edit `backend/utils/emailService.js`:
```javascript
from: 'Your Company Name <your_email@gmail.com>'
```

---

## 🔒 Security Reminders

- ✅ Never share your `.env` file
- ✅ Use strong JWT_SECRET (at least 32 characters)
- ✅ Enable HTTPS in production
- ✅ Use strong database passwords
- ✅ Keep dependencies updated: `npm update`
- ✅ Monitor your MongoDB Atlas account
- ✅ Set up database backups
- ✅ Use environment variables for all secrets
- ✅ Never commit `.env` to version control
- ✅ Review user permissions regularly

---

## 📞 Quick Reference

### Default Ports
- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- MongoDB: localhost:27017

### Important Folders
- `frontend/src/` - React components and pages
- `backend/models/` - Database schemas
- `backend/controllers/` - Business logic
- `backend/routes/` - API endpoints

### Important Files
- `frontend/.env` - Frontend configuration
- `backend/.env` - Backend configuration
- `backend/server.js` - Backend entry point
- `frontend/src/App.jsx` - Frontend entry point

---

## ✅ All Set!

You've successfully set up Dr. Online! Here's what you can do next:

1. **Explore the Application** - Test all features
2. **Customize** - Update colors, text, and branding
3. **Deploy** - Follow deployment steps for production
4. **Add Users** - Create doctor and patient accounts
5. **Manage Content** - Create discussions and studies

---

**Last Updated:** December 2025  
**Version:** 1.0.0

For updates and new features, check: [GitHub Repository](https://github.com/your-repo/Dr-Online)

---

## 📧 Support

**Email Support**: support@dr-online.com  
**Documentation**: See README.md files in frontend/ and backend/  
**Issues**: Report bugs on GitHub Issues
