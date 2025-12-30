# Render Deployment Troubleshooting Guide

## Common Render Deployment Failures

### Issue: Service Status "Failed"

Here's how to fix the most common issues:

---

## ✅ Fix 1: Configure Render Service Settings

### Step 1: Check Your Render Service Settings

1. Go to your Render dashboard: https://dashboard.render.com
2. Click on your **Web Service**
3. Go to **Settings** tab

### Step 2: Verify These Settings

**General Settings:**
- **Name**: `dr-online-backend` (or your preferred name)
- **Region**: Choose closest to you
- **Branch**: `main`
- **Root Directory**: `backend` ⚠️ **IMPORTANT!**

**Build & Deploy:**
- **Build Command**: `npm install`
- **Start Command**: `npm start`

**Environment:**
- **Node Version**: `18` or `20` (Render auto-detects, but you can specify)

---

## ✅ Fix 2: Set Environment Variables

Go to **Environment** tab in Render and add ALL of these:

```env
PORT=10000
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/dr-online?retryWrites=true&w=majority
JWT_SECRET=your_very_secure_secret_key_minimum_32_characters_long
JWT_EXPIRE=7d
FRONTEND_URL=https://dr-online456.vercel.app
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_gmail_app_password
```

**Important Notes:**
- **PORT**: Render automatically sets this, but you can use `10000` as default
- **MONGODB_URI**: Make sure password is URL-encoded (see below)
- **JWT_SECRET**: Use a strong, random string (32+ characters)

---

## ✅ Fix 3: MongoDB Connection String

### URL Encode Your Password

If your MongoDB password has special characters, encode them:

- `@` → `%40`
- `#` → `%23`
- `$` → `%24`
- `%` → `%25`
- `&` → `%26`
- `+` → `%2B`
- `=` → `%3D`
- `!` → `%21`

**Example:**
```
Password: MyP@ss#123!
Encoded: MyP%40ss%23123%21

Connection String:
mongodb+srv://username:MyP%40ss%23123%21@cluster0.xxxxx.mongodb.net/dr-online?retryWrites=true&w=majority
```

### Or Use Simple Password (Easier)

1. Go to MongoDB Atlas → Database Access
2. Edit your user → Reset password
3. Create a simple password without special characters
4. Use it in the connection string

---

## ✅ Fix 4: Check Render Logs

### View Logs
1. Go to your Render service
2. Click **Logs** tab
3. Look for error messages

### Common Log Errors:

**Error: "Cannot find module"**
- **Fix**: Make sure Root Directory is set to `backend`
- **Fix**: Verify `package.json` exists in `backend/` folder

**Error: "MongoDB connection failed"**
- **Fix**: Check MONGODB_URI is correct
- **Fix**: Verify password is URL-encoded
- **Fix**: Check MongoDB Atlas IP whitelist includes `0.0.0.0/0`

**Error: "Port already in use" or "EADDRINUSE"**
- **Fix**: Remove PORT from environment variables (Render sets it automatically)
- **Fix**: Or set PORT to `10000`

**Error: "Command failed"**
- **Fix**: Verify Build Command is `npm install`
- **Fix**: Verify Start Command is `npm start`

---

## ✅ Fix 5: Update Server to Use Render's PORT

The server should already handle this, but let's verify:

Your `backend/config/env.js` should have:
```javascript
port: process.env.PORT || 5000,
```

This is correct - Render sets `PORT` automatically, so it will use that.

---

## ✅ Fix 6: Update CORS for Production

Make sure your `backend/server.js` includes the Vercel URL:

```javascript
app.use(cors({
  origin: [
    config.frontendUrl,
    'https://dr-online456.vercel.app',  // Production frontend
    'http://localhost:5173',              // Local development
  ],
  credentials: true,
}));
```

---

## 🔍 Step-by-Step Render Setup

### 1. Create New Web Service
1. Go to Render dashboard
2. Click **New +** → **Web Service**
3. Connect your GitHub repository
4. Select repository: `Yousef456123/Dr-Online`

### 2. Configure Service
```
Name: dr-online-backend
Region: (choose closest)
Branch: main
Root Directory: backend
Runtime: Node
Build Command: npm install
Start Command: npm start
```

### 3. Add Environment Variables
Click **Add Environment Variable** for each:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `MONGODB_URI` | `mongodb+srv://...` (your Atlas URI) |
| `JWT_SECRET` | `your_secure_secret_32_chars_min` |
| `JWT_EXPIRE` | `7d` |
| `FRONTEND_URL` | `https://dr-online456.vercel.app` |
| `EMAIL_HOST` | `smtp.gmail.com` |
| `EMAIL_PORT` | `587` |
| `EMAIL_USER` | `your_email@gmail.com` |
| `EMAIL_PASSWORD` | `your_app_password` |

**Note**: Don't set `PORT` - Render sets it automatically.

### 4. Deploy
1. Click **Create Web Service**
2. Wait for deployment (2-5 minutes)
3. Check **Logs** tab for any errors

### 5. Get Your Backend URL
After successful deployment:
1. Render will provide a URL like: `https://dr-online-backend.onrender.com`
2. Copy this URL
3. Update Vercel environment variable `VITE_API_URL` to: `https://dr-online-backend.onrender.com/api`

---

## 🧪 Test Your Deployment

### Test Backend Health
```bash
curl https://your-backend.onrender.com/api/health
```

Should return:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2025-12-XX..."
}
```

### Test from Frontend
1. Visit: https://dr-online456.vercel.app
2. Open browser console (F12)
3. Try registering a user
4. Check for any API errors

---

## 🐛 Still Not Working?

### Check These:
1. ✅ Root Directory is `backend` (not empty)
2. ✅ Build Command is `npm install`
3. ✅ Start Command is `npm start`
4. ✅ All environment variables are set
5. ✅ MongoDB URI is correct and password is URL-encoded
6. ✅ MongoDB Atlas IP whitelist includes `0.0.0.0/0`
7. ✅ Render logs show specific error (check Logs tab)

### Get Help:
- Check Render logs for specific error message
- Verify MongoDB Atlas connection (test locally first)
- Make sure all dependencies are in `package.json`

---

## 📝 Quick Checklist

Before deploying to Render:
- [ ] Root Directory set to `backend`
- [ ] Build Command: `npm install`
- [ ] Start Command: `npm start`
- [ ] All environment variables added
- [ ] MongoDB URI is correct (password URL-encoded)
- [ ] MongoDB Atlas IP whitelist configured
- [ ] CORS includes production frontend URL
- [ ] Code is pushed to GitHub main branch

---

**After fixing these, click "Manual Deploy" → "Deploy latest commit" in Render dashboard.**

