const express = require('express');
const path = require('path');

const usersRouter = require('./src/routes/usersRouting');
const productsRouter = require('./src/routes/productsRoute');
const cartRouter = require('./src/routes/cartRoute'); // <-- TAMBAHKAN INI

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/cart', cartRouter); // <-- TAMBAHKAN INI

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Access the application at http://localhost:${PORT}`);
});

module.exports = app;