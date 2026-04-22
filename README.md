# El Puente Market

Aplicacion backend para un supermercado online desarrollada con Node.js, Express, Sequelize y PostgreSQL.

El proyecto expone una API REST para gestionar categorias, productos, usuarios y carrito, y sirve como base tecnica para la integracion de las distintas features del equipo.

## Objetivo

El objetivo de la aplicacion es centralizar la logica de negocio principal de un e-commerce de supermercado:

- gestion de categorias y productos
- gestion de usuarios
- gestion del carrito de compra
- conexion con una base de datos PostgreSQL mediante Sequelize

## Stack principal

- Node.js
- Express
- PostgreSQL
- Sequelize
- dotenv
- nodemon

## Puesta en marcha

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

Usar `.env` tomando como referencia `.env.example`.

Variables minimas:

- `DB_NAME`
- `DB_USER`
- `DB_PASSWORD`
- `DB_HOST`
- `DB_PORT`
- `PORT`

### 3. Arrancar la aplicacion

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

## Estructura general

```text
src/
  config/
  controllers/
    api/
  middlewares/
  models/
  routes/
    api/
  services/
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

## Estado actual

El proyecto dispone de:

- conexion operativa con PostgreSQL
- sincronizacion de modelos con Sequelize
- API REST de categorias
- API REST de productos
- API REST de usuarios
- API REST de carrito

## Observaciones

- El proyecto no define actualmente scripts de `test` ni `lint` en `package.json`.
- La sincronizacion del esquema se realiza mediante `sequelize.sync({ alter: true })`, por lo que conviene usarla con cuidado en entornos compartidos.
