# Resumen Del Proyecto

## Descripcion

El Puente Market es una aplicacion backend orientada a un supermercado online. Su responsabilidad principal es exponer una API REST para gestionar entidades de negocio y mantener la persistencia de los datos en PostgreSQL.

La aplicacion esta construida con una arquitectura por capas sencilla:

- rutas
- controladores
- servicios
- modelos

## Objetivo funcional

La aplicacion cubre actualmente estas capacidades:

- consultar categorias
- consultar y gestionar productos
- consultar y gestionar usuarios
- consultar y gestionar el carrito

## Modulos principales

### Categorias

Gestiona el catalogo de categorias y permite crear, consultar, actualizar y eliminar registros.

### Productos

Gestiona el inventario de productos, su categoria, precio, stock y estado de descuento.

### Usuarios

Gestiona los datos de usuario almacenados en base de datos.

### Carrito

Relaciona usuarios y productos a traves de lineas de carrito con cantidad y total acumulado.

## Alcance actual

La aplicacion se centra en backend y API. No implementa todavia un sistema completo de autenticacion o sesiones de usuario reales.

## Estado de madurez

El proyecto se encuentra en una fase funcional de integracion:

- la API responde correctamente sobre las entidades principales
- la base de datos esta conectada con Sequelize
- la documentacion tecnica queda separada por areas para facilitar su mantenimiento
