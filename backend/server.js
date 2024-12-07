const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDatabase = require('./database/connectDB');

// Import Routes
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const profileRoutes = require('./routes/profileRoutes');
const postRoutes=require('./routes/postRoutes') // Import the new profile route

// Configure environment variables
dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });

const app = express();

// Connect to the database
connectDatabase();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Adjust to your frontend URL (React or other frontend)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Allow credentials like cookies
}));

app.use(express.json()); // Middleware to parse incoming JSON requests

// Define Routes
app.use('/api/auth', authRoutes);        // Authentication routes (login, register, etc.)
app.use('/api/admin', adminRoutes);      // Admin-specific routes (admin management)
app.use('/api/auth', profileRoutes);
app.use('/api/posts', postRoutes);
  // Profile-specific routes (user profile, editing, etc.)

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
