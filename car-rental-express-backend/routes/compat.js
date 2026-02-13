const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/User');
const Booking = require('../models/Booking');
const Car = require('../models/Car');
const { requireAuth, requireRole } = require('../middleware/auth');
const { validateRequired, sanitize, validateEmail, validateDate } = require('../utils/validators');

// Backward compatibility routes for frontend
// These match the PHP backend API structure

// Login route (compatible with frontend calling /api/login)
router.post('/login', async (req, res) => {
  try {
    const data = req.body;
    
    const errors = validateRequired(data, ['email', 'password']);
    if (errors.length > 0) {
      return res.status(400).json({ error: errors[0] });
    }
    
    const email = sanitize(data.email);
    const password = data.password;
    
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    req.session.user_id = user._id.toString();
    req.session.role = user.role;
    req.session.name = user.name;
    
    res.json({
      status: 'login success',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
    
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
});

// Register route (compatible with frontend calling /api/register)
router.post('/register', async (req, res) => {
  try {
    const data = req.body;
    
    const errors = validateRequired(data, ['name', 'email', 'password', 'role']);
    if (errors.length > 0) {
      return res.status(400).json({ error: errors[0] });
    }
    
    const name = sanitize(data.name);
    const email = sanitize(data.email);
    const password = data.password;
    const role = sanitize(data.role);
    
    if (!validateEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }
    
    if (!['customer', 'agency'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role. Must be customer or agency' });
    }
    
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });
    
    res.status(201).json({
      status: 'registered',
      message: 'Registration successful'
    });
    
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
});

// Get current user (compatible with frontend calling /api/me)
router.get('/me', requireAuth, async (req, res) => {
  try {
    const userId = req.session.user_id;
    const user = await User.findById(userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
    
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
});

// Logout (compatible with frontend calling /api/logout)
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.json({ status: 'logged out' });
  });
});

// Book route (compatible with frontend calling /api/book)
router.post('/book', requireRole('customer'), async (req, res) => {
  try {
    const data = req.body;
    
    const errors = validateRequired(data, ['car_id', 'start_date', 'days']);
    if (errors.length > 0) {
      return res.status(400).json({ error: errors[0] });
    }
    
    const carId = data.car_id;
    const customerId = req.session.user_id;
    const startDate = sanitize(data.start_date);
    const days = parseInt(data.days);
    
    if (isNaN(days) || days <= 0) {
      return res.status(400).json({ error: 'Invalid number of days' });
    }
    
    if (!validateDate(startDate)) {
      return res.status(400).json({ error: 'Invalid date format. Use YYYY-MM-DD' });
    }
    
    const car = await Car.findById(carId);
    
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }
    
    await Booking.create({
      car_id: carId,
      customer_id: customerId,
      start_date: new Date(startDate),
      days
    });
    
    res.status(201).json({ status: 'car booked' });
    
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
});

// Get agency's cars (compatible with frontend calling /api/agency/cars)
router.get('/agency/cars', requireRole('agency'), async (req, res) => {
  try {
    const agencyId = req.session.user_id;
    const cars = await Car.find({ agency_id: agencyId });
    
    // Transform for frontend compatibility
    const transformedCars = cars.map(car => ({
      id: car._id,
      _id: car._id,
      model: car.model,
      vehicle_number: car.vehicle_number,
      seating_capacity: car.seating_capacity,
      rent_per_day: car.rent_per_day,
      agency_id: car.agency_id,
      createdAt: car.createdAt,
      updatedAt: car.updatedAt
    }));
    
    res.json(transformedCars);
  } catch (error) {
    console.error('Get agency cars error:', error);
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
});

// Get agency's bookings (compatible with frontend calling /api/agency/bookings)
router.get('/agency/bookings', requireRole('agency'), async (req, res) => {
  try {
    const agencyId = req.session.user_id;
    
    const agencyCars = await Car.find({ agency_id: agencyId });
    const carIds = agencyCars.map(car => car._id);
    
    const bookings = await Booking.find({ car_id: { $in: carIds } })
      .populate('customer_id', 'name')
      .populate('car_id', 'model')
      .sort({ start_date: -1 });
    
    const formattedBookings = bookings.map(booking => ({
      id: booking._id,
      car_id: booking.car_id._id,
      customer_id: booking.customer_id._id,
      start_date: booking.start_date.toISOString().split('T')[0],
      days: booking.days,
      created_at: booking.createdAt || booking.created_at,
      customer_name: booking.customer_id.name,
      model: booking.car_id.model
    }));
    
    res.json(formattedBookings);
    
  } catch (error) {
    console.error('Get agency bookings error:', error);
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
});

module.exports = router;
