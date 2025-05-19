import request from "supertest";
import express from "express";
import mongoose from "mongoose";
import { getQuizzes, getQuiz } from "../../controllers/quizzes";
import Quiz from "../../models/Quiz";
import User from "../../models/User";
import * as db from "../utils/db-setup";

// Create a test app
const app = express();
app.use(express.json());

// Setup routes for read operations only (no authentication needed)
app.get("/api/quizzes", getQuizzes);
app.get("/api/quizzes/:id", getQuiz);

// Setup and teardown
beforeAll(async () => {
  await db.connect();
});

afterAll(async () => {
  await db.disconnect();
});

beforeEach(async () => {
  await db.clearDatabase();
});

describe("Quizzes Controller - READ Operations", () => {
  const teacherId = new mongoose.Types.ObjectId("60d0fe4f5311236168a109ca");

  beforeEach(async () => {
    // Create a test teacher user
    await User.create({
      _id: teacherId,
      name: "Test Teacher",
      email: "teacher@example.com",
      role: "teacher",
      isAuthenticated: true,
    });
  });

  describe("GET /api/quizzes", () => {
    it("should get all quizzes", async () => {
      // Create two test quizzes
      const now = new Date();
      const tomorrow = new Date(now.getTime() + 86400000); // 1 day in the future
      const dayAfterTomorrow = new Date(now.getTime() + 172800000); // 2 days in the future

      await Quiz.create([
        {
          title: "Math Quiz",
          course: "Math 101",
          topic: "Algebra",
          dueDate: tomorrow,
          questions: [
            {
              question: "What is 2+2?",
              options: ["3", "4", "5", "6"],
              correctAnswer: "4",
              points: 1,
            },
            {
              question: "What is the square root of 9?",
              options: ["2", "3", "4", "5"],
              correctAnswer: "3",
              points: 2,
            },
          ],
        },
        {
          title: "Physics Quiz",
          course: "Physics 101",
          topic: "Mechanics",
          dueDate: dayAfterTomorrow,
          questions: [
            {
              question: "What is Newton's first law?",
              options: [
                "Objects in motion stay in motion",
                "Force equals mass times acceleration",
                "For every action there is an equal and opposite reaction",
                "Energy cannot be created or destroyed",
              ],
              correctAnswer: "Objects in motion stay in motion",
              points: 2,
            },
          ],
        },
      ]);

      const res = await request(app).get("/api/quizzes");

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.count).toBe(2);
      expect(res.body.data).toHaveLength(2);
      // Quizzes should be sorted by dueDate in ascending order
      expect(res.body.data[0].title).toBe("Math Quiz");
      expect(res.body.data[1].title).toBe("Physics Quiz");
    });

    it("should filter quizzes by course", async () => {
      // Create test quizzes for different courses
      await Quiz.create([
        {
          title: "Math Quiz",
          course: "Math 101",
          topic: "Algebra",
          dueDate: new Date(),
          questions: [
            {
              question: "What is 2+2?",
              options: ["3", "4", "5", "6"],
              correctAnswer: "4",
              points: 1,
            },
          ],
        },
        {
          title: "Physics Quiz",
          course: "Physics 101",
          topic: "Mechanics",
          dueDate: new Date(),
          questions: [
            {
              question: "What is Newton's first law?",
              options: [
                "Objects in motion stay in motion",
                "Force equals mass times acceleration",
                "For every action there is an equal and opposite reaction",
                "Energy cannot be created or destroyed",
              ],
              correctAnswer: "Objects in motion stay in motion",
              points: 2,
            },
          ],
        },
      ]);

      const res = await request(app).get("/api/quizzes?course=Math 101");

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.count).toBe(1);
      expect(res.body.data[0].title).toBe("Math Quiz");
    });
  });

  describe("GET /api/quizzes/:id", () => {
    it("should get a single quiz by ID", async () => {
      // Create a test quiz
      const quiz = await Quiz.create({
        title: "Test Quiz",
        course: "Test Course",
        topic: "Test Topic",
        dueDate: new Date(),
        questions: [
          {
            question: "Sample question?",
            options: ["Option 1", "Option 2", "Option 3", "Option 4"],
            correctAnswer: "Option 2",
            points: 1,
          },
        ],
      });

      const res = await request(app).get(`/api/quizzes/${quiz._id}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.title).toBe("Test Quiz");
      expect(res.body.data.course).toBe("Test Course");
    });

    it("should return 404 if quiz not found", async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app).get(`/api/quizzes/${fakeId}`);

      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
    });
  });
});
