const { DataTypes } = require("sequelize");

// Fungsi ini akan dipanggil oleh koneksi Sequelize utama
module.exports = (sequelize) => {
  // Mendefinisikan model 'Cart'
  const Cart = sequelize.define(
    "Cart",
    {
      // Atribut model
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "products",
          key: "id",
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
    },
    {
      // Opsi model
      tableName: "carts",
      timestamps: true,
    }
  );

  return Cart;
};
