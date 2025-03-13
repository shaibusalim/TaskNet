import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  CircularProgress,
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logo from '../../assets/images/logo3.png';
import Image from '../../assets/images/img7.jpg'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address.');
      return;
    }
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Logged in successfully!');
        navigate('/dashboard'); // Redirect to dashboard
      } else {
        toast.error(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-200 text-gray-800 min-h-screen flex">
      {/* Image Section */}
      <div className="w-1/2 hidden md:block">
        <img
          alt="Scenic background with mountains and a clear sky"
          className="h-full w-full object-cover"
          src={Image}
        />
      </div>

      {/* Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md" style={{ boxShadow: '0 4px 14px 0 rgba(128, 90, 213, 0.5)' }}>
          <div className="flex justify-center mb-6">
            <img
              alt="Company Logo"
              className="h-16 w-16"
              src={Logo}
            />
          </div>
          <h2 className="text-3xl font-bold mb-6 text-blue-400">Login</h2>
          <form onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className="mb-4">
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                InputProps={{
                  className: 'bg-gray-100 rounded-lg',
                }}
                InputLabelProps={{
                  className: 'text-gray-500',
                }}
                required
              />
            </div>

            {/* Password Input */}
            <div className="mb-6">
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                InputProps={{
                  className: 'bg-gray-100 rounded-lg',
                }}
                InputLabelProps={{
                  className: 'text-gray-500',
                }}
                required
              />
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              className="w-full bg-blue-500 text-white hover:bg-blue-600 transition duration-300 py-2 rounded-lg"
            >
              {loading ? <CircularProgress size={24} className="text-white" /> : 'Login'}
            </Button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <span className="text-gray-400">Don't have an account? </span>
            <Link to="/signup" className="text-blue-400 hover:text-blue-500 transition duration-300">
              Sign Up
            </Link>
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Login;