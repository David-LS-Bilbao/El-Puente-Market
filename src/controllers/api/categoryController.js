import categoryService from '../../services/categoryService.js'
async function getAllCategory( req, res) {
    const category = await categoryService.getAllCategory();
    res.json(category);
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

export const functions = { getCategoryById, getAllCategory, createCategory, updateCategory, deleteCategory} 
export default functions;

