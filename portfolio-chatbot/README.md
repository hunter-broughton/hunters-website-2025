# Portfolio Chatbot

An AI-powered chatbot that knows about Hunter Broughton's portfolio, projects, and skills.

## Features

- **Semantic Search**: Uses sentence transformers for intelligent understanding
- **Machine Learning**: FAISS vector database for fast similarity search
- **RESTful API**: FastAPI backend with comprehensive endpoints
- **React Integration**: Beautiful chatbot component for the portfolio website
- **Cyberpunk Theme**: Matches the portfolio's aesthetic
- **Context Awareness**: Maintains conversation context and provides relevant suggestions

## Architecture

```
Frontend (Next.js/React) → Next.js API Route → Python FastAPI Backend → ML Knowledge Base
```

## Setup Instructions

### 1. Backend Setup (Python)

```bash
cd portfolio-chatbot

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create environment file
cp .env.example .env
# Edit .env with your configuration

# Initialize knowledge base (optional - it's created automatically)
python knowledge_base.py

# Start the API server
python main.py
```

The API will be available at `http://localhost:8000`

### 2. Frontend Integration

The chatbot component is already created in `/app/components/PortfolioChatbot.tsx`.

Add it to your main page:

```tsx
import PortfolioChatbot from "./components/PortfolioChatbot";

export default function HomePage() {
  return (
    <div>
      {/* Your existing content */}

      {/* Add the chatbot */}
      <PortfolioChatbot />
    </div>
  );
}
```

### 3. Environment Variables

Add to your `.env.local` in the portfolio directory:

```
CHATBOT_API_URL=http://localhost:8000
```

For production, update this to your deployed backend URL.

## API Endpoints

### Chatbot Endpoints

- `POST /chat` - Main chat endpoint
- `GET /` - Health check
- `GET /knowledge/stats` - Knowledge base statistics
- `GET /knowledge/search` - Direct search endpoint

### Frontend API Route

- `POST /api/chat` - Next.js API route that proxies to Python backend
- `GET /api/chat` - Health check for the chatbot

## Knowledge Base

The chatbot knows about:

- **Projects**: ThriftSwipe, GreekLink, Chrome Dino Game, Portfolio Website, etc.
- **Skills**: JavaScript, Python, TypeScript, React, Next.js, AI/ML, etc.
- **Education**: University of Michigan, Computer Science
- **Contact**: How to reach Hunter
- **Experience**: Internships, roles, activities

## Customization

### Adding New Knowledge

Edit `knowledge_base.py` and add new items:

```python
kb.add_knowledge_item(
    "Your new information about Hunter",
    "category",  # projects, skills, education, personal, etc.
    {"metadata": "optional"}
)
```

### Modifying Responses

Edit the `ChatbotEngine` class in `main.py` to customize response generation logic.

### Styling

The chatbot component uses Tailwind CSS classes that match the portfolio's cyberpunk theme. Modify the component to match your design preferences.

## Deployment

### Backend Deployment

1. **Railway/Render/DigitalOcean**:

   ```bash
   # Add Procfile
   echo "web: uvicorn main:app --host 0.0.0.0 --port \$PORT" > Procfile
   ```

2. **Docker**:
   ```dockerfile
   FROM python:3.9-slim
   WORKDIR /app
   COPY requirements.txt .
   RUN pip install -r requirements.txt
   COPY . .
   CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
   ```

### Frontend Deployment

Update the `CHATBOT_API_URL` in your environment variables to point to your deployed backend.

## Development

### Running in Development

1. Start the Python backend:

   ```bash
   cd portfolio-chatbot
   python main.py
   ```

2. Start the Next.js frontend:

   ```bash
   cd portfolio
   npm run dev
   ```

3. The chatbot will appear as a floating button in the bottom right corner

### Testing

Test the API directly:

```bash
curl -X POST "http://localhost:8000/chat" \
  -H "Content-Type: application/json" \
  -d '{"message": "What projects has Hunter worked on?"}'
```

## Performance

- **Fast Search**: FAISS enables sub-millisecond similarity search
- **Lightweight Model**: Uses efficient sentence transformer model
- **Caching**: Embeddings are pre-computed and cached
- **Scalable**: FastAPI supports high concurrent requests

## Future Enhancements

- [ ] Add conversation memory/context
- [ ] Integrate with OpenAI for more natural responses
- [ ] Add voice chat capabilities
- [ ] Implement user feedback learning
- [ ] Add analytics and usage tracking
- [ ] Support for file upload and document Q&A

## Troubleshooting

### Common Issues

1. **Import errors**: Make sure all dependencies are installed in the virtual environment
2. **CORS errors**: Check that the frontend URL is in the CORS origins list
3. **Model download**: First run may be slow as sentence transformer downloads
4. **Port conflicts**: Make sure port 8000 is available or change in main.py

### Logs

Check the FastAPI logs for detailed error information:

```bash
python main.py  # Will show detailed logs
```
