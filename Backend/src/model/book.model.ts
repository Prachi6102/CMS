import mongoose, { Schema } from "mongoose";

const bookSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: [String], required: true },
    isbn: { type: String, required: true, unique: true },
    publisher: { type: String, required: true },
    publicationDate: { type: Date, required: true },
    pages: { type: Number, required: true },
    language: { type: String, required: true },
    genre: { type: String, required: true },
    description: { type: String, required: true },
    edition: { type: String },
    price: { type: Number },
    availability: { type: String, enum: ["in stock", "out of stock"] },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

export { Book };
