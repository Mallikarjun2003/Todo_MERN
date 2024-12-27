import mongoose from "mongoose";
import { ITask } from "../helpers/types";

const TaskSchema = new mongoose.Schema<ITask>({
  userId: mongoose.Schema.Types.ObjectId,
  title: String,
  description: String,
  completed: Boolean,
  expireTime: Date,
  prority: { type: String, enum: ["LOW", "MEDIUM", "HIGH"] },
});

export const Task = mongoose.model<ITask>("Task", TaskSchema);
