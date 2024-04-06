const express = require('express');
const indexController = require('../controllers/indexController');
const router = express.Router();
const Recipe = require('../model/recipe');

// Halaman utama (index)
router.get('/', indexController);
router.get('/', async (req, res) => {
    try {
        const recipes = await Recipe.findAll(); // Ambil semua data resep dari database
        res.render('index', {
            recipes
        }); // Render halaman index dan lewatkan data resep
    } catch (error) {
        res.status(500).json({
            error: 'Gagal mengambil data resep'
        });
    }
});


module.exports = router;