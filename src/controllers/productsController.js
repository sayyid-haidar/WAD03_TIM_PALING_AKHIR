const usersController = require('./usersController');
const productsService = require('../services/productsService');

exports.createProduct = async (req, res) => {
    try {
        const { product_name, product_category, price, owner } = req.body;
        
        if (!product_name || !product_category || !price || !owner) {
            return res.status(400).json({ message: 'Semua field harus diisi' });
        }

        const ownerLower = owner.toLowerCase();
        const users = usersController.getAllUsers({ query: {} }, { json: (data) => data });
        const user = users.find(u => u.username === ownerLower);
        
        if (!user) {
            return res.status(404).json({ message: 'Owner tidak ditemukan' });
        }
        
        if (user.role !== 'seller') {
            return res.status(403).json({ message: 'Hanya seller yang dapat membuat produk' });
        }

        const productSlug = product_name.toLowerCase().replace(/\s+/g, '-');
        const exists = products.some(p => p.product_slug === productSlug);
        
        if (exists) {
            return res.status(409).json({ message: 'Nama produk sudah digunakan' });
        }

        const newProduct = { 
            product_name, 
            product_slug: productSlug,
            product_category, 
            price: Number(price), 
            owner: ownerLower 
        };
        products.push(newProduct);
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(500).json({ message: err.message });
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