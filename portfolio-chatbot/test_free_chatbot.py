#!/usr/bin/env python3
"""
Test script for the free chatbot setup
"""
import requests
import json
import time
import sys

def test_chatbot():
    """Test the chatbot with various questions"""
    base_url = "http://localhost:8000"
    
    # Test questions
    test_questions = [
        "Tell me about Hunter's projects",
        "What skills does Hunter have?",
        "How can I contact Hunter?",
        "What is Hunter studying?",
        "Tell me about this website"
    ]
    
    print("🤖 Testing Hunter's Free Chatbot")
    print("="*50)
    
    # Check if server is running
    try:
        response = requests.get(f"{base_url}/", timeout=5)
        if response.status_code == 200:
            print("✅ Chatbot server is running!")
        else:
            print("❌ Server returned error:", response.status_code)
            return
    except requests.exceptions.RequestException as e:
        print("❌ Cannot connect to chatbot server. Make sure it's running with:")
        print("   python main.py")
        return
    
    print("\n🧪 Testing with sample questions:")
    print("-" * 30)
    
    for i, question in enumerate(test_questions, 1):
        print(f"\n{i}. Question: {question}")
        
        try:
            response = requests.post(
                f"{base_url}/chat",
                json={"message": question},
                timeout=30
            )
            
            if response.status_code == 200:
                data = response.json()
                print(f"✅ Response: {data['response'][:150]}...")
                print(f"   Confidence: {data['confidence']:.2f}")
                print(f"   Sources found: {len(data['sources'])}")
            else:
                print(f"❌ Error: {response.status_code}")
                
        except requests.exceptions.RequestException as e:
            print(f"❌ Request failed: {e}")
        
        # Small delay between requests
        time.sleep(1)
    
    print("\n" + "="*50)
    print("🎉 Test completed! Your free chatbot is working!")
    print("\nTo integrate with your website:")
    print("1. Make sure the chatbot server (main.py) is running")
    print("2. Update your frontend to call http://localhost:8000/chat")
    print("3. No API keys needed - it's completely free! 💰")

if __name__ == "__main__":
    test_chatbot()
