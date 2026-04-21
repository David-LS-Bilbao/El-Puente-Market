import { Router } from "express";
import apiRouter from './api/apiRouter.js';
import categoryRouter from "./categoryRouter.js";
import cartViewRouter from "./cartViewRouter.js";

const router = Router();

router.use('/carrito', cartViewRouter);
router.use('/api', apiRouter);

export default router;
