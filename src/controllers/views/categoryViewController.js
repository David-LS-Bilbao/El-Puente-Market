import categoryService from '../../services/categoryService.js'
import productServices from '../../services/productServices.js'

async function getAllCategory( req, res) {
    const category = await categoryService.getAllCategory();
    res.render("pages/index", { category, layout: "layouts/main"});
};

async function getCategoryById(req, res) {
    const category = await categoryService.getCategoryById(req.params.id);
    res.json(category);
}

async function createCategory(req, res) {
    const category = await categoryService.createCategory(req.body);
    res.json(category);
}

async function updateCategory(req, res) {
    const category = await categoryService.updateCategory(req.params.id, req.body);
    res.json(category);
}

async function deleteCategory(req, res) {
    const category = await categoryService.deleteCategory(req.params.id);
    res.json(category);
}

async function getProductsByCategory(req, res) {
    const products = await productServices.getProductsByCategory(req.params.id);
    res.render('pages/productsByCategory', {products, layout: 'layouts/main'});
}

export const categoryViewController = { getCategoryById, getAllCategory, createCategory, updateCategory, deleteCategory, getProductsByCategory} 
export default categoryViewController;

