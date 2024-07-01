import mongoose, { Schema } from "mongoose";

const addressSchema: Schema = new Schema({
  contry: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  zipcode: {
    type: String,
    required: true,
  },
});

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
    hobbies: {
      type: [String],
      required: true,
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
    addresses: {
      type: [addressSchema],
      required: true,
    },
    profile_pic: {
      type: String,
      default: "..\\Backend\\public\\images\\profile_pic_default.jpg",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export { User };
