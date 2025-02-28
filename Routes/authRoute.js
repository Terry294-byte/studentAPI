const express =require('express');
const router =express.Router();
const authController =require('../controllers/authController');

// User registration route

router.post('/register', authController.register);

module.exports = router;