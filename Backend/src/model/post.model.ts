import mongoose, { Schema } from "mongoose";
import { IPost } from "../interface";

const postSchema: Schema<IPost> = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
    },
    updatedBy: {
      type: String,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export { Post };
