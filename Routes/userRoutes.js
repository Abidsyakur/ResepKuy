const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser
} = require('../controllers/userController');

// Rute untuk registrasi pengguna baru
router.post('/register', registerUser);

// Rute untuk login pengguna
router.post('/login', loginUser);

module.exports = router;