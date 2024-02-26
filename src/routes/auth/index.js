import { Router } from "express";
import AuthController from "../../controller/auth/index.js";

const authRouter = Router();

authRouter.post("/login", AuthController.login);
authRouter.post("/register", AuthController.register);

export default authRouter;
