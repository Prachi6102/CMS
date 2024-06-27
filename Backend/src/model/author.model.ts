import mongoose, { Schema } from "mongoose";
import { IAuthor } from "../interface";

const authorSchema: Schema<IAuthor> = new Schema(
  {
    full_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    biography: {
      type: String,
      required: true,
    },
    profile_pic: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
    updatedBy: {
      type: String,
    },
  },
  { timestamps: true }
);

const Author = mongoose.model("Author", authorSchema);

export { Author };
