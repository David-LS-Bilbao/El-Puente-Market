# Notebook Cart

## Iteración 2 — Eliminación de líneas del carrito desde la vista web

### Objetivo

Añadir la acción mínima de borrado de productos desde la vista web del carrito,
manteniendo un flujo clásico de servidor y sin tocar la API existente.

### Trabajo realizado

#### 1. Ruta web de borrado

Se añadió una ruta `POST` para eliminar una línea concreta del carrito:

- `POST /carrito/:userDni/item/:id/delete`

La ruta quedó registrada en:

- `src/routes/cartViewRouter.js`

#### 2. Controlador web

Se implementó el handler:

- `deleteCartItemAndRedirect`

Sus responsabilidades son:

- leer `userDni` e `id` desde `req.params`
- buscar la línea del carrito correspondiente
- comprobar que pertenece al usuario indicado en la URL
- eliminarla de base de datos
- redirigir de vuelta a `/carrito/:userDni`

Si la línea no existe, responde con un `404` simple.

#### 3. Vista del carrito

Se actualizó:

- `src/views/pages/cart.ejs`

para incluir un formulario `POST` clásico por cada línea del carrito, con un
botón de eliminar.

No se añadió JavaScript.

#### 4. Estilos mínimos

Se añadieron estilos mínimos en:

- `public/css/cart.css`

para soportar:

- contenedor de acciones
- botón de eliminar
- estado visual simple y coherente con la vista actual

### Archivos modificados

- `src/controllers/web/cartViewController.js`
- `src/routes/cartViewRouter.js`
- `src/views/pages/cart.ejs`
- `public/css/cart.css`

### Decisiones tomadas

- Se usó formulario `POST` clásico, sin `fetch` ni AJAX.
- No se tocó la API del carrito.
- No se implementó edición de cantidad.
- No se añadieron mensajes flash ni lógica visual extra tras el borrado.
- El borrado se limitó al `userDni` presente en la URL para evitar eliminar una
  línea ajena por error.

### Resultado de la iteración

La vista web del carrito ya permite eliminar una línea existente y volver al
carrito del mismo usuario. Si al borrar desaparecen todos los productos, la
vista queda preparada para mostrar el estado vacío ya implementado en la
Iteración 1.

### Pendiente para una siguiente iteración

- mejorar la integración del acceso al carrito desde el header
- decidir cómo resolver el usuario del carrito sin depender manualmente de la URL
- valorar si conviene mostrar feedback visual tras el borrado
