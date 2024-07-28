import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignupPage.css';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(''); // Added state for success message
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Validate form data
  const validate = () => {
    const formErrors = {};
    if (!formData.username) formErrors.username = 'Username is required';
    if (!formData.password) formErrors.password = 'Password is required';
    else if (formData.password.length < 6) formErrors.password = 'Password must be at least 6 characters long';
    return formErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          f_userName: formData.username,
          f_Pwd: formData.password,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Something went wrong');
      }

      setSuccessMessage('User created successfully!'); // Set success message on successful signup
      setFormData({ username: '', password: '' }); // Clear form data
      setErrors({}); // Clear errors

      // Optionally redirect after a delay
      setTimeout(() => navigate('/'), 2000); // Redirect to login page after 2 seconds
    } catch (error) {
      console.error('Signup error:', error);
      setErrors({ general: 'An error occurred during signup. Please try again.' });
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      {errors.general && <p className="error">{errors.general}</p>}
      {successMessage && <p className="success">{successMessage}</p>} {/* Display success message */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          {errors.username && <p className="error">{errors.username}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupPage;
