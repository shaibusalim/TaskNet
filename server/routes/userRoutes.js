const express = require('express');
const { getUserDetails } = require('../controllers/userController');


const router = express.Router();

// GET /api/users/:userId
router.get('/:userId', getUserDetails);

module.exports = router;