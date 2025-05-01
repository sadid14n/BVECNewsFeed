import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    banner: {
      type: String, // URL of the uploaded image
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    googleFormLink: {
      type: String,
    },
  },
  { timestamps: true }
);

const EventModel = mongoose.model("EventModel", EventSchema);

export default EventModel;
