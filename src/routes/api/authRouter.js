import { Router } from "express";
import authController from '../../controllers/api/authController.js'
import { isRegisterDataCorrect, checkCredentials } from "../../middlewares/authApiMiddleware.js";

const authRouter = Router();

authRouter.post("/register", isRegisterDataCorrect, authController.register);

authRouter.post("/login", checkCredentials, authController.login);

export default authRouter;