import mongoose from "mongoose";

const matchSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["manual", "speedludo", "online"],
      required: true,
      default: "manual",
    },
    matchId: { type: String, required: true },
    game: {
      type: String,
      required: true,
    },
    joinerReqs: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        name: { type: String },
      },
    ],
    gameId: {
      type: String,
      default: null,
    },
    host: {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      fullName: { type: String },
      profilePic: { type: String },
      lkId: {
        type: String,
        default: null,
      },

      txnId: {
        type: String,
        default: null,
      },
      result: { type: String, default: null },
      resultAt: { type: Date, default: null },
      screenshot: { type: String, default: null },
    },
    apiData: {
      type: JSON,
      default: null,
    },
    joiner: {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
      },
      fullName: { type: String, default: null },
      profilePic: { type: String, default: null },
      lkId: {
        type: String,
        default: null,
      },
      txnId: {
        type: String,
        default: null,
      },
      joinAt: {
        type: Date,
        default: null,
      },
      result: { type: String, default: null },
      resultAt: { type: Date, default: null },
      screenshot: { type: String, default: null },
    },
    conflict: { type: Boolean, default: false },
    cancellationRequested: {
      req: { type: Boolean, default: false },
      userId: { type: mongoose.Schema.Types.ObjectId, default: null },
      by: {
        type: String,
        default: null,
      },
      reqAt: {
        type: Date,
        default: null,
      },
      accepted: { type: Boolean, default: false },
      acceptedBy: {
        type: String,
        default: null,
      },
      reason: {
        type: String,
        default: null,
      },
      acceptedAt: {
        type: Date,
        default: null,
      },
    },
    winner: {
      userId: {
        type: String,
        default: null,
      },
      lkId: {
        type: String,
        default: null,
      },
    },
    looser: {
      userId: {
        type: String,
        default: null,
      },
      lkId: {
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
      default: null,
    },
    roomCodeUpdatedAt: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      enum: ["open", "running", "completed", "cancelled"],
      default: "open",
      required: true,
    },
    completedAt: {
      type: Date,
    },
  },
  {
    timestamps: true, // Automatically creates createdAt and updatedAt fields
  }
);

export const ManualMatch = mongoose.model("ManualMatch", matchSchema);
