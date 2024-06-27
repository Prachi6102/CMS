// src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      statusCode: err.statusCode,
      message: err.message,
      errors: err.errors,
      data: err.data,
      success: err.success,
    });
  } else {
    res.status(500).json({
      statusCode: 500,
      message: err.message || "Internal Server Error",
      errors: [],
      data: null,
      success: false,
    });
  }
};
