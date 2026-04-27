import { Router } from "express";
import apiRouter from "./api/apiRouter.js";
import viewRouter from "./views/viewRouter.js";
import cartViewRouter from "./views/cartViewRouter.js";

const router = Router();

router.use("/", viewRouter);
router.use("/api", apiRouter);
router.use("/carrito", cartViewRouter);

export default router;
