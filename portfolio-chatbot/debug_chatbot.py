#!/usr/bin/env python3
"""
Quick debug script to test the chatbot locally
"""
import sys
import os
sys.path.append('/Users/hunterbroughton/Documents/GitHub/hunters-website-2025/portfolio-chatbot')

from knowledge_base import create_hunter_knowledge_base
from local_llm import FreeLLMManager
from main import ChatbotEngine
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def test_chatbot_locally():
    print("🤖 Testing Chatbot Locally...")
    print("=" * 50)
    
    try:
        # Initialize knowledge base
        print("📚 Loading knowledge base...")
        kb = create_hunter_knowledge_base()
        kb.build_index()
        print(f"✅ Knowledge base loaded with {len(kb.knowledge_items)} items")
        
        # Initialize LLM manager
        print("🧠 Initializing LLM manager...")
        llm_manager = FreeLLMManager()
        print(f"✅ LLM providers: {[name for name, _ in llm_manager.providers]}")
        
        # Initialize chatbot
        print("💬 Initializing chatbot...")
        chatbot = ChatbotEngine(kb)
        print("✅ Chatbot ready!")
        
        # Test questions
        test_questions = [
            "What projects has Hunter worked on?",
            "What skills does Hunter have?",
            "How can I contact Hunter?",
            "Tell me about Hunter's education"
        ]
        
        print("\n🧪 Testing chatbot responses:")
        print("-" * 30)
        
        for i, question in enumerate(test_questions, 1):
            print(f"\n{i}. Q: {question}")
            try:
                result = chatbot.chat(question)
                response = result["response"]
                sources = len(result["sources"])
                confidence = result["confidence"]
                
                print(f"   A: {response[:200]}...")
                print(f"   📊 Sources: {sources}, Confidence: {confidence:.2f}")
                
                # Check if it's just the fallback response
                if "I'd be happy to help you learn about Hunter" in response:
                    print("   ⚠️  Using basic fallback response")
                else:
                    print("   ✅ Good response!")
                    
            except Exception as e:
                print(f"   ❌ Error: {e}")
        
        print("\n" + "=" * 50)
        print("🎉 Local test completed!")
        
        return True
        
    except Exception as e:
        print(f"❌ Test failed: {e}")
        return False

if __name__ == "__main__":
    test_chatbot_locally()
