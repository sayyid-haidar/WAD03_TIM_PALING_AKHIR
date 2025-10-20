const db = require("../../database");

async function getCartByUserId(userId) {
  const cartItems = await db.carts.findAll({
    where: { userId: userId },
    include: [
      {
        model: db.products,
        as: "product",
        include: [
          {
            model: db.users,
            as: "seller",
            attributes: ["id", "username", "name"],
          },
        ],
      },
    ],
  });
  return cartItems;
}

async function findCartItem(userId, productId) {
  const cartItem = await db.carts.findOne({
    where: {
      userId: userId,
      productId: productId,
    },
  });
  return cartItem;
}

async function addToCart({ userId, productId, quantity }) {
  const newCartItem = await db.carts.create({
    userId,
    productId,
    quantity,
  });
  return newCartItem;
}

async function updateQuantity(userId, productId, quantity) {
  const cartItem = await db.carts.findOne({
    where: {
      userId: userId,
      productId: productId,
    },
  });

  if (cartItem) {
    cartItem.quantity = quantity;
    await cartItem.save();
    return cartItem;
  }
  return null;
}

async function removeFromCart(userId, productId) {
  const cartItem = await db.carts.findOne({
    where: {
      userId: userId,
      productId: productId,
    },
  });

  if (cartItem) {
    await cartItem.destroy();
    return true;
  }
  return false;
}

async function clearCart(userId) {
  const deleted = await db.carts.destroy({
    where: { userId: userId },
  });
  return deleted;
}

module.exports = {
  getCartByUserId,
  findCartItem,
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
};
