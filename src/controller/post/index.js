import PostModel from "../../model/post/index.js";
import UserModel from "../../model/user/index.js";
import Joi from "joi";
const PostController = {
  getAll: async (req, res) => {
    console.log(req.user);
    const data = await PostModel.findAll({
      include: [UserModel],
    });
    res.json({
      data,
    });
  },
  create: async (req, res) => {
    const payload = req.body;
    const userId = req.user.id;

    const schema = Joi.object({
      title: Joi.string().min(3).max(30).required(),
      description: Joi.string().min(3).max(900),
      // UserId: Joi.number().required(),
    });

    const isValidate = schema.validate(payload);
    if (isValidate.error) {
      return res
        .status(400)
        .json({ message: "Invalid data", error: isValidate.error });
    }

    const data = await PostModel.create({
      title: payload.title,
      description: payload.description,
      UserId: userId,
    });
    res.json({
      message: "Post Created",
      data,
      isValidate,
    });
  },
};
export default PostController;
