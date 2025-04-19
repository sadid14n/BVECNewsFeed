import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";

import userRoutes from "./routes/userRoute.js";
import notificationRoutes from "./routes/notificationRoutes.js";

dotenv.config();
connectDB();

const server = express();
const port = 3000;

server.use(express.json());
server.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
server.use("/files", express.static("files"));

server.use("/api/v1/user", userRoutes);
server.use("/api/v1/notifications", notificationRoutes);

let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
