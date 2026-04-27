import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;

const sequelize = new Sequelize(
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    {
        host: DB_HOST,
        port: DB_PORT,
        dialect: 'postgres'
    }
);

async function checkDB() {
    try {
        await sequelize.authenticate();
        console.log('Conexión a la BBDD establecida correctamente.')
    } catch (error) {
        console.error('No se ha conectado a la BBDD.', error);
    };
};

async function syncDB() {
    try {
        await sequelize.sync({ alter: true });
        console.log('BBDD sincronizada.');
    } catch (error) {
        console.error('No se ha podido sincronizar', error);
    }
};

export { checkDB, syncDB };
export default sequelize;