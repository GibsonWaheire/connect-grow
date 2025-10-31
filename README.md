# Connect Grow - Digital Solutions Platform

A full-stack application for digital solutions, e-commerce, and course help services.

## Project Structure

This project is organized into a monorepo structure:

```
connect-grow/
├── api/            # API routes (Vercel serverless functions - must be at root)
│   ├── blog/
│   ├── shop/
│   └── ...
│
├── client/         # Frontend React application
│   ├── src/        # React source code
│   ├── public/     # Static assets
│   ├── index.html  # Entry HTML file
│   └── package.json
│
├── server/         # Backend server code
│   ├── server.js   # Express server (for local development)
│   └── package.json
│
└── package.json    # Root package.json for workspace scripts
```

**Note:** The `api/` directory must remain at the root level because Vercel requires serverless functions to be in the root `api/` folder.

## Getting Started

### Installation

Install all dependencies:
```bash
npm run install:all
```

Or install separately:
```bash
# Install root dependencies
npm install

# Install client dependencies
cd client && npm install

# Install server dependencies
cd ../server && npm install
```

### Development

Run both client and server together:
```bash
npm run dev
```

Or run separately:
```bash
# Frontend only (port 5173)
npm run dev:client

# Backend only (port 3001)
npm run dev:server
```

### Building

Build the client for production:
```bash
npm run build:client
```

Or from the root:
```bash
npm run build
```

## Deployment

### Vercel (Recommended)

The project is configured for Vercel deployment:
- Frontend: Deploy from `client/` directory
- Backend: API routes are in `server/api/` (auto-deployed as serverless functions)

### Manual Deployment

1. Build the client:
   ```bash
   cd client && npm run build
   ```

2. Deploy the `client/dist` directory to your hosting service

3. Deploy API routes from `server/api/` to your serverless platform

## Tech Stack

### Frontend (Client)
- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Radix UI
- React Query

### Backend (Server)
- Node.js
- Express (local development)
- Vercel Serverless Functions (production)

## Scripts

- `npm run dev` - Run both client and server
- `npm run dev:client` - Run frontend only
- `npm run dev:server` - Run backend only
- `npm run build` - Build frontend for production
- `npm run install:all` - Install all dependencies
