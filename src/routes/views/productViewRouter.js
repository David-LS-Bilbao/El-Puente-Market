import { Router } from "express";
import productMiddlewares from "../../middlewares/productMiddleware.js";
import { requireRole } from "../../middlewares/authMiddleware.js";
import functions from "../../controllers/views/productViewController.js";

const productViewRouter = Router();

productViewRouter.get("/", functions.getAllProducts);
productViewRouter.get(
  "/product/:id",
  productMiddlewares.checkProductId,
  functions.getPublicProductById,
);

productViewRouter.get(
  "/admin/product",
  requireRole("admin"),
  functions.getAllViewProducts,
);
productViewRouter.get(
  "/admin/product/create",
  requireRole("admin"),
  functions.getViewCreateProduct,
);
productViewRouter.get(
  "/admin/product/edit/:id",
  requireRole("admin"),
  productMiddlewares.checkProductId,
  functions.getViewEditProduct,
);
productViewRouter.get(
  "/admin/product/details/:id",
  requireRole("admin"),
  productMiddlewares.checkProductId,
  functions.getProductById,
);

productViewRouter.post(
  "/admin/product",
  requireRole("admin"),
  functions.addNewProduct,
);
productViewRouter.post(
  "/admin/product/:id",
  requireRole("admin"),
  productMiddlewares.checkProductId,
  functions.updateProduct,
);
productViewRouter.post(
  "/admin/product/delete/:id",
  requireRole("admin"),
  productMiddlewares.checkProductId,
  functions.deleteProduct,
);

export default productViewRouter;
