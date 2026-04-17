import { Router } from "express";
import categoryRouter from "../categoryRouter.js";

const apiRouter = Router();
apiRouter.use('/category', categoryRouter);

export default apiRouter;