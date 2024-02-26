import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";
import ContactModel from "./contact.js";

const UserModel = sequelize.define(
  "User",
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    username: {
      type: DataTypes.STRING(50),
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  {
    paranoid: true,
  }
);

UserModel.hasOne(ContactModel);
ContactModel.belongsTo(UserModel);

export default UserModel;
