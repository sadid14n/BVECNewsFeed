import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      required: true,
    },
    dept: { type: String },
    club: { type: String },
    posts: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Post",
      default: [],
    },
    events: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "EventModel",
      default: [],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
