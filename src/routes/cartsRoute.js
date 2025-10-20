const express = require("express");
const router = express.Router();
const cartsController = require("../controllers/cartsController");

// GET cart by user
router.get("/:userId", cartsController.getCart);

// POST add item to cart
router.post("/", cartsController.addToCart);

// PUT update cart item quantity
router.put("/", cartsController.updateCartQuantity);

// DELETE remove item from cart
router.delete("/", cartsController.removeFromCart);

// DELETE clear entire cart
router.delete("/:userId/clear", cartsController.clearCart);

console.log("cartsRoute.js loaded");

module.exports = router;
console.log("cartsRoute.js exported");
