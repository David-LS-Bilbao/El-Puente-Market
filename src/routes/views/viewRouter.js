import {Router} from "express";
import categoryViewRouter from './categoryViewRouter.js';

const viewRouter = Router();

viewRouter.use("/category",categoryViewRouter);            

export default viewRouter;