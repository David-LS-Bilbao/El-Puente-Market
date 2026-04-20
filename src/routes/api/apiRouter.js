import { Router } from "express";
import categoryRouter from "../categoryRouter.js";
import cartRouter from "../cartRouter.js";
import productRouter from "./productRouter.js"

const apiRouter = Router();
apiRouter.use('/category', categoryRouter);
apiRouter.use('/product', productRouter);

apiRouter.use('/cart',cartRouter);

export default apiRouter;