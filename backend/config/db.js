import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    // await mongoose.connect("mongodb://localhost:27017/BVECFEED");
    console.log(`MongoDB connected ${mongoose.connection.host}`.bgGreen.white);
  } catch (error) {
    console.log(`MongoDB server issue ${error}`.bgRed.white);
  }
};

export default connectDB;
