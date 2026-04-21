import { Router } from "express";
import categoryController from "../controllers/api/categoryController.js";  

//Buscar crear imprimir lista
const router = Router();
router.get('/', categoryController.list);
router.post('/', categoryController.create);

export default router;  
