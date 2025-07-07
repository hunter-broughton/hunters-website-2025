#!/usr/bin/env python3
"""
Test script for the simplified Groq-only chatbot system
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

def test_groq_system():
    """Test the Groq-only system with smart fallbacks"""
    print("🚀 Testing Simplified Groq-Only Chatbot System")
    print("=" * 60)
    
    # Load environment variables
    load_dotenv()
    
    # Test the LLM manager
    print("\n1. 🔍 Testing SmartFallbackManager...")
    llm_manager = SmartFallbackManager()
    
    print(f"✅ Groq available: {llm_manager.groq_client.available}")
    print(f"✅ System available: {llm_manager.is_available()}")
    
    # Test a simple completion
    try:
        messages = [
            {"role": "system", "content": "You are Hunter's enthusiastic AI assistant."},
            {"role": "user", "content": "Tell me about Hunter's projects in a friendly way."}
        ]
        response = llm_manager.chat_completion(messages)
        print(f"✅ Test response: {response[:100]}...")
    except Exception as e:
        print(f"❌ Test failed: {e}")
        return False
    
    # Test the full chatbot
    print("\n2. 🤖 Testing Full Chatbot Integration...")
    
    # Initialize the knowledge base
    kb = create_hunter_knowledge_base()
    kb.build_index()
    print("✅ Knowledge base loaded")
    
    # Initialize the chatbot
    chatbot = ChatbotEngine(kb)
    print("✅ Chatbot initialized")
    
    # Test questions
    test_questions = [
        "What projects has Hunter worked on?",
        "What programming languages does Hunter know?",
        "How can I contact Hunter?"
    ]
    
    print("\n3. 💬 Testing Conversational Responses...")
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
    
    print("\n✨ Test Complete!")
    return True

if __name__ == "__main__":
    test_groq_system()
