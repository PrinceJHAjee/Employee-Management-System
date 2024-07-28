const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

// Register
router.post('/register', async (req, res) => {
  const { f_userName, f_Pwd } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(f_Pwd, 10);
    const user = new User({ f_userName, f_Pwd: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { f_userName, f_Pwd } = req.body;
  try {
    const user = await User.findOne({ f_userName });
    if (!user || !(await bcrypt.compare(f_Pwd, user.f_Pwd))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
