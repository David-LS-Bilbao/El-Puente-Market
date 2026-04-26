import { Router } from "express";
import authViewRouter from "./authViewRouter.js";
import cartViewRouter from "./cartViewRouter.js";
import categoryViewRouter from "./categoryViewRouter.js";
import productViewRouter from "./productViewRouter.js";
import userViewRouter from "./userViewRouter.js";

const viewRouter = Router();

viewRouter.use("/auth", authViewRouter);
viewRouter.use("/admin/user", userViewRouter);
viewRouter.use("/", categoryViewRouter);
viewRouter.use("/", cartViewRouter);
viewRouter.use("/", productViewRouter);

export default viewRouter;
