import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    referBy: {
      type: String,
      default: null,
    },
    referralCode: {
      type: String,
      required: true,
      unique: true,
    },
    profilePic: {
      type: String,
      default: "noprofile.png",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    deviceId: {
      type: String,
      required: true,
    },
    upiId: {
      type: String,
    }, // --- CORRECTED: Explicitly define nested types for 'balance' ---
    balance: {
      cash: { type: Number, default: 0 },
      bonus: { type: Number, default: 0 },
      reward: { type: Number, default: 0 },
    }, // --- CORRECTED: Explicitly define nested types for 'stats' ---
    stats: {
      totalPlayed: { type: Number, default: 0 },
      totalWon: { type: Number, default: 0 },
      totalLost: { type: Number, default: 0 },
      totalWinned: { type: Number, default: 0 },
      totalReferralEarnings: { type: Number, default: 0 },
      totalReferred: { type: Number, default: 0 },
    },
    bankName: {
      type: String,
    },
    bankAccountNo: {
      // Consider renaming to bankAccountNumber for consistency
      type: String,
    },
    bankIfscCode: {
      type: String,
    },
    kyc: {
      type: Boolean,
      default: false,
    }, // --- CORRECTED: Use 'Object' or 'Mixed' instead of 'JSON' ---
    kycData: {
      type: Object, // Stores arbitrary object/JSON data
      default: null,
    }, // --- CORRECTED: Use 'Object' or 'Mixed' instead of 'JSON' ---
    kycApiResponse: {
      type: Object, // Stores arbitrary object/JSON data
      default: null,
    }, // '_su' and '_y' appear to be internal/admin flags
    _su: {
      type: Boolean,
      default: false,
    },
    _y: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
