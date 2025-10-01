const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

router.post('/', productsController.createProduct);

router.get('/', productsController.getAllProducts);

router.get('/:slug', productsController.getProductBySlug);

module.exports = router;
