import EventModel from "../models/eventModel.js";
import User from "../models/userModel.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Workaround for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const createEventController = async (req, res) => {
  const authorId = req.user;

  try {
    const { title, description, startDate, endDate, googleFormLink } = req.body;
    const banner = req.file.filename;

    const event = new EventModel({
      author: authorId,
      banner,
      title,
      description,
      startDate,
      endDate,
      googleFormLink,
    });
    await event.save();

    try {
      await User.findByIdAndUpdate(
        authorId,
        { $push: { events: event._id } },
        { new: true }
      );
    } catch (error) {
      console.log("Error in updating post id into users");
    }

    res.status(201).send({ success: true, event });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
};

export const getEventsForAdmin = async (req, res) => {
  const authorId = req.user;

  try {
    const events = await EventModel.find({ author: authorId });

    res.status(200).json({ success: true, data: events });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getSingleEventController = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await EventModel.findById(id).populate(
      "author",
      "name email role"
    );

    if (!event) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }

    res.status(200).send({ success: true, data: event });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteEventController = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await EventModel.findById(id);

    if (!event) {
      return res
        .status(500)
        .send({ success: false, message: "Event not found" });
    }

    // Check if the user is the owner
    if (event.author.toString() !== req.user.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this notification",
      });
    }

    // construct the file path for the pdf
    const filePath = path.join(__dirname, "..", "banners", event.banner);

    // Delete file if exists
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await event.deleteOne();

    res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .send({ success: false, message: "Delete Event Controller Error" });
  }
};

export const getEventsByAuthorId = async (req, res) => {
  try {
    const { id } = req.params;

    const events = await EventModel.find({ author: id }).sort({
      createdAt: -1,
    });

    if (!events) {
      return res
        .status(404)
        .send({ success: false, message: "Events not found" });
    }

    res.status(200).send({ success: true, data: events });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "getEventById controller error" });
  }
};

export const getEvents = async (req, res) => {
  try {
    const events = await Event.find({});
    res.status(200).send({ success: true, events });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
};
