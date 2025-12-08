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

logSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 30 * 24 * 60 * 60 } // Logs expire after 30 days
);

const Log = mongoose.model("Log", logSchema);
export default Log;
