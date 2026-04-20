import { Router } from "express";
import cartController from "../controllers/api/cartController.js";

const cartRouter = Router();

// Expone las operaciones basicas del recurso carrito.
cartRouter.get("/", cartController.getAllCartItems);
cartRouter.get("/user/:userDni", cartController.getCartByUser);
cartRouter.get("/:id", cartController.getCartItemById);
cartRouter.post("/", cartController.createCartItem);
cartRouter.patch("/:id", cartController.updateCartItem);
cartRouter.delete("/:id", cartController.deleteCartItem);

export default cartRouter;
