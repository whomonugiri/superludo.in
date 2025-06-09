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

export const Message = mongoose.model("Message", messageSchema);
