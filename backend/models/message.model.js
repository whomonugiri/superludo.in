import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,

      default: null,
    },

    adminId: {
      type: mongoose.Schema.Types.ObjectId,

      default: null,
    },
    image: {
      type: String,
      default: null,
    },
    audio: {
      type: String,
      default: null,
    },
    text: {
      type: String,
      default: null,
    },
    isRead: {
      type: Boolean,
      default: false, // To track read/unread messages
    },
  },
  { timestamps: true }
);

messageSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 3 * 24 * 60 * 60 } // Logs expire after 30 days
);

export const Message = mongoose.model("Message", messageSchema);
