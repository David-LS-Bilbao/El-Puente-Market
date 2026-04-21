import { Router } from "express";
import cartViewController from "../controllers/web/cartViewController.js";

const cartViewRouter = Router();

// Expone la ruta web del carrito renderizada con EJS.
cartViewRouter.get("/:userDni", cartViewController.renderCartView);
cartViewRouter.post("/:userDni/item/:id/delete", cartViewController.deleteCartItemAndRedirect);

export default cartViewRouter;
