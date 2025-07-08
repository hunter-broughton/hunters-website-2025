# HUNTERS-WEBSITE-2025

```
> ./portfolio --init
> Initializing neural network interface...
> Loading hunter.exe...
> System Status: ONLINE
```

**A cyberpunk-inspired portfolio showcasing full-stack development, AI integration, and cutting-edge web technologies.**

## SYSTEM ARCHITECTURE

```
hunters-website-2025/
├── portfolio/           # Next.js frontend application
│   ├── app/            # App router with cyberpunk UI components
│   ├── public/         # Static assets and images
│   └── styles/         # Tailwind CSS configurations
└── portfolio-chatbot/   # FastAPI AI backend service
    ├── main.py         # Core API server
    ├── local_llm.py    # Groq LLM integration
    └── knowledge_base.py # ML-powered semantic search
```

## CORE MODULES

### Frontend: Neural Interface

- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with custom cyberpunk theme
- **Animations**: Framer Motion for fluid interactions
- **Components**: Modular React architecture
- **Deployment**: Static export to GitHub Pages

### Backend: AI Processing Unit

- **Runtime**: Python FastAPI server
- **AI Engine**: Groq (llama-3.1-8b-instant)
- **ML Stack**:
  - Sentence Transformers for semantic embeddings
  - FAISS for vector similarity search
  - scikit-learn for cosine similarity
  - NumPy for numerical computations
- **Knowledge Base**: 36+ curated entries about Hunter's portfolio
- **Deployment**: Railway cloud platform

## INITIALIZATION SEQUENCE

### Terminal Setup

```bash
# Clone the repository
git clone https://github.com/hunter-broughton/hunters-website-2025.git
cd hunters-website-2025
```

### Frontend Deployment

```bash
# Navigate to frontend module
cd portfolio

# Install dependencies
npm install

# Initialize development server
npm run dev

# Compile for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

### Backend Deployment

```bash
# Navigate to AI module
cd portfolio-chatbot

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Unix/MacOS
# or
venv\Scripts\activate     # Windows

# Install ML dependencies
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env
# Add your GROQ_API_KEY

# Start AI server
python main.py
```

## FEATURE MATRIX

| Component         | Technology           | Status |
| ----------------- | -------------------- | ------ |
| Neural Interface  | Next.js + TypeScript | ACTIVE |
| AI Assistant      | Groq + ML Tools      | ACTIVE |
| Vector Search     | FAISS + Transformers | ACTIVE |
| Static Deployment | GitHub Pages         | ACTIVE |
| Cloud Backend     | Railway              | ACTIVE |
| Responsive Design | Tailwind CSS         | ACTIVE |
| Animation System  | Framer Motion        | ACTIVE |

## ENVIRONMENT CONFIGURATION

### Frontend Variables (.env.local)

```bash
CHATBOT_API_URL=https://your-backend.railway.app
```

### Backend Variables (.env)

```bash
GROQ_API_KEY=your_groq_api_key_here
CORS_ORIGINS=https://hunterbroughton.com,https://hunter-broughton.github.io
API_HOST=0.0.0.0
API_PORT=8000
LOG_LEVEL=INFO
```

## API ENDPOINTS

### Health Check

```bash
GET /
Response: {"status": "healthy", "timestamp": "...", "knowledge_base_stats": {...}}
```

### AI Chat Interface

```bash
POST /chat
Body: {"message": "What projects has Hunter worked on?", "conversation_id": "optional"}
Response: {"response": "...", "sources": [...], "suggested_questions": [...]}
```

## TECHNOLOGY STACK

### Frontend Arsenal

- **Next.js 14**: React framework with app router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Framer Motion**: Advanced animations
- **Heroicons**: Consistent iconography

### Backend Infrastructure

- **FastAPI**: High-performance Python API
- **Groq**: Lightning-fast LLM inference
- **Sentence Transformers**: Semantic understanding
- **FAISS**: Efficient vector search
- **Railway**: Cloud deployment platform

## DEPLOYMENT ARCHITECTURE

```
GitHub Repository
├── main branch → Railway (Auto-deploy backend)
└── gh-pages branch → GitHub Pages (Static frontend)
```

### Production URLs

- **Frontend**: https://hunterbroughton.com
- **Backend**: https://hunters-website-2025-production.up.railway.app
- **Repository**: https://github.com/hunter-broughton/hunters-website-2025

## DEVELOPMENT WORKFLOW

### Local Development

1. Start backend server: `cd portfolio-chatbot && python main.py`
2. Start frontend server: `cd portfolio && npm run dev`
3. Access interface: `http://localhost:3000`

### Production Updates

1. **Backend**: Push to main branch (auto-deploys to Railway)
2. **Frontend**: Run `npm run deploy` from portfolio directory

## PERFORMANCE METRICS

- **Frontend**: Static site generation for optimal loading
- **Backend**: Sub-second AI response times via Groq
- **Search**: FAISS enables millisecond vector lookups
- **Deployment**: Automatic CI/CD pipeline

## SYSTEM REQUIREMENTS

### Development Environment

- **Node.js**: 18.x or higher
- **Python**: 3.8 or higher
- **Memory**: 4GB RAM minimum
- **Storage**: 1GB available space

### Production Environment

- **Frontend**: Any static hosting service
- **Backend**: Cloud platform with Python support
- **API Keys**: Groq account for LLM access

## TROUBLESHOOTING PROTOCOLS

### Common Issues

```bash
# Frontend build failures
npm run build --verbose

# Backend connection errors
curl https://your-backend-url/

# Environment variable issues
echo $GROQ_API_KEY
```

### Debug Mode

```bash
# Enable verbose logging
LOG_LEVEL=DEBUG python main.py

# Check knowledge base stats
curl https://your-backend-url/ | jq .knowledge_base_stats
```

## CONTRIBUTING

### Code Standards

- **Frontend**: ESLint + Prettier
- **Backend**: Black + isort
- **Commits**: Conventional commit format
- **Testing**: Jest (frontend) + pytest (backend)

### Development Process

1. Fork repository
2. Create feature branch
3. Implement changes
4. Test thoroughly
5. Submit pull request

## LICENSE

This project is available under the MIT License. See LICENSE file for details.

## CONTACT INTERFACE

**Hunter Broughton**  
Computer Science & Economics Student  
University of Michigan

- **Portfolio**: https://hunterbroughton.com
- **Repository**: https://github.com/hunter-broughton/hunters-website-2025
- **Connect**: Available via website contact form

---

```
> System initialized successfully
> All modules operational
> Ready for deployment
```
