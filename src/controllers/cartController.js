let carts = {}; // { username: [ { productId, qty }, ... ] }

exports.addToCart = (req, res) => {
  const username = req.user.username;
  const { productId, qty } = req.body;

  if (!productId || !qty) {
    return res.status(400).json({ error: "productId dan qty wajib diisi" });
  }

  if (!carts[username]) {
    carts[username] = [];
  }

  const existingItem = carts[username].find(
    (item) => item.productId === productId
  );
  if (existingItem) {
    existingItem.qty += qty;
  } else {
    carts[username].push({ productId, qty });
  }

  res.json({
    message: `Produk berhasil ditambahkan ke cart ${username}`,
    cart: carts[username],
  });
};

exports.updateCart = (req, res) => {
  const username = req.user.username;
  const { productId, qty } = req.body;

  if (!productId || typeof qty !== "number") {
    return res.status(400).json({ error: "productId dan qty wajib diisi" });
  }

  if (!carts[username]) {
    return res.status(404).json({ error: "Cart tidak ditemukan" });
  }

  const item = carts[username].find((item) => item.productId === productId);
  if (!item) {
    return res.status(404).json({ error: "Produk tidak ditemukan di cart" });
  }

  item.qty = qty;

  res.json({
    message: `Qty produk berhasil diupdate di cart ${username}`,
    cart: carts[username],
  });
};

exports.removeFromCart = (req, res) => {
  const username = req.user.username;
  const { productId } = req.body;

  if (!productId) {
    return res.status(400).json({ error: "productId wajib diisi" });
  }

  if (!carts[username]) {
    return res.status(404).json({ error: "Cart tidak ditemukan" });
  }

  carts[username] = carts[username].filter(
    (item) => item.productId !== productId
  );

  res.json({
    message: `Produk berhasil dihapus dari cart ${username}`,
    cart: carts[username],
  });
};

exports.getCart = (req, res) => {
  const username = req.user.username;

  if (!carts[username]) {
    return res.json({ message: "Cart masih kosong", cart: [] });
  }

  res.json({
    username,
    cart: carts[username],
  });
};
