import { Router } from "express";
import UserController from "../../controller/User/index.js";

const userRouter = Router();

userRouter.post("/user", UserController.create);
userRouter.get("/user", UserController.get);
userRouter.get("/user/:user_id", UserController.getOne);
userRouter.put("/user/:user_id", UserController.update);
userRouter.post("/user/:user_id/follow", UserController.follow);

export default userRouter;
