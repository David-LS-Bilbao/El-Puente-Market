import { Router } from "express";
import functions from "../../controllers/api/userController.js";


const userRouter = Router();
userRouter.get("/", functions.getAllUsers);
userRouter.get("/:dni", functions.getUserByDNI);
userRouter.post("/", functions.createUserRegister);
userRouter.put("/:dni", functions.updateUser);
userRouter.delete("/:dni", functions.deleteUser);


export default userRouter;