### [2026-04-27] Integración de vistas web y fix de flujo de auth — rama PUENTE-51

- Objetivo: integrar las vistas del panel de administración y corregir el flujo de autenticación web para que funcione de forma coherente con sesión.
- Trabajo realizado: se corrigió `authViewController.js` (login unificado con redirección por tipo de usuario) y `authMiddleware.js` (`checkCredentials` sin bloqueo admin-only, `requireRole` con null-guard). El login web ahora redirige a `/admin` si `type = admin` y a `/` si `type = cliente`. Se creó usuario de prueba admin (DNI `12345678X`) en la BD local.
- Archivos afectados: `src/controllers/views/authViewController.js`, `src/middlewares/authMiddleware.js`, `src/middlewares/productMiddleware.js`.
- Resultado: login web funcional para admin y cliente, panel `/admin` accesible con sesión admin real, logout operativo.
- Validación: login admin → `/admin` OK, login cliente → `/` OK, credenciales incorrectas → mensaje de error OK, `/admin` sin sesión → redirige a login OK.
- Rama integrada: `test/integracion-from-puente23` mergeada en `PUENTE-51/test-integracion-vistas` vía fast-forward sin conflictos.

---

### [2026-04-18] Cierre funcional de la feature `cart` en la API

- Objetivo: implementar la API del recurso `cart` en backend Express + Sequelize, conectando rutas, controlador y modelos con PostgreSQL.
- Trabajo realizado: se crearon las rutas `GET /api/cart`, `GET /api/cart/user/:userDni`, `POST /api/cart` y `DELETE /api/cart/:id`, junto con su controlador e integración con `CartModel`, `UserModel` y `ProductModel`. También se corrigieron imports inconsistentes en `models/index.js`, la validación antigua del `POST` y el criterio inicial de borrado.
- Archivos afectados: `src/routes/router.js`, `src/routes/api/apiRouter.js`, `src/routes/cartRouter.js`, `src/controllers/api/cartController.js`, `src/models/index.js` y `src/models/cart.Model.js`.
- Resultado: la feature quedó alineada con el esquema real actual de la tabla `cart` (`id`, `user_dni`, `product_id`, `quantity`, `updated_at`, `total_amount`, `created_at`) y validada manualmente con Postman.
- Validación: `GET /api/cart` OK, `GET /api/cart/user/:userDni` OK, `POST /api/cart` OK con `201 Created`, y borrado adaptado a `DELETE /api/cart/:id` pendiente de validación manual final antes del merge.
- Próximo paso: cerrar validación final del `DELETE` por `id` y mergear la feature a la rama de integración.




