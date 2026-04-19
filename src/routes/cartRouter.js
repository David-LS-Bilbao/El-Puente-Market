import { Router } from "express";
import cartController from "../controllers/api/cartController.js";

const cartRouter = Router();

// crea las rutes
cartRouter.get("/", cartController.getAllCartItems);
cartRouter.get("/user/:userDni", cartController.getCartByUser);
cartRouter.post("/", cartController.createCartItem);
cartRouter.delete("/:id", cartController.deleteCartItem);

export default cartRouter;
