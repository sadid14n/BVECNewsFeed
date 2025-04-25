import express from "express";
import {
  createNotificationController,
  deleteNotificationController,
  getAllNotificationController,
  getNotificationsByAuthorID,
  getNotificationsForAdmin,
  getPostsByRole,
  getSingleNotificationController,
} from "../controllers/notificationController.js";
import multer from "multer";
import { requireSignIn } from "../middlewares/authMiddlewares.js";

const router = express.Router();

// multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/upload-files",
  upload.single("file"),
  requireSignIn,
  createNotificationController
);

router.get("/getAllNotifications", getAllNotificationController);

router.get(
  "/getAllNotificationsByAuthor",
  requireSignIn,
  getNotificationsForAdmin
);

// view single notifications
router.get("/notification/:id", getSingleNotificationController);

router.delete("/delete/:id", requireSignIn, deleteNotificationController);

router.get("/role/:role", getPostsByRole);

router.get("/get-notification/user/:id", getNotificationsByAuthorID);

export default router;
