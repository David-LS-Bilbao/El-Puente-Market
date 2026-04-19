import { Router } from "express";
import categoryRouter from "../categoryRouter.js";
import cartRouter from "../cartRouter.js";

const apiRouter = Router();
apiRouter.use('/category', categoryRouter);

apiRouter.use('/cart',cartRouter);

export default apiRouter;