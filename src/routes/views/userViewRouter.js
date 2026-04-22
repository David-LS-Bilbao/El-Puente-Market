import { Router } from "express";
import functions from "../../controllers/views/userViewController.js";


const userViewRouter = Router();
userViewRouter.get("/", functions.getAllUsers);
userViewRouter.get("/:dni", functions.getUserByDNI);
userViewRouter.post("/", functions.createUserRegister);
userViewRouter.put("/:dni", functions.updateUser);
userViewRouter.delete("/:dni", functions.deleteUser);


export default userViewRouter;