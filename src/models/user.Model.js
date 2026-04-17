import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../config/db.js";

const UserModel = sequelize.define('User',
    {
        dni: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        surname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        card_number: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        valid_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        cvv: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        type: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },

    },
    {
        tableName: 'user',
        timestamps: true
    })

export default UserModel;