import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/");
    console.log("mongoDb connected successfully");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
