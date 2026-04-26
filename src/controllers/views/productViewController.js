import productServices from "../../services/productServices.js";
import cartServices from "../../services/cartService.js";
import categoryService from '../../services/categoryService.js';

async function getAllProductsAndCart(req, res) {
  const products = await productServices.getAllProducts();
  const categories = await categoryService.getAllCategory();
  const cart = await cartServices.getCartItemsByUser(req?.sesion?.user || '12345678A');

  res.render("pages/index", { products, cart, categories, layout: "layouts/main" });
}

async function getAllProducts(req, res) {
  const products = await productServices.getAllProducts();
  res.render("pages/index", { products, layout: "layouts/main" });
}

async function getProductsByCategory(req, res) {
  const products = await productServices.getProductsByCategory(req.params.id);
  res.json(products);
}

async function getProductById(req, res) {
  const product = await productServices.getProductById(req.params.id);
  const categories = await categoryService.getAllCategory();
  res.render("pages/productDetails", { product, categories, layout: "layouts/main" });
}

async function addNewProduct(req, res) {
  const newProduct = await productServices.addNewProduct(req.body);
  res.json(newProduct);
}

async function changeProduct(req, res) {
  const product = await productServices.updateProduct(req.params.id, req.body);
  res.json(product);
}

async function changeProductField(req, res) {
  changeProduct(req, res);
}

async function deleteProduct(req, res) {
  const product = await productServices.deleteProduct(req.params.id);
}

export const productViewController = {
  getAllProductsAndCart,
  getAllProducts,
  getProductsByCategory,
  getProductById,
  addNewProduct,
  changeProduct,
  changeProductField,
  deleteProduct,
};
export default productViewController;
