import { Router } from "express";
import productViewController from "../../controllers/views/productViewController.js";
import productMiddlewares from "../../middlewares/productMiddleware.js";

const productViewRouter = Router();

productViewRouter.get("/", productViewController.getAllProductsAndCart);
productViewRouter.get("/category/:id", productViewController.getProductsByCategory);
productViewRouter.get("/:id", productViewController.getProductById);

productViewRouter.post("/", productViewController.addNewProduct);
productViewRouter.put("/:id", productViewController.changeProduct);
productViewRouter.patch("/:id", productViewController.changeProductField);
productViewRouter.delete("/:id", productViewController.deleteProduct);

export default productViewRouter;