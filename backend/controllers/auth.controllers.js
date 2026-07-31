import generateToken from "../config/token.js";
import User from "../model/user.model.js";
import bcrypt from "bcryptjs";

export const signUp = async (req, res) => {
  try {
    const { firstName, lastName, email, password, userName } = req.body;

    if (!firstName || !lastName || !email || !password || !userName) {
      return res.status(400).json({ message: "send all details" });
    }
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "User already exist" });
    }

    const hassedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hassedPassword,
      userName,
    });

    let token;
    try {
      token = generateToken(user._id);
    } catch (error) {
      console.log(error);
    }

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENVIORNMENT == "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      user: {
        firstName,
        lastName,
        email,
        userName,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
};
