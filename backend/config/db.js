import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MONGODB connected successfully");
  } catch (error) {
    console.log(`Error:${error.message}`);
  }
};

export default connectDB;
