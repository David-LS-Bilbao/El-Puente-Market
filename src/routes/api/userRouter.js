import { Router } from "express";
import functions from "../../controllers/api/userController.js";
import { requireRoleApi, verifyToken } from "../../middlewares/authApiMiddleware.js";


const userRouter = Router();
userRouter.use(verifyToken);
userRouter.get("/", requireRoleApi("admin"), functions.getAllUsers);
userRouter.get("/:dni", requireRoleApi("admin"), functions.getUserByDNI);
userRouter.post("/", requireRoleApi("admin"), functions.createUserRegister);
userRouter.put("/:dni", requireRoleApi("admin"), functions.updateUser);
userRouter.delete("/:dni", requireRoleApi("admin"), functions.deleteUser);


export default userRouter;