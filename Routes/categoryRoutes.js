const express = require('express');
const router = express.Router();
const {
    getAllCategories,
    addCategory,
    getCategoryById,
    updateCategory,
    deleteCategory
} = require('../controllers/categoryController');

// Rute untuk mendapatkan semua kategori
router.get('/', getAllCategories);

// Rute untuk menambahkan kategori baru
router.post('/', addCategory);

// Rute untuk mendapatkan kategori berdasarkan ID
router.get('/:id', getCategoryById);

// Rute untuk mengupdate kategori
router.put('/:id', updateCategory);

// Rute untuk menghapus kategori
router.delete('/:id', deleteCategory);

module.exports = router;