import { Router } from "express";
import productViewRouter from "./productViewRouter.js";
import userViewRouter from "./userViewRouter.js";
import categoryViewRouter from './categoryViewRouter.js';
import cartViewRouter from "./cartViewRouter.js";
import cartService from "../../services/cartService.js";
import authViewRouter from "./authViewRouter.js";
const viewRouter = Router();

viewRouter.use('/admin/user', userViewRouter);
viewRouter.use('/', productViewRouter);
viewRouter.use('/auth', authViewRouter);
viewRouter.use("/", categoryViewRouter);
viewRouter.use("/", cartViewRouter);

export default viewRouter;
