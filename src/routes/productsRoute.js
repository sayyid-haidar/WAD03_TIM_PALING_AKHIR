const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const authenticate = require('../middleware/authenticate'); // <-- Impor middleware
const sellerOnly = require('../middleware/sellerOnly');     // <-- Impor middleware

// Rute publik, bisa diakses siapa saja
router.get('/', productsController.getAllProducts);
router.get('/:id', productsController.getProductById);

// Rute yang diproteksi, hanya untuk seller
router.post('/', authenticate, sellerOnly, productsController.createProduct);
router.put('/:id', authenticate, sellerOnly, productsController.updateProduct);
router.delete('/:id', authenticate, sellerOnly, productsController.deleteProduct);

module.exports = router;
