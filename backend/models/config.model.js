import mongoose from "mongoose";

const configSchema = new mongoose.Schema(
  {
    PAYTM_BUSINESS_MID: { type: String, default: "" },
    PAYTM_BUSINESS_VPA: { type: String, default: "" },
    PAYTM_CHECKSUM: { type: String, default: "" },

    MANUAL_UPI_ID: { type: String, default: "" },
    PAYTM_PAYMENT_VERIFICATION_URL: { type: String, default: "" },

    FAST2SMS_APIKEY: { type: String, default: "" },
    FAST2SMS_ROUTE: { type: String, default: "" },
    FAST2SMS_SENDER_ID: { type: String, default: "" },
    FAST2SMS_MESSAGE: { type: String, default: "" },
    OTPLESS_CLIENT_ID: { type: String, default: "" },
    OTPLESS_SECRET: { type: String, default: "" },
    LUDOKING_RAPID_APIKEY: { type: String, default: "" },

    WINNING_PERCENTAGE: { type: Number, default: "" },
    REFERRAL_LEVEL1: { type: Number, default: "" },
    REFERRAL_LEVEL2: { type: Number, default: "" },
    JOINING_BONUS: { type: Number, default: "" },

    MINIMUM_DEPOSIT_QR: { type: Number, default: "" },
    MAXIMUM_DEPOSIT_QR: { type: Number, default: "" },
    MINIMUM_DEPOSIT_UPI: { type: Number, default: "" },
    MAXIMUM_DEPOSIT_UPI: { type: Number, default: "" },

    MINIMUM_WITHDRAW: { type: Number, default: "" },
    MAXIMUM_WITHDRAW: { type: Number, default: "" },
    WITHDRAW_DAY_LIMIT: { type: Number, default: "" },

    SANDBOX_API_KEY: { type: String, default: "" },
    SANDBOX_SECRET_KEY: { type: String, default: "" },
    YOUTUBE_VIDEO_LINK: { type: String, default: "" },
  },
  { timestamps: true }
);

export const Config = mongoose.model("Config", configSchema);
