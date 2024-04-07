const express = require('express');
const router = express.Router();
const {
    getRecipeDetail,
    getAllRecipes,
    addRecipe,
    getRecipeById,
    updateRecipe,
    deleteRecipe,
} = require('../controllers/recipeController');

// Rute untuk mendapatkan semua resep
router.get('/', getAllRecipes);

// Rute untuk menambahkan resep baru
router.post('/', addRecipe);

// Rute untuk mendapatkan resep berdasarkan ID
router.get('/:id', getRecipeById);

// router.get('/detail/:id', async (req, res) => {
//     const id = req.params.id;
//     try {
//         const recipe = await getRecipeById(id);
//         if (recipe) {
//             res.render('recipeDetail', { recipe });
//         } else {
//             res.status(404).json({ error: 'Resep tidak ditemukan' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: 'Gagal mendapatkan data resep', message: error.message });
//     }
// });


router.get('/detail/:id', getRecipeDetail);

// Rute untuk mengupdate resep
router.put('/:id', updateRecipe);

// Rute untuk menghapus resep
router.delete('/:id', deleteRecipe);

module.exports = router;