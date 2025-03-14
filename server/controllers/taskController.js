const Task = require('../models/taskModel');

const createTask = async (req, res) => {
    console.log('User:', req.user); // Debugging: Log the user object
    const { title, description, category, deadline, location, payment, priority, status } = req.body;
    const userId = req.user.id; // Get the user ID from req.user
  
    try {
      // Handle file upload (if applicable)
      let attachment = null;
      if (req.file) {
        attachment = req.file.path; // Save file path
      }
  
      // Create the task
      const task = await Task.create({
        title,
        description,
        category,
        deadline,
        location,
        payment,
        priority,
        status,
        attachment,
        userId, // Associate the task with the user
      });
  
      res.status(201).json({ message: 'Task created successfully!', task });
    } catch (error) {
      console.error('Error creating task:', error);
      res.status(500).json({ message: 'An error occurred. Please try again.' });
    }
  };
module.exports = { createTask };