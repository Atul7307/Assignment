const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  agency_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  model: {
    type: String,
    required: true,
    trim: true
  },
  vehicle_number: {
    type: String,
    required: true,
    trim: true
  },
  seating_capacity: {
    type: Number,
    required: true,
    min: 1
  },
  rent_per_day: {
    type: Number,
    required: true,
    min: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Car', carSchema);
