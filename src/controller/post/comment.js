import CommentModel from "../../model/post/comment.js";
import PostModel from "../../model/post/index.js";
import UserModel from "../../model/user/index.js";

const CommentController = {
  getAll: async (req, res) => {
    const params = req.params;
    const allComments = await CommentModel.findAll({
      where: {
        PostId: params.PostId,
      },
      include: [UserModel],
    });
    res.json({
      comments: allComments,
    });
  },

  create: async (req, res) => {
    const payload = req.body;
    const params = req.params;

    const comment = await CommentModel.create({
      UserId: payload.UserId,
      title: payload.title,
      description: payload.description,
      PostId: params.PostId,
    });
    res.json({
      message: "Comment added",
    });
  },

  update: async (req, res) => {
    const payload = req.body;
    const params = req.params;

    console.log(params, payload);
    res.json({ message: "comment updated" });
  },
};

export default CommentController;
