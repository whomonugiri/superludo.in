import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  deviceId: {
    type: String,
    default: null,
  },
  access: {
    type: [String],
    default: [],
  },
  status: {
    type: String,
    enum: ["active", "inactive", "suspended"],
    default: "active",
  },
  isSuperadmin: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash password before saving
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
export const checkPassword = async function (candidatePassword, admin) {
  return bcrypt.compare(candidatePassword, admin.password);
};

export const encryptPassword = async function (pass) {
  const salt = await bcrypt.genSalt(10);
  const np = await bcrypt.hash(pass, salt);
  return np;
};

export const Admin = mongoose.model("Admin", adminSchema);
