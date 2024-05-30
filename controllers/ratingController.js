const Rating = require('../model/ratings'); // Sesuaikan path sesuai struktur file Anda

// Fungsi untuk mendapatkan semua rating
const getAllRatings = async (req, res) => {
    try {
        const ratings = await Rating.findAll();
        res.status(200).json(ratings);
    } catch (error) {
        res.status(500).json({
            error: 'Gagal mendapatkan data rating',
            message: error.message
        });
    }
};

// Fungsi untuk menambahkan rating baru
const addRating = async (req, res) => {
    const {
        recipe_id,
        user_id,
        rating
    } = req.body;
    try {
        // Tambahkan rating baru ke dalam database
        const newRating = await Rating.create({
            recipe_id,
            user_id,
            rating
        });

        res.status(201).json({
            message: 'Rating berhasil ditambahkan',
            rating: newRating
        });
    } catch (error) {
        res.status(500).json({
            error: 'Gagal menambahkan rating',
            message: error.message
        });
    }
};

// Fungsi untuk mengupdate rating
const updateRating = async (req, res) => {
    const {
        id_rating
    } = req.params;
    const {
        rating
    } = req.body;
    try {
        // Cari rating berdasarkan id_rating
        const existingRating = await Rating.findByPk(id_rating);
        if (!existingRating) {
            return res.status(404).json({
                error: 'Rating tidak ditemukan'
            });
        }

        // Update rating
        existingRating.rating = rating;
        await existingRating.save();

        res.status(200).json({
            message: 'Rating berhasil diupdate',
            rating: existingRating
        });
    } catch (error) {
        res.status(500).json({
            error: 'Gagal mengupdate rating',
            message: error.message
        });
    }
};

// Fungsi untuk menghapus rating
const deleteRating = async (req, res) => {
    const {
        id_rating
    } = req.params;
    try {
        // Hapus rating berdasarkan ID
        const deletedRating = await Rating.destroy({
            where: {
                id_rating
            }
        });
        if (!deletedRating) {
            return res.status(404).json({
                error: 'Rating tidak ditemukan'
            });
        }

        res.status(200).json({
            message: 'Rating berhasil dihapus'
        });
    } catch (error) {
        res.status(500).json({
            error: 'Gagal menghapus rating',
            message: error.message
        });
    }
};

// Export fungsi-fungsi yang dibutuhkan
module.exports = {
    getAllRatings,
    addRating,
    updateRating,
    deleteRating
};
