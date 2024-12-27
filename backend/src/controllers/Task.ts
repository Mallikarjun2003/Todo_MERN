import { Response } from "express";
import { AuthRequest } from "../helpers/types";
import { Task } from "../models/Task";

export async function createTask(req: AuthRequest, res: Response) {
  try {
    const { title, description, expireTime, prority } = req.body;
    const task = new Task({
      userId: req.user!.id,
      title,
      description,
      expireTime,
      prority,
    });
    await task.save();
    res.status(201).json({ task, message: "Task created successfully" });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "An error occurred" });
  }
}

export async function updateTask(req: AuthRequest, res: Response) {
  try {
    if (req.params.id === undefined)
      return res.status(400).json({ message: "Task id is required" });
    const { title, description, expireTime, prority } = req.body;
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user!.id },
      { title, description, expireTime, prority },
      { new: true }
    );
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ task, message: "Task updated successfully" });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "An error occurred" });
  }
}

export async function deleteTask(req: AuthRequest, res: Response) {
  try {
    if (req.params.id === undefined)
      return res.status(400).json({ message: "Task id is required" });
    const result = await Task.deleteOne({
      _id: req.params.id,
      userId: req.user!.id,
    });
    if (result.deletedCount === 0)
      return res.status(404).send("Task not found");
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "An error occurred" });
  }
}

export async function toggleTask(req: AuthRequest, res: Response) {
  try {
    if (req.params.id === undefined)
      return res.status(400).json({ message: "Task id is required" });
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user!.id,
    });
    if (!task) return res.status(404).json({ message: "Task not found" });
    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user!.id },
      { completed: !task?.completed },
      { new: true }
    );
    res.json({
      message: "Task updated successfully",
      task: { ...updatedTask },
    });
  } catch (error) {
    console.error("Error toggling task:", error);
    res.status(500).json({ message: "An error occurred" });
  }
}

export async function getTasksByPageORAll(req: AuthRequest, res: Response) {
  try {
    if (req.params.page === undefined) {
      //send all tasks sorted by expireTime
      const tasks = await Task.find({ userId: req.user!.id }).sort({
        expireTime: "descending",
      });
      return res.json({ tasks, message: "Tasks fetched successfully" });
    }
    const page = parseInt(req.params.page);
    const limit = 10;
    const tasks = await Task.find({ userId: req.user!.id })
      .sort({ expireTime: "descending" })
      .limit(limit)
      .skip(limit * (page - 1));
    res.json({ tasks, message: "Tasks fetched successfully" });
  } catch (error) {
    console.error("Error getting tasks:", error);
    res.status(500).json({ message: "An error occurred" });
  }
}
