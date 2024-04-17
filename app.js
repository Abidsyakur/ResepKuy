const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const { Op } = require('sequelize');
const Recipe = require('./model/recipe');
const Category = require('./model/categories');


// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/// Konfigurasi templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
//middleware untuk akses public
app.use(express.static(path.join(__dirname, 'public')));

// Middleware untuk session (ganti 'secret' dengan nilai rahasia yang aman)
app.use(session({
    secret: 'rahasia',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 60000 }
}));
app.use((req, res, next) => {
    res.locals.userId = req.session.userId;
    next();
});
// Atur rute untuk homepage
app.get('/', async (req, res) => {
  // Ambil data recipes dari database
  const recipes = await Recipe.findAll();
  console.log('Data Resep:', recipes);
  // Kirim data recipes ke template EJS
  res.render('index', {
    recipes
  });
});
app.get('/login', (req, res) => {
  res.render('login'); // Halaman login
});

app.get('/register', (req, res) => {
  res.render('register'); // Halaman registrasi
});

app.get('/beranda', async (req, res) => {
  // Ambil data recipes dari database
  const recipes = await Recipe.findAll();
  console.log('Data Resep:', recipes);
  // Kirim data recipes ke template EJS
  res.render('beranda', {
    recipes
  });
});
app.get('/dashboard', async (req, res) => {
  // Ambil data recipes dari database
  const recipes = await Recipe.findAll();
  const categories = await Category.findAll();
  // Kirim data categories ke template EJS
  res.render('dashboard', {
    recipes, categories,
    id_user: req.session.userId, 
    username : req.session.username
  });
});
app.get('/recipeDetail', async (req, res) => {
  // Ambil data recipes dari database
  const recipes = await Recipe.findAll();
  const categories = await Category.findAll();
  // Kirim data categories ke template EJS
  res.render('recipeDetail', {
    recipes, categories,
    id_user: req.session.userId, 
    username : req.session.username
  });
});

//morgan - log server
const morgan = require('morgan');

// ...

app.use(morgan('dev'));

//...

app.get('/search', (req, res) => {
  const searchTerm = req.query.q;

  if (!searchTerm) {
    res.status(400).json({
      error: 'No search term provided'
    });
    return;
  }

  Recipe.findAll({
      where: {
        title_recipe: {
          [Op.like]: `%${searchTerm}%`
        }
      }
    })
    .then((recipes) => {
      res.json(recipes);
    })
    .catch((error) => {
      res.status(500).json({
        error: 'Error fetching recipes',
        message: error.message
      });
    });
});

//...

// Routes
// const indexRoutes = require('./Routes/indexRoutes');
const userRoutes = require('./Routes/userRoutes');
const recipeRoutes = require('./Routes/recipeRoutes');
const categoryRoutes = require('./Routes/categoryRoutes');
const commentRoutes = require('./Routes/commentRoutes');

// app.use('/', indexRoutes);
app.use('/users', userRoutes);
app.use('/recipes', recipeRoutes);
app.use('/categories', categoryRoutes);
app.use('/comments', commentRoutes);

// Server Setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
