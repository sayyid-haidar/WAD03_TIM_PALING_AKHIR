require('dotenv').config();
const { Sequelize } = require('sequelize');
const path = require('path');

// 1. Konfigurasi koneksi Sequelize menggunakan environment variables
const sequelize = new Sequelize(
    process.env.DB_NAME || 'postgresWAD',
    process.env.DB_USER || 'postgres',
    process.env.DB_PASSWORD || 'kataguaa',
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: process.env.DB_DIALECT || 'postgres'
    }
);

const db = {};

// 2. Masukkan instance Sequelize dan class Sequelize ke object db
db.Sequelize = Sequelize; // Menyimpan library Sequelize itu sendiri untuk mengakses tipe data dan alat lainnya.
db.sequelize = sequelize; // Menyimpan koneksi aktif ke database.

// 3. Muat model User dan hubungkan dengan instance sequelize
db.users = require(path.join(__dirname, 'src/models/user.js'))(sequelize, Sequelize);
db.products = require(path.join(__dirname, 'src/models/product.js'))(sequelize, Sequelize);

// 4. Definisikan relasi antar model
// User has many Products (as seller)
db.users.hasMany(db.products, {
    foreignKey: 'sellerId',
    as: 'products'
});
db.products.belongsTo(db.users, {
    foreignKey: 'sellerId',
    as: 'seller'
});

module.exports = db;