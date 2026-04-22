import { Router } from "express";
import productViewRouter from "./productViewRouter.js";
import userViewRouter from "./userViewRouter.js";
import categoryViewRouter from './categoryViewRouter.js';

const viewRouter = Router();
viewRouter.use('/admin/user', userViewRouter);
viewRouter.use("/category", categoryViewRouter);
viewRouter.use("/", productViewRouter);

export default viewRouter;
