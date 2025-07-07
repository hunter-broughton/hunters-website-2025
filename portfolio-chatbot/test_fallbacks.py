#!/usr/bin/env python3
"""
Test script to verify fallback functionality when Groq is unavailable
"""

import sys
import os
import logging
from dotenv import load_dotenv

# Add the current directory to the path so we can import our modules
sys.path.append(os.path.dirname(__file__))

from knowledge_base import create_hunter_knowledge_base
from main import ChatbotEngine
from local_llm import SmartFallbackManager

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(levelname)s: %(message)s')
logger = logging.getLogger(__name__)

def test_fallback_system():
    """Test the fallback system when Groq is unavailable"""
    print("🔧 Testing Smart Fallback System (Groq Disabled)")
    print("=" * 60)
    
    # Load environment variables
    load_dotenv()
    
    # Create a modified manager with Groq disabled
    print("\n1. 🚫 Testing with Groq Disabled...")
    llm_manager = SmartFallbackManager()
    
    # Manually disable Groq to test fallbacks
    original_available = llm_manager.groq_client.available
    llm_manager.groq_client.available = False
    llm_manager.available = False
    
    print(f"✅ Groq available: {llm_manager.groq_client.available}")
    print(f"✅ System available: {llm_manager.is_available()}")
    
    # Test a simple completion (should use fallback)
    try:
        messages = [
            {"role": "system", "content": "You are Hunter's enthusiastic AI assistant."},
            {"role": "user", "content": "Tell me about Hunter's projects."}
        ]
        response = llm_manager.chat_completion(messages)
        print(f"✅ Fallback response: {response[:150]}...")
    except Exception as e:
        print(f"❌ Fallback test failed: {e}")
        return False
    
    # Test the full chatbot with fallbacks
    print("\n2. 🤖 Testing Full Chatbot with Fallbacks...")
    
    # Initialize the knowledge base
    kb = create_hunter_knowledge_base()
    kb.build_index()
    print("✅ Knowledge base loaded")
    
    # Initialize the chatbot (it will use the disabled Groq manager)
    chatbot = ChatbotEngine(kb)
    print("✅ Chatbot initialized")
    
    # Test questions with fallback responses
    test_questions = [
        "What projects has Hunter worked on?",
        "What skills does Hunter have?",
        "How can I contact Hunter?",
        "Tell me about Hunter's education"
    ]
    
    print("\n3. 💬 Testing Fallback Responses...")
    print("-" * 40)
    
    for i, question in enumerate(test_questions, 1):
        print(f"\n{i}. Q: {question}")
        try:
            response = chatbot.chat(question)
            print(f"   A: {response['response'][:200]}...")
            
            if response.get('suggested_questions'):
                print(f"   💡 Suggestions: {response['suggested_questions'][:2]}")
                
        except Exception as e:
            print(f"   ❌ Error: {e}")
    
    # Restore Groq availability
    llm_manager.groq_client.available = original_available
    llm_manager.available = original_available
    
    print("\n✨ Fallback Test Complete!")
    return True

if __name__ == "__main__":
    test_fallback_system()
