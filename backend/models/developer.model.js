import mongoose from "mongoose";

const developerSchema = new mongoose.Schema(
  {
    otpCount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const DEVELOPER = mongoose.model("DEVELOPER", developerSchema);
export default DEVELOPER;
