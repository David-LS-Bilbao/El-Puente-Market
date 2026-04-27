import { Router } from "express";
import productController from "../../controllers/api/productController.js";
import functions from "../../controllers/api/productController.js";

const productRouter = Router();

productRouter.get("/", functions.getAllProducts);
productRouter.get("/category/:id", functions.getProductsByCategory);

productRouter.post("/", functions.addNewProduct);
productRouter.put("/:id", functions.changeProduct);
productRouter.patch("/:id", functions.changeProductField);
productRouter.delete("/:id", functions.deleteProduct);

export default productRouter;