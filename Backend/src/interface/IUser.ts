import { Document } from "mongoose";

export interface IUser extends Document {
  full_name: string;
  user_name: string;
  role: "User" | "Admin";
  gender: "Male" | "Female" | "Other";
  dob: Date;
  email: string;
  mobile_no: string[];
  password: string;
}
