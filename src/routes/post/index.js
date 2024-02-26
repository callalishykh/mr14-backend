import { Router } from "express";
import PostController from "../../controller/post/index.js";
import AuthMiddleware from "../../middleware/authMiddleware.js";

const postRouter = Router();
postRouter.get("/post", AuthMiddleware, PostController.getAll);
postRouter.post("/post", AuthMiddleware, PostController.create);

export default postRouter;
