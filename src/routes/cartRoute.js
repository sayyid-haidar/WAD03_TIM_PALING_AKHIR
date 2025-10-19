const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authenticate = require('../middleware/authenticate');
const buyerOnly = require('../middleware/buyerOnly');

// Semua rute di bawah ini memerlukan login sebagai buyer
router.use(authenticate, buyerOnly);

router.get('/', cartController.getCart);
router.post('/', cartController.addProduct);
router.delete('/:productId', cartController.removeProduct);

module.exports = router;