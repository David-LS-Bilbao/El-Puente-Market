import { Router } from "express";
import functions from "../../controllers/views/productViewController.js";
import productMiddlewares from "../../middlewares/productMiddleware.js";

const productViewRouter = Router();

productViewRouter.get("/", functions.getAllProducts);
productViewRouter.get("/category/:id", productMiddlewares.checkProductId, functions.getProductsByCategory);

productViewRouter.post("/", productMiddlewares.checkNewProduct, functions.addNewProduct);
productViewRouter.put("/:id", productMiddlewares.checkProductId, productMiddlewares.checkProduct, functions.changeProduct);
productViewRouter.patch("/:id", productMiddlewares.checkProductId, functions.changeProductField);
productViewRouter.delete("/:id", productMiddlewares.checkProductId, functions.deleteProduct);

export default productViewRouter;
