import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";

import userRoutes from "./routes/userRoute.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import eventRoute from "./routes/eventRoute.js";

dotenv.config();
connectDB();

const server = express();
const port = process.env.PORT || 3000;

server.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",
  "https://your-frontend.vercel.app", // replace with your actual Vercel URL
];

server.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

server.use("/files", express.static("files"));
server.use("/banners", express.static("banners"));

server.use("/api/v1/user", userRoutes);
server.use("/api/v1/notifications", notificationRoutes);
server.use("/api/v1/events", eventRoute);

let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
