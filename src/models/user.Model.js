import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../config/db.js";

const UserModel = sequelize.define(
  "User",
  {
    dni: {
      type: DataTypes.STRING(9),
      primaryKey: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    card_number: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    valid_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    cvv: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING,
      defaultValue: "cliente",
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "user",
    timestamps: false,
  },
);

export default UserModel;
