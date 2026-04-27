import productServices from "../../services/productServices.js";
import cartServices from "../../services/cartService.js";
import categoryService from '../../services/categoryService.js';

async function getAllProductsAndCart(req, res) {
  const products = await productServices.getAllProducts();
  const categories = await categoryService.getAllCategory();
  const userDni = req.session?.user?.dni || '12345678A';
  const cartSidebar = await cartServices.getCartViewData(userDni);

  res.render("pages/index", { products, categories, cartSidebar, userDni, activeCategoryId: null, layout: "layouts/main" });
}

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
  res.render("dashboard/product/product", { products, layout: "layouts/dashboard" });
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

async function getProductById(req, res) {
  const product = await productServices.getProductById(req.params.id);
  const categories = await categoryService.getAllCategory();
  const userDni = req.session?.user?.dni || '12345678A';
  const cartSidebar = await cartServices.getCartViewData(userDni);
  if (!product) {
    return res.status(404).render("pages/productDetails", {
      product: null,
      categories,
      cartSidebar,
      userDni,
      activeCategoryId: null,
      layout: "layouts/main"
    });
  }
  res.render("pages/productDetails", {
    product,
    categories,
    cartSidebar,
    userDni,
    activeCategoryId: product.id_category,
    layout: "layouts/main"
  });
}

async function addNewProduct(req, res) {
  const newProduct = await productServices.addNewProduct(req.body);
  return res.redirect('/admin/product');
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
  const product = await productServices.updateProduct(req.params.id, req.body);
  res.redirect('/admin/product');
}


async function deleteProduct(req, res) {
  const product = await productServices.deleteProduct(req.params.id);
  res.redirect('/admin/product');
}

async function getViewCreateProduct(req, res) {
  try {
    const categories = await categoryService.getAllCategory();

    res.render('dashboard/product/createProduct', {
      layout: 'layouts/dashboard',
      categories: categories
    });
  } catch (error) {
    res.status(500).send("Error interno del servidor");
  }
}

async function getViewEditProduct(req, res) {
  try {
    const categories = await categoryService.getAllCategory();
    const product = await productServices.getProductById(req.params.id);

    res.render('dashboard/product/editProduct', {
      layout: 'layouts/dashboard',
      product: product,
      categories: categories
    });
  } catch (error) {
    res.status(500).send("Error interno del servidor");
  }
}

async function getProductViewById(req, res) {
  const product = await productServices.getProductById(req.params.id);
  if (!product) {
    return res.status(404).redirect("/admin/product");
  }
  return res.render("dashboard/product/detailProduct", {
    product,
    layout: "layouts/dashboard"
  });
}



export const productViewController = {
  getAllProducts,
  getProductsByCategory,
  getProductById,
  addNewProduct,
  updateProduct,
  deleteProduct,
  getAllViewProducts,
  getViewCreateProduct,
  getViewEditProduct,
  getProductViewById,
  getAllProductsAndCart
};
export default productViewController;
