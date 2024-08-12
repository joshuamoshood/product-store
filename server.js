const express = require('express');
const path = require('path');

//load the environment variables from .env
require('dotenv').config();
const bodyParser = require('body-parser');
const connectDB = require('./db/connect');
const cookieParcer = require('cookie-parser');

const register_login_router = require('./routes/auth');


const productRoutes = require('./routes/products');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(cookieParcer());

// Set template engine to pug
app.set('view engine', 'pug');

// Use body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/auth',register_login_router);
//app.use(refreshToken);
// Use routes from products.js
app.use('/products', productRoutes);

// redirect to /products
app.get("/", (req, res) => {
  res.redirect('/products');
});

// 404
app.use((req, res) => {
    res.status(404).send('404 - Page Not Found');
})

// Start the server
const main = async () => {
  app.listen(3001, () => console.log('Server listening on port 3001'));
  await connectDB();
};
main();