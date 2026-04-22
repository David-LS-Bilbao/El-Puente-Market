import { Router } from "express";
import categoryController from "../controllers/api/categoryController.js";

const categoryRouter = Router();

categoryRouter.get("/", categoryController.getAllCategory);

categoryRouter.get("/:id", categoryController.getCategoryById);

categoryRouter.post("/", categoryController.createCategory);

categoryRouter.put("/:id", categoryController.updateCategory);

categoryRouter.delete("/:id", categoryController.deleteCategory);

export default categoryRouter;