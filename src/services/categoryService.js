import {CategoryModel} from "../models/index.js";

async function getAllCategory() {
    const category = await CategoryModel.findAll();
    return category;
};

async function getCategoryById(id) {
    const category = await CategoryModel.findByPk(id);
    return category;
}

async function createCategory(categoryData) {
    const newCategory = await CategoryModel.create(categoryData);
    return newCategory;
}

async function updateCategory(id, categoryData) {

    const updatedCategory = await CategoryModel.update(categoryData, { where: { id: id } });
    const category = await CategoryModel.findByPk(id);
    return category;
}

async function deleteCategory(id) {
    const deletedCategory = await CategoryModel.destroy({ where: { id: id } });
    return deleteCategory;
}

export const functions = { getCategoryById, getAllCategory, createCategory, updateCategory, deleteCategory} 
export default functions;