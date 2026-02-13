# MongoDB Backend - Car Rental API

## Overview
Express.js backend using **MongoDB** and **Mongoose** for the Car Rental application.

## Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB installation)
- npm or yarn

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
The `.env` file is already configured with MongoDB Atlas URL:
```env
MONGODB_URL="mongodb+srv://atulkesharwani7974:Atul7974@cluster0.magjk.mongodb.net/car-rental"
PORT=5000
NODE_ENV=development
SESSION_SECRET=car-rental-secret-key-2024
```

### 3. Seed the Database
Populate MongoDB with sample data:
```bash
npm run seed
```

This will create:
- **3 Agency users** with multiple cars each
- **4 Customer users**
- **15 Cars** across different price ranges
- **4 Sample bookings**

### 4. Start the Server
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

Server runs on: **http://localhost:5000**

## Sample Login Credentials

### Agencies (Can add/edit cars, view bookings)
| Email | Password | Cars |
|-------|----------|------|
| luxury@agency.com | password123 | 4 luxury vehicles |
| budget@agency.com | password123 | 5 budget vehicles |
| premium@agency.com | password123 | 6 mid-range vehicles |

### Customers (Can view cars, make bookings)
| Email | Password |
|-------|----------|
| john@customer.com | password123 |
| jane@customer.com | password123 |
| mike@customer.com | password123 |
| sarah@customer.com | password123 |

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user (requires auth)
- `POST /api/auth/logout` - Logout

### Cars
- `GET /api/cars` - Get all cars
- `POST /api/cars` - Create a car (agency only)
- `GET /api/cars/agency` - Get agency's cars (agency only)
- `PUT /api/cars/:id` - Update a car (agency only)

### Bookings
- `POST /api/bookings` - Book a car (customer only)
- `GET /api/bookings/agency` - Get agency's bookings (agency only)

## Features

✅ MongoDB Atlas cloud database
✅ Mongoose ODM with schema validation
✅ Session-based authentication
✅ Role-based access control (Customer/Agency)
✅ Password hashing with bcrypt
✅ CORS enabled for frontend integration
✅ Sample data seeding script
✅ RESTful API design

## Project Structure
```
car-rental-express-backend/
├── config/
│   └── database.js          # MongoDB connection
├── middleware/
│   └── auth.js              # Authentication middleware
├── models/
│   ├── User.js              # User schema
│   ├── Car.js               # Car schema
│   └── Booking.js           # Booking schema
├── routes/
│   ├── auth.js              # Auth routes
│   ├── cars.js              # Car routes
│   └── bookings.js          # Booking routes
├── utils/
│   └── validators.js        # Validation helpers
├── seed.js                  # Database seeder
├── server.js                # Main server file
├── package.json             # Dependencies
└── .env                     # Environment variables
```

## Environment Variables

- `MONGODB_URL` - MongoDB connection string (Atlas or local)
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)
- `SESSION_SECRET` - Secret key for sessions

## Common Commands

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Run in production mode
npm start

# Seed database with sample data
npm run seed
```

## Database Collections

### Users
- Stores both customers and agencies
- Password is hashed with bcrypt
- Role determines access permissions

### Cars
- Each car belongs to an agency
- Contains model, vehicle number, capacity, and rent details
- Agency can only edit their own cars

### Bookings
- Links customers with cars
- Stores rental start date and duration
- Agencies can view bookings for their cars

## Troubleshooting

### MongoDB Connection Issues
- Verify MongoDB Atlas URL is correct
- Check if IP address is whitelisted in MongoDB Atlas
- Ensure network connectivity

### Reset Database
```bash
npm run seed
```
This will clear all data and re-populate with sample data.

For detailed API documentation, see [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
