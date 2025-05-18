import express from "express";
import cors from "cors";

const PORT = 5001;
const NODE_ENV = "development";

const app = express();

app.use(express.json());

app.use(cors({}));

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.listen(PORT, () => {
  console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`);
});
