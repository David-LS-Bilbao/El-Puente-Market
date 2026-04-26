import { Router } from "express";
import functions from "../../controllers/views/productViewController.js";
import { requireRole } from "../../middlewares/authMiddleware.js";

const productViewRouter = Router();

productViewRouter.get("/", functions.getAllProducts);
productViewRouter.get("/category/:id", functions.getProductsByCategory);

productViewRouter.post("/admin/product", requireRole("admin"), functions.addNewProduct);
productViewRouter.post("/admin/product/:id", requireRole("admin"), functions.updateProduct);

productViewRouter.post("/admin/product/delete/:id", requireRole("admin"), functions.deleteProduct);

productViewRouter.get("/admin/product", requireRole("admin"), functions.getAllViewProducts);
productViewRouter.get('/admin/product/create', requireRole("admin"), functions.getViewCreateProduct);
productViewRouter.get("/admin/product/edit/:id", requireRole("admin"), functions.getViewEditProduct);
productViewRouter.get('/admin/product/details/:id', requireRole("admin"), functions.getProductById);


export default productViewRouter;
