const express = require('express');
const { createTask } = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware'); // Import the middleware
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

// Apply authMiddleware to protect the route
router.post('/', authMiddleware, upload.single('attachment'), createTask);

module.exports = router;