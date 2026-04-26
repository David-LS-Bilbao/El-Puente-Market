import { Router } from "express";
import userViewRouter from "./userViewRouter.js";
import categoryViewRouter from './categoryViewRouter.js';
import authViewRouter from "./authViewRouter.js";
import productViewRouter from "./productViewRouter.js";

const viewRouter = Router();

viewRouter.use('/admin/user', userViewRouter);
viewRouter.use('/', productViewRouter);
viewRouter.use('/auth', authViewRouter);
viewRouter.use("/category", categoryViewRouter);

export default viewRouter;