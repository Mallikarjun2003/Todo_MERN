import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectToDB } from "./helpers/db";
import userRoute from "./routes/User";
import taskRoute from "./routes/Task";
import { authenticateToken } from "./helpers/middleware";

//load environment variables
dotenv.config();

//initialize express app
const app = express();
const PORT = process.env.PORT || 5000;
const api_version = process.env.API_VERSION;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

//routes
app.use(`${api_version}/user`, userRoute);
app.use(`${api_version}/task`, authenticateToken, taskRoute);
app.use("*", (req: Request, res: Response, next: NextFunction) => {
  res.status(404).send("Not Found");
});

//connect to db and start server
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await connectToDB();
});
