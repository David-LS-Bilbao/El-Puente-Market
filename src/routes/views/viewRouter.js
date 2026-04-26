import { Router } from "express";
import productViewRouter from "./productViewRouter.js";
import userViewRouter from "./userViewRouter.js";
import categoryViewRouter from './categoryViewRouter.js';
import cartViewRouter from "./cartViewRouter.js";
import authViewRouter from "./authViewRouter.js";

const viewRouter = Router();

viewRouter.use('/admin/user', userViewRouter);
viewRouter.use('/auth', authViewRouter);
viewRouter.use("/category", categoryViewRouter);
viewRouter.use("/cart", cartViewRouter);
viewRouter.use("/", productViewRouter);

export default viewRouter;
