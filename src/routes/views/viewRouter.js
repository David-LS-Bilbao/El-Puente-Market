import { Router } from "express";
import productViewRouter from "./productViewRouter.js";
import userViewRouter from "./userViewRouter.js";
import categoryViewRouter from './categoryViewRouter.js';
import cartViewRouter from "./cartViewRouter.js";
import cartService from "../../services/cartService.js";

const viewRouter = Router();

viewRouter.use(async (req, res, next) => {
  const userDni = "12345678A";
  res.locals.userDni = userDni;

  try {
    res.locals.cartSidebar = await cartService.getCartViewData(userDni);
  } catch (error) {
    res.locals.cartSidebar = {
      userDni,
      items: [],
      isEmpty: true,
      totalGeneralFormatted: "0,00 €",
    };
  }

  next();
});

viewRouter.use('/admin/user', userViewRouter);
viewRouter.use("/category", categoryViewRouter);
viewRouter.use("/carrito", cartViewRouter);
viewRouter.use("/", productViewRouter);

export default viewRouter;
