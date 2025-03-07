import { Request, Response, NextFunction } from "express";


interface ApiError extends Error {
  status?: number;
}


const errorHandler = (err: ApiError, req: Request, res: Response, next: NextFunction) => {
  console.error(`[Error]: ${err.message}`);

  const statusCode = err.status || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

export default errorHandler;
