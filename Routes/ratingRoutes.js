const express = require('express');
const router = express.Router();
const {
    getAllRatings,
    addRating,
    updateRating,
    deleteRating
} = require('../controllers/ratingController');

// Rute untuk mendapatkan semua rating
router.get('/', getAllRatings);

// Rute untuk menambahkan rating baru
router.post('/', addRating);

// Rute untuk mengupdate rating
router.put('/:id', updateRating);

// Rute untuk menghapus rating
router.delete('/:id', deleteRating);

module.exports = router;