import { Router } from "express";
import { login, register } from "../controllers/User";
import { User } from "../models/User";

const router = Router();

//TODO : need to remove this route later
router.get("/", async (req, res) => {
  const users = await User.find();
});

// User Registration
router.post("/register", register);

// User Login
router.post("/login", login);

export default router;
