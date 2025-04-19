import JWT from "jsonwebtoken";
import User from "../models/userModel.js";

// protected routes token based
export const requireSignIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decode = await JWT.verify(token, process.env.JWT_SECRET);

    req.user = decode.id;
    next();
  } catch (error) {
    console.log(error);
  }
};

// admin access
export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      success: false,
      message: "Error in Admin middleware",
      error,
    });
  }
};
