# Arquitectura De La Aplicacion

## Vision general

La aplicacion sigue una arquitectura backend clasica en Express con separacion por capas:

- `routes`: define endpoints y delega en controladores
- `controllers`: traduce la peticion HTTP a logica de negocio
- `services`: encapsula el acceso a datos y operaciones sobre modelos
- `models`: define entidades y relaciones en Sequelize
- `config`: centraliza la conexion a la base de datos

## Flujo de peticion

```mermaid
flowchart LR
    cliente[Cliente HTTP]
    router[Router Express]
    controller[Controller]
    service[Service]
    model[Model Sequelize]
    db[(PostgreSQL)]

    cliente --> router
    router --> controller
    controller --> service
    service --> model
    model --> db
    db --> model
    model --> service
    service --> controller
    controller --> cliente
```

## Componentes principales

### Entrada de la aplicacion

`src/index.js` inicializa Express, carga variables de entorno, registra middlewares de parsing y monta el router principal.

### Conexion a base de datos

`src/config/db.js` crea la instancia de Sequelize y ejecuta:

- `checkDB()`
- `syncDB()`

### Router principal

`src/routes/router.js` monta `/api` como punto de entrada de la API.

### Router API

`src/routes/api/apiRouter.js` distribuye las peticiones entre:

- `category`
- `product`
- `user`
- `cart`

## Diagrama de clases simplificado

```mermaid
classDiagram
    class CategoryModel {
        +id: int
        +name: string
    }

    class ProductModel {
        +id: int
        +id_category: int
        +name: string
        +price: decimal
        +description: string
        +image: string
        +stock: int
        +on_discount: boolean
        +price_discount: decimal
    }

    class UserModel {
        +dni: string
        +username: string
        +email: string
        +password: string
        +name: string
        +surname: string
        +address: string
        +phone: string
        +card_number: bigint
        +valid_date: date
        +cvv: int
        +type: string
    }

    class CartModel {
        +id: int
        +user_dni: string
        +product_id: int
        +quantity: int
        +total_amount: decimal
        +updated_at: date
        +created_at: date
    }

    class CartController
    class CartService

    CategoryModel "1" --> "*" ProductModel : clasifica
    UserModel "1" --> "*" CartModel : contiene lineas
    ProductModel "1" --> "*" CartModel : aparece en
    CartController --> CartService : usa
    CartService --> CartModel : opera sobre
```

## Observaciones tecnicas

- El proyecto usa una arquitectura sencilla y mantenible para un contexto academico o de equipo pequeno.
- La capa de servicios reduce acoplamiento entre controladores y Sequelize.
- La ausencia de autenticacion hace que el usuario activo se gestione por integracion de frontend y no por middleware de sesion.
