import { Router } from "express";
import categoryRouter from "../categoryRouter.js";
import cartRouter from "./cartRouter.js";
import userRouter from "./userRouter.js";
import productRouter from "./productRouter.js"
import authRouter from "./authRouter.js";

const apiRouter = Router();
apiRouter.use('/category', categoryRouter);
apiRouter.use('/product', productRouter);
apiRouter.use('/user', userRouter)
apiRouter.use('/cart', cartRouter);
apiRouter.use('/auth', authRouter);

export default apiRouter;