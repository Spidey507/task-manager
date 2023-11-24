const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// registration route
router.post('/register', userController.register);

// login route
router.post('/login', userController.login);

module.exports = router;
