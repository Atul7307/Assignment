# Car Rental API - Core PHP Backend

A lightweight, pure PHP backend for the Car Rental application, designed for easy deployment on InfinityFree and other shared hosting platforms.

## 🚀 Features

- **Pure PHP** - No frameworks, easy to deploy on any PHP hosting
- **RESTful API** - Clean and intuitive API endpoints
- **Session-based Authentication** - Secure user authentication
- **Role-based Access Control** - Separate permissions for customers and agencies
- **MySQL Database** - Simple and efficient data storage
- **CORS Support** - Ready for frontend integration

## 📁 Project Structure

```
car-rental-core-php/
├── api/
│   ├── auth/
│   │   ├── register.php     # User registration
│   │   ├── login.php         # User login
│   │   ├── logout.php        # User logout
│   │   └── me.php            # Get current user
│   ├── cars/
│   │   ├── index.php         # List/Create cars
│   │   ├── update.php        # Update car
│   │   └── agency-cars.php   # Get agency's cars
│   └── bookings/
│       ├── book.php          # Create booking
│       └── agency-bookings.php # Get agency's bookings
├── config/
│   ├── database.php          # Database configuration
│   └── cors.php              # CORS configuration
├── includes/
│   └── functions.php         # Helper functions
├── .htaccess                 # URL rewriting rules
├── index.php                 # API documentation page
└── database.sql              # Database schema
```

## 📋 Requirements

- PHP 7.4 or higher
- MySQL 5.7 or higher
- Apache with mod_rewrite enabled

## 🔧 Local Setup

### 1. Clone/Copy the Project

Place the `car-rental-core-php` folder in your web server's document root (e.g., `htdocs` for XAMPP).

### 2. Create Database

1. Open phpMyAdmin
2. Create a new database named `car_rental`
3. Import the `database.sql` file

### 3. Configure Database Connection

Edit `config/database.php`:

```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'car_rental');
define('DB_USER', 'root');
define('DB_PASS', '');
```

### 4. Test Locally

Open your browser and navigate to:
```
http://localhost/car-rental-core-php/
```

You should see the API documentation page.

## 🌐 InfinityFree Deployment Guide

### Step 1: Create Account

1. Go to [InfinityFree](https://infinityfree.net/)
2. Sign up for a free account
3. Create a new website

### Step 2: Upload Files

1. Log in to the **File Manager** or use **FTP**
2. Navigate to the `htdocs` folder
3. Upload all files from `car-rental-core-php` folder
4. Make sure `.htaccess` file is uploaded (enable "Show hidden files" if needed)

### Step 3: Create MySQL Database

1. Go to **Control Panel** → **MySQL Databases**
2. Create a new database
3. Note down:
   - Database name (e.g., `epiz_xxxxx_car_rental`)
   - Database user (e.g., `epiz_xxxxx`)
   - Database password
   - Database host (e.g., `sql123.infinityfree.com`)

### Step 4: Import Database

1. Go to **phpMyAdmin** from InfinityFree control panel
2. Select your database
3. Click **Import** tab
4. Choose `database.sql` file
5. Click **Go**

### Step 5: Update Configuration

Edit `config/database.php` on the server:

```php
define('DB_HOST', 'sql123.infinityfree.com');
define('DB_NAME', 'epiz_xxxxx_car_rental');
define('DB_USER', 'epiz_xxxxx');
define('DB_PASS', 'your_password_here');
```

### Step 6: Configure CORS

Edit `config/cors.php` and add your frontend URL:

```php
$allowedOrigins = [
    'http://localhost:3000',
    'https://your-frontend-domain.com',  // Add your production URL
];
```

### Step 7: Test Your API

Visit your website URL:
```
https://yoursite.infinityfree.com/
```

You should see the API documentation page.

## 🔌 API Endpoints

### Authentication

#### Register User
```
POST /api/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "customer"  // or "agency"
}
```

#### Login
```
POST /api/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Logout
```
POST /api/logout
```

#### Get Current User
```
GET /api/me
```

### Cars

#### Get All Cars
```
GET /api/cars
```

#### Create Car (Agency Only)
```
POST /api/cars
Content-Type: application/json

{
  "model": "Toyota Camry",
  "vehicle_number": "ABC-123",
  "seating_capacity": 5,
  "rent_per_day": 50
}
```

#### Update Car (Agency Only)
```
PUT /api/cars/1
Content-Type: application/json

{
  "model": "Toyota Camry Updated",
  "vehicle_number": "ABC-123",
  "seating_capacity": 5,
  "rent_per_day": 55
}
```

#### Get Agency's Cars
```
GET /api/agency/cars
```

### Bookings

#### Book a Car (Customer Only)
```
POST /api/book
Content-Type: application/json

{
  "car_id": 1,
  "start_date": "2026-02-20",
  "days": 3
}
```

#### Get Agency's Bookings
```
GET /api/agency/bookings
```

## 🔒 Authentication

The API uses session-based authentication. After logging in, the session cookie will be automatically sent with subsequent requests.

### Session Data
- `user_id` - User's ID
- `role` - User's role (customer/agency)
- `name` - User's name

## 🛡️ Security Features

- Password hashing using `password_hash()`
- SQL injection protection using prepared statements
- Input sanitization
- Role-based access control
- CORS protection

## 🐛 Troubleshooting

### Issue: 404 Not Found on API Endpoints

**Solution:** Make sure `.htaccess` is uploaded and `mod_rewrite` is enabled.

### Issue: Database Connection Failed

**Solution:** Double-check database credentials in `config/database.php`

### Issue: CORS Errors

**Solution:** Add your frontend URL to `$allowedOrigins` array in `config/cors.php`

### Issue: Session Not Working

**Solution:** 
1. Check if session directory is writable
2. InfinityFree sometimes has session issues - consider using database sessions

### Issue: 500 Internal Server Error

**Solution:** 
1. Check PHP error logs in InfinityFree control panel
2. Ensure all required files are uploaded
3. Verify file permissions

## 📝 Notes for InfinityFree

1. **No CLI Access** - This backend doesn't require command-line access
2. **No Composer** - Pure PHP, no dependencies to install
3. **Session Limitations** - InfinityFree may have session limitations for free plans
4. **File Uploads** - Not implemented yet, but can be added if needed
5. **Cron Jobs** - Not required for basic functionality

## 🔄 Updating Frontend Configuration

Update your frontend's API base URL to point to your InfinityFree URL:

```javascript
// In your frontend (lib/api.js or similar)
const API_BASE_URL = 'https://yoursite.infinityfree.com';
```

## 📧 Support

For issues or questions:
1. Check the InfinityFree documentation
2. Review the troubleshooting section
3. Check server error logs in InfinityFree control panel

## 📄 License

This project is open source and available for modification and distribution.

## 🎉 Success!

Once deployed, your Car Rental API will be accessible at:
```
https://yoursite.infinityfree.com/
```

The API documentation will be displayed on the homepage, showing all available endpoints.

---

**Happy Deploying! 🚀**
