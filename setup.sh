#!/bin/bash

# Comprehensive setup script for Surf na Mao project (macOS/Linux)
# This script provides multiple options for running the project

echo "🏄 Surf na Mao - Project Setup"
echo "================================"

# Function to check if Docker is available
check_docker() {
    if command -v docker &> /dev/null; then
        return 0
    else
        return 1
    fi
}

# Function to check if Node.js is available
check_node() {
    if command -v node &> /dev/null; then
        return 0
    else
        return 1
    fi
}

# Function to check if npm is available
check_npm() {
    if command -v npm &> /dev/null; then
        return 0
    else
        return 1
    fi
}

echo ""
echo "Checking system requirements..."

if check_docker; then
    echo "Docker: ✅ Available"
    DOCKER_AVAILABLE=true
else
    echo "Docker: ❌ Not available"
    DOCKER_AVAILABLE=false
fi

if check_node; then
    echo "Node.js: ✅ Available"
    NODE_AVAILABLE=true
else
    echo "Node.js: ❌ Not available"
    NODE_AVAILABLE=false
fi

if check_npm; then
    echo "npm: ✅ Available"
    NPM_AVAILABLE=true
else
    echo "npm: ❌ Not available"
    NPM_AVAILABLE=false
fi

echo ""
echo "Choose your setup option:"
echo "1. 🐳 Docker (Recommended - Works offline)"
echo "2. 📦 Local Node.js (Requires internet)"
echo "3. ❌ Exit"

read -p "Enter your choice (1-3): " choice

case $choice in
    1)
        if [ "$DOCKER_AVAILABLE" = false ]; then
            echo "❌ Docker is not available. Please install Docker first."
            echo "Download from: https://www.docker.com/products/docker-desktop"
            exit 1
        fi
        
        echo ""
        echo "🐳 Setting up with Docker..."
        
        # Build and run with Docker Compose
        echo "Building Docker image..."
        docker-compose -f docker-compose.dev.yml up --build
        
        if [ $? -eq 0 ]; then
            echo ""
            echo "✅ Project is running at http://localhost:3000"
        else
            echo ""
            echo "❌ Docker setup failed. Check the error messages above."
        fi
        ;;
        
    2)
        if [ "$NODE_AVAILABLE" = false ] || [ "$NPM_AVAILABLE" = false ]; then
            echo "❌ Node.js or npm is not available. Please install Node.js first."
            echo "Download from: https://nodejs.org/"
            exit 1
        fi
        
        echo ""
        echo "📦 Setting up with local Node.js..."
        
        # Install dependencies
        echo "Installing dependencies..."
        npm install
        
        if [ $? -eq 0 ]; then
            echo ""
            echo "✅ Dependencies installed successfully!"
            echo "Starting development server..."
            npm run dev
        else
            echo ""
            echo "❌ Failed to install dependencies. Check the error messages above."
        fi
        ;;
        
    3)
        echo ""
        echo "👋 Goodbye!"
        exit 0
        ;;
        
    *)
        echo ""
        echo "❌ Invalid choice. Please enter a number between 1 and 3."
        exit 1
        ;;
esac 