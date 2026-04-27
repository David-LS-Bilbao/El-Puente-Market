import { Router } from "express";
import productViewRouter from "./productViewRouter.js";
import userViewRouter from "./userViewRouter.js";
import categoryViewRouter from './categoryViewRouter.js';
import cartViewRouter from "./cartViewRouter.js";
import authViewRouter from "./authViewRouter.js";
import { isLoggedIn, requireRole } from "../../middlewares/authMiddleware.js";
const viewRouter = Router();

viewRouter.get('/admin', isLoggedIn, requireRole('admin'), (req, res) => {
    res.render('dashboard/index', { layout: 'layouts/dashboard' });
});
viewRouter.use('/admin/user', userViewRouter);
viewRouter.use('/auth', authViewRouter);
viewRouter.use("/", categoryViewRouter);
viewRouter.use("/", cartViewRouter);
viewRouter.use('/', productViewRouter);

export default viewRouter;
