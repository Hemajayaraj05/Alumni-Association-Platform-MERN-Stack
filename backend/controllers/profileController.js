const mongoose = require('mongoose');
const User = require('../models/Registermodel'); // Ensure this is the correct path to your model

// Update Profile
exports.updateProfile = async (req, res) => {
  const { id } = req.params; // User ID from request parameters
  const updatedData = req.body; // Updated data from request body

  try {
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    // Find the user by ID and update their profile
    const user = await User.findByIdAndUpdate(id, updatedData, { 
      new: true, 
      runValidators: true 
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send updated user data back to the client
    res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (error) {
    console.error("Error during profile update:", error);
    res.status(500).json({ message: 'Error updating profile', error: error.message || error });
  }
};
