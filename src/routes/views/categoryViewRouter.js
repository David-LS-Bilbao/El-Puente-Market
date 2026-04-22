import { Router } from "express";
import categoryViewController from "../../controllers/views/categoryViewController.js";

const categoryRouter = Router();

categoryRouter.get("/", categoryViewController.getAllCategory);

categoryRouter.get("/:id", categoryViewController.getCategoryById);

categoryRouter.post("/", categoryViewController.createCategory);

categoryRouter.put("/:id", categoryViewController.updateCategory);

categoryRouter.delete("/:id", categoryViewController.deleteCategory);

export default categoryRouter;