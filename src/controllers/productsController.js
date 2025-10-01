const usersController = require('./usersController');

let products = [
    { product_name: 'Laptop Asus', product_slug: 'laptop-asus', product_category: 'Electronics', price: 15000000, owner: 'aloyloy' },
    { product_name: 'Mouse Logitech', product_slug: 'mouse-logitech', product_category: 'Electronics', price: 250000, owner: 'sandrasan' },
];

exports.createProduct = (req, res) => {
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
};

exports.getAllProducts = (req, res) => {
    res.json(products);
};

exports.getProductBySlug = (req, res) => {
    const productSlug = req.params.slug;
    const product = products.find(p => p.product_slug === productSlug);
    
    if (!product) {
        return res.status(404).json({ message: 'Produk tidak ditemukan' });
    }
    
    res.json(product);
};