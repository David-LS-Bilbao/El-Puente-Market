# Modelo De Datos

## Entidades principales

### `category`

Representa las categorias del catalogo.

Campos principales:

- `id`
- `name`

### `product`

Representa los productos de la tienda.

Campos principales:

- `id`
- `id_category`
- `name`
- `price`
- `description`
- `image`
- `stock`
- `on_discount`
- `price_discount`
- `created_at`

### `user`

Representa los usuarios almacenados en la base de datos.

Campos principales:

- `dni`
- `username`
- `email`
- `password`
- `name`
- `surname`
- `address`
- `phone`
- `card_number`
- `valid_date`
- `cvv`
- `type`
- `created_at`

### `cart`

Representa una linea de carrito que vincula usuario y producto.

Campos principales:

- `id`
- `user_dni`
- `product_id`
- `quantity`
- `total_amount`
- `updated_at`
- `created_at`

## Relaciones

- Una categoria tiene muchos productos.
- Un producto pertenece a una categoria.
- Un usuario tiene muchas lineas de carrito.
- Un producto puede aparecer en muchas lineas de carrito.
- `cart` actua como tabla intermedia entre usuarios y productos.

## Diagrama entidad-relacion

```mermaid
erDiagram
    CATEGORY ||--o{ PRODUCT : clasifica
    USER ||--o{ CART : posee
    PRODUCT ||--o{ CART : referencia

    CATEGORY {
        INT id PK
        STRING name
    }

    PRODUCT {
        INT id PK
        INT id_category FK
        STRING name
        DECIMAL price
        STRING description
        STRING image
        INT stock
        BOOLEAN on_discount
        DECIMAL price_discount
        DATE created_at
    }

    USER {
        STRING dni PK
        STRING username
        STRING email
        STRING password
        STRING name
        STRING surname
        STRING address
        STRING phone
        BIGINT card_number
        DATE valid_date
        INT cvv
        STRING type
        DATE created_at
    }

    CART {
        INT id PK
        STRING user_dni FK
        INT product_id FK
        INT quantity
        DECIMAL total_amount
        DATE updated_at
        DATE created_at
    }
```

## Reglas de negocio observables

- `product.id_category` debe apuntar a una categoria existente.
- `cart.user_dni` debe apuntar a un usuario existente.
- `cart.product_id` debe apuntar a un producto existente.
- `quantity` representa la cantidad de producto en una linea del carrito.
- `total_amount` representa el total acumulado de esa linea.

## Observacion

En el estado actual del proyecto, la definicion del esquema y las relaciones se resuelven desde Sequelize y se sincronizan automaticamente con la base de datos.
