import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../config/db.js";

const CategoryModel = sequelize.define('Category',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        tableName: 'category',
        timestamps: false
    })

export default CategoryModel;