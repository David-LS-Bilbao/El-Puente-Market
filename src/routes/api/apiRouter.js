import { Router } from "express";
import categoryRouter from "../categoryRouter.js";
import userRouter from "./userRouter.js";

const apiRouter = Router();
apiRouter.use('/category', categoryRouter);
apiRouter.use('/user', userRouter)

export default apiRouter;