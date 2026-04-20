import { Router } from "express";
import categoryRouter from "../categoryRouter.js";
import productRouter from "./productRouter.js"

const apiRouter = Router();
apiRouter.use('/category', categoryRouter);
apiRouter.use('/product', productRouter);

export default apiRouter;