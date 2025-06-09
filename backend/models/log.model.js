import mongoose from "mongoose";

const logSchema = new mongoose.Schema(
  {
    matchId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Log = mongoose.model("Log", logSchema);
export default Log;
