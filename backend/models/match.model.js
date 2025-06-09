import mongoose from "mongoose";
const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema(
  {
    roomCode: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    joinedPlayers: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        color: {
          type: String,
          enum: ["green", "red", "blue", "yellow"],
          required: true,
        },
      },
    ],
    gameId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Game",
      required: true,
    },
    status: {
      type: String,
      enum: ["waiting", "ongoing", "completed", "cancelled"],
      default: "waiting",
    },
    startedOn: {
      type: Date,
      default: null,
    },
    endedOn: {
      type: Date,
      default: null,
    },
    amount: {
      type: Number,
      required: true,
      min: [0, "Amount must be a positive number"],
    },
    prize: {
      type: Number,
      required: true,
      min: [0, "Prize must be a positive number"],
    },
  },
  { timestamps: true }
);

export const Match = mongoose.model("Match", matchSchema);
