import { Router } from "express";
import cartViewController from "../../controllers/views/cartViewController.js";

const cartViewRouter = Router();

cartViewRouter.get("/", cartViewController.getCartItems);
cartViewRouter.post("/", cartViewController.createCartItem);
cartViewRouter.post("/addOne", cartViewController.createCartItem);
cartViewRouter.post("/delete", cartViewController.deleteCartItem);

export default cartViewRouter;