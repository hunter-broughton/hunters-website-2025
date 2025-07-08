#!/bin/bash

# Portfolio Chatbot Setup Script

echo "Setting up Hunter's Portfolio Chatbot..."

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "Python 3 is required but not installed."
    echo "Please install Python 3.8+ and try again."
    exit 1
fi

# Navigate to chatbot directory
cd "$(dirname "$0")"

echo "Current directory: $(pwd)"

# Create virtual environment
echo "Creating Python virtual environment..."
python3 -m venv venv

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate

# Upgrade pip
echo "⬆Upgrading pip..."
pip install --upgrade pip

# Install dependencies
echo "Installing Python dependencies..."
pip install -r requirements.txt

# Create environment file
if [ ! -f .env ]; then
    echo "⚙Creating environment file..."
    cp .env.example .env
    echo "Created .env file. Please review and update if needed."
else
    echo "ℹ.env file already exists."
fi

# Initialize knowledge base
echo "Initializing knowledge base..."
python knowledge_base.py

# Test the setup
echo "Testing the setup..."
python -c "
import fastapi
import sentence_transformers
import faiss
print('All dependencies imported successfully!')
"

echo ""
echo "Setup complete!"
echo ""
echo "To start the chatbot API:"
echo "1. source venv/bin/activate"
echo "2. python main.py"
echo ""
echo "The API will be available at http://localhost:8000"
echo "API documentation: http://localhost:8000/docs"
echo ""
echo "To integrate with your Next.js frontend:"
echo "1. Add CHATBOT_API_URL=http://localhost:8000 to your .env.local"
echo "2. Import and use the PortfolioChatbot component"
echo ""
