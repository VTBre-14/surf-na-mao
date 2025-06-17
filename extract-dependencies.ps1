# PowerShell script to extract node_modules from compressed archive
# This script extracts the node_modules.tar.gz file to restore dependencies

Write-Host "Extracting node_modules from compressed archive..." -ForegroundColor Green

# Check if node_modules.tar.gz exists
if (Test-Path "node_modules.tar.gz") {
    # Remove existing node_modules directory if it exists
    if (Test-Path "node_modules") {
        Write-Host "Removing existing node_modules directory..." -ForegroundColor Yellow
        Remove-Item -Recurse -Force "node_modules"
    }
    
    # Extract the compressed archive
    Write-Host "Extracting node_modules.tar.gz..." -ForegroundColor Yellow
    tar -xzf node_modules.tar.gz
    
    if (Test-Path "node_modules") {
        Write-Host "✅ node_modules extracted successfully!" -ForegroundColor Green
        Write-Host "You can now run 'npm run dev' to start the development server." -ForegroundColor Cyan
    } else {
        Write-Host "❌ Extraction failed. Please check if tar is available on your system." -ForegroundColor Red
    }
} else {
    Write-Host "❌ node_modules.tar.gz not found in the current directory." -ForegroundColor Red
    Write-Host "Please make sure you're in the project root directory." -ForegroundColor Yellow
} 