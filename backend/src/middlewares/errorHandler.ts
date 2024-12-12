// src/middleware/errorHandler.ts

import { Request, Response, NextFunction } from "express";
import  CustomError  from "../types/customError";

export const errorHandler = (
  err: Error | CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = (err as CustomError).status || 500;
  const message = err.message || 'Internal Server Error';
  console.log("error handler middlwar",err)
  res.status(status).json({
      success: false,
      message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }), // Optional stack trace for dev
  });
};