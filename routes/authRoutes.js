const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

//user registration
router.post('/register', authController.register)

//email verification
router.get('/verify-email', authController.verifyEmail)

//user login
router.post('/login', authController.login)

//refresh token
router.post('/refresh-token', authController.refreshToken)

module.exports = router;
