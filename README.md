# El Puente Market

Backend en Node.js + Express + Sequelize para el proyecto **El Puente Market**, orientado a un e-commerce de supermercado con PostgreSQL como base de datos.

## Estado actual

El proyecto dispone actualmente de una base backend funcional con:

- servidor Express operativo
- conexión a PostgreSQL
- Sequelize configurado y sincronizando modelos
- endpoint funcional de categorías
- feature inicial de `cart` operativa

## Stack principal

- Node.js
- Express
- PostgreSQL
- Sequelize
- dotenv
- nodemon

## Estructura relevante

```text
src/
  config/
  controllers/
    api/
  models/
  routes/
    api/
docs/
```

## Puesta en marcha

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

Usa `.env` tomando como referencia `.env.example`.

Verifica al menos:

- `PORT`
- `DB_NAME`
- `DB_USER`
- `DB_PASSWORD`
- `DB_HOST`
- `DB_PORT`

## Arranque del proyecto

Modo desarrollo:

```bash
npm run dev
```

Modo normal:

```bash
npm start
```

Servidor por defecto:

```text
http://localhost:3000
```

## Endpoints disponibles

### Categorías

- `GET /api/category`

### Cart

- `GET /api/cart`
- `GET /api/cart/user/:userDni`
- `POST /api/cart`
- `DELETE /api/cart/:id`

## Ejemplo de body para crear un elemento en cart

```json
{
  "user_dni": "12345678A",
  "product_id": 2,
  "quantity": 3,
  "total_amount": 2.97
}
```

## Esquema actual de `cart`

La tabla `cart` trabaja actualmente con estas columnas:

- `id`
- `user_dni`
- `product_id`
- `quantity`
- `updated_at`
- `total_amount`
- `created_at`

## Validación funcional realizada

Se ha validado manualmente que:

- `GET /api/category` responde correctamente
- `GET /api/cart` responde `200 OK`
- `GET /api/cart/user/:userDni` responde `200 OK`
- `POST /api/cart` responde `201 Created`
- `DELETE /api/cart/:id` funciona usando el `id` real de la fila del carrito

## Notas

- El proyecto no dispone todavía de scripts de `test` ni `lint`
- La documentación funcional complementaria se está registrando en `docs/`
- La feature `cart` está integrada con `CartModel`, `UserModel` y `ProductModel`
