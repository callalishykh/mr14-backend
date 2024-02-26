import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";
import UserModel from "./index.js";

const UserFollowerModel = sequelize.define(
  "UserFollower",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    paranoid: true,
  }
);

UserFollowerModel.belongsTo(UserModel, { as: "Follower" });
UserFollowerModel.belongsTo(UserModel, { as: "Followee" });

UserModel.belongsToMany(UserModel, {
  through: UserFollowerModel,
  as: "Followee",

  foreignKey: "FollowerId",
});
UserModel.belongsToMany(UserModel, {
  through: UserFollowerModel,
  as: "Follower",
  foreignKey: "FolloweeId",
});

export default UserFollowerModel;
