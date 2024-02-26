import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";
import UserModel from "../user/index.js";
import PostModel from "./index.js";

const CommentModel = sequelize.define(
  "Comment",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
  },
  {
    paranoid: true,
  }
);
PostModel.hasMany(CommentModel);
CommentModel.belongsTo(PostModel);

UserModel.hasMany(CommentModel);
CommentModel.belongsTo(UserModel);

export default CommentModel;
