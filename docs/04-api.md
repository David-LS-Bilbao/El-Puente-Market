# API REST

## Base URL

```text
http://localhost:3000/api
```

## Categorias

### `GET /category`

Obtiene todas las categorias.

### `GET /category/:id`

Obtiene una categoria por identificador.

### `POST /category`

Crea una categoria nueva.

### `PUT /category/:id`

Actualiza una categoria existente.

### `DELETE /category/:id`

Elimina una categoria.

## Productos

### `GET /product`

Obtiene todos los productos.

### `GET /product/category/:id`

Obtiene los productos que pertenecen a una categoria concreta.

### `POST /product`

Crea un producto nuevo.

### `PUT /product/:id`

Actualiza completamente un producto.

### `PATCH /product/:id`

Actualiza parcialmente un producto.

### `DELETE /product/:id`

Elimina un producto.

## Usuarios

### `GET /user`

Obtiene todos los usuarios.

### `GET /user/:dni`

Obtiene un usuario por DNI.

### `POST /user`

Crea un usuario nuevo.

### `PUT /user/:dni`

Actualiza un usuario.

### `DELETE /user/:dni`

Elimina un usuario.

## Carrito

### `GET /cart`

Obtiene todas las lineas de carrito.

### `GET /cart/user/:userDni`

Obtiene las lineas de carrito de un usuario.

### `GET /cart/:id`

Obtiene una linea de carrito por identificador.

### `POST /cart`

Crea una linea de carrito.

Ejemplo de body:

```json
{
  "user_dni": "12345678A",
  "product_id": 2,
  "quantity": 3,
  "total_amount": 2.97
}
```

### `PATCH /cart/:id`

Actualiza parcialmente una linea de carrito.

### `DELETE /cart/:id`

Elimina una linea de carrito.

## Respuestas y errores

El proyecto devuelve principalmente respuestas JSON en la API. En los controladores se observan estos patrones:

- `200 OK` para lecturas, actualizaciones y borrados correctos
- `201 Created` para creaciones correctas
- `400 Bad Request` cuando faltan datos obligatorios o la actualizacion no incluye campos
- `404 Not Found` cuando no existe el recurso
- `500 Internal Server Error` cuando ocurre un error no controlado

## Limitaciones actuales

- No existe todavia una especificacion OpenAPI o Swagger.
- La validacion de entrada no es uniforme en todos los recursos.
- No todos los endpoints documentan explicitamente su esquema de respuesta en codigo.
