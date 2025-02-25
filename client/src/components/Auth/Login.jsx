import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import Logo from "../../assets/images/logo3.png"

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Logged in successfully!');
    console.log('Login Data:', { email, password });
  };

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen flex">
      <div className="w-1/2 hidden md:block">
        <img
          alt="A placeholder image showing a scenic background with mountains and a clear sky"
          className="h-full w-full object-cover"
          src="https://storage.googleapis.com/a1aa/image/iXCbr5GONz5FPUFoJW40BdcWnToeAjjA1sNi49Jbv_s.jpg"
        />
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="bg-#02021b-800 p-8 rounded-lg shadow-lg w-full max-w-md" style={{ boxShadow: '0 4px 14px 0 rgba(128, 90, 213, 0.5)' }}>
          <div className="flex justify-center mb-6">
            <img
              alt="Company logo placeholder"
              className="h-16 w-16"
              src={Logo}
            />
          </div>
          <h2 className="text-3xl font-bold mb-6 text-blue-400">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-400 font-medium">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input w-full px-4 py-2 border rounded-lg focus:outline-none bg-gray-700 text-gray-200"
                placeholder="john.doe@example.com"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-400 font-medium">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input w-full px-4 py-2 border rounded-lg focus:outline-none bg-gray-700 text-gray-200"
                placeholder="********"
                required
              />
            </div>
            <button
              type="submit"
              className="form-button bg-blue-500 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-600 transition duration-300"
            >
              Login
            </button>
          </form>
          <div className="mt-6 text-center">
            <span className="text-gray-400">Don't have an account? </span>
            <Link to="/signup" className="text-blue-400 hover:text-blue-500 transition duration-300">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;