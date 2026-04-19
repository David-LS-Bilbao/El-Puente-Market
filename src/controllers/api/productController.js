import { CategoryModel, ProductModel } from "../../models/index.js";

async function getAllProducts(req, res) {
    const products = await ProductModel.findAll();
    res.json(products);
};

async function getProductsByCategory(req, res) {
    const products = await ProductModel.findAll({
        where: { id_category: req.params.id }, include: [CategoryModel]
    });
    res.json(products);
};

async function addNewProduct(req, res) {
    const newProduct = await ProductModel.create(req.body);
    res.json(newProduct);
};

async function changeProduct(req, res) {
    const product = await ProductModel.update(req.body, { where: { id: req.params.id } });
    const updatedProduct = await ProductModel.findByPk(id);
    res.json(updatedProduct);
};

async function changeProductField(req, res) {
    changeProduct(req, res);
};

async function deleteProduct(req, res) {
    const product = await ProductModel.destroy({ where: { id: req.params.id } });
}

export const functions = { getAllProducts, getProductsByCategory, addNewProduct, changeProduct, changeProductField, deleteProduct };
export default functions;