# Pruebas Y Validacion

## Enfoque de validacion

El proyecto se ha validado principalmente mediante pruebas manuales sobre la API y el arranque del servidor.

## Validaciones funcionales registradas

### Categorias

- `GET /api/category` responde correctamente

### Carrito

- `GET /api/cart` responde `200 OK`
- `GET /api/cart/user/:userDni` responde `200 OK`
- `POST /api/cart` responde `201 Created`
- `DELETE /api/cart/:id` se ha validado con un `id` real de carrito

## Validaciones tecnicas

- La aplicacion conecta con PostgreSQL mediante Sequelize.
- La inicializacion del servidor se realiza correctamente.
- La sincronizacion del esquema se ejecuta al arrancar con `sequelize.sync({ alter: true })`.

## Evidencia historica integrada

De la evidencia previa registrada en el proyecto se desprende que la feature `cart` quedo cerrada con:

- rutas montadas en Express
- integracion con `CartModel`, `UserModel` y `ProductModel`
- validacion manual de endpoints principales

## Limitaciones detectadas

- No existen scripts de `test` automatizados en `package.json`.
- No existe `lint` automatizado en el estado actual del proyecto.
- Parte de la validacion sigue dependiendo de comprobaciones manuales y de datos reales en la base de datos.

## Recomendaciones

1. Incorporar pruebas automatizadas para servicios y controladores.
2. Definir un conjunto minimo de datos semilla para validar el proyecto en local.
3. Sustituir progresivamente las validaciones manuales por pruebas repetibles.
