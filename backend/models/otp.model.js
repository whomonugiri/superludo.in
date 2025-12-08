import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    otp: {
      type: String,
      required: true,
    },

    mobileNumber: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // This automatically adds 'createdAt' and 'updatedAt' fields
);

// 1. Target the 'createdAt' field (which is a Date type)
// 2. Set the 'expires' option to '60s' (60 seconds) or '1m' (1 minute)
otpSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 60 } // or use the Mongoose-specific 'expires: 60' or 'expires: "1m"' on the field itself
);

// --- Alternative (more direct) way using the schema definition ---

// If you prefer to set the expiry directly on the field,
// you can define the 'createdAt' field explicitly in the schema
// and set 'expires'. If using 'timestamps: true', you must define
// an index as shown above, or use a custom field.

const OTP = mongoose.model("OTP", otpSchema);
export default OTP;
