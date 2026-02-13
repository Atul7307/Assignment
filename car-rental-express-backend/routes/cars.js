const express = require('express');
const router = express.Router();
const Car = require('../models/Car');
const { requireRole } = require('../middleware/auth');
const { validateRequired, sanitize } = require('../utils/validators');

// Get all cars
router.get('/', async (req, res) => {
  try {
    const cars = await Car.find().populate('agency_id', 'name email');
    // Transform MongoDB documents to include 'id' field for frontend compatibility
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
    console.error('Get cars error:', error);
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
});

// Create new car (agency only)
router.post('/', requireRole('agency'), async (req, res) => {
  try {
    const data = req.body;
    
    // Validate required fields
    const errors = validateRequired(data, ['model', 'vehicle_number', 'seating_capacity', 'rent_per_day']);
    if (errors.length > 0) {
      return res.status(400).json({ error: errors[0] });
    }
    
    const agencyId = req.session.user_id;
    const model = sanitize(data.model);
    const vehicleNumber = sanitize(data.vehicle_number);
    const seatingCapacity = parseInt(data.seating_capacity);
    const rentPerDay = parseInt(data.rent_per_day);
    
    // Validate numbers
    if (isNaN(seatingCapacity) || seatingCapacity <= 0) {
      return res.status(400).json({ error: 'Invalid seating capacity' });
    }
    if (isNaN(rentPerDay) || rentPerDay <= 0) {
      return res.status(400).json({ error: 'Invalid rent per day' });
    }
    
    await Car.create({
      agency_id: agencyId,
      model,
      vehicle_number: vehicleNumber,
      seating_capacity: seatingCapacity,
      rent_per_day: rentPerDay
    });
    
    res.status(201).json({ status: 'car added' });
    
  } catch (error) {
    console.error('Create car error:', error);
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
});

// Get agency's cars (agency only)
router.get('/agency', requireRole('agency'), async (req, res) => {
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

// Update car (agency only)
router.put('/:id', requireRole('agency'), async (req, res) => {
  try {
    const carId = req.params.id;
    const agencyId = req.session.user_id;
    
    // Check if car exists and belongs to the agency
    const car = await Car.findById(carId);
    
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }
    
    if (car.agency_id.toString() !== agencyId) {
      return res.status(403).json({ error: 'You can edit only your cars' });
    }
    
    const data = req.body;
    
    // Validate required fields
    const errors = validateRequired(data, ['model', 'vehicle_number', 'seating_capacity', 'rent_per_day']);
    if (errors.length > 0) {
      return res.status(400).json({ error: errors[0] });
    }
    
    const model = sanitize(data.model);
    const vehicleNumber = sanitize(data.vehicle_number);
    const seatingCapacity = parseInt(data.seating_capacity);
    const rentPerDay = parseInt(data.rent_per_day);
    
    // Validate numbers
    if (isNaN(seatingCapacity) || seatingCapacity <= 0) {
      return res.status(400).json({ error: 'Invalid seating capacity' });
    }
    if (isNaN(rentPerDay) || rentPerDay <= 0) {
      return res.status(400).json({ error: 'Invalid rent per day' });
    }
    
    await Car.findByIdAndUpdate(carId, {
      model,
      vehicle_number: vehicleNumber,
      seating_capacity: seatingCapacity,
      rent_per_day: rentPerDay
    });
    
    res.json({ status: 'car updated' });
    
  } catch (error) {
    console.error('Update car error:', error);
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
});

module.exports = router;
