import { Error } from "mongoose";

export class ApiError extends Error {
  public statusCode: number;
  public errors: any[];
  public data: any;
  public success: boolean;

  constructor(
    statusCode: number,
    message: string = "Something went wrong",
    errors: any[] = []
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.errors = errors;
    this.data = null;
    this.success = false;
  }
}
