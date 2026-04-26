import categoryService from "../../services/categoryService.js";
import productServices from "../../services/productServices.js";

async function getAllCategory(req, res) {
  const category = await categoryService.getAllCategory();
  res.json(category);
}

async function getAllViewCategory(req, res) {
  const categories = await categoryService.getAllCategory();
  res.render("dashboard/category/category", {
    categories,
    layout: "layouts/dashboard",
  });
}

async function getCategoryById(req, res) {
  const { id } = req.params;
  const [category, products] = await Promise.all([
    categoryService.getCategoryById(id),
    productServices.getProductsByCategory(id),
  ]);

  res.render("dashboard/category/detailCategory", {
    category,
    products,
    layout: "layouts/dashboard",
  });
}

async function createCategory(req, res) {
  await categoryService.createCategory(req.body);
  return res.redirect("/admin/category");
}

async function updateCategory(req, res) {
  await categoryService.updateCategory(req.params.id, req.body);
  return res.redirect("/admin/category");
}

async function deleteCategory(req, res) {
  await categoryService.deleteCategory(req.params.id);
  return res.redirect("/admin/category");
}

async function getViewCreateCategory(req, res) {
  res.render("dashboard/category/createCategory", {
    layout: "layouts/dashboard",
  });
}

async function getViewEditCategory(req, res) {
  const category = await categoryService.getCategoryById(req.params.id);

  res.render("dashboard/category/editCategory", {
    category,
    layout: "layouts/dashboard",
  });
}

async function getProductsByCategory(req, res) {
  const products = await productServices.getProductsByCategory(req.params.id);
  res.render("pages/productsByCategory", {
    products,
    layout: "layouts/main",
  });
}

const categoryViewController = {
  getAllCategory,
  getAllViewCategory,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  getViewCreateCategory,
  getViewEditCategory,
  getProductsByCategory,
};

export default categoryViewController;
