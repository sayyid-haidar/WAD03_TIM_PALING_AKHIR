const productsRepo = require('../repositories/productsRepository');
const usersRepo = require('../repositories/usersRepository');

async function getAllProducts() {
    return productsRepo.getAll();
}

async function getProductById(id) {
    const product = await productsRepo.findById(id);
    if (!product) {
        throw new Error('Product tidak ditemukan');
    }
    return product;
}

async function getProductsBySellerId(sellerId) {
    const seller = await usersRepo.findByUsername(sellerId);
    if (!seller) {
        throw new Error('Seller tidak ditemukan');
    }
    return productsRepo.findBySellerId(seller.id);
}

async function createProduct({ name, description, price, stock, category, imageUrl, sellerId }) {
    // Validasi seller exists
    const seller = await usersRepo.findByUsername(sellerId);
    if (!seller) {
        throw new Error('Seller tidak ditemukan');
    }

    // Validasi seller role
    if (seller.role !== 'seller') {
        throw new Error('User bukan seller');
    }

    // Validasi price dan stock
    if (price <= 0) {
        throw new Error('Harga harus lebih dari 0');
    }
    if (stock < 0) {
        throw new Error('Stock tidak boleh negatif');
    }

    return productsRepo.create({
        name,
        description,
        price,
        stock,
        category,
        imageUrl,
        sellerId: seller.id
    });
}

async function updateProduct(id, { name, description, price, stock, category, imageUrl, sellerId }) {
    const existingProduct = await productsRepo.findById(id);
    if (!existingProduct) {
        throw new Error('Product tidak ditemukan');
    }

    // Validasi seller ownership
    const seller = await usersRepo.findByUsername(sellerId);
    if (!seller || seller.id !== existingProduct.sellerId) {
        throw new Error('Anda tidak memiliki akses untuk mengupdate product ini');
    }

    // Validasi price dan stock
    if (price <= 0) {
        throw new Error('Harga harus lebih dari 0');
    }
    if (stock < 0) {
        throw new Error('Stock tidak boleh negatif');
    }

    return productsRepo.update(id, {
        name,
        description,
        price,
        stock,
        category,
        imageUrl
    });
}

async function deleteProduct(id, sellerId) {
    const existingProduct = await productsRepo.findById(id);
    if (!existingProduct) {
        throw new Error('Product tidak ditemukan');
    }

    // Validasi seller ownership
    const seller = await usersRepo.findByUsername(sellerId);
    if (!seller || seller.id !== existingProduct.sellerId) {
        throw new Error('Anda tidak memiliki akses untuk menghapus product ini');
    }

    return productsRepo.deleteProduct(id);
}

module.exports = {
    getAllProducts,
    getProductById,
    getProductsBySellerId,
    createProduct,
    updateProduct,
    deleteProduct
};
