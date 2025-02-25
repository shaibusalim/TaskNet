import React, { useState } from 'react';
import axios from 'axios';

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState('');
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

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    });
  };

  const handleMultiSelect = (e) => {
    const { name, options } = e.target;
    const selectedValues = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setFormData({ ...formData, [name]: selectedValues });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const submitForm = async () => {
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

      const response = await axios.post('http://localhost:5000/api/auth/signup', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        alert('User created successfully.');
        // Redirect to login or dashboard
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
    }
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
              src="https://storage.googleapis.com/a1aa/image/NXm1soGSu_C6UZEemPEZ-2gm0PHc6ZVX6c85lMzrCKM.jpg"
            />
          </div>
          <div className="step-indicator mb-8 flex justify-between">
            {[1, 2].map((s) => (
              <div
                key={s}
                id={`indicator-${s}`}
                className={`w-20% text-center p-2 border-b-2 ${step === s ? 'border-blue-500 font-bold text-blue-500' : 'border-gray-600'}`}
              >
                Step {s}
              </div>
            ))}
          </div>

          {step === 1 && (
            <div id="step-1" className="step">
              <h2 className="text-3xl font-bold mb-6 text-blue-400">Basic Information</h2>
              <form id="form-step-1">
                <div className="mb-4">
                  <label className="block text-gray-400 font-medium">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="form-input w-full px-4 py-2 border rounded-lg focus:outline-none bg-gray-700 text-gray-200"
                    placeholder="John Doe"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-400 font-medium">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input w-full px-4 py-2 border rounded-lg focus:outline-none bg-gray-700 text-gray-200"
                    placeholder="john.doe@example.com"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-400 font-medium">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="form-input w-full px-4 py-2 border rounded-lg focus:outline-none bg-gray-700 text-gray-200"
                    placeholder="********"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-400 font-medium">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="form-input w-full px-4 py-2 border rounded-lg focus:outline-none bg-gray-700 text-gray-200"
                    placeholder="********"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-400 font-medium">Location / Address</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="form-input w-full px-4 py-2 border rounded-lg focus:outline-none bg-gray-700 text-gray-200"
                    placeholder="123 Main St, New York, NY"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-400 font-medium">Profile Picture (Optional)</label>
                  <input
                    type="file"
                    name="profilePicture"
                    onChange={handleChange}
                    className="form-input w-full px-4 py-2 border rounded-lg focus:outline-none bg-gray-700 text-gray-200"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-400 font-medium">Role</label>
                  <select
                    name="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="form-input w-full px-4 py-2 border rounded-lg focus:outline-none bg-gray-700 text-gray-200"
                  >
                    <option value="">Select Role</option>
                    <option value="taskPoster">Task Poster</option>
                    <option value="taskHelper">Task Helper</option>
                    <option value="both">Both</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="flex items-center text-gray-400 font-medium">
                    <input
                      type="checkbox"
                      name="termsAccepted"
                      checked={formData.termsAccepted}
                      onChange={handleChange}
                      className="form-checkbox"
                    />
                    <span className="ml-2">I accept the Terms & Conditions and Privacy Policy</span>
                  </label>
                </div>
                <div className="flex justify-between">
                  <button
                    type="button"
                    className="form-button bg-gray-500 text-white py-2 px-4 rounded-lg"
                    onClick={prevStep}
                    disabled
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    className="form-button bg-blue-500 text-white py-2 px-4 rounded-lg"
                    onClick={nextStep}
                  >
                    Next
                  </button>
                </div>
              </form>
            </div>
          )}

          {step === 2 && (
            <div id="step-2" className="step">
              <h2 className="text-3xl font-bold mb-6 text-blue-400">Additional Information</h2>
              <form id="form-step-2">
                {role === 'taskHelper' || role === 'both' ? (
                  <>
                    <div className="mb-4">
                      <label className="block text-gray-400 font-medium">Skills/Expertise</label>
                      <select
                        name="skills"
                        multiple
                        value={formData.skills}
                        onChange={handleMultiSelect}
                        className="form-input w-full px-4 py-2 border rounded-lg focus:outline-none bg-gray-700 text-gray-200"
                      >
                        <option value="plumbing">Plumbing</option>
                        <option value="carpentry">Carpentry</option>
                        <option value="tutoring">Tutoring</option>
                        <option value="cleaning">Cleaning</option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-400 font-medium">Experience Level (Optional)</label>
                      <input
                        type="text"
                        name="experienceLevel"
                        value={formData.experienceLevel}
                        onChange={handleChange}
                        className="form-input w-full px-4 py-2 border rounded-lg focus:outline-none bg-gray-700 text-gray-200"
                        placeholder="e.g., 5 years"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-400 font-medium">Availability</label>
                      <input
                        type="text"
                        name="availability"
                        value={formData.availability}
                        onChange={handleChange}
                        className="form-input w-full px-4 py-2 border rounded-lg focus:outline-none bg-gray-700 text-gray-200"
                        placeholder="e.g., Weekdays 9 AM - 5 PM"
                      />
                    </div>
                  </>
                ) : null}

                {role === 'taskPoster' || role === 'both' ? (
                  <>
                    <div className="mb-4">
                      <label className="block text-gray-400 font-medium">Short Bio or Description (Optional)</label>
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        className="form-input w-full px-4 py-2 border rounded-lg focus:outline-none bg-gray-700 text-gray-200"
                        placeholder="Tell us about yourself"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-400 font-medium">Task Preferences (Optional)</label>
                      <select
                        name="taskPreferences"
                        multiple
                        value={formData.taskPreferences}
                        onChange={handleMultiSelect}
                        className="form-input w-full px-4 py-2 border rounded-lg focus:outline-none bg-gray-700 text-gray-200"
                      >
                        <option value="homeRepair">Home Repair</option>
                        <option value="tutoring">Tutoring</option>
                        <option value="cleaning">Cleaning</option>
                        <option value="gardening">Gardening</option>
                      </select>
                    </div>
                  </>
                ) : null}

                <div className="flex justify-between">
                  <button
                    type="button"
                    className="form-button bg-gray-500 text-white py-2 px-4 rounded-lg"
                    onClick={prevStep}
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    className="form-button bg-blue-500 text-white py-2 px-4 rounded-lg"
                    onClick={submitForm}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
