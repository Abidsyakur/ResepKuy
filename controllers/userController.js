const { body, validationResult } = require('express-validator');
const User = require('../model/users');

exports.register = [
  body('email').isEmail().withMessage('Email tidak valid'),
  body('password').isLength({ min: 6 }).withMessage('Password harus lebih dari 6 karakter'),
  body('username').isLength({ min: 1 }).withMessage('Username harus lebih dari 1 karakter'),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Simpan data user ke database
    User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      profile_image: req.body.profile_image,
    })
      .then((user) => {
        // Set session ID
        req.session.userId = user.id_user;

        // Return success message
        res.status(201).json({ message: 'User berhasil didaftarkan' });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
      });
  }
];

exports.login = [
  body('email').isEmail().withMessage('Email tidak valid'),
  body('password').isLength({ min: 6 }).withMessage('Password harus lebih dari 6 karakter'),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Autentikasi user menggunakan data yang diberikan
    User.findOne({ where: { email: req.body.email } })
      .then((user) => {
        if (!user || user.password !== req.body.password) {
          return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Set session ID
        req.session.userId = user.id_user;
         req.session.username = user.username; 

        // Redirect ke halaman dashboard
        res.redirect('/dashboard');
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
      });
  }
];