import UserModel from "../../model/user/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const AuthController = {
  login: async (req, res) => {
    const payload = req.body;

    const user = await UserModel.findOne({
      where: {
        email: payload.email,
        // password: payload.password,
      },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const hPassword = user.password;
    const password = payload.password;
    const result = await bcrypt.compare(password, hPassword);

    if (!result) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const data = {
      id: user.id,
      email: user.email,
      name: user.firstName + " " + user.lastName,
    };

    const token = jwt.sign(
      {
        // exp: Math.floor(Date.now() / 1000) + (60 * 60),
        ...data,
      },
      process.env.JWT_SECRET,
      { expiresIn: "5m" }
    );

    res.json({
      message: "User Logged in",
      data,
      token,
    });
  },

  register: async (req, res) => {
    const payload = req.body;

    const password = await bcrypt.hash(payload.password, 10);
    console.log(password, "password");

    const user = await UserModel.create({
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      username: payload.username,

      password: password,
    });

    res.json({
      message: "User Registered",
    });
  },
};

export default AuthController;
