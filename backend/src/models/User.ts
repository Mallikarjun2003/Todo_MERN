import mongoose from "mongoose";
import { IUser } from "../helpers/types";

const UserSchema = new mongoose.Schema<IUser>({
  username: String,
  password: String,
});
export const User = mongoose.model<IUser>("User", UserSchema);
