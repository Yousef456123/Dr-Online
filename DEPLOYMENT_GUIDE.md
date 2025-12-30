# Deployment Guide - Dr. Online

This guide will help you deploy both the frontend and backend of the Dr. Online platform.

## 🎯 Overview

- **Frontend**: Deployed on Vercel ✅
- **Backend**: Deploy on Railway, Render, or Heroku
- **Database**: MongoDB Atlas (cloud) or included with backend hosting

---

## 📋 Step 1: Configure Vercel Environment Variables

### Access Vercel Dashboard
1. Go to https://vercel.com/dashboard
2. Select your project: **dr-online456** (or your project name)
3. Navigate to: **Settings** → **Environment Variables**

### Add Environment Variable
- **Key**: `VITE_API_URL`
- **Value**: `https://your-backend-url.railway.app/api` (update after backend deployment)
- **Environment**: Production, Preview, Development (select all)

### After Adding Variable
- Go to **Deployments** tab
- Click **⋯** (three dots) on latest deployment
- Select **Redeploy** to apply the new environment variable

---

## 🚂 Step 2: Deploy Backend to Railway

### Option A: Railway (Recommended - Free Tier Available)

#### 2.1 Create Railway Account
1. Go to https://railway.app
2. Sign up with GitHub
3. Click **New Project** → **Deploy from GitHub repo**

#### 2.2 Connect Repository
1. Select your repository: `Yousef456123/Dr-Online`
2. Railway will detect the project structure

#### 2.3 Configure Service
1. Click **+ New** → **Service** → **GitHub Repo**
2. Select your repo
3. Set **Root Directory** to: `backend`
4. Railway will auto-detect Node.js

#### 2.4 Set Environment Variables
Click on your service → **Variables** tab → Add:

```env
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dr-online?retryWrites=true&w=majority
JWT_SECRET=your_very_secure_secret_key_here_min_32_chars
JWT_EXPIRE=7d
FRONTEND_URL=https://dr-online456.vercel.app
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
```

#### 2.5 Get MongoDB Atlas URI
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free cluster (M0)
3. Create database user
4. Whitelist IP: `0.0.0.0/0` (allow all)
5. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/`

#### 2.6 Deploy
1. Railway will automatically deploy
2. Wait for deployment to complete
3. Click **Settings** → **Generate Domain**
4. Copy your backend URL (e.g., `https://dr-online-backend.railway.app`)

#### 2.7 Update Vercel Environment Variable
1. Go back to Vercel dashboard
2. Update `VITE_API_URL` to: `https://your-railway-url.railway.app/api`
3. Redeploy frontend

---

### Option B: Render (Alternative)

#### 2.1 Create Render Account
1. Go to https://render.com
2. Sign up with GitHub

#### 2.2 Create Web Service
1. Click **New** → **Web Service**
2. Connect your GitHub repository
3. Configure:
   - **Name**: `dr-online-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

#### 2.3 Set Environment Variables
Add all variables from Railway section above

#### 2.4 Deploy
1. Click **Create Web Service**
2. Wait for deployment
3. Copy your service URL

---

## 🔧 Step 3: Update CORS in Backend

After deploying backend, update `backend/server.js`:

```javascript
app.use(cors({
  origin: [
    config.frontendUrl,
    'https://dr-online456.vercel.app',  // Add your Vercel URL
    'http://localhost:5173'              // Keep for local dev
  ],
  credentials: true,
}));
```

Commit and push:
```bash
git add backend/server.js
git commit -m "Update CORS for production frontend URL"
git push origin main
```

Railway/Render will auto-redeploy.

---

## ✅ Step 4: Verify Deployment

### Test Backend
```bash
curl https://your-backend-url.railway.app/api/health
```

Should return:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2025-12-XX..."
}
```

### Test Frontend
1. Visit: https://dr-online456.vercel.app
2. Try registering a user
3. Check browser console for API calls

---

## 🔐 Step 5: Security Checklist

- [ ] Strong JWT_SECRET (32+ characters)
- [ ] MongoDB Atlas IP whitelist configured
- [ ] CORS updated with production URLs
- [ ] Environment variables set (not in code)
- [ ] HTTPS enabled (automatic on Railway/Render)
- [ ] Database backups enabled (MongoDB Atlas)

---

## 🐛 Troubleshooting

### Backend not connecting to database
- Check MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- Verify MONGODB_URI format is correct
- Check Railway/Render logs

### CORS errors
- Update FRONTEND_URL in backend environment variables
- Update CORS origin in server.js
- Redeploy backend

### Frontend can't reach backend
- Verify VITE_API_URL in Vercel matches backend URL
- Check backend is running (health endpoint)
- Check browser console for errors

---

## 📊 Deployment URLs Summary

After deployment, you should have:

- **Frontend**: https://dr-online456.vercel.app ✅
- **Backend**: https://your-backend.railway.app (or render.com)
- **Database**: MongoDB Atlas cluster

---

## 🚀 Quick Commands

### Update Vercel Environment Variable
```bash
cd frontend
vercel env add VITE_API_URL production
# Enter: https://your-backend-url.railway.app/api
vercel --prod
```

### Check Backend Logs (Railway)
- Go to Railway dashboard → Your service → **Deployments** → **View Logs**

### Check Backend Logs (Render)
- Go to Render dashboard → Your service → **Logs** tab

---

**Need Help?** Check the main README.md or open an issue on GitHub.

