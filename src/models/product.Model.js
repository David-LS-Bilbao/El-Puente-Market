import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../config/db.js";

const ProductModel = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_category: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "category", key: "id" },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    on_discount: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    price_discount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "product",
    timestamps: false,
  },
);

export default ProductModel;
