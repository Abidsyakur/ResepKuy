const Recipe = require('../model/recipe'); // Sesuaikan path sesuai struktur file Anda
const Category = require('../model/categories'); // Sesuaikan path sesuai struktur file Anda
const Comment = require('../model/comments'); // Sesuaikan path sesuai struktur file Anda
const User = require('../model/users'); // Sesuaikan path sesuai struktur file Anda

// Fungsi untuk mendapatkan semua resep
const getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.findAll();
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({
            error: 'Gagal mendapatkan data resep',
            message: error.message
        });
    }
};


// Function to add a new recipe
const addRecipe = async (req, res) => {
  try {
    const { title_recipe, description_recipe, ingredients_recipe, instructions_recipe, image_recipe, category_id, user_id } = req.body;

    // Create a new recipe in the database
    const newRecipe = await Recipe.create({
      title_recipe,
      description_recipe,
      ingredients_recipe,
      instructions_recipe,
      image_recipe,
      category_id,
      user_id,
    });

    // Send a success response with the created recipe
    res.status(201).json({ message: 'Recipe created successfully', recipe: newRecipe });
  } catch (error) {
    console.error('Error creating recipe:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



// Fungsi untuk mendapatkan resep berdasarkan ID
const getRecipeById = async (req, res) => {
    const {
        id
    } = req.params;
    try {
        const recipe = await Recipe.findByPk(id);
        if (recipe) {
            res.redirect(`/recipes/detail/${recipe.id_resep}`);
        } else {
            res.status(404).json({
                error: 'Resep tidak ditemukan'
            });
        }
    } catch (error) {const addRecipe = async (req, res) => {
  try {
    const {
      title_recipe,
      description_recipe,
      ingredients_recipe,
      instructions_recipe,
      category_id,
      user_id
    } = req.body;

    const recipe = await Recipe.create({
      title_recipe,
      description_recipe,
      ingredients_recipe,
      instructions_recipe,
      category_id,
      user_id
    });

    res.status(201).json(recipe);
  } catch (error) {
    res.status(500).json({
      error: 'Error adding recipe',
      message: error.message
    });
  }
};
        res.status(500).json({
            error: 'Gagal mendapatkan resep',
            message: error.message
        });
    }
};

// Fungsi untuk mengupdate resep
const updateRecipe = async (req, res) => {
    const {
        id
    } = req.params;
    const {
        title_recipe,
        description_recipe,
        ingredients_recipe,
        instructions_recipe,
        image_recipe,
        category_id,
        user_id

    } = req.body;
    try {
        const recipeToUpdate = await Recipe.findByPk(id);
        if (recipeToUpdate) {
            recipeToUpdate.title_recipe = title_recipe || recipeToUpdate.title_recipe;
            recipeToUpdate.description_recipe = description_recipe || recipeToUpdate.description_recipe;
            recipeToUpdate.ingredients_recipe = ingredients_recipe || recipeToUpdate.ingredients_recipe;
            recipeToUpdate.instructions_recipe = instructions_recipe || recipeToUpdate.instructions_recipe;
            recipeToUpdate.image_recipe = image_recipe || recipeToUpdate.image_recipe;
            recipeToUpdate.category_id = category_id || recipeToUpdate.category_id;
            recipeToUpdate.user_id = user_id || recipeToUpdate.user_id;
            
            await recipeToUpdate.save();
            res.status(200).json({
                message: 'Resep berhasil diperbarui',
                recipe: recipeToUpdate
            });
        } else {
            res.status(404).json({
                error: 'Resep tidak ditemukan'
            });
        }
    } catch (error) {
        res.status(500).json({
            error: 'Gagal mengupdate resep',
            message: error.message
        });
    }
};

// Fungsi untuk menghapus resep
const deleteRecipe = async (req, res) => {
    const {
        id
    } = req.params;
    try {
        const recipeToDelete = await Recipe.findByPk(id);
        if (recipeToDelete) {
            await recipeToDelete.destroy();
            res.status(200).json({
                message: 'Resep berhasil dihapus',
                recipe: recipeToDelete
            });
        } else {
            res.status(404).json({
                error: 'Resep tidak ditemukan'
            });
        }
    } catch (error) {
        res.status(500).json({
            error: 'Gagal menghapus resep',
            message: error.message
        });
    }
};

const getRecipeDetail = async (req, res) => {
  try {
    const userId = req.session.userId;
    const categories = await Category.findAll(); // Mendapatkan semua kategori
    const recipeId = req.params.id; // Mengambil id_resep dari URL

    // Mendapatkan resep berdasarkan id_resep dan juga mengambil semua komentar yang terkait
    const recipe = await Recipe.findByPk(recipeId, {
      include: [
        {
          model: Comment,
          include: [User], // Mengambil informasi pengguna yang membuat komentar
        },
      ],
    });

    if (recipe && categories) {
        res.render('recipeDetail', { recipe, categories, userId }); // Render halaman detail resep dengan komentar dan kategori
    } else {
      res.status(404).json({ error: 'Resep tidak ditemukan' });
    }

  } catch (error) {
    res.status(500).json({
      error: error.toString(),
    });
  }
};


module.exports = {
    addRecipe,
    getAllRecipes,
    getRecipeById,
    updateRecipe,
    deleteRecipe,
    getRecipeDetail
};