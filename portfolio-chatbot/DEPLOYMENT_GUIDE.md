# 🚀 Portfolio Chatbot Backend Deployment Guide

## Overview

This guide covers deploying the Groq-powered chatbot API to various cloud platforms. The API provides conversational AI responses about Hunter's portfolio, projects, and skills.

## ☁️ Deployment Options

### 🟢 **Option 1: Railway (Recommended)**

- **Pros**: Simple deployment, automatic HTTPS, good for Python apps
- **Cost**: Free tier available
- **Setup**: Connect GitHub, auto-deploy on push

### 🟡 **Option 2: Render**

- **Pros**: Free tier, easy setup, good documentation
- **Cost**: Free tier with limitations
- **Setup**: Connect GitHub repo

### 🟠 **Option 3: DigitalOcean App Platform**

- **Pros**: Reliable, good performance
- **Cost**: Starting at $5/month
- **Setup**: Connect GitHub repo

### 🔵 **Option 4: Heroku**

- **Pros**: Popular, well-documented
- **Cost**: No free tier (starts at $5/month)
- **Setup**: Git-based deployment

---

## 🚂 Railway Deployment (Step-by-Step)

### 1. Prepare for Deployment

First, ensure your environment variables are properly configured:

```bash
# Copy the example env file
cp .env.example .env

# Add your Groq API key
echo "GROQ_API_KEY=your_groq_api_key_here" >> .env
```

### 2. Deploy to Railway

1. **Sign up**: Go to [railway.app](https://railway.app) and sign up with GitHub
2. **New Project**: Click "New Project" → "Deploy from GitHub repo"
3. **Select Repo**: Choose `hunter-broughton/hunters-website-2025`
4. **Configure Service**:
   - Root Directory: `portfolio-chatbot`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

### 3. Environment Variables

In Railway dashboard, add these environment variables:

```
GROQ_API_KEY=your_groq_api_key_here
CORS_ORIGINS=https://hunterbroughton.com,https://hunter-broughton.github.io
API_HOST=0.0.0.0
API_PORT=8000
```

### 4. Domain Setup

Railway will provide a URL like: `https://your-app.railway.app`

---

## 🎨 Render Deployment (Alternative)

### 1. Create Render Account

- Go to [render.com](https://render.com)
- Sign up with GitHub

### 2. New Web Service

- Connect your GitHub repo
- Root Directory: `portfolio-chatbot`
- Build Command: `pip install -r requirements.txt`
- Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

### 3. Environment Variables

Add the same environment variables as Railway.

---

## 🔧 Frontend Integration

Once deployed, update your frontend to use the new backend URL:

```typescript
// In your portfolio frontend
const CHATBOT_API_URL = "https://your-backend-url.railway.app";

// Update the chat API call
const response = await fetch(`${CHATBOT_API_URL}/chat`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ message: userMessage }),
});
```

---

## 🧪 Testing Your Deployment

Test your deployed API:

```bash
# Test the health endpoint
curl https://your-backend-url.railway.app/

# Test the chat endpoint
curl -X POST https://your-backend-url.railway.app/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What projects has Hunter worked on?"}'
```

---

## 📝 Deployment Checklist

- [ ] Backend deployed to cloud platform
- [ ] Environment variables configured
- [ ] CORS origins include your frontend domain
- [ ] Frontend updated with new backend URL
- [ ] Frontend deployed to GitHub Pages
- [ ] Both systems tested and working together

---

## 🚨 Important Notes

1. **Environment Variables**: Never commit your `.env` file with real API keys
2. **CORS**: Make sure to include your frontend domain in CORS_ORIGINS
3. **HTTPS**: Most platforms provide HTTPS automatically
4. **Monitoring**: Set up monitoring to track API usage and errors

---

## 🔄 Continuous Deployment

Once set up, deployments are automatic:

- **Frontend**: Push to main branch → `npm run deploy` → GitHub Pages updates
- **Backend**: Push to main branch → Cloud platform auto-deploys

Your chatbot will be live and serving requests! 🎉
