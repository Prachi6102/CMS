import { Document } from "mongoose";

export interface IAuthor extends Document {
  full_name: string;
  email: string;
  dob: Date;
  country: string;
  biography: string;
  profile_pic: string;
  createdBy?: string;
  updatedBy?: string;
}
