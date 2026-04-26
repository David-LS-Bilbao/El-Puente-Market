import { Router } from "express";
import categoryViewController from "../../controllers/views/categoryViewController.js";
import { requireRole } from "../../middlewares/authMiddleware.js";

const categoryRouter = Router();

categoryRouter.get("/", categoryViewController.getAllCategory);
categoryRouter.get("/admin/category", requireRole("admin"), categoryViewController.getAllViewCategory);
categoryRouter.get('/admin/category/create', requireRole("admin"), categoryViewController.getViewCreateCategory);
categoryRouter.get("/admin/category/details/:id", categoryViewController.getCategoryById);
categoryRouter.get('/admin/category/edit/:id', requireRole("admin"), categoryViewController.getViewEditCategory);

categoryRouter.post("/admin/category", requireRole("admin"), categoryViewController.createCategory);

categoryRouter.post("/admin/category/:id", requireRole("admin"), categoryViewController.updateCategory);

categoryRouter.post("/admin/category/delete/:id", requireRole("admin"), categoryViewController.deleteCategory);

export default categoryRouter;