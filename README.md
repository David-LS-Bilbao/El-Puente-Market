# El Puente Market

Aplicacion backend con vistas web para un supermercado online desarrollada con Node.js, Express, Sequelize y PostgreSQL.

El proyecto expone una API REST y un panel de administracion web para gestionar categorias, productos, usuarios y carrito.

## Objetivo

El objetivo de la aplicacion es centralizar la logica de negocio principal de un e-commerce de supermercado:

- gestion de categorias y productos
- gestion de usuarios
- gestion del carrito de compra
- panel de administracion web protegido por sesion
- conexion con una base de datos PostgreSQL mediante Sequelize

## Stack principal

- Node.js + Express
- PostgreSQL + Sequelize
- EJS + express-ejs-layouts (vistas server-side)
- express-session (sesión web)
- bcrypt + JWT (autenticación)
- dotenv / nodemon

## Puesta en marcha

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

Usar `.env` tomando como referencia `.env.example`.

Variables minimas:

```env
DB_NAME=
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_PORT=5432
SESSION_SECRET=
JWT_SECRET=
PORT=
```

### 3. Arrancar la aplicacion

Modo desarrollo:

```bash
npm run dev
```

Modo normal:

```bash
npm start
```

Servidor por defecto: `http://localhost:3000`

## Estructura general

```text
src/
  config/
  controllers/
    api/          controladores API REST
    views/        controladores vistas web
  middlewares/
  models/
  routes/
    api/
    views/
  services/
  views/
    auth/         login y registro
    dashboard/    panel de administracion
    layouts/
    pages/        vistas publicas
    partials/
docs/
```

## Documentacion

Documentacion funcional y tecnica principal:

- [Resumen del proyecto](docs/00-resumen-proyecto.md)
- [Requisitos y casos de uso](docs/01-requisitos-y-casos-de-uso.md)
- [Arquitectura de la aplicacion](docs/02-arquitectura-aplicacion.md)
- [Modelo de datos](docs/03-modelo-datos.md)
- [API REST](docs/04-api.md)
- [Pruebas y validacion](docs/05-pruebas-y-validacion.md)
- [Decisiones tecnicas](docs/06-decisiones-tecnicas.md)

Documentacion interna de apoyo:

- [Integracion de ramas](docs/integracion_ramas.md)
- [Evidencias historicas](docs/evidencias.md)

## Autenticacion

El proyecto tiene dos capas de auth independientes:

| Capa | Mecanismo | Uso |
|---|---|---|
| Vistas web | Sesion (`express-session`) | Login en `/auth/login`, acceso a `/admin` |
| API REST | JWT (Bearer token) | Endpoints `/api/*` |

### Tipos de usuario

| `type` | Acceso |
|---|---|
| `admin` | Rutas publicas + panel `/admin/*` completo |
| `cliente` | Rutas publicas + carrito |

### Flujo de login web

1. `POST /auth/login` con `dni` y `password`
2. Si las credenciales son correctas:
   - `type = admin` → redirige a `/admin`
   - `type = cliente` → redirige a `/`
3. Si son incorrectas → redirige a `/auth/login?message=...`

## Rutas web (vistas)

### Publicas

| Metodo | Ruta | Descripcion |
|---|---|---|
| `GET` | `/` | Listado de productos |
| `GET` | `/product/:id` | Detalle de producto |
| `GET` | `/category/:id` | Productos por categoria |
| `GET` | `/auth/login` | Formulario de login |
| `POST` | `/auth/login` | Procesar login |
| `POST` | `/auth/logout` | Cerrar sesion |
| `GET` | `/auth/register` | Formulario de registro |
| `POST` | `/auth/register` | Procesar registro |
| `GET` | `/carrito/:userDni/sidebar` | Sidebar del carrito |
| `POST` | `/carrito/:userDni/item/:id/delete` | Eliminar item del carrito |

### Panel de administracion (requiere sesion admin)

| Metodo | Ruta | Descripcion |
|---|---|---|
| `GET` | `/admin` | Dashboard principal |
| `GET` | `/admin/product` | Listado de productos |
| `GET` | `/admin/product/create` | Crear producto |
| `GET` | `/admin/product/edit/:id` | Editar producto |
| `GET` | `/admin/product/details/:id` | Detalle producto |
| `POST` | `/admin/product` | Guardar producto |
| `POST` | `/admin/product/:id` | Actualizar producto |
| `POST` | `/admin/product/delete/:id` | Eliminar producto |
| `GET` | `/admin/category` | Listado de categorias |
| `GET` | `/admin/category/create` | Crear categoria |
| `GET` | `/admin/category/edit/:id` | Editar categoria |
| `GET` | `/admin/category/details/:id` | Detalle categoria |
| `POST` | `/admin/category` | Guardar categoria |
| `POST` | `/admin/category/:id` | Actualizar categoria |
| `POST` | `/admin/category/delete/:id` | Eliminar categoria |
| `GET` | `/admin/cart` | Listado de carritos |
| `GET` | `/admin/cart/edit/:id` | Editar item carrito |
| `POST` | `/admin/cart/:id` | Actualizar item |
| `POST` | `/admin/cart/delete/:id` | Eliminar item |
| `GET` | `/admin/user` | Listado de usuarios |
| `GET` | `/admin/user/create` | Crear usuario |
| `GET` | `/admin/user/edit/:dni` | Editar usuario |
| `GET` | `/admin/user/details/:dni` | Detalle usuario |
| `POST` | `/admin/user` | Guardar usuario |
| `POST` | `/admin/user/:dni` | Actualizar usuario |
| `POST` | `/admin/user/delete/:dni` | Eliminar usuario |

## API REST

### Auth

| Metodo | Ruta | Descripcion |
|---|---|---|
| `POST` | `/api/auth/register` | Registrar usuario |
| `POST` | `/api/auth/login` | Login, devuelve JWT |

### Productos

| Metodo | Ruta | Descripcion |
|---|---|---|
| `GET` | `/api/product` | Todos los productos |
| `GET` | `/api/product/category/:id` | Productos por categoria |
| `POST` | `/api/product` | Crear producto |
| `PUT` | `/api/product/:id` | Reemplazar producto |
| `PATCH` | `/api/product/:id` | Actualizar campo |
| `DELETE` | `/api/product/:id` | Eliminar producto |

### Categorias

| Metodo | Ruta | Descripcion |
|---|---|---|
| `GET` | `/api/category` | Todas las categorias |
| `GET` | `/api/category/:id` | Categoria por id |
| `POST` | `/api/category` | Crear categoria |
| `PUT` | `/api/category/:id` | Actualizar categoria |
| `DELETE` | `/api/category/:id` | Eliminar categoria |

### Carrito

| Metodo | Ruta | Descripcion |
|---|---|---|
| `GET` | `/api/cart` | Todos los items |
| `GET` | `/api/cart/user/:userDni` | Carrito de un usuario |
| `GET` | `/api/cart/:id` | Item por id |
| `POST` | `/api/cart` | Añadir item |
| `PATCH` | `/api/cart/:id` | Actualizar item |
| `DELETE` | `/api/cart/:id` | Eliminar item |

### Usuarios (requiere JWT admin)

| Metodo | Ruta | Descripcion |
|---|---|---|
| `GET` | `/api/user` | Todos los usuarios |
| `GET` | `/api/user/:dni` | Usuario por DNI |
| `POST` | `/api/user` | Crear usuario |
| `PUT` | `/api/user/:dni` | Actualizar usuario |
| `DELETE` | `/api/user/:dni` | Eliminar usuario |

## Usuario de prueba admin

Para desarrollo local existe un usuario admin en la BD:

| Campo | Valor |
|---|---|
| DNI | `12345678X` |
| Username | `admin` |
| Password | `1234` |

## Estado actual

El proyecto dispone de:

- conexion operativa con PostgreSQL
- sincronizacion de modelos con Sequelize
- API REST de categorias, productos, usuarios y carrito
- panel de administracion web con vistas EJS
- sistema de autenticacion web por sesion y API por JWT

## Observaciones

- El proyecto no define actualmente scripts de `test` ni `lint` en `package.json`.
- La sincronizacion del esquema se realiza mediante `sequelize.sync({ alter: true })`, por lo que conviene usarla con cuidado en entornos compartidos.
- La API devuelve JWT pero es independiente de la sesion web — ambas capas no se mezclan.
