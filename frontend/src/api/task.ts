import axios from "axios";
import { ITask } from "../lib/types";

const API_URL = import.meta.env.BACKEND_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getTasks = (page: string | undefined) =>
  api.get<ITask[]>(`/task/${page}`);
export const createTask = (task: Omit<ITask, "_id" | "completed">) =>
  api.post<ITask>("/task", task);
export const updateTask = (id: string, task: Partial<ITask>) =>
  api.put<ITask>(`/task/${id}`, task);
export const deleteTask = (id: string) => api.delete(`/task/${id}`);
export const toggleTask = (id: string) =>
  api.patch<ITask>(`/tasks/${id}/toggle`);
