import { Router } from "express";
import cartViewController from "../controllers/web/cartViewController.js";

const cartViewRouter = Router();

// Expone la ruta web del carrito renderizada con EJS.
cartViewRouter.get("/:userDni", cartViewController.renderCartView);

export default cartViewRouter;
