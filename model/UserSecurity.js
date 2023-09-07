import mongoose from "mongoose";

const UserSecutirySchema = mongoose.Schema(
  {
    dob: {
      type: Date,
      required: [true, "Missing Date Of Birth"],
      trim: true,
    },
    pin: {
      type: Number,
      required: [true, "Missing PIN"],
      trim: true,
      min: [4, "Must be at least 4, got {VALUE}"],
      max: [6, "Must be at greater than  6, got {VALUE}"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("UserSecurity", UserSecutirySchema);
