import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../config/db.js";

const CartModel = sequelize.define(
  "Cart",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_dni: {
      type: DataTypes.STRING(9),
      allowNull: false,
      references: { model: "user", key: "dni" },
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "product", key: "id" },
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
    },
    total_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "cart",
    timestamps: false,
  },
);

export default CartModel;
