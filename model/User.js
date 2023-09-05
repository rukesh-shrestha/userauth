import mongoose from "mongoose";
const UserSchema = mongoose.Schema(
  {
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
      type: Boolean,
      default: false,
      enum: [true, false],
    },
    isverified: {
      type: Boolean,
      default: false,
      enum: [true, false],
    },
    emailtoken: {
      type: String,
    },
    password: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", UserSchema);