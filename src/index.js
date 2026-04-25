import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { checkDB, syncDB } from './config/db.js';
import router from './routes/router.js';
import expressEjsLayouts from 'express-ejs-layouts';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(expressEjsLayouts);
app.use(express.static(path.resolve('public')));

app.use(express.urlencoded());
app.use(express.json());

app.use('/', router);

app.get('/', (req, res) => {
    res.render('pages/index', { layout: 'layouts/main' });
});

app.get('/admin', (req, res) => {
    res.render('dashboard/index', { layout: 'layouts/dashboard' });
});

checkDB();
syncDB();

app.listen(PORT, () => {
    console.log(`Servidor conectado correctamente por el puerto ${PORT}`)
})
