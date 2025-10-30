import mongoose from "mongoose";

const matchSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["speedludo", "online"],
      required: true,
    },
    matchId: { type: String, required: true, unique: true },
    duration: { type: Number, default: 5 },

    blue: {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
      },
      result: { type: String, default: null },
      score: { type: Number, default: 0 },
    },
    green: {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
      },
      result: { type: String, default: null },
      score: { type: Number, default: 0 },
    },

    apiData: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
    winner: {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
      },
      color: {
        type: String,
        default: null,
      },
    },
    entryFee: {
      type: Number,
      required: true,
    },
    prize: {
      type: Number,
      required: true,
    },
    roomCode: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ["waiting", "running", "completed", "cancelled"],
      default: "waiting",
      required: true,
    },
    completedAt: {
      type: Date,
      default: null,
    },
    startedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, // Automatically creates createdAt and updatedAt fields
  }
);
export const SpeedLudo = mongoose.model("SpeedLudo", matchSchema);
