import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import '../styles/CreateTask.css';

const CreateTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [deadline, setDeadline] = useState('');
  const [location, setLocation] = useState('');
  const [payment, setPayment] = useState('');
  const [priority, setPriority] = useState('Low');
  const [status, setStatus] = useState('Pending');
  const [attachment, setAttachment] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('deadline', deadline);
    formData.append('location', location);
    formData.append('payment', payment);
    formData.append('priority', priority);
    formData.append('status', status);
    if (attachment) {
      formData.append('attachment', attachment);
    }

    try {
      console.log(formData);
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/tasks', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        toast.success('Task created successfully!');
        // Reset form fields
        setTitle('');
        setDescription('');
        setCategory('');
        setDeadline('');
        setLocation('');
        setPayment('');
        setPriority('Low');
        setStatus('Pending');
        setAttachment(null);
      }
    } catch (error) {
      console.error('Error creating task:', error);
      toast.error(error.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-task-container">
      <h2>Create New Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Task Title</label>
          <input
            type="text"
            id="title"
            value={title}
            placeholder="Enter task title"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            placeholder="Enter task description"
            rows="4"
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            <option value="handyman">Handyman</option>
            <option value="delivery">Delivery</option>
            <option value="tutoring">Tutoring</option>
            <option value="cleaning">Cleaning</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="deadline">Deadline</label>
          <input
            type="date"
            id="deadline"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            value={location}
            placeholder="Enter location"
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="payment">Payment Offered</label>
          <input
            type="number"
            id="payment"
            value={payment}
            placeholder="Enter payment amount"
            onChange={(e) => setPayment(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            required
          >
            <option value="Low">Low</option>
            <option value="High">High</option>
            <option value="Highest">Highest</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="attachment">Upload Attachment</label>
          <input
            type="file"
            id="attachment"
            onChange={(e) => setAttachment(e.target.files[0])}
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn">
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
