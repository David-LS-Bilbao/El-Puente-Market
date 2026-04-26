import { Router } from "express";
import cartViewController from "../../controllers/views/cartViewController.js";
import { requireRole } from "../../middlewares/authMiddleware.js";

const cartViewRouter = Router();

cartViewRouter.get(
  "/carrito/:userDni/sidebar",
  cartViewController.renderCartSidebar,
);
cartViewRouter.post(
  "/carrito/:userDni/item/:id/delete",
  cartViewController.deleteCartItemAndRedirect,
);

cartViewRouter.get(
  "/admin/cart",
  requireRole("admin"),
  cartViewController.getAllViewCartItems,
);
cartViewRouter.get(
  "/admin/cart/edit/:id",
  requireRole("admin"),
  cartViewController.getViewEditCart,
);
cartViewRouter.post(
  "/admin/cart/:id",
  requireRole("admin"),
  cartViewController.updateCartItem,
);
cartViewRouter.post(
  "/admin/cart/delete/:id",
  requireRole("admin"),
  cartViewController.deleteCartItem,
);

export default cartViewRouter;
