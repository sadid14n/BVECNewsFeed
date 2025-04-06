import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import userRoutes from "./routes/userRoute.js";

dotenv.config();
connectDB();

const server = express();
const port = 3000;

server.use(express.json());

server.use("/api/v1/user", userRoutes);

let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

// Register User
// server.post("/signup", async (req, res) => {
//   try {
//     // Check if user already exists
//     const existingUser = await User.findOne({ email: req.body.email });
//     if (existingUser) {
//       return res.status(200).send({
//         success: false,
//         message: "User already exists. Please login",
//       });
//     }

//     // Set name based on role before saving
//     let name;
//     if (req.body.role === "principal") {
//       name = "BVEC Principal";
//     } else if (req.body.role === "student_union") {
//       name = "BVEC Student Union";
//     } else if (req.body.role === "department") {
//       name = req.body.department; // Department name as account name
//     } else if (req.body.role === "club") {
//       name = req.body.club; // Club name as account name
//     }

//     if (!name) {
//       return res
//         .status(400)
//         .send({ success: false, message: "Invalid role or missing name" });
//     }

//     // Hash the password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(req.body.password, salt);

//     // Create the user
//     const newUser = new User({
//       ...req.body, // Spread other request data
//       name, // Assign the name manually
//       password: hashedPassword, // Store hashed password
//     });

//     await newUser.save();
//     res.status(200).send({
//       success: true,
//       message: "User registered successfully",
//       newUser,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({ success: false, message: "Registration Error" });
//   }
// });

// // Login User
// server.post("/login", async (req, res) => {
//   try {
//     const user = await User.findOne({ email: req.body.email });
//     if (!user) {
//       return res.status(200).send({
//         success: false,
//         message: "User not found. Please register",
//       });
//     }
//     const isMatch = await bcrypt.compare(req.body.password, user.password);
//     if (!isMatch) {
//       return res.status(200).send({
//         success: false,
//         message: "Invalid Email or Password",
//       });
//     }
//     const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "1D",
//     });
//     res.status(200).send({
//       success: true,
//       message: "Login Successfully",
//       token,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Login Controller Error",
//     });
//   }
// });

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
