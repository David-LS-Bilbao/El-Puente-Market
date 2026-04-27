import { Router } from "express";
import functions from "../../controllers/views/userViewController.js";
import { requireRole } from "../../middlewares/authMiddleware.js";


const userViewRouter = Router();
userViewRouter.get("/", requireRole("admin"), functions.getAllUsers);
userViewRouter.get('/create', requireRole("admin"), functions.getViewCreateUser);
userViewRouter.get('/edit/:dni', requireRole("admin"), functions.getViewEditUser);
userViewRouter.get('/details/:dni', requireRole("admin"), functions.getUserDetail);
userViewRouter.get("/:dni", requireRole("admin"), functions.getUserByDNI);
userViewRouter.post("/", requireRole("admin"), functions.createUserRegister);
userViewRouter.post("/:dni", requireRole("admin"), functions.updateUser);
userViewRouter.post("/delete/:dni", requireRole("admin"), functions.deleteUser);

export default userViewRouter;