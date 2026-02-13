# Quick Start Guide

## Setup Instructions

### 1. Prerequisites
- Node.js (v14 or higher)
- MySQL server
- npm or yarn

### 2. Database Setup

1. Create the database:
```bash
mysql -u root -p
```

```sql
CREATE DATABASE car_rental;
exit;
```

2. Import the schema:
```bash
mysql -u root -p car_rental < database.sql
```

### 3. Environment Configuration

Make sure `.env` file exists with correct database credentials:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=car_rental
PORT=5000
NODE_ENV=development
SESSION_SECRET=car-rental-secret-key-2024
```

### 4. Install Dependencies

```bash
npm install
```

### 5. Start the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start on http://localhost:5000

### 6. Test the API

Visit http://localhost:5000 to see the API documentation endpoints.

You can test the API using:
- Postman
- Thunder Client (VS Code extension)
- curl
- Any HTTP client

## Testing Flow

### Register an Agency
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "ABC Car Rentals",
    "email": "agency@example.com",
    "password": "password123",
    "role": "agency"
  }'
```

### Register a Customer
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "customer@example.com",
    "password": "password123",
    "role": "customer"
  }'
```

### Login as Agency
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{
    "email": "agency@example.com",
    "password": "password123"
  }'
```

### Add a Car (Agency)
```bash
curl -X POST http://localhost:5000/api/cars \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "model": "Toyota Camry",
    "vehicle_number": "ABC-1234",
    "seating_capacity": 5,
    "rent_per_day": 50
  }'
```

### Get All Cars
```bash
curl http://localhost:5000/api/cars
```

### Login as Customer
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -c cookies-customer.txt \
  -d '{
    "email": "customer@example.com",
    "password": "password123"
  }'
```

### Book a Car (Customer)
```bash
curl -X POST http://localhost:5000/api/bookings \
  -H "Content-Type: application/json" \
  -b cookies-customer.txt \
  -d '{
    "car_id": 1,
    "start_date": "2024-03-01",
    "days": 3
  }'
```

## Common Issues

### Database Connection Error
- Make sure MySQL is running
- Check database credentials in `.env`
- Verify database exists: `SHOW DATABASES;` in MySQL

### Port Already in Use
- Change PORT in `.env` file
- Or kill the process using port 5000

### Session/Cookie Issues
- Make sure your HTTP client supports cookies
- For Postman: Enable "Automatically follow redirects" and cookie jar
- For curl: Use `-c cookies.txt` to save and `-b cookies.txt` to send cookies

## Project Structure

```
car-rental-express-backend/
├── config/
│   └── database.js          # Database configuration
├── middleware/
│   └── auth.js              # Authentication middleware
├── routes/
│   ├── auth.js              # Auth routes
│   ├── cars.js              # Car routes
│   └── bookings.js          # Booking routes
├── utils/
│   └── validators.js        # Validation helpers
├── server.js                # Main server file
├── database.sql             # Database schema
├── package.json             # Dependencies
├── .env                     # Environment variables
└── README.md                # This file
```

## Next Steps

1. Create sample data in the database
2. Test all endpoints
3. Connect the frontend application
4. Deploy to production

For detailed API documentation, see [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
