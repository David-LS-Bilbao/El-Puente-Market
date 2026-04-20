import { Router } from "express";
import functions from "../../controllers/views/productViewController.js";
import productMiddlewares from "../../middlewares/productMiddleware.js";

const productViewRouter = Router();

productViewRouter.get("/", functions.getAllProducts);

export default productViewRouter;
