import React, { useState } from 'react';


import { FaLock, FaEnvelope } from 'react-icons/fa'; // Importing icons for better UI
import './Login.css'; // Import CSS file for styling

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let errors = {};

    // Basic Validation
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }

    if (!formData.password.trim()) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }

    if (Object.keys(errors).length === 0) {
      console.log('Form data:', formData); // Handle login (e.g., API call)
      alert('Logged in successfully!');
      setFormData({
        email: '',
        password: '',
      });
      setFormErrors({
        email: '',
        password: '',
      });
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <div className="container">
      <h2>LOGIN</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <div className="input-container">
            <FaEnvelope className="icon" />
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          {formErrors.email && <span>{formErrors.email}</span>}
        </div>
        <div>
          <label>Password:</label>
          <div className="input-container">
            <FaLock className="icon" />
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          {formErrors.password && <span>{formErrors.password}</span>}
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
