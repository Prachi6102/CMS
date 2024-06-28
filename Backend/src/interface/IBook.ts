import { Document } from "mongoose";

export interface IBook extends Document {
  title: string;
  author: string;
  isbn: string;
  pages: number;
  language: string;
  category: string;
  sub_category: string;
  description: string;
  cover_img: string;
  book_pdf: string;
}
