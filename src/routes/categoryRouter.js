import { Router } from "express";
import categoryController from "../controllers/api/categoryController.js";

const categoryRouter = Router();

/**
 * RUTAS PARA CATEGORÍAS
 */

// Obtener todas las categorías (GET /api/categories)
categoryRouter.get("/", categoryController.getAllCategory);

// Obtener una categoría específica por ID (GET /api/categories/:id)
categoryRouter.get("/:id", categoryController.getCategoryById);

// Crear una nueva categoría (POST /api/categories)
categoryRouter.post("/", categoryController.createCategory);

// Actualizar una categoría existente (PUT /api/categories/:id)
categoryRouter.put("/:id", categoryController.updateCategory);

// Eliminar una categoría (DELETE /api/categories/:id)
categoryRouter.delete("/:id", categoryController.deleteCategory);

export default categoryRouter;