const db = require('../../database');

async function getAll() {
    const products = await db.products.findAll({
        include: [{
            model: db.users,
            as: 'seller',
            attributes: ['id', 'username', 'name', 'email']
        }]
    });
    return products;
}

async function findById(id) {
    const product = await db.products.findOne({
        where: { id: id },
        include: [{
            model: db.users,
            as: 'seller',
            attributes: ['id', 'username', 'name', 'email']
        }]
    });
    return product;
}

async function findBySellerId(sellerId) {
    const products = await db.products.findAll({
        where: { sellerId: sellerId },
        include: [{
            model: db.users,
            as: 'seller',
            attributes: ['id', 'username', 'name', 'email']
        }]
    });
    return products;
}

async function create({ name, description, price, stock, category, imageUrl, sellerId }) {
    const newProduct = await db.products.create({
        name,
        description,
        price,
        stock,
        category,
        imageUrl,
        sellerId
    });
    return newProduct;
}

async function update(id, { name, description, price, stock, category, imageUrl }) {
    const productToUpdate = await db.products.findOne({ where: { id: id } });

    if (productToUpdate) {
        productToUpdate.name = name;
        productToUpdate.description = description;
        productToUpdate.price = price;
        productToUpdate.stock = stock;
        productToUpdate.category = category;
        productToUpdate.imageUrl = imageUrl;

        await productToUpdate.save();
        return productToUpdate;
    }
    return null;
}

async function deleteProduct(id) {
    const product = await db.products.findOne({ where: { id: id } });
    if (product) {
        await product.destroy();
        return true;
    }
    return false;
}

module.exports = {
    getAll,
    findById,
    findBySellerId,
    create,
    update,
    deleteProduct
};
