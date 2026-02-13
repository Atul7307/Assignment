const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/User');
const { requireAuth } = require('../middleware/auth');
const { validateRequired, sanitize, validateEmail } = require('../utils/validators');

// Register
router.post('/register', async (req, res) => {
  try {
    const data = req.body;
    
    // Validate required fields
    const errors = validateRequired(data, ['name', 'email', 'password', 'role']);
    if (errors.length > 0) {
      return res.status(400).json({ error: errors[0] });
    }
    
    // Sanitize input
    const name = sanitize(data.name);
    const email = sanitize(data.email);
    const password = data.password;
    const role = sanitize(data.role);
    
    // Validate email
    if (!validateEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }
    
    // Validate role
    if (!['customer', 'agency'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role. Must be customer or agency' });
    }
    
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
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

// Login
router.post('/login', async (req, res) => {
  try {
    const data = req.body;
    
    // Validate required fields
    const errors = validateRequired(data, ['email', 'password']);
    if (errors.length > 0) {
      return res.status(400).json({ error: errors[0] });
    }
    
    const email = sanitize(data.email);
    const password = data.password;
    
    // Find user by email
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Set session data
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

// Get current user
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

// Logout
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.json({ status: 'logged out' });
  });
});

module.exports = router;
