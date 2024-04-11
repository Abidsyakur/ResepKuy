const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');

// Rute untuk registrasi pengguna baru
router.post('/register', registerUser);

// Rute untuk login pengguna
router.post('/login', loginUser);

// Rute untuk akses dashboard
router.get('/dashboard', (req, res) => {
    // Cek apakah pengguna sudah terotentikasi (contoh penggunaan session)
    if (req.session.userId) {
        // Jika terotentikasi, tampilkan halaman dashboard
         console.log('Nilai id_user:', req.session.userId);
         console.log('Objek Sesi:', req.session);
        res.render('dashboard'); // Ganti 'dashboard' dengan nama halaman EJS atau template yang Anda gunakan
    } else {
        // Jika tidak terotentikasi, redirect ke halaman login
        res.redirect('/login');
    }
});


module.exports = router;
