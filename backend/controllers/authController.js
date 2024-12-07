const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const registerModel = require('../models/Registermodel'); // Ensure the path is correct
const dotenv = require('dotenv');
// Registration controller
exports.registerUser = async (req, res) => {
  try {
    const { name, email, phone, yearOfPassing, currentlyWorking, yearOfJoining, departmentCode, rollNumber, registrationNumber, password } = req.body;

    // Hash password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new registerModel({
      name,
      email,
      phone,
      yearOfPassing,
      currentlyWorking,
      yearOfJoining,
      departmentCode,
      rollNumber,
      registrationNumber,
      password: hashedPassword,
    });

    await user.save(); // Save user to DB
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Registration failed' });
  }
};

// Login controller
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await registerModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send the token and user details
    res.status(200).json({
      token,
      _id: user._id,
      userName: user.name,
      userRole: user.role || 'user', // Default to 'user' if role is not defined
      profileImage: user.profileImage || 'default-profile.jpg', // Default image if not defined
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};