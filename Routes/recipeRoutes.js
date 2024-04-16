const express = require('express');
const router = express.Router();
const {
    addRecipe,
    getRecipeDetail,
    getAllRecipes,
    createRecipe,
    getRecipeById,
    // updateRecipe,
    deleteRecipe,
} = require('../controllers/recipeController');

// Rute untuk mendapatkan semua resep
router.get('/', getAllRecipes);

// Rute untuk menambahkan resep baru
router.post('/add', createRecipe);

// Rute untuk mendapatkan resep berdasarkan ID
router.get('/:id', getRecipeById);

router.get('/detail/:id', getRecipeDetail);

// Rute untuk mengupdate resep
// router.put('/:id', updateRecipe);

// Rute untuk menghapus resep
router.delete('/:id', deleteRecipe);

module.exports = router;