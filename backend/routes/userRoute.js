import express from "express";
import {
  getProfileByIdController,
  getProfileByRoleController,
  loginController,
  registerController,
  testController,
  updateUserProfileController,
} from "../controllers/userController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddlewares.js";

const router = express.Router();

router.post("/test-requireSign", requireSignIn, testController);

router.post("/register", registerController);
router.post("/login", loginController);
router.put("/update-profile", requireSignIn, updateUserProfileController);

// Protected Route for fontend
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

router.get("/role/:role", getProfileByRoleController);
router.get("/get-department/:id", getProfileByIdController);
router.get("/get-club/:id", getProfileByIdController);

export default router;
