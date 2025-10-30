import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
  entryFee: {
    type: Number,
    required: true,
  },
  playing: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const FakeQuick = mongoose.model("FakeQuick", matchSchema);

export default FakeQuick;
