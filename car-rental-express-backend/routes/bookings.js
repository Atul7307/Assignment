const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Car = require('../models/Car');
const { requireRole } = require('../middleware/auth');
const { validateRequired, sanitize, validateDate } = require('../utils/validators');

// Book a car (customer only)
router.post('/', requireRole('customer'), async (req, res) => {
  try {
    const data = req.body;
    
    // Validate required fields
    const errors = validateRequired(data, ['car_id', 'start_date', 'days']);
    if (errors.length > 0) {
      return res.status(400).json({ error: errors[0] });
    }
    
    const carId = data.car_id;
    const customerId = req.session.user_id;
    const startDate = sanitize(data.start_date);
    const days = parseInt(data.days);
    
    // Validate days
    if (isNaN(days) || days <= 0) {
      return res.status(400).json({ error: 'Invalid number of days' });
    }
    
    // Validate date format
    if (!validateDate(startDate)) {
      return res.status(400).json({ error: 'Invalid date format. Use YYYY-MM-DD' });
    }
    
    // Check if car exists
    const car = await Car.findById(carId);
    
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }
    
    // Create booking
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

// Get agency's bookings (agency only)
router.get('/agency', requireRole('agency'), async (req, res) => {
  try {
    const agencyId = req.session.user_id;
    
    // First get all cars owned by this agency
    const agencyCars = await Car.find({ agency_id: agencyId });
    const carIds = agencyCars.map(car => car._id);
    
    // Then get all bookings for these cars
    const bookings = await Booking.find({ car_id: { $in: carIds } })
      .populate('customer_id', 'name')
      .populate('car_id', 'model')
      .sort({ start_date: -1 });
    
    // Format the response to match PHP backend format
    const formattedBookings = bookings.map(booking => ({
      id: booking._id,
      car_id: booking.car_id._id,
      customer_id: booking.customer_id._id,
      start_date: booking.start_date,
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
