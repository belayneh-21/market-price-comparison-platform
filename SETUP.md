# Local Market Price Comparison Platform - Setup Guide

## Overview

This is a full-stack platform that connects local merchants with customers, enabling price comparison across multiple stores.

## Project Structure

\`\`\`
├── backend/                 # Express.js API server
│   ├── controllers/        # Request handlers
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── middleware/        # Authentication middleware
│   ├── scripts/           # Database seed scripts
│   └── server.ts          # Entry point
├── app/                    # Next.js frontend
│   ├── (auth)/            # Authentication pages
│   ├── (user)/            # User pages
│   ├── (merchant)/        # Merchant dashboard
│   ├── (admin)/           # Admin panel
│   └── page.tsx           # Landing page
├── components/            # React components
└── lib/                   # Utilities and API client
\`\`\`

## Prerequisites

- Node.js 18 or higher
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn package manager

## Installation Steps

### 1. Install Frontend Dependencies

\`\`\`bash
npm install
\`\`\`

### 2. Install Backend Dependencies

\`\`\`bash
npm run backend:install
\`\`\`

Or manually:

\`\`\`bash
cd backend
npm install
cd ..
\`\`\`

### 3. Configure Environment Variables

#### Frontend (.env.local)

Create a `.env.local` file in the root directory:

\`\`\`env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
\`\`\`

#### Backend (backend/.env)

Create a `.env` file in the `backend` directory:

\`\`\`env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/market-price-platform
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
\`\`\`

**Important:** Change the `JWT_SECRET` to a secure random string in production.

### 4. Start MongoDB

If using local MongoDB:

\`\`\`bash
# macOS (with Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
net start MongoDB
\`\`\`

Or use MongoDB Atlas (cloud):
- Create a free cluster at https://www.mongodb.com/cloud/atlas
- Get your connection string
- Update `MONGODB_URI` in `backend/.env`

### 5. Seed the Database

Run these scripts to create initial data:

\`\`\`bash
# Create admin account
cd backend
node scripts/create-admin.js

# Seed categories
node scripts/seed-categories.js

cd ..
\`\`\`

### 6. Start the Development Servers

#### Option 1: Run Both Servers Separately

Terminal 1 (Frontend):
\`\`\`bash
npm run dev
\`\`\`

Terminal 2 (Backend):
\`\`\`bash
npm run backend
\`\`\`

#### Option 2: Run Backend Manually

\`\`\`bash
cd backend
npm run dev
\`\`\`

## Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000/api
- **API Health Check:** http://localhost:5000/api/health

## Default Credentials

After running the seed scripts:

### Admin Account
- Email: `admin@market.com`
- Password: `admin123`

### Test Accounts

You can create test accounts through the registration pages:
- User Registration: http://localhost:3000/register
- Merchant Registration: http://localhost:3000/merchant/register

## Features by Role

### Users
- Browse and search products
- Compare prices across merchants
- Filter by category and location
- View detailed product information
- Manage profile

### Merchants
- Register and manage store profile
- Add, edit, and delete products
- Set prices and manage inventory
- View product listings dashboard

### Admins
- Manage users and merchants
- Approve/disapprove merchant registrations
- Moderate product listings
- View platform analytics and reports

## API Endpoints

### Authentication
- `POST /api/users/register` - Register user
- `POST /api/users/login` - User login
- `POST /api/merchants/register` - Register merchant
- `POST /api/merchants/login` - Merchant login
- `POST /api/admin/login` - Admin login

### Products (Public)
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get product details
- `GET /api/products/search?q=query` - Search products

### User Routes (Protected)
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Merchant Routes (Protected)
- `GET /api/merchants/products` - Get merchant's products
- `POST /api/merchants/products` - Add product
- `PUT /api/merchants/products/:id` - Update product
- `DELETE /api/merchants/products/:id` - Delete product

### Admin Routes (Protected)
- `GET /api/admin/users` - Get all users
- `GET /api/admin/merchants` - Get all merchants
- `PUT /api/admin/merchants/:id/approve` - Approve merchant
- `GET /api/admin/products` - Get all products
- `GET /api/admin/reports` - Get platform reports

## Troubleshooting

### MongoDB Connection Issues

**Error:** "MongooseServerSelectionError: connect ECONNREFUSED"

**Solution:**
- Ensure MongoDB is running
- Check your `MONGODB_URI` in `backend/.env`
- For local MongoDB, try: `mongodb://127.0.0.1:27017/market-price-platform`

### Port Already in Use

**Error:** "Port 3000/5000 is already in use"

**Solution:**
- Kill the process using the port
- Or change the port in the respective config files

### CORS Issues

**Error:** "CORS policy: No 'Access-Control-Allow-Origin' header"

**Solution:**
- Ensure backend is running
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Verify CORS is enabled in `backend/server.ts`

### JWT Token Issues

**Error:** "Invalid or expired token"

**Solution:**
- Clear browser localStorage
- Log in again to get a new token
- Ensure `JWT_SECRET` is set in `backend/.env`

## Development Tips

### Hot Reload

Both frontend and backend support hot reload:
- Frontend: Changes to React components reload automatically
- Backend: Changes to TypeScript files restart the server automatically

### Database Management

View your MongoDB data:
- MongoDB Compass (GUI): https://www.mongodb.com/products/compass
- MongoDB Shell: `mongosh`

### API Testing

Use tools like:
- Postman: https://www.postman.com/
- Thunder Client (VS Code extension)
- curl commands

Example:
\`\`\`bash
# Test health endpoint
curl http://localhost:5000/api/health

# Login as admin
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@market.com","password":"admin123"}'
\`\`\`

## Production Deployment

### Frontend (Vercel)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variable: `NEXT_PUBLIC_API_URL`
4. Deploy

### Backend (Railway/Render/Heroku)

1. Push backend code to GitHub
2. Create new service
3. Add environment variables
4. Deploy

### Database (MongoDB Atlas)

1. Create production cluster
2. Update `MONGODB_URI` with production connection string
3. Configure IP whitelist

## Support

For issues or questions:
- Check the troubleshooting section
- Review API documentation in `backend/README.md`
- Check MongoDB connection and logs

## Tech Stack

- **Frontend:** Next.js 15, React 19, Tailwind CSS
- **Backend:** Express.js, TypeScript
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT with bcrypt
- **UI Components:** Radix UI, shadcn/ui
