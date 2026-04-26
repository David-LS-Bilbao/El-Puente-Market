import productServices from "../../services/productServices.js";
import categoryService from "../../services/categoryService.js";

function normalizeProductPayload(body) {
  const priceDiscount =
    body.price_discount === "" || body.price_discount == null
      ? null
      : Number(body.price_discount);

  return {
    ...body,
    id_category: Number(body.id_category),
    price: Number(body.price),
    stock: Number(body.stock),
    on_discount: body.on_discount === true || body.on_discount === "true",
    price_discount: priceDiscount,
  };
}

/**
 * Obtiene todos los productos almacenados en la base de datos.
 *
 * @param {import('express').Request} req - Objeto de petición HTTP.
 * @param {import('express').Response} res - Objeto de respuesta HTTP que devuelve la lista de productos.
 * @returns {Promise<void>}
 */
async function getAllProducts(req, res) {
  const products = await productServices.getAllProducts();
  res.render("pages/index", { products, layout: "layouts/main" });
}

/**
 * Obtiene todos los productos almacenados en la base de datos.
 *
 * @param {import('express').Request} req - Objeto de petición HTTP.
 * @param {import('express').Response} res - Objeto de respuesta HTTP que devuelve la lista de productos.
 * @returns {Promise<void>}
 */
async function getAllViewProducts(req, res) {
  const products = await productServices.getAllProducts();
  res.render("dashboard/product/product", {
    products,
    layout: "layouts/dashboard",
  });
}

/**
 * Obtiene todos los productos que pertenecen a una categoría específica.
 *
 * @param {import('express').Request} req - Objeto de petición HTTP que contiene el id de la categoría en `req.params`.
 * @param {import('express').Response} res - Objeto de respuesta HTTP que devuelve los productos filtrados junto con su categoría.
 * @returns {Promise<void>}
 */
async function getProductsByCategory(req, res) {
  const products = await productServices.getProductsByCategory(req.params.id);
  res.render("pages/productsByCategory", { products, layout: "layouts/main" });
}

async function getPublicProductById(req, res) {
  const product = await productServices.getProductById(req.params.id);
  res.render("pages/productDetails", { product, layout: "layouts/main" });
}

/**
 * Crea un nuevo producto en la base de datos a partir de los datos recibidos en el body.
 *
 * @param {import('express').Request} req - Objeto de petición HTTP con los datos del nuevo producto en `req.body`.
 * @param {import('express').Response} res - Objeto de respuesta HTTP que devuelve el producto creado.
 * @returns {Promise<void>}
 */
async function addNewProduct(req, res) {
  await productServices.addNewProduct(normalizeProductPayload(req.body));
  return res.redirect("/admin/product");
}


/**
 * Actualiza un producto existente identificado por su id.
 *
 * Aplica los cambios enviados en `req.body` y devuelve el resultado de la operación.
 *
 * @param {import('express').Request} req - Objeto de petición HTTP con el id en `req.params` y los datos a actualizar en `req.body`.
 * @param {import('express').Response} res - Objeto de respuesta HTTP que devuelve el resultado de la actualización.
 * @returns {Promise<void>}
 */
async function updateProduct(req, res) {
  await productServices.updateProduct(
    req.params.id,
    normalizeProductPayload(req.body),
  );
  res.redirect("/admin/product");
}


/**
 * Elimina un producto de la base de datos identificado por su id.
 *
 * @param {import('express').Request} req - Objeto de petición HTTP que contiene el id del producto en `req.params`.
 * @param {import('express').Response} res - Objeto de respuesta HTTP.
 * @returns {Promise<void>}
 */
async function deleteProduct(req, res) {
  await productServices.deleteProduct(req.params.id);
  res.redirect("/admin/product");
}

async function getViewCreateProduct(req, res) {
  try {
    const categories = await categoryService.getAllCategory();

    res.render("dashboard/product/createProduct", {
      layout: "layouts/dashboard",
      categories,
    });
  } catch (error) {
    res.status(500).send("Error interno del servidor");
  }
}

async function getViewEditProduct(req, res) {
  try {
    const categories = await categoryService.getAllCategory();
    const product = await productServices.getProductById(req.params.id);

    res.render("dashboard/product/editProduct", {
      layout: "layouts/dashboard",
      product,
      categories,
    });
  } catch (error) {
    res.status(500).send("Error interno del servidor");
  }
}

async function getProductById(req, res) {
  const product = await productServices.getProductById(req.params.id);
  return res.render("dashboard/product/detailProduct", {
    product,
    layout: "layouts/dashboard",
  });
}

export const functions = {
  getAllProducts,
  getProductsByCategory,
  getPublicProductById,
  addNewProduct,
  updateProduct,
  deleteProduct,
  getAllViewProducts,
  getViewCreateProduct,
  getViewEditProduct,
  getProductById,
};
export default functions;
