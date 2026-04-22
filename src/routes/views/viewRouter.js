import { Router } from "express";
import userViewRouter from "./userViewRouter.js";

const viewRouter = Router();
viewRouter.use('/admin/user', userViewRouter);

export default viewRouter;