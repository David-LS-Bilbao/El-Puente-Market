# Instrucciones de integracion de ramas y PRs

Este documento recoge el orden recomendado y los pasos exactos para integrar el trabajo del equipo en la rama `dev` con el menor numero posible de conflictos.

## Reparto de ramas

- `PUENTE-13/tabla-usuario` -> Usuario
- `PUENTE-14/tabla-producto` -> Producto
- `PUENTE-15/tabla-categoria` -> Categoria
- `PUENTE-16/tabla-carrito` -> Carrito

## Orden recomendado de integracion

Para reducir conflictos por dependencias entre modelos y rutas, el orden recomendado es:

1. `PUENTE-15/tabla-categoria`
2. `PUENTE-14/tabla-producto`
3. `PUENTE-13/tabla-usuario`
4. `PUENTE-16/tabla-carrito`

## Motivo del orden

- `Categoria` debe ir primero porque `Producto` suele depender de ella.
- `Producto` debe ir antes que `Carrito` porque `Cart` depende de `ProductModel`.
- `Usuario` tambien debe estar integrado antes que `Carrito` porque `Cart` depende de `UserModel`.
- `Carrito` es la rama mas integradora y toca modelos, asociaciones y rutas, por eso debe ir la ultima.

## Flujo recomendado para cada persona hoy

Cada integrante debe dejar su rama subida a remoto antes de empezar la integracion:

```bash
git add .
git commit -m "mensaje descriptivo"
git push origin NOMBRE_DE_SU_RAMA
```

Ejemplo para carrito:

```bash
git add .
git commit -m "feat(cart): implementa API cart"
git push origin PUENTE-16/tabla-carrito
```

## Flujo recomendado manana para integrar sin errores

No hacer merge local de todas las ramas a la vez. El proceso correcto es secuencial.

### Paso 1. Integrar la primera PR

Abrir y mergear primero la PR de:

```text
PUENTE-15/tabla-categoria -> dev
```

### Paso 2. Actualizar la siguiente rama con `dev`

La persona de la siguiente rama debe actualizar su rama antes de abrir o mergear su PR:

```bash
git fetch origin
git switch NOMBRE_DE_SU_RAMA
git merge origin/dev
git push origin NOMBRE_DE_SU_RAMA
```

### Paso 3. Repetir el proceso

Despues de cada merge en `dev`, la siguiente persona debe volver a hacer:

```bash
git fetch origin
git switch NOMBRE_DE_SU_RAMA
git merge origin/dev
git push origin NOMBRE_DE_SU_RAMA
```

Y solo despues abrir o mergear su PR.

## Secuencia completa recomendada

1. Mergear `PUENTE-15/tabla-categoria` a `dev`
2. Actualizar `PUENTE-14/tabla-producto` con `dev`
3. Mergear `PUENTE-14/tabla-producto` a `dev`
4. Actualizar `PUENTE-13/tabla-usuario` con `dev`
5. Mergear `PUENTE-13/tabla-usuario` a `dev`
6. Actualizar `PUENTE-16/tabla-carrito` con `dev`
7. Mergear `PUENTE-16/tabla-carrito` a `dev`

## Comandos exactos para actualizar una rama antes de la PR

Sustituir `MI_RAMA` por la rama de cada integrante.

```bash
git fetch origin
git switch MI_RAMA
git merge origin/dev
git status
git push origin MI_RAMA
```

## Si aparecen conflictos

Los puntos mas probables de conflicto en este proyecto son:

- `src/models/index.js`
- `src/routes/api/apiRouter.js`
- `README.md`

En caso de conflicto:

1. abrir el archivo con conflicto
2. conservar ambos cambios si no se pisan logicamente
3. revisar imports duplicados o incompatibles
4. comprobar que las rutas finales necesarias siguen montadas
5. guardar
6. marcar como resuelto

Comandos:

```bash
git add .
git commit -m "chore: resuelve conflictos con dev"
git push origin MI_RAMA
```

## Comprobaciones minimas despues de actualizar con `dev`

Antes de mergear la PR de cada rama, revisar al menos:

```bash
git status
```

Si el backend se va a probar localmente:

```bash
npm run dev
```

Y comprobar que siguen funcionando al menos los endpoints de esa feature.

## Recomendacion importante

Para este equipo es mejor usar:

```bash
git merge origin/dev
```

en vez de `git rebase origin/dev`, porque reduce el riesgo de errores si no estais trabajando todos los dias con rebase y conflictos complejos.

## Regla final

No mergear una PR si la rama no ha sido actualizada con el ultimo `dev` despues del merge anterior.

Ese paso es el que mas ayuda a que todo entre bien a la primera.
