const Recipe = require('../model/recipe'); // Sesuaikan dengan struktur file Anda

const indexController = async (req, res) => {
    try {
        // Ambil semua resep dari database
        const recipes = await Recipe.findAll();

        // Kirim respons dengan data resep ke halaman homepage
        res.status(200).json({
            recipes
        });
    } catch (error) {
        // Tangani kesalahan jika gagal mengambil resep
        res.status(500).json({
            error: 'Gagal mengambil data resep',
            message: error.message
        });
    }
};

module.exports = indexController;