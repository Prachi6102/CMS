import mongoose, { Schema } from "mongoose";

const bookSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    isbn: {
      type: String,
      required: true,
      unique: true,
    },
    pages: {
      type: Number,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    sub_category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    cover_img: {
      type: String,
      required: true,
    },
    book_pdf: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

export { Book };
