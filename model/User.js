import mongoose from "mongoose";
const UserSchema = mongoose.Schema(
  {
    googleID: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Missing Email"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    firstname: {
      type: String,
      required: [true, "Missing First Name"],
      lowercase: true,
      trim: true,
    },
    lastname: {
      type: String,
      required: [true, "Missing last Name"],
      lowercase: true,
      trim: true,
    },
    role: {
      type: String,
      required: [true, "Missing Role"],
      enum: ["superadmin", "admin", "staff"],
      lowercase: true,
      trim: true,
    },
    status: {
      type: String,
      default: "deactivate",
      enum: ["activate", "deactivate"],
    },
    isverified: {
      type: Boolean,
      default: false,
      enum: [true, false],
    },
    emailtoken: {
      type: String,
    },
    resettoken: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", UserSchema);
