# Car Rental Express Backend - API Documentation

## Base URL
```
http://localhost:5000
```

## Authentication Endpoints

### 1. Register User
**POST** `/api/auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "customer"
}
```

**Role Options:** `customer` or `agency`

**Response:**
```json
{
  "status": "registered",
  "message": "Registration successful"
}
```

---

### 2. Login
**POST** `/api/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "status": "login success",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "customer"
  }
}
```

---

### 3. Get Current User
**GET** `/api/auth/me`

**Headers:** 
- Requires authentication (session cookie)

**Response:**
```json
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "customer"
  }
}
```

---

### 4. Logout
**POST** `/api/auth/logout`

**Response:**
```json
{
  "status": "logged out"
}
```

---

## Cars Endpoints

### 1. Get All Cars
**GET** `/api/cars`

**Response:**
```json
[
  {
    "id": 1,
    "agency_id": 2,
    "model": "Toyota Camry",
    "vehicle_number": "ABC-1234",
    "seating_capacity": 5,
    "rent_per_day": 50,
    "created_at": "2024-01-20T10:30:00.000Z"
  }
]
```

---

### 2. Create Car (Agency Only)
**POST** `/api/cars`

**Headers:** 
- Requires authentication as agency

**Request Body:**
```json
{
  "model": "Toyota Camry",
  "vehicle_number": "ABC-1234",
  "seating_capacity": 5,
  "rent_per_day": 50
}
```

**Response:**
```json
{
  "status": "car added"
}
```

---

### 3. Get Agency's Cars (Agency Only)
**GET** `/api/cars/agency`

**Headers:** 
- Requires authentication as agency

**Response:**
```json
[
  {
    "id": 1,
    "agency_id": 2,
    "model": "Toyota Camry",
    "vehicle_number": "ABC-1234",
    "seating_capacity": 5,
    "rent_per_day": 50,
    "created_at": "2024-01-20T10:30:00.000Z"
  }
]
```

---

### 4. Update Car (Agency Only)
**PUT** `/api/cars/:id`

**Headers:** 
- Requires authentication as agency

**Request Body:**
```json
{
  "model": "Toyota Camry 2024",
  "vehicle_number": "ABC-1234",
  "seating_capacity": 5,
  "rent_per_day": 60
}
```

**Response:**
```json
{
  "status": "car updated"
}
```

---

## Bookings Endpoints

### 1. Book a Car (Customer Only)
**POST** `/api/bookings`

**Headers:** 
- Requires authentication as customer

**Request Body:**
```json
{
  "car_id": 1,
  "start_date": "2024-02-01",
  "days": 3
}
```

**Response:**
```json
{
  "status": "car booked"
}
```

---

### 2. Get Agency's Bookings (Agency Only)
**GET** `/api/bookings/agency`

**Headers:** 
- Requires authentication as agency

**Response:**
```json
[
  {
    "id": 1,
    "car_id": 1,
    "customer_id": 3,
    "start_date": "2024-02-01",
    "days": 3,
    "created_at": "2024-01-20T10:30:00.000Z",
    "customer_name": "John Doe",
    "model": "Toyota Camry"
  }
]
```

---

## Error Responses

All endpoints may return error responses in the following format:

```json
{
  "error": "Error message description"
}
```

**Common HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (not authenticated)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Internal Server Error

---

## Authentication

This API uses session-based authentication. After logging in, a session cookie is automatically set and must be included in subsequent requests. Make sure your HTTP client supports cookies.

For testing with tools like Postman or Thunder Client:
1. Enable cookie support in your client
2. Login first to get a session
3. All subsequent requests will use the session cookie automatically
