import { Router } from "express";
import {
  createTask,
  deleteTask,
  getTasksByPageORAll,
  toggleTask,
  updateTask,
} from "../controllers/Task";

const router = Router();

// Create Task
router.post("/", createTask);

// Update Task                  // Delete Task
router.put("/:id", updateTask).delete("/:id", deleteTask);

// Mark Task as Completed
router.patch("/:id/toggle", toggleTask);

// Get Tasks by Page or All
router.get("/:page", getTasksByPageORAll);

export default router;
