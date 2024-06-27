import mongoose, { Schema } from "mongoose";
import { ICategory } from "../interface";

const categorySchema: Schema<ICategory> = new Schema(
  {
    category: {
      type: String,
      required: true,
      enum: ["Fiction", "Non-Fiction"],
    },
    sub_category: {
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

const Category = mongoose.model("Category", categorySchema);

export { Category };
