import { Router } from "express";
import functions from "../../controllers/views/userViewController.js";


const userViewRouter = Router();
userViewRouter.get("/", functions.getAllUsers);
userViewRouter.get('/create', functions.getViewCreateUser);
userViewRouter.get('/edit/:dni', functions.getUserByDNI);
userViewRouter.get('/details/:dni', functions.getUserDetail);
userViewRouter.get("/:dni", functions.getUserByDNI);
userViewRouter.post("/", functions.createUserRegister);
userViewRouter.post("/:dni", functions.updateUser);
userViewRouter.post("/delete/:dni", functions.deleteUser);

export default userViewRouter;