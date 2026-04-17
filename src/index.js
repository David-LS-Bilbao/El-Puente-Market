import express from 'express';
import dotenv from 'dotenv';
import { checkDB, syncDB } from './config/db.js';
import router from './routes/router.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.urlencoded());
app.use(express.json());

app.use('/', router);

checkDB();
syncDB();

app.listen(PORT, () => {
    console.log(`Servidor conectado correctamente por el puerto ${PORT}`)
})