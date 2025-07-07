#!/bin/bash
# Ultimate Free Chatbot Setup Script

echo "🚀 Setting up your ultra-reliable free chatbot..."

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    cp .env.example .env 2>/dev/null || touch .env
fi

echo ""
echo "🔧 Choose your setup:"
echo "1. Ollama (Local, 100% reliable) - RECOMMENDED"
echo "2. Groq (Cloud, ultra-fast)"
echo "3. Google Gemini (Cloud, reliable)"
echo "4. All three (maximum reliability)"

read -p "Enter choice (1-4): " choice

case $choice in
    1)
        echo "Installing Ollama..."
        chmod +x setup_ollama.sh
        ./setup_ollama.sh
        ;;
    2)
        echo "Setting up Groq..."
        echo ""
        echo "📝 Steps:"
        echo "1. Go to: https://console.groq.com/keys"
        echo "2. Sign up (free)"
        echo "3. Create API key"
        echo "4. Add to .env: GROQ_API_KEY=your_key"
        ;;
    3)
        echo "Setting up Google Gemini..."
        echo ""
        echo "📝 Steps:"
        echo "1. Go to: https://aistudio.google.com/app/apikey"
        echo "2. Sign in with Google"
        echo "3. Create API key"
        echo "4. Add to .env: GOOGLE_API_KEY=your_key"
        ;;
    4)
        echo "Setting up all providers for maximum reliability..."
        chmod +x setup_ollama.sh
        ./setup_ollama.sh
        echo ""
        echo "📝 Also set up API keys:"
        echo "1. Groq: https://console.groq.com/keys → GROQ_API_KEY"
        echo "2. Gemini: https://aistudio.google.com/app/apikey → GOOGLE_API_KEY"
        ;;
    *)
        echo "Invalid choice"
        exit 1
        ;;
esac

echo ""
echo "✅ Setup complete!"
echo ""
echo "🚀 To start your chatbot:"
echo "python main.py"
