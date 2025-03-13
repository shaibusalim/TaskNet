import React, { useState } from 'react';
import axios from 'axios';
import Logo from '../../assets/images/logo3.png';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Avatar,
  CircularProgress,
} from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    location: '',
    profilePicture: null,
    termsAccepted: false,
    skills: [],
    experienceLevel: '',
    availability: '',
    bio: '',
    taskPreferences: [],
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    });
  };

  const handleMultiSelect = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateBasicInfo = () => {
    const { fullName, email, password, confirmPassword, location, termsAccepted } = formData;

    if (!fullName.trim()) {
      toast.error('Please enter your full name.');
      return false;
    }

    if (!email.trim()) {
      toast.error('Please enter your email address.');
      return false;
    }

    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address.');
      return false;
    }

    if (!password.trim()) {
      toast.error('Please enter a password.');
      return false;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long.');
      return false;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return false;
    }

    if (!location.trim()) {
      toast.error('Please enter your location.');
      return false;
    }

    if (!role) {
      toast.error('Please select a role.');
      return false;
    }

    if (!termsAccepted) {
      toast.error('Please accept the Terms & Conditions and Privacy Policy.');
      return false;
    }

    return true;
  };

  const nextStep = () => {
    if (step === 1 && !validateBasicInfo()) {
      return; // Do not proceed if validation fails
    }
    console.log('Current Step:', step); // Debugging log
    setStep(step + 1); // Proceed to the next step
  };

  const prevStep = () => setStep(step - 1);

  const submitForm = async () => {
    setLoading(true);
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === 'skills' || key === 'taskPreferences') {
          formDataToSend.append(key, JSON.stringify(formData[key]));
        } else if (key === 'profilePicture' && formData[key]) {
          formDataToSend.append(key, formData[key]);
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });
      formDataToSend.append('role', role);

      const response = await axios.post('http://localhost:5000/api/auth/signup', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        toast.success('User created successfully. Please check your email for OTP.');
        setStep(3); // Move to OTP verification step
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Error submitting form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/auth/verify-otp', { email: formData.email, otp });
      if (response.status === 200) {
        toast.success('OTP verified successfully. You will be redirected to the login page shortly.');
        
        // Add a delay of 3 seconds before redirecting
        setTimeout(() => {
          navigate('/login'); // Redirect to login page
        }, 3000); // 3 seconds delay
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      toast.error('Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-200 text-gray-800 min-h-screen flex">
      {/* Image Section */}
      <div className="w-1/2 hidden md:block">
        <img
          alt="A placeholder image showing a scenic background with mountains and a clear sky"
          className="h-full w-full object-cover"
          src="https://storage.googleapis.com/a1aa/image/iXCbr5GONz5FPUFoJW40BdcWnToeAjjA1sNi49Jbv_s.jpg"
        />
      </div>

      {/* Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md" style={{ boxShadow: '0 4px 14px 0 rgba(128, 90, 213, 0.5)' }}>
          <div className="flex justify-center mb-6">
            <img
              alt="Company Logo"
              className="h-16 w-16"
              src={Logo}
            />
          </div>
          <Stepper activeStep={step - 1} alternativeLabel className="mb-8">
            <Step>
              <StepLabel className="text-blue-400">Basic Info</StepLabel>
            </Step>
            <Step>
              <StepLabel className="text-blue-400">Additional Info</StepLabel>
            </Step>
            <Step>
              <StepLabel className="text-blue-400">OTP Verification</StepLabel>
            </Step>
          </Stepper>

          {/* Step 1: Basic Information */}
          {step === 1 && (
            <div className="space-y-4">
              <Typography variant="h4" className="text-blue-400 mb-6 font-bold">
                Basic Information
              </Typography>
              <TextField
                fullWidth
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="mb-4"
                variant="outlined"
                InputProps={{ className: 'bg-gray-100 rounded-lg' }}
                InputLabelProps={{ className: 'text-gray-500' }}
              />
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mb-4"
                variant="outlined"
                InputProps={{ className: 'bg-gray-100 rounded-lg' }}
                InputLabelProps={{ className: 'text-gray-500' }}
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="mb-4"
                variant="outlined"
                InputProps={{ className: 'bg-gray-100 rounded-lg' }}
                InputLabelProps={{ className: 'text-gray-500' }}
              />
              <TextField
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mb-4"
                variant="outlined"
                InputProps={{ className: 'bg-gray-100 rounded-lg' }}
                InputLabelProps={{ className: 'text-gray-500' }}
              />
              <TextField
                fullWidth
                label="Location / Address"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="mb-4"
                variant="outlined"
                InputProps={{ className: 'bg-gray-100 rounded-lg' }}
                InputLabelProps={{ className: 'text-gray-500' }}
              />
              <div className="mb-4">
                <input
                  type="file"
                  id="profilePicture"
                  name="profilePicture"
                  onChange={handleChange}
                  className="hidden"
                />
                <label htmlFor="profilePicture" className="flex items-center cursor-pointer">
                  <Button
                    variant="outlined"
                    component="span"
                    startIcon={<CloudUpload />}
                    className="text-blue-400 border-blue-400 hover:bg-blue-50"
                  >
                    Upload Profile Picture
                  </Button>
                  {formData.profilePicture && (
                    <Avatar src={URL.createObjectURL(formData.profilePicture)} className="ml-4" />
                  )}
                </label>
              </div>
              <Select
                fullWidth
                label="Role"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="mb-4 bg-gray-100 rounded-lg"
                variant="outlined"
                InputProps={{ className: 'text-gray-700' }}
                InputLabelProps={{ className: 'text-gray-500' }}
              >
                <MenuItem value="">Select Role</MenuItem>
                <MenuItem value="taskPoster">Task Poster</MenuItem>
                <MenuItem value="taskHelper">Task Helper</MenuItem>
                <MenuItem value="both">Both</MenuItem>
              </Select>
              <FormControlLabel
                control={
                  <Checkbox
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleChange}
                    className="text-blue-400"
                  />
                }
                label="I accept the Terms & Conditions and Privacy Policy"
                className="text-gray-500"
              />
              <div className="flex justify-between mt-6">
                <Button
                  variant="outlined"
                  onClick={prevStep}
                  disabled
                  className="text-gray-500 border-gray-300 hover:bg-gray-50"
                >
                  Previous
                </Button>
                <Button
                  variant="contained"
                  onClick={nextStep}
                  className="bg-blue-400 text-white hover:bg-blue-500"
                >
                  Next
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Additional Information */}
          {step === 2 && (
            <div className="space-y-4">
              <Typography variant="h4" className="text-blue-400 mb-6 font-bold">
                Additional Information
              </Typography>
              {(role === 'taskHelper' || role === 'both') && (
                <>
                  <Select
                    fullWidth
                    label="Skills/Expertise"
                    name="skills"
                    multiple
                    value={formData.skills}
                    onChange={handleMultiSelect} // Use handleMultiSelect here
                    className="mb-4 bg-gray-100 rounded-lg"
                    variant="outlined"
                    InputProps={{ className: 'text-gray-700' }}
                    InputLabelProps={{ className: 'text-gray-500' }}
                  >
                    <MenuItem value="plumbing">Plumbing</MenuItem>
                    <MenuItem value="carpentry">Carpentry</MenuItem>
                    <MenuItem value="tutoring">Tutoring</MenuItem>
                    <MenuItem value="cleaning">Cleaning</MenuItem>
                  </Select>
                  <TextField
                    fullWidth
                    label="Experience Level (Optional)"
                    name="experienceLevel"
                    value={formData.experienceLevel}
                    onChange={handleChange}
                    className="mb-4"
                    variant="outlined"
                    InputProps={{ className: 'bg-gray-100 rounded-lg' }}
                    InputLabelProps={{ className: 'text-gray-500' }}
                  />
                  <TextField
                    fullWidth
                    label="Availability"
                    name="availability"
                    value={formData.availability}
                    onChange={handleChange}
                    className="mb-4"
                    variant="outlined"
                    InputProps={{ className: 'bg-gray-100 rounded-lg' }}
                    InputLabelProps={{ className: 'text-gray-500' }}
                  />
                </>
              )}
              {(role === 'taskPoster' || role === 'both') && (
                <>
                  <TextField
                    fullWidth
                    label="Short Bio or Description (Optional)"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    className="mb-4"
                    variant="outlined"
                    multiline
                    rows={4}
                    InputProps={{ className: 'bg-gray-100 rounded-lg' }}
                    InputLabelProps={{ className: 'text-gray-500' }}
                  />
                  <Select
                    fullWidth
                    label="Task Preferences (Optional)"
                    name="taskPreferences"
                    multiple
                    value={formData.taskPreferences}
                    onChange={handleMultiSelect} // Use handleMultiSelect here
                    className="mb-4 bg-gray-100 rounded-lg"
                    variant="outlined"
                    InputProps={{ className: 'text-gray-700' }}
                    InputLabelProps={{ className: 'text-gray-500' }}
                  >
                    <MenuItem value="homeRepair">Home Repair</MenuItem>
                    <MenuItem value="tutoring">Tutoring</MenuItem>
                    <MenuItem value="cleaning">Cleaning</MenuItem>
                    <MenuItem value="gardening">Gardening</MenuItem>
                  </Select>
                </>
              )}
              <div className="flex justify-between mt-6">
                <Button
                  variant="outlined"
                  onClick={prevStep}
                  className="text-gray-500 border-gray-300 hover:bg-gray-50"
                >
                  Previous
                </Button>
                <Button
                  variant="contained"
                  onClick={submitForm}
                  disabled={loading}
                  className="bg-blue-400 text-white hover:bg-blue-500"
                >
                  {loading ? <CircularProgress size={24} className="text-white" /> : 'Submit'}
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: OTP Verification */}
          {step === 3 && (
            <div className="space-y-4">
              <Typography variant="h4" className="text-blue-400 mb-6 font-bold">
                OTP Verification
              </Typography>
              <TextField
                fullWidth
                label="Enter OTP"
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="mb-4"
                variant="outlined"
                InputProps={{ className: 'bg-gray-100 rounded-lg' }}
                InputLabelProps={{ className: 'text-gray-500' }}
              />
              <Button
                variant="contained"
                onClick={verifyOtp}
                disabled={loading}
                className="bg-blue-400 text-white hover:bg-blue-500"
              >
                {loading ? <CircularProgress size={24} className="text-white" /> : 'Verify OTP'}
              </Button>
            </div>
          )}
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

export default SignUp;