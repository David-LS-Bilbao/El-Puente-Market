import { Router } from "express";
import productViewRouter from "./productViewRouter.js";

const viewRouter = Router();

viewRouter.use("/", productViewRouter);

export default viewRouter;
