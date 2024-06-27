import { Document } from "mongoose";

export interface IBook extends Document {
  title: string;
  author: string | string[];
  isbn: string;
  publisher: string;
  publicationDate: Date;
  pages: number;
  language: string;
  genre: string;
  description: string;
  edition?: string;
  price?: number;
  availability?: "in stock" | "out of stock";
}
