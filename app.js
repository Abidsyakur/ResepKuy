const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/// Konfigurasi templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
//middleware untuk akses public
app.use(express.static(path.join(__dirname, 'public')));

// Atur rute untuk homepage
app.get('/', (req, res) => {
  res.render('index');
});

//morgan - log server
const morgan = require('morgan');

// ...

app.use(morgan('dev'));

// Routes
// const indexRoutes = require('./Routes/indexRoutes');
const userRoutes = require('./Routes/userRoutes');
const recipeRoutes = require('./Routes/recipeRoutes');
const categoryRoutes = require('./Routes/categoryRoutes');
const commentRoutes = require('./Routes/commentRoutes');
const ratingRoutes = require('./Routes/ratingRoutes');

// app.use('/', indexRoutes);
app.use('/users', userRoutes);
app.use('/recipes', recipeRoutes);
app.use('/categories', categoryRoutes);
app.use('/comments', commentRoutes);
app.use('/rating', ratingRoutes);

// Server Setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
