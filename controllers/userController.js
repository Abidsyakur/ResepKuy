const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../model/users'); // Sesuaikan dengan struktur file Anda

// Fungsi untuk registrasi pengguna baru
const registerUser = async (req, res) => {
    const { username, email, password, profile_image } = req.body;

    try {
        // Cek apakah email sudah terdaftar
        const existingUser = await User.findOne({
            where: {
                email
            }
        });
        if (existingUser) {
            return res.status(400).json({
                error: 'Email sudah terdaftar'
            });
        }

        // Hash password sebelum menyimpannya
        const hashedPassword = await bcrypt.hash(password, 10);

        // Buat pengguna baru
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            profile_image
        });

        // Set session atau kirim token JWT ke klien
        req.session.userId = newUser.id; // contoh penggunaan session
        // atau
        // const token = jwt.sign({ userId: newUser.id }, 'rahasia', { expiresIn: '1h' });
        // res.status(201).json({ message: 'Registrasi berhasil', token });

        res.status(201).json({
            message: 'Registrasi berhasil',
            user: newUser
        });
        res.redirect('/login');
    } catch (error) {
        res.status(500).json({
            error: 'Gagal melakukan registrasi',
            message: error.message
        });
    }
};

// Fungsi untuk login pengguna
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Cek apakah pengguna ada dalam database
        const user = await User.findOne({
            where: {
                email
            }
        });
        if (!user) {
            return res.status(404).json({
                error: 'Pengguna tidak ditemukan'
            });
        }

        // Verifikasi password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                error: 'Kombinasi email dan password salah'
            });
        }

        // Set session atau kirim token JWT ke klien
        req.session.userId = user.id_user; // contoh penggunaan session
        req.session.username = user.username; // contoh penggunaan session
        // atau
        // const token = jwt.sign({ userId: user.id }, 'rahasia', { expiresIn: '1h' });
        // res.status(200).json({ message: 'Login berhasil', token });

        res.redirect('/dashboard');
    } catch (error) {
        res.status(500).json({
            error: 'Gagal melakukan login',
            message: error.message
        });
    }
};

module.exports = {
    registerUser,
    loginUser
};
