import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import JWT from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const registerController = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "User already exists. Please login",
      });
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;

    const newUser = new User(req.body);
    await newUser.save();

    res.status(200).send({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Registration Error",
    });
  }
};

const loginController = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(200).send({
        success: false,
        message: "User does not exist",
      });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
      return res.status(200).send({
        success: false,
        message: "Invalid Name or Password",
      });
    }

    const token = await JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7D",
    });

    res.status(200).send({
      success: true,
      message: "Login Successfully",
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Login Error",
    });
  }
};

export { registerController, loginController };
