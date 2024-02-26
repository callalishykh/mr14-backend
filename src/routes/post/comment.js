import { Router } from "express";
import CommentController from "../../controller/post/comment.js";

const commentRouter = Router();
commentRouter.get("/:PostId/comment", CommentController.getAll);

commentRouter.post("/:PostId/comment", CommentController.create);

commentRouter.put("/:PostId/comment/:commentId", CommentController.update);

export default commentRouter;
