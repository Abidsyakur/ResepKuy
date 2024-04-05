const express = require('express');
const router = express.Router();
const {
    getAllRecipes,
    addRecipe,
    getRecipeById,
    updateRecipe,
    deleteRecipe
} = require('../controllers/recipeController');

// Rute untuk mendapatkan semua resep
router.get('/', getAllRecipes);

// Rute untuk menambahkan resep baru
router.post('/', addRecipe);

// Rute untuk mendapatkan resep berdasarkan ID
router.get('/:id', getRecipeById);

// Rute untuk mengupdate resep
router.put('/:id', updateRecipe);

// Rute untuk menghapus resep
router.delete('/:id', deleteRecipe);

module.exports = router;