import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "./types";
import mongoose from "mongoose";

export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.split(" ")[1];
  console.log("token------> ", token);
  if (!token) return res.status(401).send("Access denied");

  jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
    if (err) return res.status(403).send("Invalid token");
    req.user = user as { id: mongoose.Types.ObjectId };
    next();
  });
};
