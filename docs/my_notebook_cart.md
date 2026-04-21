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

---

## Iteración 3 — Integración básica desde header y mejora mínima de usabilidad

### Objetivo

Cerrar la integración básica del acceso al carrito desde la interfaz y mejorar
ligeramente la usabilidad de la vista, sin añadir autenticación ni lógica extra.

### Trabajo realizado

#### 1. Integración desde header

Se revisó el enlace del carrito en:

- `src/views/partials/header.ejs`

Antes apuntaba a una ruta no funcional:

- `/carrito`

Ahora apunta a una ruta web real del carrito usando una solución provisional
explícita:

- `/carrito/12345678A`

Para ello se añadió una constante local en el propio header con un `userDni`
de prueba, junto con un comentario aclarando que es temporal hasta tener auth
real.

#### 2. Mejora mínima de usabilidad en la vista

Se actualizó:

- `src/views/pages/cart.ejs`

para añadir:

- un texto breve que explica que el acceso actual al carrito es provisional
- un enlace de `Seguir comprando` en el estado vacío
- un enlace de `Seguir comprando` en el resumen del carrito

Esto deja una navegación más natural sin meter JavaScript ni cambios grandes.

#### 3. Estilos mínimos

Se añadieron estilos mínimos en:

- `public/css/cart.css`

para soportar:

- bloque informativo del acceso provisional
- botón/enlace visual de `Seguir comprando`

No se modificó más CSS global del proyecto.

### Archivos modificados

- `src/views/partials/header.ejs`
- `src/views/pages/cart.ejs`
- `public/css/cart.css`

### Decisiones tomadas

- No se añadió autenticación.
- No se añadió sesión.
- No se resolvió el usuario dinámicamente.
- Se usó un `userDni` provisional explícito para que el acceso desde el header
  fuese funcional ya en esta fase.
- Se mantuvo todo en render servidor, sin JavaScript.

### Resultado de la iteración

El icono del carrito del header ya lleva a una ruta funcional y la vista del
carrito tiene una navegación mínima más usable para volver a seguir comprando.

### Qué quedaría pendiente con auth real

- eliminar el `userDni` hardcodeado del header
- obtener el usuario desde sesión o token
- dejar de depender de la URL como base principal del acceso al carrito
- usar `req.user` o equivalente para cargar el carrito autenticado
