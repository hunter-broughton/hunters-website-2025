"""
Groq LLM integration with intelligent fallback system
"""
import requests
import json
import logging
from typing import List, Dict, Any, Optional
import os
import re

logger = logging.getLogger(__name__)


class GroqClient:
    """Free client for Groq API - extremely fast and reliable"""
    
    def __init__(self, api_key: str = None):
        self.api_key = api_key or os.getenv("GROQ_API_KEY")
        self.base_url = "https://api.groq.com/openai/v1/chat/completions"
        self.model = "llama-3.1-8b-instant"  # Fast, high-quality model
        self.available = bool(self.api_key)
        
        if self.available:
            logger.info(f"Groq client initialized with model: {self.model}")
        else:
            logger.warning("Groq API key not found in environment variables")
    
    def chat_completion(self, messages: List[Dict[str, str]], max_tokens: int = 300, temperature: float = 0.7) -> str:
        """Generate chat completion using Groq"""
        if not self.available:
            raise Exception("Groq API key not provided")
        
        try:
            headers = {
                "Authorization": f"Bearer {self.api_key}",
                "Content-Type": "application/json"
            }
            
            # Optimize the system message for better responses
            optimized_messages = self._optimize_messages(messages)
            
            payload = {
                "model": self.model,
                "messages": optimized_messages,
                "max_tokens": max_tokens,
                "temperature": temperature,
                "top_p": 0.9,
                "stream": False,
                "stop": None
            }
            
            logger.debug(f"Sending request to Groq with {len(optimized_messages)} messages")
            response = requests.post(self.base_url, json=payload, headers=headers, timeout=30)
            
            if response.status_code == 200:
                result = response.json()
                content = result["choices"][0]["message"]["content"].strip()
                logger.debug(f"Groq response length: {len(content)} characters")
                return content
            else:
                error_msg = f"Groq API error: {response.status_code}"
                if response.text:
                    error_msg += f" - {response.text}"
                raise Exception(error_msg)
                
        except requests.exceptions.RequestException as e:
            raise Exception(f"Failed to connect to Groq: {e}")
    
    def _optimize_messages(self, messages: List[Dict[str, str]]) -> List[Dict[str, str]]:
        """Optimize messages for better conversational responses"""
        optimized = []
        
        for message in messages:
            if message["role"] == "system":
                # Enhance the system prompt for better responses
                enhanced_content = self._enhance_system_prompt(message["content"])
                optimized.append({"role": "system", "content": enhanced_content})
            else:
                optimized.append(message)
        
        return optimized
    
    def _enhance_system_prompt(self, original_prompt: str) -> str:
        """Enhance the system prompt for more conversational responses"""
        return f"""{original_prompt}

IMPORTANT RESPONSE GUIDELINES:
- Always be conversational and friendly, like you're Hunter's personal assistant
- Use the provided context to give specific, concise answers
- If the context mentions specific projects, technologies, or experiences, reference them by name
- Keep responses engaging and invite follow-up questions
- Never say "based on the provided context" - just naturally incorporate the information
- Write as if you know Hunter personally and are excited to share information about him
- again, important, be concise! but also detailed

RESPONSE STYLE:
- Use a warm, professional tone
- Be enthusiastic about Hunter's work and achievements
- Ask engaging follow-up questions when appropriate
- Make the conversation feel natural and flowing"""

class SmartFallbackManager:
    """Smart fallback system that tries Groq first, then provides intelligent contextual responses"""
    
    def __init__(self):
        self.groq_client = GroqClient()
        self.available = self.groq_client.available
        
        if self.available:
            logger.info("Groq client ready for conversational responses")
        else:
            logger.warning("Groq not available - will use smart fallback responses")
    
    def chat_completion(self, messages: List[Dict[str, str]], max_tokens: int = 300, temperature: float = 0.7) -> str:
        """Try Groq first, then fall back to intelligent context-based responses"""
        
        # Try Groq first
        if self.available:
            try:
                logger.info("Trying Groq for completion")
                response = self.groq_client.chat_completion(messages, max_tokens, temperature)
                if response and response.strip():
                    logger.info("Successfully got response from Groq")
                    return response
            except Exception as e:
                logger.warning(f"Groq failed: {e}")
        
        # Fall back to intelligent context-based response
        logger.info("Using smart fallback response system")
        return self._generate_smart_fallback(messages)
    
    def _generate_smart_fallback(self, messages: List[Dict[str, str]]) -> str:
        """Generate intelligent fallback responses using context from messages"""
        user_message = ""
        context = ""
        
        # Extract user question and any context
        for message in messages:
            if message["role"] == "user":
                user_message = message["content"]
            elif message["role"] == "system" or "Hunter" in message.get("content", ""):
                context = message["content"]
        
        # Detect intent from the user message
        intent = self._detect_intent(user_message)
        
        # Generate response based on intent and available context
        if context and "Hunter" in context:
            return self._generate_contextual_response(user_message, context, intent)
        else:
            return self._generate_intent_based_response(intent)
    
    def _detect_intent(self, message: str) -> str:
        """Detect user intent from the message"""
        message_lower = message.lower()
        
        if any(word in message_lower for word in ["project", "work", "built", "created", "developed", "thriftswipe", "greeklink"]):
            return "projects"
        elif any(word in message_lower for word in ["skill", "technology", "language", "framework", "tool", "javascript", "python", "react"]):
            return "skills"
        elif any(word in message_lower for word in ["contact", "email", "reach", "connect", "linkedin", "github"]):
            return "contact"
        elif any(word in message_lower for word in ["education", "school", "university", "study", "michigan"]):
            return "education"
        elif any(word in message_lower for word in ["about", "who", "background", "bio", "personal"]):
            return "personal"
        elif any(word in message_lower for word in ["experience", "job", "work", "intern", "credo", "vloggi"]):
            return "experience"
        else:
            return "general"
    
    def _generate_contextual_response(self, user_message: str, context: str, intent: str) -> str:
        """Generate a response using available context about Hunter"""
        
        # Extract relevant information from context
        context_clean = self._clean_context(context)
        
        response_templates = {
            "projects": f"Hunter has worked on some really impressive projects! {context_clean}\n\nWhich of these projects sounds most interesting to you? I'd love to tell you more about any of them!",
            
            "skills": f"Hunter has built up quite a diverse skill set! {context_clean}\n\nAre you interested in hearing about how he's used any of these technologies in his projects?",
            
            "contact": f"Great question! {context_clean}\n\nI'd definitely recommend checking out his LinkedIn or GitHub to see more of his work - he's always happy to connect with fellow developers!",
            
            "education": f"Hunter's educational background is really solid! {context_clean}\n\nWould you like to know more about how his studies have influenced his project work?",
            
            "experience": f"Hunter has gained some valuable experience through his internships and projects! {context_clean}\n\nWhat aspect of his professional experience interests you most?",
            
            "personal": f"I'd love to tell you about Hunter! {context_clean}\n\nWhat aspect of his background would you like to explore further?",
            
            "general": f"Here's what I can share about Hunter: {context_clean}\n\nIs there anything specific you'd like to dive deeper into?"
        }
        
        return response_templates.get(intent, response_templates["general"])
    
    def _generate_intent_based_response(self, intent: str) -> str:
        """Generate responses based on intent when no context is available"""
        
        fallback_responses = {
            "projects": "Hunter has worked on some fascinating projects! He's built ThriftSwipe, an AI-powered thrift marketplace that uses machine learning for item categorization and pricing. He's also created GreekLink, a social networking platform, and this very portfolio website you're exploring. Each project showcases different aspects of his technical skills. Which type of project interests you most?",
            
            "skills": "Hunter's got a really diverse technical background! He's skilled in JavaScript, Python, TypeScript, React, Next.js, and has been diving into AI/ML technologies. Plus he knows his way around databases, cloud platforms, and more. What kind of technology stack are you curious about?",
            
            "contact": "You can definitely reach out to Hunter! Check out his socials page at hunterbroughton.com/socials where you'll find his LinkedIn, GitHub, and email. He's always excited to connect with fellow developers and discuss potential opportunities!",
            
            "education": "Hunter's studying Computer Science and Economics at the University of Michigan, where he's been getting hands-on experience with everything from algorithms to real-world applications. He's also active in extracurriculars like the Hill Street Run Club. Want to know more about his academic journey?",
            
            "experience": "Hunter has gained valuable experience through internships at companies like Credo Semiconductor and Vloggi, plus his work on personal projects. He's experienced in both software development and data engineering. What aspect of his experience would you like to explore?",
            
            "personal": "Hunter's a Computer Science and Economics student at the University of Michigan who's passionate about building innovative software solutions. He loves working on projects that combine creativity with technical challenges, especially in the AI/ML space. What would you like to know about his background?",
            
            "general": "I'm here to help you learn about Hunter! He's a talented developer with experience in web development, AI/ML, and some really cool projects under his belt. What aspect of his work interests you most - his projects, technical skills, or maybe his background?"
        }
        
        return fallback_responses.get(intent, fallback_responses["general"])
    
    def _clean_context(self, context: str) -> str:
        """Clean and format context for more natural conversation"""
        # Remove system prompt instructions and clean up
        lines = context.split('\n')
        cleaned_lines = []
        
        for line in lines:
            line = line.strip()
            # Skip system instructions and meta content
            if (line and 
                not line.startswith('IMPORTANT') and 
                not line.startswith('RESPONSE') and 
                not line.startswith('You are') and
                not line.startswith('WHO YOU ARE') and
                not line.startswith('-') and
                'Hunter' in line):
                
                # Remove category prefixes like [PROJECTS], [SKILLS], etc.
                if line.startswith('[') and ']' in line:
                    clean_line = line.split(']', 1)[1].strip()
                    if clean_line:
                        cleaned_lines.append(clean_line)
                else:
                    cleaned_lines.append(line)
        
        # Join and limit length
        result = ' '.join(cleaned_lines)
        if len(result) > 500:
            result = result[:500] + "..."
        
        return result if result else "I have information about Hunter's background and projects."
    
    def is_available(self) -> bool:
        """Check if the system is available (always true since we have fallbacks)"""
        return True


# For backward compatibility, alias the manager
FreeLLMManager = SmartFallbackManager
