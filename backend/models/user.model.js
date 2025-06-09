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
    },
    bankName: {
      type: String,
    },
    bankAccountNo: {
      type: String,
    },
    bankIfscCode: {
      type: String,
    },
    kyc: {
      type: Boolean,
      default: false,
    },
    kycData: {
      type: JSON,
      default: null,
    },
    kycApiResponse: {
      type: JSON,
      default: null,
    },
    _su: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
