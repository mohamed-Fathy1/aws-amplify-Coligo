import express from "express";
import cors from "cors";
import connectDB from "./config/db";
import { PORT, NODE_ENV } from "./env";
import dotenv from "dotenv";
import morgan from "morgan";

import announcementsRoutes from "./routes/announcements";
import quizRoutes from "./routes/quizzes";
import authRouter from "./routes/auth";

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

// Configure CORS to allow requests from any origin during development
app.use(
  cors({
    origin:
      NODE_ENV === "production" ? "https://yourproductiondomain.com" : "*",
    credentials: true,
  })
);

if (NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/announcements", announcementsRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.listen(PORT, () => {
  console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`);
});
