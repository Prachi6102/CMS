import { Document } from "mongoose";

export interface IPost extends Document {
  content: string;
  createdBy?: string;
  updatedBy?: string;
}
