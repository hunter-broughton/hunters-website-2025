# 🚀 Complete Deployment Guide - Hunter's Website 2025

## 📁 Project Overview

This repository contains two main components:

- **`portfolio/`**: Next.js frontend website
- **`portfolio-chatbot/`**: Python FastAPI backend for AI chatbot

## 🎯 Deployment Strategy

### 1. **Frontend: GitHub Pages** (Current)

- ✅ Already configured
- Deploy command: `npm run deploy` from `portfolio/` folder

### 2. **Backend: Cloud Platform** (New)

- 🔄 Needs deployment
- Recommended: Railway, Render, or DigitalOcean

---

## 🚀 Step-by-Step Deployment

### Phase 1: Deploy Backend First

#### Option A: Railway (Recommended)

1. **Create Railway Account**

   ```bash
   # Go to railway.app and sign up with GitHub
   ```

2. **Deploy Backend**

   - New Project → Deploy from GitHub repo
   - Select: `hunter-broughton/hunters-website-2025`
   - Root Directory: `portfolio-chatbot`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

3. **Environment Variables** (in Railway dashboard)

   ```
   GROQ_API_KEY=your_groq_api_key_here
   CORS_ORIGINS=https://hunterbroughton.com,https://hunter-broughton.github.io
   ```

4. **Get Deployment URL**
   Railway will provide a URL like: `https://portfolio-chatbot-production-xxxx.up.railway.app`

#### Option B: Render

1. **Create Render Account** at render.com
2. **New Web Service**
   - Connect GitHub repo
   - Root Directory: `portfolio-chatbot`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
3. **Add Environment Variables** (same as Railway)

### Phase 2: Update Frontend Configuration

1. **Update Environment Variable**

   ```bash
   cd portfolio
   cp .env.local.example .env.local
   ```

2. **Edit `.env.local`**
   ```bash
   # Replace with your deployed backend URL
   CHATBOT_API_URL=https://your-backend-url.railway.app
   ```

### Phase 3: Deploy Updated Frontend

1. **Test Locally**

   ```bash
   cd portfolio
   npm install
   npm run dev
   # Test chatbot functionality
   ```

2. **Deploy to GitHub Pages**
   ```bash
   npm run deploy
   ```

---

## 🧪 Testing Your Deployment

### 1. Test Backend

```bash
# Health check
curl https://your-backend-url.railway.app/

# Chat functionality
curl -X POST https://your-backend-url.railway.app/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What projects has Hunter worked on?"}'
```

### 2. Test Frontend

- Visit: `https://hunterbroughton.com`
- Open chatbot
- Send a test message
- Verify responses

---

## 📋 Deployment Checklist

### Backend Deployment ✅

- [x] Cloud platform account created (Railway)
- [x] Backend deployed successfully
- [x] Environment variables configured
- [x] GROQ_API_KEY added
- [x] CORS_ORIGINS includes frontend domain
- [x] API responding to health checks
- [x] Chat endpoint working

### Frontend Updates ✅

- [x] `.env.local` updated with backend URL
- [x] Local testing completed
- [x] Chatbot working locally
- [x] Deployed to GitHub Pages
- [x] Live site tested

### Integration Testing ✅

- [x] Frontend connects to backend
- [x] Chatbot responses working
- [x] No CORS errors
- [x] Fallback responses working
- [x] Suggested questions appearing

---

## 🔄 Future Updates

### Code Changes

1. **Make changes** to either frontend or backend
2. **Commit and push** to main branch
3. **Backend**: Auto-deploys via cloud platform
4. **Frontend**: Run `npm run deploy` from portfolio folder

### Environment Updates

- **Backend**: Update via cloud platform dashboard
- **Frontend**: Update `.env.local` and redeploy

---

## 🚨 Troubleshooting

### Common Issues

1. **CORS Errors**

   ```
   Solution: Add frontend domain to CORS_ORIGINS in backend
   ```

2. **Chatbot Not Responding / Goes to Fallback**

   ```
   Check: Backend health endpoint
   Check: Environment variables
   Check: API key validity
   Check: Frontend is using correct backend URL in production
   ```

3. **Static Export Environment Variables Not Working**

   ```
   Issue: GitHub Pages static export doesn't process .env files
   Solution: Hardcode production URL in chat/route.ts
   ```

4. **404 on API Calls**
   ```
   Check: CHATBOT_API_URL in frontend .env.local
   Check: Backend deployment status
   ```

### Debug Commands

```bash
# Check backend logs (Railway)
railway logs

# Check frontend build
cd portfolio && npm run build

# Test API locally
cd portfolio-chatbot && python main.py
```

---

## 💡 Quick Start Commands

```bash
# Deploy backend (after setting up cloud platform)
git push origin main

# Deploy frontend
cd portfolio
npm run deploy

# Test everything
curl https://your-backend-url/
# Then test frontend at hunterbroughton.com
```

Your complete website with AI chatbot will be live! 🎉
