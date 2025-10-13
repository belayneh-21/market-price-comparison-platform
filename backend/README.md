# Market Price Platform - Backend API

## Setup Instructions

1. **Install Dependencies**
   \`\`\`bash
   cd backend
   npm install
   \`\`\`

2. **Configure Environment Variables**
   - Copy `.env.example` to `.env`
   - Update MongoDB URI and JWT secret

3. **Start MongoDB**
   - Make sure MongoDB is running locally or use MongoDB Atlas

4. **Run Development Server**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Create Admin User** (Run this script once)
   \`\`\`bash
   node scripts/create-admin.js
   \`\`\`

## API Endpoints

### User Routes
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `GET /api/users/profile` - Get user profile (auth required)
- `PUT /api/users/profile` - Update user profile (auth required)

### Merchant Routes
- `POST /api/merchants/register` - Register new merchant
- `POST /api/merchants/login` - Merchant login
- `GET /api/merchants/profile` - Get merchant profile (auth required)
- `PUT /api/merchants/profile` - Update merchant profile (auth required)
- `GET /api/merchants/products` - Get merchant's products (auth required)
- `POST /api/merchants/products` - Add new product (auth required)
- `PUT /api/merchants/products/:id` - Update product (auth required)
- `DELETE /api/merchants/products/:id` - Delete product (auth required)

### Admin Routes
- `POST /api/admin/login` - Admin login
- `GET /api/admin/users` - Get all users (admin only)
- `GET /api/admin/merchants` - Get all merchants (admin only)
- `PUT /api/admin/merchants/:id/approve` - Approve/disapprove merchant (admin only)
- `DELETE /api/admin/users/:id` - Delete user (admin only)
- `GET /api/admin/products` - Get all products (admin only)
- `PUT /api/admin/products/:id/approve` - Approve/disapprove product (admin only)
- `DELETE /api/admin/products/:id` - Delete product (admin only)
- `GET /api/admin/reports` - Get platform reports (admin only)

### Public Product Routes
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/search?q=query` - Search products
- `GET /api/products/:id` - Get product details with price comparison

## Authentication

All protected routes require a JWT token in the Authorization header:
\`\`\`
Authorization: Bearer <token>
