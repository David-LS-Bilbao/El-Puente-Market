import { Router } from "express";
import userViewRouter from "./userViewRouter.js";
import categoryViewRouter from './categoryViewRouter.js';
import authViewRouter from "./authViewRouter.js";

const viewRouter = Router();

viewRouter.use('/admin/user', userViewRouter);
viewRouter.use('/auth', authViewRouter);
viewRouter.use("/category", categoryViewRouter);

export default viewRouter;