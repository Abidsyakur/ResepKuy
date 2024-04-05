const express = require('express');
const indexController = require('../controllers/indexController');
const router = express.Router();

// Halaman utama (index)
router.get('/', indexController);

module.exports = router;