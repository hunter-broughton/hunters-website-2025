import os
import logging
from typing import List, Dict, Any, Optional
from datetime import datetime
import asyncio
from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
import uvicorn
from dotenv import load_dotenv

from knowledge_base import PortfolioKnowledgeBase, create_hunter_knowledge_base
from local_llm import FreeLLMManager

# Load environment variables
load_dotenv()

# Initialize LLM Manager (no API keys needed!)
llm_manager = FreeLLMManager()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Log LLM system status on startup
groq_status = "Available" if llm_manager.groq_client.available else "Not Available"
logger.info(f"Groq LLM: {groq_status}")
logger.info(f"Smart fallback system: Active")
if not llm_manager.groq_client.available:
    logger.warning("Groq not available - will use intelligent fallback responses")

# Global variables
knowledge_base: Optional[PortfolioKnowledgeBase] = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan management"""
    global knowledge_base
    
    # Startup
    logger.info("Starting up Portfolio Chatbot API...")
    try:
        # Initialize knowledge base
        knowledge_base = create_hunter_knowledge_base()
        knowledge_base.build_index()
        logger.info("Knowledge base initialized successfully")
    except Exception as e:
        logger.error(f"Failed to initialize knowledge base: {e}")
        raise
    
    yield
    
    # Shutdown
    logger.info("Shutting down Portfolio Chatbot API...")

# Create FastAPI app
app = FastAPI(
    title="Hunter's Portfolio Chatbot API",
    description="AI-powered chatbot that knows about Hunter Broughton's portfolio, projects, and skills",
    version="1.0.0",
    lifespan=lifespan
)

# CORS middleware for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://hunterbroughton.com", "https://*.hunterbroughton.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request/Response models
class ChatMessage(BaseModel):
    message: str = Field(..., min_length=1, max_length=1000, description="User message")
    conversation_id: Optional[str] = Field(None, description="Conversation ID for context")

class ChatResponse(BaseModel):
    response: str
    sources: List[Dict[str, Any]]
    conversation_id: str
    timestamp: datetime
    confidence: float
    suggested_questions: List[str]

class HealthResponse(BaseModel):
    status: str
    timestamp: datetime
    knowledge_base_stats: Dict[str, Any]

# Dependency to get knowledge base
def get_knowledge_base() -> PortfolioKnowledgeBase:
    if knowledge_base is None:
        raise HTTPException(status_code=500, detail="Knowledge base not initialized")
    return knowledge_base

class ChatbotEngine:
    """
    Enhanced conversational chatbot that combines semantic search with OpenAI GPT
    for natural, engaging responses about Hunter's portfolio
    """
    
    def __init__(self, knowledge_base: PortfolioKnowledgeBase):
        self.kb = knowledge_base
        self.conversation_history = {}
        
    def _get_context_from_search(self, search_results: List[Dict[str, Any]], max_context: int = 3) -> str:
        """Extract relevant context from search results for GPT"""
        if not search_results:
            return "No specific information found."
        
        context_parts = []
        for result in search_results[:max_context]:
            if result['similarity_score'] > 0.3:
                category = result['category'].upper()
                content = result['content']
                context_parts.append(f"[{category}] {content}")
        
        return "\n".join(context_parts) if context_parts else "Limited information available."
    
    def _create_system_prompt(self) -> str:
        """Create the system prompt for the LLM to act as Hunter's portfolio assistant"""
        return """You are Hunter Broughton's enthusiastic AI assistant! You're here to help visitors learn about Hunter's impressive background, projects, and skills in a warm, conversational way.

WHO YOU ARE:
- You're Hunter's personal AI assistant who knows him well
- You're friendly, approachable, and genuinely excited to talk about Hunter's work
- You speak naturally, as if you're a close colleague who admires Hunter's achievements

YOUR KNOWLEDGE:
You have detailed information about Hunter's projects, skills, education, and experience. When someone asks about Hunter, you should:
- Give specific, detailed answers using the exact information provided
- Mention project names, technologies, and accomplishments by name
- Share interesting details that showcase Hunter's capabilities
- Be enthusiastic about his achievements

CONVERSATION STYLE:
- Be warm and conversational, never robotic
- Use natural language, contractions, and friendly expressions
- Ask engaging follow-up questions to keep the conversation going
- Show genuine interest in helping the visitor learn about Hunter
- Make each response feel personal and engaging

RESPONSE FORMAT:
- Start with a natural, conversational response to their question
- Include specific details from Hunter's background
- End with an engaging question or invitation for more information
- Keep responses conversational but informative (2-4 sentences typically)

Remember: You're not just providing information - you're having a friendly conversation about someone you admire and want to showcase!"""

    def _generate_conversational_response(self, message: str, context: str, conversation_history: List[Dict] = None) -> str:
        """Use Free LLM to generate a conversational response"""
        try:
            # Build messages for the conversation
            messages = [
                {"role": "system", "content": self._create_system_prompt()}
            ]
            
            # Add recent conversation history if available
            if conversation_history:
                messages.extend(conversation_history[-4:])  # Keep last 4 messages for context
            
            # Create a more natural context message
            if context and context != "No specific information found." and context != "Limited information available.":
                # Clean up the context to be more natural
                clean_context = self._clean_context_for_conversation(context)
                context_message = f"Here's what I know about Hunter that's relevant to this question:\n\n{clean_context}\n\nUser's question: {message}\n\nPlease give a conversational, enthusiastic response using this information about Hunter."
            else:
                context_message = f"The user is asking: {message}\n\nI don't have specific information about this topic, but I can provide a helpful response directing them to what I do know about Hunter."
            
            messages.append({"role": "user", "content": context_message})
            
            # Get response from free LLM manager
            response = llm_manager.chat_completion(
                messages=messages,
                max_tokens=400,  # Increased for more detailed responses
                temperature=0.8  # Slightly higher for more conversational tone
            )
            
            return response
            
        except Exception as e:
            logger.error(f"Free LLM API error: {e}")
            # Use smart fallback that actually uses the context
            return self._generate_smart_fallback_response(message, context)
    
    def _clean_context_for_conversation(self, context: str) -> str:
        """Clean up the context to make it more natural for conversation"""
        # Remove the category tags and make it flow better
        lines = context.split('\n')
        cleaned_lines = []
        
        for line in lines:
            if line.strip():
                # Remove category prefixes like [PROJECTS], [SKILLS], etc.
                if line.startswith('[') and ']' in line:
                    clean_line = line.split(']', 1)[1].strip()
                    cleaned_lines.append(clean_line)
                else:
                    cleaned_lines.append(line.strip())
        
        return '\n'.join(cleaned_lines)
    
    def _generate_fallback_response(self, message: str, context: str) -> str:
        """Generate a fallback response if LLM is unavailable"""
        if not context or context == "No specific information found.":
            return "I'd be happy to help you learn about Hunter! Could you ask me something more specific about his projects, skills, experience, or background?"
        
        # Simple template-based response as fallback
        return f"Based on what I know about Hunter:\n\n{context}\n\nWould you like to know more about any particular aspect?"
        
    def _generate_smart_fallback_response(self, message: str, context: str) -> str:
        """Generate a smart fallback response using the context from knowledge base"""
        intent = self._detect_intent(message)
        
        # If we have good context from the knowledge base, use it conversationally
        if context and context != "No specific information found." and context != "Limited information available.":
            # Clean the context
            clean_context = self._clean_context_for_conversation(context)
            
            if intent == "projects":
                return f"Hunter has worked on some really cool projects! {clean_context}\n\nWhich of these projects sounds most interesting to you? I'd love to tell you more about any of them!"
            elif intent == "skills":
                return f"Hunter has built up quite an impressive skill set! {clean_context}\n\nAre you interested in hearing about how he's used any of these technologies in his projects?"
            elif intent == "contact":
                return f"Great question! {clean_context}\n\nI'd definitely recommend checking out his LinkedIn or GitHub to see more of his work - he's always happy to connect with fellow developers!"
            elif intent == "education":
                return f"Hunter's educational background is pretty solid! {clean_context}\n\nWould you like to know more about how his studies have influenced his project work?"
            elif intent == "personal":
                return f"I'd love to tell you about Hunter! {clean_context}\n\nWhat aspect of his background interests you most?"
            else:
                return f"Here's what I can share about Hunter: {clean_context}\n\nIs there anything specific you'd like to dive deeper into?"
        else:
            # Fall back to the intent-based responses, but make them more conversational
            return self._get_conversational_fallback_response(intent)

    def _detect_intent(self, message: str) -> str:
        """Detect user intent from the message"""
        message_lower = message.lower()
        
        if any(word in message_lower for word in ["project", "work", "built", "created", "developed"]):
            return "projects"
        elif any(word in message_lower for word in ["skill", "technology", "language", "framework", "tool"]):
            return "skills"
        elif any(word in message_lower for word in ["contact", "email", "reach", "connect"]):
            return "contact"
        elif any(word in message_lower for word in ["education", "school", "university", "study"]):
            return "education"
        elif any(word in message_lower for word in ["about", "who", "background", "bio"]):
            return "personal"
        elif any(word in message_lower for word in ["website", "portfolio", "site"]):
            return "website"
        else:
            return "general"
    
    def _generate_response(self, message: str, search_results: List[Dict[str, Any]], intent: str) -> str:
        """Generate a natural response based on search results and intent"""
        if not search_results:
            return self._get_fallback_response(intent)
        
        # Get the most relevant results
        top_results = [r for r in search_results if r['similarity_score'] > 0.3]
        
        if not top_results:
            return self._get_fallback_response(intent)
        
        # Generate response based on intent and results
        response_parts = []
        
        if intent == "projects":
            response_parts.append("Here's what I know about Hunter's projects:")
            for result in top_results[:3]:
                response_parts.append(f"• {result['content']}")
        
        elif intent == "skills":
            response_parts.append("Hunter has expertise in several areas:")
            for result in top_results[:3]:
                response_parts.append(f"• {result['content']}")
        
        elif intent == "contact":
            response_parts.append("You can contact Hunter through:")
            for result in top_results[:2]:
                response_parts.append(f"• {result['content']}")
        
        elif intent == "education":
            response_parts.append("About Hunter's education:")
            for result in top_results[:2]:
                response_parts.append(f"• {result['content']}")
        
        elif intent == "personal":
            response_parts.append("About Hunter:")
            for result in top_results[:2]:
                response_parts.append(f"• {result['content']}")
        
        elif intent == "website":
            response_parts.append("About this portfolio website:")
            for result in top_results[:2]:
                response_parts.append(f"• {result['content']}")
        
        else:
            # General response
            response_parts.append("Based on what I know about Hunter:")
            for result in top_results[:2]:
                response_parts.append(f"• {result['content']}")
        
        return "\n\n".join(response_parts)
    
    def _get_fallback_response(self, intent: str) -> str:
        """Fallback responses when no relevant information is found"""
        fallback_responses = {
            "projects": "I'd be happy to tell you about Hunter's projects! He has worked on several interesting projects including ThriftSwipe (an AI-powered thrift marketplace), GreekLink (a social platform), and this portfolio website. Would you like to know more about any specific project?",
            "skills": "Hunter has a diverse skill set including programming languages like JavaScript, Python, and TypeScript, as well as frameworks like React, Next.js, and various AI/ML technologies. What specific skills are you interested in?",
            "contact": "You can reach Hunter through his portfolio website at hunterbroughton.com/socials, where you'll find links to his LinkedIn, GitHub, and email contact information.",
            "education": "Hunter is currently studying Computer Science at the University of Michigan. He's also involved in extracurricular activities like the Hill Street Run Club where he serves as VP of Communications.",
            "personal": "Hunter Broughton is a Computer Science student at the University of Michigan with a passion for software engineering, web development, and AI/ML. He enjoys building innovative projects and contributing to open source.",
            "website": "This portfolio website showcases Hunter's work and skills. It features a cyberpunk theme with interactive components, built using Next.js, TypeScript, and modern web technologies.",
            "general": "I'm Hunter's AI assistant! I can help you learn about his projects, skills, education, and how to contact him. What would you like to know?"
        }
        
        return fallback_responses.get(intent, fallback_responses["general"])
    
    def _get_conversational_fallback_response(self, intent: str) -> str:
        """More conversational fallback responses when no context is found"""
        fallback_responses = {
            "projects": "Hunter has worked on some fascinating projects! He's built ThriftSwipe, an AI-powered thrift marketplace, GreekLink for social networking, and this very portfolio website you're on. Each project showcases different aspects of his skills. Which type of project interests you most?",
            "skills": "Hunter's got a really diverse technical background! He's skilled in JavaScript, Python, TypeScript, React, Next.js, and has been diving into AI/ML technologies. Plus he knows his way around databases, cloud platforms, and more. What kind of technology stack are you curious about?",
            "contact": "You can definitely reach out to Hunter! Check out his socials page at hunterbroughton.com/socials where you'll find his LinkedIn, GitHub, and email. He's always excited to connect with fellow developers and discuss potential opportunities!",
            "education": "Hunter's studying Computer Science at the University of Michigan, where he's been getting hands-on experience with everything from algorithms to real-world applications. He's also active in extracurriculars like the Hill Street Run Club. Want to know more about his academic journey?",
            "personal": "Hunter's a Computer Science student at U of M who's passionate about building innovative software solutions. He loves working on projects that combine creativity with technical challenges, especially in the AI/ML space. What would you like to know about his background?",
            "website": "This portfolio website is actually one of Hunter's projects! It features a cool cyberpunk theme with interactive components, built using Next.js and TypeScript. Pretty neat, right? Are you interested in the technical details of how it was built?",
            "general": "I'm here to help you learn about Hunter! He's a talented developer with experience in web development, AI/ML, and some really cool projects under his belt. What aspect of his work interests you most - his projects, technical skills, or maybe his background?"
        }
        
        return fallback_responses.get(intent, fallback_responses["general"])

    def _get_suggested_questions(self, intent: str) -> List[str]:
        """Generate suggested follow-up questions based on intent"""
        suggestions = {
            "projects": [
                "Tell me more about ThriftSwipe",
                "What technologies does Hunter use?",
                "What's Hunter's most recent project?"
            ],
            "skills": [
                "What programming languages does Hunter know?",
                "What frameworks has Hunter worked with?",
                "Does Hunter have AI/ML experience?"
            ],
            "contact": [
                "How can I connect with Hunter on LinkedIn?",
                "Does Hunter have a GitHub profile?",
                "What's the best way to reach Hunter?"
            ],
            "education": [
                "What is Hunter studying?",
                "What activities is Hunter involved in?",
                "Tell me about Hunter's academic background"
            ],
            "personal": [
                "What are Hunter's interests?",
                "What projects is Hunter working on?",
                "Tell me about Hunter's experience"
            ],
            "website": [
                "What technologies power this website?",
                "What features does this portfolio have?",
                "How was this website built?"
            ],
            "general": [
                "What projects has Hunter worked on?",
                "What are Hunter's technical skills?",
                "How can I contact Hunter?"
            ]
        }
        
        return suggestions.get(intent, suggestions["general"])

    def chat(self, message: str, conversation_id: str = None) -> Dict[str, Any]:
        """Main chat function with conversational AI"""
        try:
            # Generate conversation ID if not provided
            if not conversation_id:
                conversation_id = f"conv_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
            
            # Search knowledge base for relevant information
            search_results = self.kb.search(message, top_k=5)
            
            # Get conversation history for this conversation
            conversation_history = self.conversation_history.get(conversation_id, [])
            
            # Extract context from search results
            context = self._get_context_from_search(search_results)
            
            # Generate conversational response using OpenAI
            response = self._generate_conversational_response(message, context, conversation_history)
            
            # Calculate confidence based on search results
            confidence = 0.9 if search_results and search_results[0]['similarity_score'] > 0.7 else 0.7 if search_results else 0.5
            
            # Detect intent for suggested questions
            intent = self._detect_intent(message)
            suggested_questions = self._get_suggested_questions(intent)
            
            # Store conversation history (keep last 10 exchanges)
            if conversation_id not in self.conversation_history:
                self.conversation_history[conversation_id] = []
            
            self.conversation_history[conversation_id].extend([
                {"role": "user", "content": message},
                {"role": "assistant", "content": response}
            ])
            
            # Keep only last 10 messages to prevent memory bloat
            if len(self.conversation_history[conversation_id]) > 10:
                self.conversation_history[conversation_id] = self.conversation_history[conversation_id][-10:]
            
            return {
                "response": response,
                "sources": search_results,
                "conversation_id": conversation_id,
                "timestamp": datetime.now(),
                "confidence": confidence,
                "suggested_questions": suggested_questions,
                "intent": intent
            }
            
        except Exception as e:
            logger.error(f"Error in chat function: {e}")
            return {
                "response": "I'm sorry, I encountered an error while processing your question. Please try again or rephrase your question.",
                "sources": [],
                "conversation_id": conversation_id or "error",
                "timestamp": datetime.now(),
                "confidence": 0.0,
                "suggested_questions": ["What projects has Hunter worked on?", "What are Hunter's skills?", "How can I contact Hunter?"],
                "intent": "error"
            }

# Initialize chatbot engine
chatbot: Optional[ChatbotEngine] = None

@app.on_event("startup")
async def startup_event():
    global chatbot
    if knowledge_base:
        chatbot = ChatbotEngine(knowledge_base)
        logger.info("Chatbot engine initialized")

# API Routes
@app.get("/", response_model=HealthResponse)
async def health_check(kb: PortfolioKnowledgeBase = Depends(get_knowledge_base)):
    """Health check endpoint"""
    return HealthResponse(
        status="healthy",
        timestamp=datetime.now(),
        knowledge_base_stats=kb.get_category_stats()
    )

@app.post("/chat", response_model=ChatResponse)
async def chat_endpoint(
    request: ChatMessage,
    kb: PortfolioKnowledgeBase = Depends(get_knowledge_base)
):
    """Main chat endpoint"""
    global chatbot
    
    if not chatbot:
        chatbot = ChatbotEngine(kb)
    
    try:
        result = chatbot.chat(request.message, request.conversation_id)
        
        return ChatResponse(
            response=result["response"],
            sources=result["sources"],
            conversation_id=result["conversation_id"],
            timestamp=result["timestamp"],
            confidence=result["confidence"],
            suggested_questions=result["suggested_questions"]
        )
        
    except Exception as e:
        logger.error(f"Chat endpoint error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.get("/knowledge/stats")
async def get_knowledge_stats(kb: PortfolioKnowledgeBase = Depends(get_knowledge_base)):
    """Get knowledge base statistics"""
    return {
        "total_items": len(kb.knowledge_items),
        "categories": kb.get_category_stats(),
        "model_name": kb.model_name,
        "is_trained": kb.is_trained
    }

@app.get("/knowledge/search")
async def search_knowledge(
    query: str,
    category: Optional[str] = None,
    top_k: int = 5,
    kb: PortfolioKnowledgeBase = Depends(get_knowledge_base)
):
    """Direct knowledge base search endpoint"""
    try:
        results = kb.search(query, top_k=top_k, category_filter=category)
        return {
            "query": query,
            "results": results,
            "total_results": len(results)
        }
    except Exception as e:
        logger.error(f"Search endpoint error: {e}")
        raise HTTPException(status_code=500, detail="Search failed")

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
