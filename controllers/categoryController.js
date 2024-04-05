const Category = require('../model/categories'); // Sesuaikan path sesuai struktur file Anda

// Fungsi untuk mendapatkan semua kategori
const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({
            error: 'Gagal mendapatkan data kategori',
            message: error.message
        });
    }
};

// Fungsi untuk menambahkan kategori baru
const addCategory = async (req, res) => {
    const {
        name_categori
    } = req.body;
    try {
        const newCategory = await Category.create({
            name_categori
        });
        res.status(201).json({
            message: 'Kategori berhasil ditambahkan',
            category: newCategory
        });
    } catch (error) {
        res.status(500).json({
            error: 'Gagal menambahkan kategori',
            message: error.message
        });
    }
};

// Fungsi untuk mendapatkan kategori berdasarkan ID
const getCategoryById = async (req, res) => {
    const {
        id_categori
    } = req.params;
    try {
        const category = await Category.findByPk(id_categori);
        if (category) {
            res.status(200).json(category);
        } else {
            res.status(404).json({
                error: 'Kategori tidak ditemukan'
            });
        }
    } catch (error) {
        res.status(500).json({
            error: 'Gagal mendapatkan kategori',
            message: error.message
        });
    }
};

// Fungsi untuk mengupdate kategori
const updateCategory = async (req, res) => {
    const {
        id_categori
    } = req.params;
    const {
        name_categori
    } = req.body;
    try {
        const categoryToUpdate = await Category.findByPk(id_categori);
        if (categoryToUpdate) {
            categoryToUpdate.name_categori = name_categori;
            await categoryToUpdate.save();
            res.status(200).json({
                message: 'Kategori berhasil diperbarui',
                category: categoryToUpdate
            });
        } else {
            res.status(404).json({
                error: 'Kategori tidak ditemukan'
            });
        }
    } catch (error) {
        res.status(500).json({
            error: 'Gagal mengupdate kategori',
            message: error.message
        });
    }
};

// Fungsi untuk menghapus kategori
const deleteCategory = async (req, res) => {
    const {
        id_categori
    } = req.params;
    try {
        const categoryToDelete = await Category.findByPk(id_categori);
        if (categoryToDelete) {
            await categoryToDelete.destroy();
            res.status(200).json({
                message: 'Kategori berhasil dihapus',
                category: categoryToDelete
            });
        } else {
            res.status(404).json({
                error: 'Kategori tidak ditemukan'
            });
        }
    } catch (error) {
        res.status(500).json({
            error: 'Gagal menghapus kategori',
            message: error.message
        });
    }
};

module.exports = {
    getAllCategories,
    addCategory,
    getCategoryById,
    updateCategory,
    deleteCategory
};