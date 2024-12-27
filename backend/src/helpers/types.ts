import mongoose from "mongoose";

import { Request } from "express";

export interface IUser extends mongoose.Document {
  username: string;
  password: string;
}

export interface ITask extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  completed: boolean;
  expireTime: Date;
  prority: "LOW" | "MEDIUM" | "HIGH";
}

export interface AuthRequest extends Request {
  user?: { id: mongoose.Types.ObjectId };
}
