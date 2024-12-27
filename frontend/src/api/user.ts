import { IResponse, IUser } from "@/lib/types";
import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const register = (user: IUser) => {
  console.log(import.meta.env.BACKEND_URL);
  return api.post<IResponse>("/user/register", user);
};
export const login = (user: IUser) => api.post<IResponse>("/user/login", user);
