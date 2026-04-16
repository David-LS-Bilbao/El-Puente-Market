import CategoryModel from "../../models/category.Model.js";

async function getAllCategories(req, res) {
    const category = await CategoryModel.findAll();
    res.json(category);
};

export const functions = { getAllCategories };
export default functions;