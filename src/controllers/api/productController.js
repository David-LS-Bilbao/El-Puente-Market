import { CategoryModel, ProductModel } from "../../models/index.js";
import productServices from "../services/productServices.js";

/**
 * Obtiene todos los productos almacenados en la base de datos.
 *
 * @param {import('express').Request} req - Objeto de petición HTTP.
 * @param {import('express').Response} res - Objeto de respuesta HTTP que devuelve la lista de productos.
 * @returns {Promise<void>}
 */
async function getAllProducts(req, res) {
  const products = await productServices.getAllProducts();
  res.json(products);
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
  res.json(products);
}

/**
 * Crea un nuevo producto en la base de datos a partir de los datos recibidos en el body.
 *
 * @param {import('express').Request} req - Objeto de petición HTTP con los datos del nuevo producto en `req.body`.
 * @param {import('express').Response} res - Objeto de respuesta HTTP que devuelve el producto creado.
 * @returns {Promise<void>}
 */
async function addNewProduct(req, res) {
  const newProduct = await productServices.addNewProduct(req.body);
  res.json(newProduct);
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
async function changeProduct(req, res) {
  const product = await productServices.updateProduct(req.params.id, req.body);
  res.json(product);
}

/**
 * Actualiza campos específicos de un producto existente.
 *
 * Delega la lógica en `changeProduct`, permitiendo reutilizar la misma
 * funcionalidad para operaciones tipo PATCH.
 *
 * @param {import('express').Request} req - Objeto de petición HTTP con el id en `req.params` y los campos a modificar en `req.body`.
 * @param {import('express').Response} res - Objeto de respuesta HTTP que devuelve el resultado de la actualización.
 * @returns {Promise<void>}
 */
async function changeProductField(req, res) {
  changeProduct(req, res);
}

/**
 * Elimina un producto de la base de datos identificado por su id.
 *
 * @param {import('express').Request} req - Objeto de petición HTTP que contiene el id del producto en `req.params`.
 * @param {import('express').Response} res - Objeto de respuesta HTTP.
 * @returns {Promise<void>}
 */
async function deleteProduct(req, res) {
  const product = await productServices.deleteProduct(req.params.id);
  res.json(product);
}

export const functions = {
  getAllProducts,
  getProductsByCategory,
  addNewProduct,
  changeProduct,
  changeProductField,
  deleteProduct,
};
export default functions;
