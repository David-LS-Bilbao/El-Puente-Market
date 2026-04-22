import { CategoryModel, ProductModel } from "../models/index.js";

async function getAllProducts() {
  const products = await ProductModel.findAll();
  return products;
}

async function getProductsByCategory(id) {
  const products = await ProductModel.findAll({
    where: { id_category: id },
    include: [CategoryModel],
  });
  return products;
}

async function getProductById(id) {
  const product = await ProductModel.findByPk(id, {
    include: [CategoryModel],
  });
  return product;
}

async function addNewProduct(productData) {
  const newProduct = await ProductModel.create(productData, {
    include: [CategoryModel],
  });
  return newProduct;
}

async function updateProduct(id, productData) {
  const updatedProduct = await ProductModel.update(productData, {
    where: { id: id },
  });
  const product = await ProductModel.findByPk(id);
  return product;
}

async function deleteProduct(id) {
  const deletedProduct = await ProductModel.destroy({ where: { id: id } });
  return deletedProduct;
}

export const functions = {
  getAllProducts,
  getProductsByCategory,
  getProductById,
  addNewProduct,
  updateProduct,
  deleteProduct,
};
export default functions;
