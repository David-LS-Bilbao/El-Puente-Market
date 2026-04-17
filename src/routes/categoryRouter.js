import { Router } from "express";
import categoryController from "../controllers/api/categoryController.js";
import functions from "../controllers/api/categoryController.js";

const categoryRouter = Router();
categoryRouter.get("/", functions.getAllCategories);

export default categoryRouter;