import { Router } from "express";
import cartViewController from "../controllers/web/cartViewController.js";

const cartViewRouter = Router();

// Expone solo el flujo lateral del carrito y el borrado asociado.
cartViewRouter.get("/:userDni/sidebar", cartViewController.renderCartSidebar);
cartViewRouter.post("/:userDni/item/:id/delete", cartViewController.deleteCartItemAndRedirect);

export default cartViewRouter;
