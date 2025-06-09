import mongoose from "mongoose";

const infoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: null,
    },
    hindiText: {
      type: String,
      default: null,
    },
    englishText: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

export const Info = mongoose.model("Info", infoSchema);
