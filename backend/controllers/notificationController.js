import Post from "../models/notificationModel.js";
import User from "../models/userModel.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Workaround for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const createNotificationController = async (req, res) => {
  const authorId = req.user;
  console.log(authorId);

  console.log(req.file);
  const title = req.body.title;
  const description = req.body.description;
  const fileName = req.file.filename;

  try {
    const newPost = await Post.create({
      title: title,
      description: description,
      file: fileName,
      author: authorId,
    });

    try {
      await User.findByIdAndUpdate(
        authorId,
        { $push: { posts: newPost._id } },
        { new: true }
      );
    } catch (error) {
      console.log("Error in updating post id into users");
    }

    res.status(200).send({ success: true, post: newPost });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false });
  }
};

export const getAllNotificationController = async (req, res) => {
  try {
    const notification = await Post.find({}).populate(
      "author",
      "name email role"
    );
    res.status(200).send({ success: true, data: notification });
  } catch (error) {
    res.status(500).send({ success: false });
  }
};

export const getNotificationsForAdmin = async (req, res) => {
  const userId = req.user;

  try {
    const notifications = await Post.find({ author: userId });

    res.status(200).json({ success: true, data: notifications });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getSingleNotificationController = async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await Post.findById(id).populate(
      "author",
      "name email role"
    );

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    res.status(200).json({
      success: true,
      data: notification,
    });
  } catch (error) {
    console.error("Error fetching notification:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const deleteNotificationController = async (req, res) => {
  try {
    const notification = await Post.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    // Check if the user is the owner
    if (notification.author.toString() !== req.user.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this notification",
      });
    }

    // construct the file path for the pdf
    const filePath = path.join(__dirname, "..", "files", notification.file);

    // Delete file if exists
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await notification.deleteOne();

    res.status(200).json({
      success: true,
      message: "Notification deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting notification:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getPostsByRole = async (req, res) => {
  try {
    const { role } = req.params;

    const posts = await Post.find()
      .populate("author", "name email role")
      .sort({ createdAt: -1 });

    // Filter out posts where populate returned null
    const filteredPosts = posts.filter(
      (post) => post.author && post.author.role === role
    );

    res.status(200).json({
      success: true,
      data: filteredPosts,
    });
  } catch (error) {
    console.error("Error fetching posts by role:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching posts by role.",
    });
  }
};

export const getNotificationsByAuthorID = async (req, res) => {
  const { id } = req.params;

  try {
    const notifications = await Post.find({ author: id });

    res.status(200).json({ success: true, data: notifications });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
