const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

// GET all products
router.get('/', productsController.getAllProducts);

// GET products by seller (harus sebelum /:id agar tidak bentrok)
router.get('/seller/:sellerId', productsController.getProductsBySeller);

// GET product by ID
router.get('/:id', productsController.getProductById);

// POST create new product
router.post('/', productsController.createProduct);

// PUT update product
router.put('/:id', productsController.updateProduct);

// DELETE product
router.delete('/:id', productsController.deleteProduct);

console.log('productsRoute.js loaded');

module.exports = router;
console.log('productsRoute.js exported');
