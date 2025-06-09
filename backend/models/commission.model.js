import mongoose from "mongoose";

const commissionSchema = new mongoose.Schema(
  {
    minAmount: {
      type: Number,
      required: true,
    },
    maxAmount: {
      type: Number,
      required: true,
    },
    commission: {
      type: Number,
      required: true,
    },
    commission2: {
      type: Number,
      default: null,
    },
    type: {
      type: String,
    },
  },
  { timestamps: true }
);

const Commission = mongoose.model("Commission", commissionSchema);
export default Commission;
