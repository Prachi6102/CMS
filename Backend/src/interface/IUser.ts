import { Document } from "mongoose";
import { IAddress } from "./IAddress";

export interface IUser extends Document {
  full_name: string;
  user_name: string;
  role: "User" | "Admin";
  gender: "Male" | "Female" | "Other";
  hobbies: string[];
  dob: Date;
  email: string;
  mobile_no: string[];
  password: string;
  addresses: IAddress[];
  profile_pic?: string;
}
