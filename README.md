# Local Market Price Comparison Platform

A full-stack platform connecting local merchants with customers, enabling price comparison across multiple stores.

## Features

### For Users
- Browse and search products from local merchants
- Compare prices across different stores
- Filter by category and location
- Sort by price (low to high, high to low)
- View detailed product information

### For Merchants
- Register and manage store profile
- Add, edit, and delete products
- Set prices and manage inventory
- View product listings

### For Admins
- Manage users and merchants
- Approve/disapprove merchant registrations
- Moderate product listings
- View platform analytics and reports

## Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **Backend**: Express.js, TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT-based auth with role-based access control

## Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### Installation

1. **Install dependencies:**
   \`\`\`bash
   npm install
   npm run backend:install
   \`\`\`

2. **Configure environment variables:**
   
   Create `.env.local` in root:
   \`\`\`env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   \`\`\`
   
   Create `backend/.env`:
   \`\`\`env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/market-price-platform
   JWT_SECRET=your-secret-key-here
   NODE_ENV=development
   \`\`\`

3. **Start MongoDB** (if using local installation)

4. **Seed the database:**
   \`\`\`bash
   cd backend
   node scripts/create-admin.js
   node scripts/seed-categories.js
   cd ..
   \`\`\`

5. **Start development servers:**
   
   Terminal 1 (Frontend):
   \`\`\`bash
   npm run dev
   \`\`\`
   
   Terminal 2 (Backend):
   \`\`\`bash
   npm run backend
   \`\`\`

6. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api

## Default Credentials

**Admin Account:**
- Email: admin@market.com
- Password: admin123

## Project Structure

\`\`\`
├── backend/                 # Express.js API
│   ├── controllers/        # Request handlers
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── middleware/        # Auth middleware
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

## Documentation

- [Setup Guide](SETUP.md) - Detailed installation and configuration
- [Backend API Documentation](backend/README.md) - API endpoints and usage

## Development

### Frontend Development
\`\`\`bash
npm run dev
\`\`\`
Runs on http://localhost:3000

### Backend Development
\`\`\`bash
npm run backend
\`\`\`
Runs on http://localhost:5000

### Building for Production
\`\`\`bash
npm run build
\`\`\`

## Key Features Implementation

### Authentication System
- JWT-based authentication
- Role-based access control (User, Merchant, Admin)
- Secure password hashing with bcrypt
- Protected routes and API endpoints

### Product Management
- CRUD operations for products
- Image upload support
- Category-based organization
- Location-based filtering
- Price comparison across merchants

### Admin Panel
- User management
- Merchant approval system
- Product moderation
- Platform analytics and reports

## API Endpoints

### Public Routes
- `GET /api/products` - List all products
- `GET /api/products/:id` - Get product details
- `GET /api/products/search` - Search products

### Authentication
- `POST /api/users/register` - User registration
- `POST /api/users/login` - User login
- `POST /api/merchants/register` - Merchant registration
- `POST /api/merchants/login` - Merchant login
- `POST /api/admin/login` - Admin login

### Protected Routes
See [Backend API Documentation](backend/README.md) for complete API reference.

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.
