import mongoose, { Schema } from "mongoose";

const userSchema: Schema = new Schema(
  {
    user_name: {
      type: String,
      required: true,
      unique: true,
    },
    full_name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["User", "Admin"],
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Other"],
    },
    dob: {
      type: Date,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobile_no: {
      type: [String],
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export { User };
