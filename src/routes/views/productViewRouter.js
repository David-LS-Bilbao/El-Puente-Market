import { Router } from "express";
import productViewController from "../../controllers/views/productViewController.js";
import { requireRole } from "../../middlewares/authMiddleware.js";
const productViewRouter = Router();

productViewRouter.get("/", productViewController.getAllProductsAndCart);

productViewRouter.post("/admin/product", requireRole("admin"), productViewController.addNewProduct);
productViewRouter.post("/admin/product/:id", requireRole("admin"), productViewController.updateProduct);
productViewRouter.post("/admin/product/delete/:id", requireRole("admin"), productViewController.deleteProduct);

productViewRouter.get("/admin/product", requireRole("admin"), productViewController.getAllViewProducts);
productViewRouter.get('/admin/product/create', requireRole("admin"), productViewController.getViewCreateProduct);
productViewRouter.get("/admin/product/edit/:id", requireRole("admin"), productViewController.getViewEditProduct);
productViewRouter.get('/admin/product/details/:id', requireRole("admin"), productViewController.getProductViewById);
productViewRouter.get("/category/:id", productViewController.getProductsByCategory);
productViewRouter.get("/:id", productViewController.getProductById);

productViewRouter.post("/", productViewController.addNewProduct);
productViewRouter.delete("/:id", productViewController.deleteProduct);


export default productViewRouter;
