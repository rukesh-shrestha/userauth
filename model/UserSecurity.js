import mongoose from "mongoose";

const UserSecutirySchema = mongoose.Schema(
  {
    dob: {
      type: Date,
      required: [true, "Missing Date Of Birth"],
      trim: true,
    },
    pin: {
      type: String,
      required: [true, "Missing PIN"],
      minLength: [4, "PIN should be at least 4 digit long."],
      maxLength: [6, "PIN should not be at more than 6 digit long."],
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
