import request from "supertest";
import express from "express";
import mongoose from "mongoose";
import {
  getAnnouncements,
  getAnnouncement,
} from "../../controllers/announcements";
import Announcement from "../../models/Announcement";
import User from "../../models/User";
import * as db from "../utils/db-setup";

// Create a test app
const app = express();
app.use(express.json());
app.get("/api/announcements", getAnnouncements);
app.get("/api/announcements/:id", getAnnouncement);

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

describe("Announcements Controller", () => {
  const teacherId = new mongoose.Types.ObjectId("60d0fe4f5311236168a109ca");

  beforeEach(async () => {
    // Create a test teacher user
    await User.create({
      _id: teacherId,
      name: "Teacher",
      email: "teacher@example.com",
      role: "teacher",
      isAuthenticated: true,
    });
  });

  describe("GET /api/announcements", () => {
    it("should get all announcements", async () => {
      // Create two test announcements with explicit createdAt to control sorting
      const now = new Date();
      const earlier = new Date(now.getTime() - 1000);

      await Announcement.create([
        {
          title: "Announcement 1",
          content: "Content of announcement 1",
          author: teacherId,
          course: "Math 101",
          createdAt: earlier,
        },
        {
          title: "Announcement 2",
          content: "Content of announcement 2",
          author: teacherId,
          course: "Physics 101",
          createdAt: now,
        },
      ]);

      const res = await request(app).get("/api/announcements");

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.count).toBe(2);
      expect(res.body.data).toHaveLength(2);
      expect(res.body.data[0].title).toBe("Announcement 2"); // Sorted by createdAt desc
    });
  });

  describe("GET /api/announcements/:id", () => {
    it("should get a single announcement by ID", async () => {
      // Create a test announcement
      const announcement = await Announcement.create({
        title: "Test Announcement",
        content: "Test content",
        author: teacherId,
        course: "Math 101",
      });

      const res = await request(app).get(
        `/api/announcements/${announcement._id}`
      );

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.title).toBe("Test Announcement");
      expect(res.body.data.content).toBe("Test content");
    });

    it("should return 404 if announcement not found", async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app).get(`/api/announcements/${fakeId}`);

      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
    });
  });
});
