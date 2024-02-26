import PostModel from "../../model/post/index.js";
import ContactModel from "../../model/user/contact.js";
import UserModel from "../../model/user/index.js";
import UserFollowerModel from "../../model/user/UserFollower.js";

const UserController = {
  create: async (req, res) => {
    try {
      const payload = req.body;
      let check = await UserModel.findOne({
        where: {
          email: payload.email,
        },
      });
      if (check) {
        return res.status(400).json({
          message: "User with this email already exist",
        });
      }
      check = await UserModel.findOne({
        where: {
          username: payload.username,
        },
      });
      if (check) {
        return res.status(400).json({
          message: "User with this username already exist",
        });
      }

      const user = new UserModel();
      user.firstName = payload.firstName;
      user.lastName = payload.lastName;
      user.email = payload.email;
      user.username = payload.username;
      user.password = payload.password;
      await user.save();

      await ContactModel.create({
        phone: payload.phone,
        mobile: payload.mobile,
        UserId: user.id,
      });

      res.json({
        message: "User created",
        user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Something bad happened to server",
      });
    }
  },
  get: async (req, res) => {
    try {
      const users = await UserModel.findAll({
        include: [ContactModel],
        logging: console.log,
      });

      res.json({
        users,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Something bad happened to server",
      });
    }
  },
  getOne: async (req, res) => {
    try {
      const user_id = req.params.user_id;

      const user = await UserModel.findByPk(user_id, {
        include: [ContactModel, PostModel, "Followee", "Follower"],
      });
      if (!user) {
        return res.status(404).json({
          message: "No user found",
        });
      }
      res.json({
        user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Something bad happened to server",
      });
    }
  },
  update: async (req, res) => {
    try {
      const user_id = req.params.user_id;

      const user = await UserModel.findByPk(user_id);
      if (!user) {
        return res.status(404).json({
          message: "No user found",
        });
      }
      user.firstName = req.body.firstName;

      await user.save();

      res.json({
        user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Something bad happened to server",
      });
    }
  },
  follow: async (req, res) => {
    try {
      const user_id = req.params.user_id;
      const followerID = req.body.followerID;

      const user = await UserFollowerModel.create({
        FolloweeId: user_id,
        FollowerId: followerID,
      });

      res.json({
        Message: "User followed",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Something bad happened to server",
      });
    }
  },
};

export default UserController;
