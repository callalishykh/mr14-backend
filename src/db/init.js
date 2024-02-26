import CommentModel from "../model/post/comment.js";
import PostModel from "../model/post/index.js";
import ContactModel from "../model/user/contact.js";
import UserModel from "../model/user/index.js";
import UserFollowerModel from "../model/user/UserFollower.js";

const dbInit = async () => {
  await UserModel.sync({
    alter: true,
    force: false,
  });
  await ContactModel.sync({
    alter: true,
    force: false,
  });
  await PostModel.sync({
    alter: true,
    force: false,
  });
  await CommentModel.sync({
    alter: true,
    force: false,
  });
  await UserFollowerModel.sync({
    alter: true,
    force: false,
  });
};

export default dbInit;
