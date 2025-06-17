This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 🚀 Quick Start

### **Option 1: Docker (Recommended - Works Completely Offline)**

This is the most reliable way to run the project offline:

```bash
# Run the setup script (Windows PowerShell)
.\setup.ps1

# Or manually with Docker Compose
docker-compose -f docker-compose.dev.yml up --build
```

The project will be available at [http://localhost:3000](http://localhost:3000)

### **Option 2: Using compressed dependencies (Offline development)**

This repository includes a compressed `node_modules.tar.gz` file for offline development. To use it:

1. **Extract dependencies:**
   ```bash
   # On Windows (PowerShell)
   .\extract-dependencies.ps1
   
   # On macOS/Linux
   tar -xzf node_modules.tar.gz
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

### **Option 3: Local Development (Requires Internet)**

If you have Node.js installed and prefer to install dependencies normally:

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## 🐳 Docker Setup

The project includes Docker configuration for reliable offline development:

- **`Dockerfile.dev`** - Development environment with all dependencies
- **`docker-compose.dev.yml`** - Easy development setup
- **`setup.ps1`** - Interactive setup script (Windows)
- **`setup.sh`** - Interactive setup script (macOS/Linux)

### Docker Commands

```bash
# Build and run development environment
docker-compose -f docker-compose.dev.yml up --build

# Run in background
docker-compose -f docker-compose.dev.yml up -d

# Stop containers
docker-compose -f docker-compose.dev.yml down
```

## 📁 Project Structure

```
surf-na-mao/
├── src/                    # Source code
├── public/                 # Static assets
├── prisma/                 # Database schema
├── Dockerfile.dev          # Development Docker image
├── docker-compose.dev.yml  # Docker Compose for development
├── setup.ps1              # Interactive setup script (Windows)
└── setup.sh               # Interactive setup script (macOS/Linux)
```

## 🔧 Development

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## 📚 Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## 🚀 Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.