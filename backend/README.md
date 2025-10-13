Local Market Price Comparison Platform

The Local Market Price Comparison Platform is a full-stack web application that connects local merchants with customers, allowing users to browse and compare product prices across multiple stores in their area. The system aims to make shopping more convenient by giving customers access to real-time product data, merchant information, and detailed comparisons — all in one place.

This project is built using modern web technologies such as Next.js 15 and React 19 for the frontend, Express.js with TypeScript for the backend, and MongoDB as the database. Authentication is handled securely using JWT-based authentication and includes role-based access control for users, merchants, and administrators.

The application provides three main roles:
Users can search for products, compare prices, and view store details.
Merchants can register, manage their product listings, and adjust prices.
Admins oversee the entire system — managing users, approving merchant accounts, and moderating product data.

Installation and Setup

Before you start, make sure you have Node.js (version 18 or above) and MongoDB installed on your system. If you are using MongoDB locally, ensure that the MongoDB server is running in the background.

To begin, clone the repository and install all dependencies by running the following command inside the project directory:

npm install
npm run backend:install


After installation, configure the environment variables. Create a file named .env.local in the project root directory and add the following line:

NEXT_PUBLIC_API_URL=http://localhost:5000/api


Then create another file named .env inside the backend folder and add the backend configuration:

PORT=5000
MONGODB_URI=mongodb://localhost:27017/market-price-platform
JWT_SECRET=your-secret-key-here
NODE_ENV=development


Once your environment variables are set up, start your MongoDB service. If it’s running locally, you can use:

mongod


If this command doesn’t work, you may need to start the service manually through the MongoDB Compass or Windows Services tool.

Next, seed your database with initial data by running these commands:

cd backend
node scripts/create-admin.js
node scripts/seed-categories.js
cd ..


This will create the default administrator account and predefined categories used in the platform.

Running the Application

To start the application in development mode, open two terminal windows or tabs. In the first terminal, run the frontend server with:

npm run dev


In the second terminal, start the backend server by running:

npm run backend


After both servers are running successfully, you can access the application in your browser at:

Frontend (User Interface): http://localhost:3000

Backend API (Server): http://localhost:5000/api