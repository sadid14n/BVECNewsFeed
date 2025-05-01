import express from "express";
import { requireSignIn } from "../middlewares/authMiddlewares.js";
import {
  createEventController,
  deleteEventController,
  getEventsByAuthorId,
  getEventsForAdmin,
  getSingleEventController,
} from "../controllers/eventController.js";
import multer from "multer";

const router = express.Router();

// multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./banners");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/create-event",
  upload.single("banner"),
  requireSignIn,
  createEventController
);

// get post for admin
router.get("/getEventsForAuthor", requireSignIn, getEventsForAdmin);

// get single event
router.get("/event/:id", getSingleEventController);

// delete events for user
router.delete("/delete/:id", requireSignIn, deleteEventController);

// get events by user id
router.get("/get-events/user/:id", getEventsByAuthorId);
export default router;
