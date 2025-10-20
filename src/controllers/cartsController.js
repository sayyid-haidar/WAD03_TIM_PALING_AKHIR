const cartsService = require("../services/cartsService");

exports.getCart = async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await cartsService.getCart(userId);
    res.json(cart);
  } catch (err) {
    if (err.message === "User tidak ditemukan") {
      res.status(404).json({ message: err.message });
    } else {
      res.status(500).json({ message: err.message });
    }
  }
};

exports.addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  if (!userId || !productId || !quantity) {
    return res
      .status(400)
      .json({ message: "UserId, productId, dan quantity harus diisi" });
  }

  try {
    const cartItem = await cartsService.addToCart({
      userId,
      productId,
      quantity,
    });
    res.status(201).json(cartItem);
  } catch (err) {
    if (
      err.message === "User tidak ditemukan" ||
      err.message === "Product tidak ditemukan"
    ) {
      res.status(404).json({ message: err.message });
    } else if (
      err.message.includes("Stock") ||
      err.message.includes("Quantity")
    ) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(500).json({ message: err.message });
    }
  }
};

exports.updateCartQuantity = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  if (!userId || !productId || !quantity) {
    return res
      .status(400)
      .json({ message: "UserId, productId, dan quantity harus diisi" });
  }

  try {
    const cartItem = await cartsService.updateCartQuantity({
      userId,
      productId,
      quantity,
    });
    res.json(cartItem);
  } catch (err) {
    if (
      err.message === "User tidak ditemukan" ||
      err.message === "Product tidak ditemukan" ||
      err.message === "Item tidak ada di cart"
    ) {
      res.status(404).json({ message: err.message });
    } else if (
      err.message.includes("Stock") ||
      err.message.includes("Quantity")
    ) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(500).json({ message: err.message });
    }
  }
};

exports.removeFromCart = async (req, res) => {
  const { userId, productId } = req.body;

  if (!userId || !productId) {
    return res
      .status(400)
      .json({ message: "UserId dan productId harus diisi" });
  }

  try {
    await cartsService.removeFromCart({ userId, productId });
    res.json({ message: "Item berhasil dihapus dari cart" });
  } catch (err) {
    if (
      err.message === "User tidak ditemukan" ||
      err.message === "Item tidak ada di cart"
    ) {
      res.status(404).json({ message: err.message });
    } else {
      res.status(500).json({ message: err.message });
    }
  }
};

exports.clearCart = async (req, res) => {
  const { userId } = req.params;
  try {
    await cartsService.clearCart(userId);
    res.json({ message: "Cart berhasil dikosongkan" });
  } catch (err) {
    if (err.message === "User tidak ditemukan") {
      res.status(404).json({ message: err.message });
    } else {
      res.status(500).json({ message: err.message });
    }
  }
};
