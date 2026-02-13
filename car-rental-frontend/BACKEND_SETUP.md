# Frontend Setup Instructions

## 🔧 Quick Setup

Your frontend is now configured to work with the Core PHP backend!

### Local Development

#### Option 1: Using Core PHP Backend (Recommended)

**1. Start XAMPP/WAMP**
   - Start Apache and MySQL

**2. Verify Backend is Running**
   ```
   http://localhost/car-rental-core-php/
   ```

**3. Frontend is Already Configured!**
   - No changes needed, it's already pointing to Core PHP backend

**4. Start Frontend**
   ```bash
   npm run dev
   ```

**5. Access**
   ```
   http://localhost:3000
   ```

---

#### Option 2: Using CodeIgniter Backend

**1. Edit `.env.local`**
   ```env
   # Comment out Core PHP
   # NEXT_PUBLIC_API_URL=http://localhost/car-rental-core-php

   # Uncomment CodeIgniter
   NEXT_PUBLIC_API_URL=http://localhost:8080
   ```

**2. Start CodeIgniter Backend**
   ```bash
   cd car-rental-backend
   php spark serve
   ```

**3. Start Frontend**
   ```bash
   npm run dev
   ```

---

### Production (InfinityFree)

**1. Update `.env.local` for Production**
   ```env
   # Comment out local URLs
   # NEXT_PUBLIC_API_URL=http://localhost/car-rental-core-php

   # Use InfinityFree URL
   NEXT_PUBLIC_API_URL=https://car-rental-api.rf.gd
   ```

**2. Update CORS on InfinityFree**
   
   Edit `config/cors.php` on your InfinityFree server and add your frontend URL:
   ```php
   $allowedOrigins = [
       'http://localhost:3000',
       'https://your-frontend.vercel.app', // Add your Vercel URL
   ];
   ```

**3. Deploy Frontend to Vercel/Netlify**
   ```bash
   # Vercel
   vercel

   # Or Netlify
   netlify deploy
   ```

---

## 🧪 Testing

### Test Registration
1. Go to: `http://localhost:3000/register`
2. Fill in details:
   ```
   Name: Test User
   Email: test@example.com
   Password: 123456
   Role: customer
   ```
3. Click Register

### Test Login
1. Go to: `http://localhost:3000/login`
2. Login with:
   ```
   Email: test@example.com
   Password: 123456
   ```

### Test Sample Users (If you imported sample_data.sql)
```
Customer:
Email: customer@example.com
Password: 123456

Agency:
Email: agency@example.com
Password: 123456
```

---

## 🔍 Verify API Connection

The frontend should now:
- ✅ Register users
- ✅ Login/Logout
- ✅ View cars
- ✅ Book cars (customer)
- ✅ Manage cars (agency)
- ✅ View bookings (agency)

---

## 🐛 Troubleshooting

### CORS Errors
**Solution**: Make sure `http://localhost:3000` is in `config/cors.php` allowedOrigins array

### Cannot Connect to Backend
**Solution**: Verify backend is running at `http://localhost/car-rental-core-php/`

### Session Not Working
**Solution**: Check that `credentials: 'include'` is in all fetch requests (already configured)

### 404 Errors
**Solution**: Make sure `.htaccess` is in the `car-rental-core-php` folder

---

## 🎯 Current Configuration

**Frontend**: Your Next.js app  
**Backend**: Core PHP (http://localhost/car-rental-core-php/)  
**Database**: MySQL (car_rental)  
**Sessions**: Cookie-based authentication  

All API endpoints from your CodeIgniter backend are replicated in the Core PHP backend with the same URLs!

---

**You're all set! Start both servers and test the full application! 🚀**
