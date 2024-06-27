import { Document } from "mongoose";

export interface ICategory extends Document {
  category: "Fiction" | "Non-Fiction";
  sub_category: string;
  createdBy?: string;
  updatedBy?: string;
}
