import express from "express";
import {
  getQuizzes,
  getQuiz,
  createQuiz,
  updateQuiz,
  deleteQuiz,
} from "../controllers/quizzes";
import { protect } from "../middleware/auth";

const router = express.Router();

router.use(protect);

router.route("/").get(getQuizzes).post(createQuiz);

router.route("/:id").get(getQuiz).put(updateQuiz).delete(deleteQuiz);

export default router;
