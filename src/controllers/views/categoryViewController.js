import categoryService from '../../services/categoryService.js'
import productServices from '../../services/productServices.js'
async function getAllCategory(req, res) {
    const category = await categoryService.getAllCategory();
    res.render("pages/index", { category, layout: "layouts/main" });
};

async function getAllViewCategory(req, res) {
    const categories = await categoryService.getAllCategory();
    res.render("dashboard/category/category", { categories, layout: "layouts/dashboard" });
};

async function getCategoryById(req, res) {
    const category = await categoryService.getCategoryById(req.params.id);
    res.render("dashboard/category/detailCategory", { category, layout: "layouts/dashboard" });
}

async function createCategory(req, res) {
    const category = await categoryService.createCategory(req.body);
    return res.redirect('/admin/category');

}

async function updateCategory(req, res) {
    const category = await categoryService.updateCategory(req.params.id, req.body);
    return res.redirect('/admin/category');

}

async function deleteCategory(req, res) {
    const category = await categoryService.deleteCategory(req.params.id);
    return res.redirect('/admin/category');

}

async function getProductsByCategory(req, res) {
    const categories = await categoryService.getAllCategory();
    const products = await productServices.getProductsByCategory(req.params.id);
    res.render('pages/productsByCategory', { products, categories, layout: 'layouts/main' });
}


async function getViewCreateCategory(req, res) {
    res.render('dashboard/category/createCategory', {
        layout: 'layouts/dashboard'
    });
}

async function getViewEditCategory(req, res) {
    const category = await categoryService.getCategoryById(req.params.id);

    res.render('dashboard/category/editCategory', {
        category,
        layout: 'layouts/dashboard'
    });
}


export const categoryViewController = { getCategoryById, getAllCategory, createCategory, updateCategory, deleteCategory, getAllViewCategory, getViewCreateCategory, getViewEditCategory, getProductsByCategory }
export default categoryViewController;

