const mongoose = require('mongoose');
const registerModel = require('../models/Registermodel'); // Ensure correct path

// Update Profile
exports.updateProfile = async (req, res) => {
  const { id } = req.params; // Get user ID from the URL params

  // Validate if the id is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  const { name, company, mentorStatus, skills, githubLink, codingPlatformLink } = req.body;

  try {
    // Find the user by ID and update their profile
    const updatedUser = await registerModel.findByIdAndUpdate(
      id,
      {
        name,
        company,
        mentorStatus,
        skills,
        githubLink,
        codingPlatformLink,
      },
      { new: true } // Returns the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
