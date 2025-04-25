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
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
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

const updateUserProfileController = async (req, res) => {
  try {
    const userId = req.user;

    const updates = req.body;

    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
      },
    });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const testController = (req, res) => {
  try {
    res.send("Protected routes");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};

const getProfileByRoleController = async (req, res) => {
  try {
    const { role } = req.params;

    const users = await User.find({ role });

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error("Error fetching posts by role:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching posts by role.",
    });
  }
};

const getProfileByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).populate("posts", "title");

    if (user) {
      return res.status(200).send({
        success: true,
        message: "User find successfully",
        user,
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Erron in controller" });
  }
};

export {
  registerController,
  loginController,
  testController,
  getProfileByRoleController,
  updateUserProfileController,
  getProfileByIdController,
};
