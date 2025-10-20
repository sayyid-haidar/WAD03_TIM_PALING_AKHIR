const productsService = require('../services/productsService');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await productsService.getAllProducts();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await productsService.getProductById(id);
        res.json(product);
    } catch (err) {
        if (err.message === 'Product tidak ditemukan') {
            res.status(404).json({ message: err.message });
        } else {
            res.status(500).json({ message: err.message });
        }
    }
};

exports.getProductsBySeller = async (req, res) => {
    const { sellerId } = req.params;
    try {
        const products = await productsService.getProductsBySellerId(sellerId);
        res.json(products);
    } catch (err) {
        if (err.message === 'Seller tidak ditemukan') {
            res.status(404).json({ message: err.message });
        } else {
            res.status(500).json({ message: err.message });
        }
    }
};

exports.createProduct = async (req, res) => {
    const { name, description, price, stock, category, imageUrl, sellerId } = req.body;
    
    if (!name || !price || !stock || !sellerId) {
        return res.status(400).json({ message: 'Name, price, stock, dan sellerId harus diisi' });
    }

    try {
        const newProduct = await productsService.createProduct({
            name,
            description,
            price,
            stock,
            category,
            imageUrl,
            sellerId
        });
        res.status(201).json(newProduct);
    } catch (err) {
        if (err.message === 'Seller tidak ditemukan' || err.message === 'User bukan seller') {
            res.status(404).json({ message: err.message });
        } else if (err.message.includes('harus') || err.message.includes('tidak boleh')) {
            res.status(400).json({ message: err.message });
        } else {
            res.status(500).json({ message: err.message });
        }
    }
};

exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, stock, category, imageUrl, sellerId } = req.body;

    if (!name || !price || !stock || !sellerId) {
        return res.status(400).json({ message: 'Name, price, stock, dan sellerId harus diisi' });
    }

    try {
        const updatedProduct = await productsService.updateProduct(id, {
            name,
            description,
            price,
            stock,
            category,
            imageUrl,
            sellerId
        });
        res.json(updatedProduct);
    } catch (err) {
        if (err.message === 'Product tidak ditemukan') {
            res.status(404).json({ message: err.message });
        } else if (err.message.includes('akses')) {
            res.status(403).json({ message: err.message });
        } else if (err.message.includes('harus') || err.message.includes('tidak boleh')) {
            res.status(400).json({ message: err.message });
        } else {
            res.status(500).json({ message: err.message });
        }
    }
};

exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    const { sellerId } = req.body;

    if (!sellerId) {
        return res.status(400).json({ message: 'SellerId harus diisi' });
    }

    try {
        await productsService.deleteProduct(id, sellerId);
        res.json({ message: 'Product berhasil dihapus' });
    } catch (err) {
        if (err.message === 'Product tidak ditemukan') {
            res.status(404).json({ message: err.message });
        } else if (err.message.includes('akses')) {
            res.status(403).json({ message: err.message });
        } else {
            res.status(500).json({ message: err.message });
        }
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await productsService.getAllProducts();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await productsService.getProductById(req.params.id);
        res.json(product);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { name, price, stock, description } = req.body;
        if (!name || price === undefined || stock === undefined) {
            return res.status(400).json({ message: 'Nama, harga, dan stok harus diisi' });
        }
        const updatedProduct = await productsService.updateProduct(req.params.id, { name, price, stock, description });
        res.json(updatedProduct);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        await productsService.deleteProduct(req.params.id);
        res.status(204).send(); // 204 No Content
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};