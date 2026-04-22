# Decisiones Tecnicas

## Stack elegido

### Node.js + Express

Se ha optado por Express por su sencillez para construir una API REST ligera y facil de repartir por tareas en un equipo.

### PostgreSQL

Se ha escogido PostgreSQL como base de datos relacional por su robustez y por encajar bien con un dominio que tiene relaciones claras entre usuarios, productos, categorias y carrito.

### Sequelize

Sequelize permite definir modelos, asociaciones y sincronizacion con la base de datos desde JavaScript, lo que acelera la construccion inicial del proyecto.

## Separacion por capas

La aplicacion usa una separacion sencilla en:

- rutas
- controladores
- servicios
- modelos

Esta decision facilita:

- repartir trabajo por features
- reducir acoplamiento
- mantener una lectura clara del flujo

## Modelado del carrito

El carrito se ha modelado como una entidad intermedia `cart` entre `user` y `product`.

Ventajas:

- permite representar multiples lineas por usuario
- guarda cantidad y total por linea
- mantiene trazabilidad de cada item del carrito

## Sincronizacion del esquema

El proyecto utiliza:

```js
sequelize.sync({ alter: true })
```

Ventaja:

- acelera el desarrollo inicial y la sincronizacion de cambios de modelo

Riesgo:

- puede ejecutar alteraciones automaticas sobre la base de datos en cada arranque
- no sustituye una estrategia formal de migraciones

## Limitaciones actuales

- no existe autenticacion real ni gestion de sesiones
- no existe un sistema formal de autorizacion por roles
- no hay pruebas automatizadas ni lint integrados
- la documentacion de la API no sigue todavia un estandar OpenAPI

## Mejoras recomendadas a futuro

1. Incorporar autenticacion y sesion reales.
2. Sustituir `sync({ alter: true })` por migraciones versionadas.
3. Anadir tests y validaciones automáticas.
4. Definir una documentacion OpenAPI para la API.
