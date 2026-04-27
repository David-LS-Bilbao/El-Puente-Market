import { Router } from "express";
import authViewController from '../../controllers/views/authViewController.js'
import { isRegisterDataCorrect, checkCredentials } from "../../middlewares/authMiddleware.js";

const authViewRouter = Router();

authViewRouter.post("/register", isRegisterDataCorrect, authViewController.register);

authViewRouter.post("/login", checkCredentials, authViewController.login);
authViewRouter.get('/login', authViewController.getLogin);
authViewRouter.post("/logout", authViewController.logout);
authViewRouter.get('/register', authViewController.getRegister);




export default authViewRouter;