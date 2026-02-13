# Testing All APIs with CORS

This document helps you test all API endpoints to ensure CORS and authentication work properly.

## 1. Start Backend Server

```bash
cd car-rental-express-backend
npm start
```

Backend should be running at: `http://localhost:5000`

## 2. Start Frontend Server

```bash
cd car-rental-frontend
npm run dev
```

Frontend should be running at: `http://localhost:3000`

## 3. Test Flow (In Browser)

### Step 1: Register a Customer Account

1. Go to `http://localhost:3000`
2. Click "Register" or go to `http://localhost:3000/register`
3. Fill in the form:
   - **Name**: Test Customer
   - **Email**: customer@test.com
   - **Password**: password123
   - **Register As**: Customer
4. Click "Create Account"
5. You should see "Registration successful! Please login."
6. You'll be redirected to the login page

**Backend API Called**: `POST /api/register`

### Step 2: Login as Customer

1. On the login page
2. Enter credentials:
   - **Email**: customer@test.com
   - **Password**: password123
3. Click "Sign In"
4. You should be redirected to the home page
5. **Check**: Navbar should show "Welcome, Test Customer" and "Logout" button

**Backend APIs Called**: 
- `POST /api/login`
- `GET /api/me` (Navbar checks authentication)

### Step 3: Browse and Book Cars

1. Click "Browse Cars" in the navbar or go to `http://localhost:3000/cars`
2. You should see a list of available cars (15 cars from seeded data)
3. Click "Book Now" on any car
4. In the modal:
   - **Start Date**: 2026-02-20
   - **Number of Days**: 3
5. Click "Confirm Booking"
6. You should see "Car booked successfully!"

**Backend APIs Called**:
- `GET /api/cars` (loads all cars)
- `POST /api/book` (creates booking)

### Step 4: Logout

1. Click "Logout" in the navbar
2. You should be redirected to home page
3. Navbar should show "Login" and "Register" buttons again

**Backend API Called**: `POST /api/logout`

### Step 5: Register an Agency Account

1. Click "Register"
2. Fill in the form:
   - **Name**: Test Agency
   - **Email**: agency@test.com
   - **Password**: password123
   - **Register As**: Rental Agency
3. Click "Create Account"
4. You should see "Registration successful! Please login."

**Backend API Called**: `POST /api/register`

### Step 6: Login as Agency

1. Login with:
   - **Email**: agency@test.com
   - **Password**: password123
2. You should be redirected to home page
3. **Check**: Navbar should show agency menu items: "Your Cars", "Add Car", "Bookings"

**Backend APIs Called**: 
- `POST /api/login`
- `GET /api/me`

### Step 7: Add a Car (Agency)

1. Click "Add Car" in navbar or go to `http://localhost:3000/agency/add-car`
2. Fill in the form:
   - **Car Model**: Tesla Model 3 2024
   - **Vehicle Number**: TS-1234
   - **Seating Capacity**: 5 seats
   - **Rent Per Day (₹)**: 3500
3. Click "Add Car"
4. You should see "Car added successfully! Redirecting..."
5. You'll be redirected to "Your Cars" page

**Backend API Called**: `POST /api/cars`

### Step 8: View Your Cars (Agency)

1. You should see your newly added car
2. Click "Edit Details" on the car
3. Change some values (e.g., rent to 3800)
4. Click "Save"
5. You should see "Car updated successfully!"

**Backend APIs Called**:
- `GET /api/agency/cars` (loads agency's cars)
- `PUT /api/cars/:id` (updates car)

### Step 9: View Bookings (Agency)

1. Click "Bookings" in navbar or go to `http://localhost:3000/agency/bookings`
2. You should see bookings for your cars (if any customers booked them)
3. Shows: Booking ID, Customer Name, Car Model, Start Date, Days

**Backend API Called**: `GET /api/agency/bookings`

## 4. Check Browser DevTools

Open Browser DevTools (F12) → Network tab during testing:

### ✅ What to Look For:

**1. CORS Headers (in Response Headers)**:
```
Access-Control-Allow-Origin: http://localhost:3000
Access-Control-Allow-Credentials: true
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
```

**2. Session Cookie (Application tab → Cookies)**:
```
Name: connect.sid
Domain: localhost
Path: /
HttpOnly: ✓
Secure: (blank in dev, ✓ in production)
SameSite: Lax (dev) or None (production)
```

**3. Request Headers**:
```
Cookie: connect.sid=s%3A...
Content-Type: application/json
```

## 5. Test Production URLs

If deployed to production:

### Frontend (Vercel): 
`https://car-services-azure.vercel.app`

### Backend (Render):
`https://car-services-iafh.onrender.com`

**Check**:
1. Session cookies use `sameSite: none` and `secure: true`
2. CORS origin is `https://car-services-azure.vercel.app`
3. Cookies are sent with `credentials: 'include'`

## 6. Common Issues & Solutions

### ❌ Error: "Not authenticated"

**Cause**: Session cookie not being sent or received

**Solution**:
- Check cookie is set after login (DevTools → Application → Cookies)
- Ensure `credentials: 'include'` in fetch requests
- Verify CORS allows credentials: `credentials: true`

### ❌ CORS Error

**Cause**: Backend not allowing frontend origin

**Solution**:
- Check backend CORS config includes frontend URL
- Verify `credentials: true` in backend CORS config
- In production: use HTTPS for both frontend and backend

### ❌ Error: "Invalid credentials" after login

**Cause**: Wrong email/password or user doesn't exist

**Solution**:
- Try registering first
- Use seeded users from database (check seed.js for emails)

### ❌ Cars page shows empty

**Cause**: No cars in database

**Solution**:
```bash
cd car-rental-express-backend
node seed.js
```

This adds 15 cars, 7 users, and 4 bookings.

### ❌ Session expires quickly

**Cause**: Cookie maxAge too short

**Solution**:
- Current setting: 24 hours
- Adjust in server.js: `maxAge: 24 * 60 * 60 * 1000`

## 7. API Endpoint Summary

All endpoints work with session-based authentication using cookies.

### Public Endpoints (No Auth Required):

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/register` | Register new user |
| POST | `/api/login` | Login user |

### Protected Endpoints (Auth Required):

| Method | Endpoint | Description | Role |
|--------|----------|-------------|------|
| GET | `/api/me` | Get current user | Any |
| POST | `/api/logout` | Logout user | Any |
| GET | `/api/cars` | Get all cars | Any |
| POST | `/api/cars` | Add new car | Agency |
| GET | `/api/agency/cars` | Get agency's cars | Agency |
| PUT | `/api/cars/:id` | Update car | Agency |
| POST | `/api/book` | Book a car | Customer |
| GET | `/api/agency/bookings` | View bookings | Agency |

## 8. Quick Test with cURL

Test backend directly:

```bash
# Register
curl -X POST http://localhost:5000/api/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@test.com","password":"pass123","role":"customer"}' \
  -c cookies.txt

# Login (saves session cookie)
curl -X POST http://localhost:5000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"pass123"}' \
  -c cookies.txt \
  -b cookies.txt

# Check auth (uses saved cookie)
curl http://localhost:5000/api/me \
  -b cookies.txt

# Get all cars
curl http://localhost:5000/api/cars \
  -b cookies.txt
```

## Summary Checklist

- ✅ Backend running on port 5000
- ✅ Frontend running on port 3000
- ✅ CORS configured with credentials: true
- ✅ Session cookies working
- ✅ Register → Login → Browse Cars → Book flow works
- ✅ Agency flow: Login → Add Car → View Cars → Edit Car
- ✅ Navbar shows correct user info
- ✅ Logout clears session
- ✅ All API calls include credentials
- ✅ Response status codes checked

All APIs should now work perfectly with CORS! 🎉
