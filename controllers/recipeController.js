const Recipe = require('../model/recipe'); // Sesuaikan path sesuai struktur file Anda

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

// Fungsi untuk menambahkan resep baru
const addRecipe = async (req, res) => {
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
        const newRecipe = await Recipe.create({
            title_recipe,
            description_recipe,
            ingredients_recipe,
            instructions_recipe,
            image_recipe,
            category_id,
            user_id
        });
        res.status(201).json({
            message: 'Resep berhasil ditambahkan',
            recipe: newRecipe
        });
    } catch (error) {
        res.status(500).json({
            error: 'Gagal menambahkan resep',
            message: error.message
        });
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
            res.status(200).json(recipe);
        } else {
            res.status(404).json({
                error: 'Resep tidak ditemukan'
            });
        }
    } catch (error) {
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

module.exports = {
    getAllRecipes,
    addRecipe,
    getRecipeById,
    updateRecipe,
    deleteRecipe
};