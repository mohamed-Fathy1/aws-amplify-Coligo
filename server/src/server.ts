import express from "express";
import cors from "cors";
import connectDB from "./config/db";
import announcementsRoutes from "./routes/announcements";

const PORT = 5001;
const NODE_ENV = "development";

connectDB();

const app = express();

app.use(express.json());

app.use(cors({}));

app.use("/api/announcements", announcementsRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.listen(PORT, () => {
  console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`);
});
