const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

// Configuration
const { JWT_SECRET } = process.env;

const port = process.env.PORT || 5000; // Used environment variable for port

// Initialize Express app
const app = express();

// Middleware
app.use(morgan('dev')); // HTTP request logger
app.use(cors({
  origin: 'http://localhost:3000', // Replace with frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json()); // Parse JSON bodies

app.use(express.json({ limit: '10mb' })); // Increase JSON payload limit
app.use(express.urlencoded({ limit: '10mb', extended: true })); // Increase URL-encoded payload limit


// Import Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/userRoutes');
const employeeRoutes = require('./routes/employeeRoutes');

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/employeeDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Route Middleware
app.use('/api/auth', authRoutes); // Authentication routes (e.g., register, login)
app.use('/api/users', userRoutes); // User management routes
app.use('/api/employees', employeeRoutes); // Employee management routes

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    // Additional error details can be included based on the environment
    ...(process.env.NODE_ENV === 'development' && { error: err.stack }),
  });
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
