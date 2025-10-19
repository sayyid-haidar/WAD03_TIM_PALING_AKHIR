const { DataTypes } = require('sequelize');
const { underscoredIf } = require('sequelize/lib/utils');

// Fungsi ini akan dipanggil oleh koneksi Sequelize utama
module.exports = (sequelize) => {
    // Mendefinisikan model 'User'
    const User = sequelize.define('User', {
        // Atribut model
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'buyer' // Menyesuaikan dengan role yang sudah ada
        }
    }, {
        // Opsi model
        tableName: 'users', // Nama tabel di database
        timestamps: true,    // Otomatis menambahkan kolom createdAt dan updatedAt
    });

    return User;
};