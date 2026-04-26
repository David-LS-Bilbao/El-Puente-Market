import categoryService from '../../services/categoryService.js'
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


export const functions = { getCategoryById, getAllCategory, createCategory, updateCategory, deleteCategory, getAllViewCategory, getViewCreateCategory, getViewEditCategory }
export default functions;

