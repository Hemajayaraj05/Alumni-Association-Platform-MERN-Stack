import React, { useState } from 'react';
import './styles/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaLock, FaEnvelope } from 'react-icons/fa';
import axios from 'axios';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [serverMessage, setServerMessage] = useState('');
  const navigate = useNavigate();

  // Handle form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate form inputs
  const validateForm = () => {
    const errors = {};
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Invalid email format';
    }

    if (!formData.password.trim()) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }

    return errors;
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form inputs
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Clear previous errors and messages
    setFormErrors({});
    setServerMessage('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);

      // Check if we received the required data
      if (response.data.token) {
        // Store user details in localStorage
        localStorage.setItem('_id', response.data._id);
        localStorage.setItem('userName', response.data.userName);
        localStorage.setItem('role', response.data.userRole);
        localStorage.setItem('profileImage', response.data.profileImage);

        // Redirect to the main page after login
        navigate('/main');
      } else {
        setServerMessage(response.data.message || 'Login failed');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Server error occurred';
      setServerMessage(errorMessage);
    }
  };

  return (
    <div className="loginbody">
      <div className="logincontainer">
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
            {formErrors.email && <span className="error">{formErrors.email}</span>}
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
            {formErrors.password && <span className="error">{formErrors.password}</span>}
          </div>
          {serverMessage && <p className="server-message">{serverMessage}</p>}
          <p>Don't have an account? <Link to='/register'>Sign Up</Link></p>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
