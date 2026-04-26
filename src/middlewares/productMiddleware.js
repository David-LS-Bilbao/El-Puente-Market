/**
 * Middleware que valida que el parámetro `id` de la URL sea un entero.
 *
 * @param {import('express').Request} req - Objeto de petición HTTP.
 * @param {import('express').Response} res - Objeto de respuesta HTTP.
 * @param {import('express').NextFunction} next - Función para pasar al siguiente middleware.
 * @returns {void}
 */
function checkProductId(req, res, next) {
  let { id } = req.params;
  id = Number(id);

  if (!Number.isInteger(id)) {
    res.status(400).json({ error: "id is not an integer" });
  }

  return next();
}

/**
 * Middleware que valida los datos necesarios para crear un nuevo producto.
 *
 * Verifica tipos y restricciones básicas de los campos requeridos en `req.body`.
 * Si algún campo no cumple las condiciones, responde con error 400 y detiene
 * la ejecución del middleware.
 *
 * @param {import('express').Request} req - Objeto de petición HTTP con los datos del producto en el body.
 * @param {import('express').Response} res - Objeto de respuesta HTTP.
 * @param {import('express').NextFunction} next - Función para pasar al siguiente middleware.
 * @returns {void}
 */
function checkNewProduct(req, res, next) {
  let { id_category, name, price, stock, on_discount } = req.body;
  [id_category, price, stock] = [
    Number(id_category),
    Number(price),
    Number(stock),
  ];

  if (!Number.isInteger(id_category)) {
    return res.status(400).json({ error: "id_category must be an integer" });
  }

  if (typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({ error: "name must be a non-empty string" });
  }

  if (Number.isNaN(price) || price <= 0) {
    return res
      .status(400)
      .json({ error: "price must be a valid positive number" });
  }

  if (!Number.isInteger(stock) || stock < 0) {
    return res
      .status(400)
      .json({ error: "stock must be a non-negative integer" });
  }

  if (typeof on_discount !== "boolean") {
    return res.status(400).json({ error: "on_discount must be a boolean" });
  }

  return next();
}

/**
 * Middleware que valida los campos de un producto en operaciones de actualización.
 *
 * Comprueba que los valores presentes en `req.body` cumplen las restricciones
 * de tipo y formato esperadas. Si algún campo no es válido, responde con un
 * error 400 y detiene la ejecución.
 *
 * @param {import('express').Request} req - Objeto de petición HTTP con los datos del producto a validar.
 * @param {import('express').Response} res - Objeto de respuesta HTTP.
 * @param {import('express').NextFunction} next - Función para pasar al siguiente middleware.
 * @returns {void}
 */
function checkProduct(req, res, next) {
  let { id_category, name, price, stock, on_discount } = req.body;
  [id_category, price, stock] = [
    Number(id_category),
    Number(price),
    Number(stock),
  ];

  if (!Number.isInteger(id_category)) {
    return res.status(400).json({ error: "id_category must be an integer" });
  }

  if (typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({ error: "name must be a non-empty string" });
  }

  if (Number.isNaN(price) || price <= 0) {
    return res
      .status(400)
      .json({ error: "price must be a valid positive number" });
  }

  if (!Number.isInteger(stock) || stock < 0) {
    return res
      .status(400)
      .json({ error: "stock must be a non-negative integer" });
  }

  if (typeof on_discount !== "boolean") {
    return res.status(400).json({ error: "on_discount must be a boolean" });
  }

  return next();
}

export const productMiddlewares = {
  checkProductId,
  checkNewProduct,
  checkProduct,
};

export default productMiddlewares;
