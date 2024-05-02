const express = require('express');
const router = express.Router();
const Recipe = require('../model/recipe'); // Sesuaikan path sesuai struktur file Anda
const {
    // addRecipe,
    getRecipeDetail,
    getAllRecipes,
    createRecipe,
    getRecipeById,
    // updateRecipe,
} = require('../controllers/recipeController');

// Rute untuk mendapatkan semua resep
router.get('/', getAllRecipes);

// Rute untuk menambahkan resep baru
// router.post('/add', createRecipe);
router.post("/createrecipe", async (req, res) => {
  try {
    const { title_recipe, description_recipe, ingredients_recipe, instructions_recipe, image_recipe, category_id, user_id } = req.body;
    const recipe = await Recipe.create({
      title_recipe,
      description_recipe,
      ingredients_recipe,
      instructions_recipe,
      image_recipe,
      category_id,
      user_id
    });
    req.error = null;
    res.redirect("/recipes");
  } catch (error) {
    req.error = "Error creating recipe!";
    res.redirect("/recipes");
  }
});

// Rute untuk mendapatkan resep berdasarkan ID
router.get('/:id', getRecipeById);

router.get('/detail/:id', getRecipeDetail);

// Rute untuk mengupdate resep
// router.put('/:id', updateRecipe);

// Rute untuk menghapus resep

module.exports = router;