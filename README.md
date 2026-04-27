# El Puente Market

Backend con vistas web en Node.js + Express + Sequelize para el proyecto **El Puente Market**, e-commerce de supermercado con PostgreSQL como base de datos.

## Stack

- Node.js + Express
- PostgreSQL + Sequelize
- EJS + express-ejs-layouts (vistas server-side)
- express-session (sesión web)
- bcrypt + JWT (autenticación)
- dotenv / nodemon

## Estructura del proyecto

```text
src/
  config/         configuración de base de datos
  controllers/
    api/          controladores para la API REST
    views/        controladores para las vistas web
  middlewares/    auth web, auth API, validación de productos
  models/         modelos Sequelize
  routes/
    api/          rutas de la API REST (/api/*)
    views/        rutas de las vistas web
  services/       lógica de negocio
  views/
    auth/         login y registro
    dashboard/    panel de administración (product, category, cart, user)
    layouts/      layouts EJS (main, auth, dashboard)
    pages/        vistas públicas (index, productos, detalle)
    partials/     componentes reutilizables
docs/
```

## Puesta en marcha

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

Crea un `.env` basándote en `.env.example`:

```env
DB_NAME=
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_PORT=5432
SESSION_SECRET=
JWT_SECRET=
```

### 3. Arrancar el servidor

Modo desarrollo:

```bash
npm run dev
```

Modo producción:

```bash
npm start
```

Servidor por defecto: `http://localhost:3000`

---

## Autenticación

El proyecto tiene dos capas de auth independientes:

| Capa | Mecanismo | Uso |
|---|---|---|
| Vistas web | Sesión (`express-session`) | Login en `/auth/login`, acceso a `/admin` |
| API REST | JWT (Bearer token) | Endpoints `/api/*` |

### Tipos de usuario

| `type` | Acceso |
|---|---|
| `admin` | Rutas públicas + panel `/admin/*` completo |
| `cliente` | Rutas públicas + carrito |

### Flujo de login web

1. `POST /auth/login` con `dni` y `password`
2. Si las credenciales son correctas:
   - `type = admin` → redirige a `/admin`
   - `type = cliente` → redirige a `/`
3. Si son incorrectas → redirige a `/auth/login?message=...`

---

## Rutas web (vistas)

### Públicas

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/` | Listado de productos |
| `GET` | `/product/:id` | Detalle de producto |
| `GET` | `/category/:id` | Productos por categoría |
| `GET` | `/auth/login` | Formulario de login |
| `POST` | `/auth/login` | Procesar login |
| `POST` | `/auth/logout` | Cerrar sesión |
| `GET` | `/auth/register` | Formulario de registro |
| `POST` | `/auth/register` | Procesar registro |
| `GET` | `/carrito/:userDni/sidebar` | Sidebar del carrito |
| `POST` | `/carrito/:userDni/item/:id/delete` | Eliminar item del carrito |

### Panel de administración (requiere sesión `admin`)

#### Dashboard
| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/admin` | Panel principal |

#### Productos
| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/admin/product` | Listado |
| `GET` | `/admin/product/create` | Formulario de creación |
| `GET` | `/admin/product/edit/:id` | Formulario de edición |
| `GET` | `/admin/product/details/:id` | Detalle |
| `POST` | `/admin/product` | Crear producto |
| `POST` | `/admin/product/:id` | Actualizar producto |
| `POST` | `/admin/product/delete/:id` | Eliminar producto |

#### Categorías
| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/admin/category` | Listado |
| `GET` | `/admin/category/create` | Formulario de creación |
| `GET` | `/admin/category/edit/:id` | Formulario de edición |
| `GET` | `/admin/category/details/:id` | Detalle |
| `POST` | `/admin/category` | Crear categoría |
| `POST` | `/admin/category/:id` | Actualizar categoría |
| `POST` | `/admin/category/delete/:id` | Eliminar categoría |

#### Carrito
| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/admin/cart` | Listado de items |
| `GET` | `/admin/cart/edit/:id` | Formulario de edición |
| `POST` | `/admin/cart/:id` | Actualizar item |
| `POST` | `/admin/cart/delete/:id` | Eliminar item |

#### Usuarios
| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/admin/user` | Listado |
| `GET` | `/admin/user/create` | Formulario de creación |
| `GET` | `/admin/user/edit/:dni` | Formulario de edición |
| `GET` | `/admin/user/details/:dni` | Detalle |
| `POST` | `/admin/user` | Crear usuario |
| `POST` | `/admin/user/:dni` | Actualizar usuario |
| `POST` | `/admin/user/delete/:dni` | Eliminar usuario |

---

## API REST (`/api`)

### Auth

| Método | Ruta | Descripción |
|---|---|---|
| `POST` | `/api/auth/register` | Registrar usuario |
| `POST` | `/api/auth/login` | Login, devuelve JWT |

### Productos

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/api/product` | Todos los productos |
| `GET` | `/api/product/category/:id` | Productos por categoría |
| `POST` | `/api/product` | Crear producto |
| `PUT` | `/api/product/:id` | Reemplazar producto |
| `PATCH` | `/api/product/:id` | Actualizar campo |
| `DELETE` | `/api/product/:id` | Eliminar producto |

### Categorías

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/api/category` | Todas las categorías |
| `GET` | `/api/category/:id` | Categoría por id |
| `POST` | `/api/category` | Crear categoría |
| `PUT` | `/api/category/:id` | Actualizar categoría |
| `DELETE` | `/api/category/:id` | Eliminar categoría |

### Carrito

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/api/cart` | Todos los items |
| `GET` | `/api/cart/user/:userDni` | Carrito de un usuario |
| `GET` | `/api/cart/:id` | Item por id |
| `POST` | `/api/cart` | Añadir item |
| `PATCH` | `/api/cart/:id` | Actualizar item |
| `DELETE` | `/api/cart/:id` | Eliminar item |

### Usuarios (requiere JWT admin)

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/api/user` | Todos los usuarios |
| `GET` | `/api/user/:dni` | Usuario por DNI |
| `POST` | `/api/user` | Crear usuario |
| `PUT` | `/api/user/:dni` | Actualizar usuario |
| `DELETE` | `/api/user/:dni` | Eliminar usuario |

---

## Usuario de prueba admin

Para desarrollo local existe un usuario admin en la BD:

| Campo | Valor |
|---|---|
| DNI | `12345678X` |
| Username | `admin` |
| Password | `1234` |

---

## Notas

- `syncDB` usa `{ alter: true }` — modifica columnas en cada arranque en desarrollo
- El proyecto no dispone de scripts de test ni lint automatizados
- La API devuelve JWT pero no lo valida en rutas de vistas — ambas capas son independientes
