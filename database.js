const { Sequelize } = require('sequelize');
const path = require('path');

// 1. Konfigurasi koneksi Sequelize
const sequelize = new Sequelize('postgresWAD', 'postgres', 'kataguaa', {
    host: 'localhost',
    dialect: 'postgres'
});

const db = {};

// 2. Masukkan instance Sequelize dan class Sequelize ke object db
db.Sequelize = Sequelize; // Menyimpan library Sequelize itu sendiri untuk mengakses tipe data dan alat lainnya.
db.sequelize = sequelize; // Menyimpan koneksi aktif ke database.

// 3. Muat model User dan hubungkan dengan instance sequelize
db.users = require(path.join(__dirname, 'src/models/user.js'))(sequelize, Sequelize);
// (Jika ada model lain, tambahkan di sini)

module.exports = db;