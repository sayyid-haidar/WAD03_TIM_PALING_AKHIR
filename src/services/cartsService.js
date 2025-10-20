const cartsRepo = require("../repositories/cartsRepository");
const productsRepo = require("../repositories/productsRepository");
const usersRepo = require("../repositories/usersRepository");

async function getCart(userId) {
  const user = await usersRepo.findByUsername(userId);
  if (!user) {
    throw new Error("User tidak ditemukan");
  }
  return cartsRepo.getCartByUserId(user.id);
}

async function addToCart({ userId, productId, quantity }) {
  // Validasi user
  const user = await usersRepo.findByUsername(userId);
  if (!user) {
    throw new Error("User tidak ditemukan");
  }

  // Validasi product
  const product = await productsRepo.findById(productId);
  if (!product) {
    throw new Error("Product tidak ditemukan");
  }

  // Validasi stock
  if (product.stock < quantity) {
    throw new Error("Stock tidak mencukupi");
  }

  // Validasi quantity
  if (quantity <= 0) {
    throw new Error("Quantity harus lebih dari 0");
  }

  // Cek apakah item sudah ada di cart
  const existingCartItem = await cartsRepo.findCartItem(user.id, productId);
  if (existingCartItem) {
    const newQuantity = existingCartItem.quantity + quantity;
    if (product.stock < newQuantity) {
      throw new Error("Stock tidak mencukupi");
    }
    return cartsRepo.updateQuantity(user.id, productId, newQuantity);
  }

  return cartsRepo.addToCart({
    userId: user.id,
    productId,
    quantity,
  });
}

async function updateCartQuantity({ userId, productId, quantity }) {
  // Validasi user
  const user = await usersRepo.findByUsername(userId);
  if (!user) {
    throw new Error("User tidak ditemukan");
  }

  // Validasi product
  const product = await productsRepo.findById(productId);
  if (!product) {
    throw new Error("Product tidak ditemukan");
  }

  // Validasi stock
  if (product.stock < quantity) {
    throw new Error("Stock tidak mencukupi");
  }

  // Validasi quantity
  if (quantity <= 0) {
    throw new Error("Quantity harus lebih dari 0");
  }

  // Cek apakah item ada di cart
  const cartItem = await cartsRepo.findCartItem(user.id, productId);
  if (!cartItem) {
    throw new Error("Item tidak ada di cart");
  }

  return cartsRepo.updateQuantity(user.id, productId, quantity);
}

async function removeFromCart({ userId, productId }) {
  // Validasi user
  const user = await usersRepo.findByUsername(userId);
  if (!user) {
    throw new Error("User tidak ditemukan");
  }

  const deleted = await cartsRepo.removeFromCart(user.id, productId);
  if (!deleted) {
    throw new Error("Item tidak ada di cart");
  }
  return deleted;
}

async function clearCart(userId) {
  // Validasi user
  const user = await usersRepo.findByUsername(userId);
  if (!user) {
    throw new Error("User tidak ditemukan");
  }

  return cartsRepo.clearCart(user.id);
}

module.exports = {
  getCart,
  addToCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
};
