# Comprehensive setup script for Surf na Mao project
# This script provides multiple options for running the project

Write-Host "🏄 Surf na Mao - Project Setup" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan

# Function to check if Docker is available
function Test-Docker {
    try {
        docker --version | Out-Null
        return $true
    } catch {
        return $false
    }
}

# Function to check if Node.js is available
function Test-Node {
    try {
        node --version | Out-Null
        return $true
    } catch {
        return $false
    }
}

# Function to check if npm is available
function Test-Npm {
    try {
        npm --version | Out-Null
        return $true
    } catch {
        return $false
    }
}

Write-Host "`nChecking system requirements..." -ForegroundColor Yellow

$dockerAvailable = Test-Docker
$nodeAvailable = Test-Node
$npmAvailable = Test-Npm

Write-Host "Docker: $(if ($dockerAvailable) { '✅ Available' } else { '❌ Not available' })" -ForegroundColor $(if ($dockerAvailable) { 'Green' } else { 'Red' })
Write-Host "Node.js: $(if ($nodeAvailable) { '✅ Available' } else { '❌ Not available' })" -ForegroundColor $(if ($nodeAvailable) { 'Green' } else { 'Red' })
Write-Host "npm: $(if ($npmAvailable) { '✅ Available' } else { '❌ Not available' })" -ForegroundColor $(if ($npmAvailable) { 'Green' } else { 'Red' })

Write-Host "`nChoose your setup option:" -ForegroundColor Yellow
Write-Host "1. 🐳 Docker (Recommended - Works offline)" -ForegroundColor Cyan
Write-Host "2. 📦 Local Node.js (Requires internet)" -ForegroundColor Cyan
Write-Host "3. 📁 Extract compressed dependencies (Offline)" -ForegroundColor Cyan
Write-Host "4. ❌ Exit" -ForegroundColor Red

$choice = Read-Host "`nEnter your choice (1-4)"

switch ($choice) {
    "1" {
        if (-not $dockerAvailable) {
            Write-Host "❌ Docker is not available. Please install Docker first." -ForegroundColor Red
            Write-Host "Download from: https://www.docker.com/products/docker-desktop" -ForegroundColor Yellow
            break
        }
        
        Write-Host "`n🐳 Setting up with Docker..." -ForegroundColor Green
        
        # Build and run with Docker Compose
        Write-Host "Building Docker image..." -ForegroundColor Yellow
        docker-compose -f docker-compose.dev.yml up --build
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "`n✅ Project is running at http://localhost:3000" -ForegroundColor Green
        } else {
            Write-Host "`n❌ Docker setup failed. Check the error messages above." -ForegroundColor Red
        }
    }
    
    "2" {
        if (-not $nodeAvailable -or -not $npmAvailable) {
            Write-Host "❌ Node.js or npm is not available. Please install Node.js first." -ForegroundColor Red
            Write-Host "Download from: https://nodejs.org/" -ForegroundColor Yellow
            break
        }
        
        Write-Host "`n📦 Setting up with local Node.js..." -ForegroundColor Green
        
        # Install dependencies
        Write-Host "Installing dependencies..." -ForegroundColor Yellow
        npm install
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "`n✅ Dependencies installed successfully!" -ForegroundColor Green
            Write-Host "Starting development server..." -ForegroundColor Yellow
            npm run dev
        } else {
            Write-Host "`n❌ Failed to install dependencies. Check the error messages above." -ForegroundColor Red
        }
    }
    
    "3" {
        Write-Host "`n📁 Extracting compressed dependencies..." -ForegroundColor Green
        
        if (Test-Path "node_modules.tar.gz") {
            # Remove existing node_modules if it exists
            if (Test-Path "node_modules") {
                Write-Host "Removing existing node_modules directory..." -ForegroundColor Yellow
                Remove-Item -Recurse -Force "node_modules"
            }
            
            # Extract the compressed archive
            Write-Host "Extracting node_modules.tar.gz..." -ForegroundColor Yellow
            tar -xzf node_modules.tar.gz
            
            if (Test-Path "node_modules") {
                Write-Host "`n✅ node_modules extracted successfully!" -ForegroundColor Green
                Write-Host "Starting development server..." -ForegroundColor Yellow
                npm run dev
            } else {
                Write-Host "`n❌ Extraction failed. Please check if tar is available on your system." -ForegroundColor Red
            }
        } else {
            Write-Host "`n❌ node_modules.tar.gz not found in the current directory." -ForegroundColor Red
            Write-Host "Please make sure you're in the project root directory." -ForegroundColor Yellow
        }
    }
    
    "4" {
        Write-Host "`n👋 Goodbye!" -ForegroundColor Cyan
        exit 0
    }
    
    default {
        Write-Host "`n❌ Invalid choice. Please enter a number between 1 and 4." -ForegroundColor Red
    }
} 