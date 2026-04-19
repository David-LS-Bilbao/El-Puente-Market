import { Router } from "express";
import productController from "../../controllers/api/productController.js";
import functions from "../../controllers/api/productController.js";
import productMiddlewares from '../../middlewares/productMiddleware.js';

const productRouter = Router();

productRouter.get("/", functions.getAllProducts);
productRouter.get("/category/:id", productMiddlewares.checkProductId, functions.getProductsByCategory);

productRouter.post("/", productMiddlewares.checkNewProduct, functions.addNewProduct);
productRouter.put("/:id", productMiddlewares.checkProductId, productMiddlewares.checkProduct, functions.changeProduct);
productRouter.patch("/:id", productMiddlewares.checkProductId, productMiddlewares.checkProductField, functions.changeProductField);
productRouter.delete("/:id", productMiddlewares.checkProductId, functions.deleteProduct);

export default productRouter;