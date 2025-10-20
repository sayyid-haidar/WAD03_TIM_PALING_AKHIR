const { DataTypes } = require('sequelize');

// Fungsi ini akan dipanggil oleh koneksi Sequelize utama
module.exports = (sequelize) => {
    // Mendefinisikan model 'Product'
    const Product = sequelize.define('Product', {
        // Atribut model
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        category: {
            type: DataTypes.STRING,
            allowNull: true
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: true
        },
        sellerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        }
    }, {
        // Opsi model
        tableName: 'products',
        timestamps: true
    });

    return Product;
};
