import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../config/db.js";

const CartModel = sequelize.define('Cart',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        purchase_timestamp: {
            type: DataTypes.DATE,
            allowNull: false
        },
        total_amount: {
            type: DataTypes.NUMBER,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('open', 'close'),
            allowNull: false,
            defaultValue: 'open'
        },
    },
    {
        tableName: 'cart',
        timestamps: true
    })

export default CartModel;