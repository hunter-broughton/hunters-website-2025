# 🌐 Production Deployment Setup

## ⚠️ IMPORTANT: Ollama is LOCAL ONLY!

**Ollama cannot be used for deployed websites** - it only works on your local machine. For production deployment, use cloud APIs.

## 🚀 Best Setup for Deployed Websites:

### 1. Set up Groq (Primary - Fastest & Most Reliable)

```bash
# 1. Go to: https://console.groq.com/keys
# 2. Sign up (free, no credit card)
# 3. Create API key
# 4. Add to .env:
echo "GROQ_API_KEY=your_groq_key_here" >> .env
```

**Free Limits:** 6,000 tokens/minute, 30 requests/minute

### 2. Set up Google Gemini (Backup)

```bash
# 1. Go to: https://aistudio.google.com/app/apikey
# 2. Sign in with Google
# 3. Create API key
# 4. Add to .env:
echo "GOOGLE_API_KEY=your_google_key_here" >> .env
```

**Free Limits:** 15 requests/minute

## 🏗️ Deployment Platforms:

### Vercel (Recommended for Next.js)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy your portfolio
cd /Users/hunterbroughton/Documents/GitHub/hunters-website-2025/portfolio
vercel

# Deploy your chatbot API
cd /Users/hunterbroughton/Documents/GitHub/hunters-website-2025/portfolio-chatbot
vercel
```

**Add environment variables in Vercel dashboard:**

- `GROQ_API_KEY`
- `GOOGLE_API_KEY`

### Railway

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway deploy
```

### Render

1. Connect your GitHub repo
2. Add environment variables
3. Deploy automatically

## 🔧 Your Deployment Strategy:

1. **Groq** → Primary (ultra-fast, reliable)
2. **Google Gemini** → Backup (if Groq hits limits)
3. **Smart Fallback** → Uses your knowledge base (always works)

This gives you **99.9% uptime** for $0 cost! 🎉

## 📝 Next Steps:

1. Get Groq API key (2 minutes)
2. Get Google API key (2 minutes)
3. Deploy to Vercel/Railway/Render
4. Your chatbot is live! 🚀
