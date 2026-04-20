import { Router } from "express";
import categoryRouter from "../categoryRouter.js";
import userRouter from "./userRouter.js";
import productRouter from "./productRouter.js"

const apiRouter = Router();
apiRouter.use('/category', categoryRouter);
apiRouter.use('/product', productRouter);
apiRouter.use('/user', userRouter)

export default apiRouter;