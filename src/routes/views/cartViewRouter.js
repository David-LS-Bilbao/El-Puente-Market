import { Router } from "express";
import cartViewController from "../../controllers/views/cartViewController.js";
import { requireRole } from "../../middlewares/authMiddleware.js";

const cartViewRouter = Router();

cartViewRouter.get("/carrito/", cartViewController.getCartItems);
cartViewRouter.post("/carrito/", cartViewController.createCartItem);
cartViewRouter.post("/carrito/addOne", cartViewController.createCartItem);
cartViewRouter.post("/carrito/delete", cartViewController.deleteCartItem);
cartViewRouter.get("/checkout", cartViewController.getCheckout);
cartViewRouter.post("/checkout", cartViewController.simulateCheckout);

cartViewRouter.get('/admin/cart/edit/:id', requireRole("admin"), cartViewController.getViewEditCart);
cartViewRouter.get("/admin/cart", requireRole("admin"), cartViewController.getAllViewCartItems);
cartViewRouter.post("/admin/cart/:id", requireRole("admin"), cartViewController.updateCartItem);
cartViewRouter.post("/admin/cart/delete/:id", requireRole("admin"), cartViewController.deleteCartItem);

export default cartViewRouter;
