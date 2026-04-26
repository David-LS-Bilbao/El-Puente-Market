import 'dotenv/config'; // Shortcut to import and config at once
import express from 'express'; // <--- You were missing this!
import expressEjsLayouts from 'express-ejs-layouts';
import router from './routes/router.js';

// If checkDB and syncDB are functions from another file, import them too:
// import { checkDB, syncDB } from './config/db.js'; 

const PORT = process.env.PORT || 3000;
const app = express();

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use(expressEjsLayouts);
app.use(express.static("public"));

// Note: express.urlencoded and express.json are functions
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());

app.use('/', router);

app.get('/', (req, res) => {
    res.render('pages/index', { layout: 'layouts/main' });
});

app.get('/admin', (req, res) => {
    res.render('dashboard/index', { layout: 'layouts/dashboard' });
});

// Ensure these functions are defined or imported
if (typeof checkDB === 'function') checkDB();
if (typeof syncDB === 'function') syncDB();

app.listen(PORT, () => {
    console.log(`Servidor conectado correctamente por el puerto ${PORT}`);
});


























/*import express from 'express';
import dotenv from 'dotenv';
import { checkDB, syncDB } from './config/db.js';
import router from './routes/router.js';
import expressEjsLayouts from 'express-ejs-layouts';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use(expressEjsLayouts);
app.use(express.static("public"));

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
})*/