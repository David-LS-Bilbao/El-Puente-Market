import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../config/db.js";

const ProductModel = sequelize.define('Product',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        on_discount: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        price_discount: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
    },
    {
        tableName: 'product',
        timestamps: true
    })

export default ProductModel;