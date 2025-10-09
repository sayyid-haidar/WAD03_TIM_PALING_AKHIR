const express = require('express');
const app = express();
const cartRoute = require('./src/routes/cartRoute');

app.use('/cart', cartRoute);

const router = express.Router();
const cartController = require('../controllers/cartController');
const buyerOnly = require('../middleware/buyerOnly');

// Semua endpoint cart hanya untuk buyer
router.post('/', buyerOnly, cartController.addToCart); // Tambah produk ke cart
router.put('/', buyerOnly, cartController.updateCart); // Update qty produk di cart
router.delete('/', buyerOnly, cartController.removeFromCart); // Hapus produk dari cart
router.get('/', buyerOnly, cartController.getCart); // Ambil isi cart

module.exports = router;