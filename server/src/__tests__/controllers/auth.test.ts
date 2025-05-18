import request from "supertest";
import express from "express";
import { login } from "../../controllers/auth";
import User from "../../models/User";
import * as db from "../utils/db-setup";

// Create a test app
const app = express();
app.use(express.json());
app.post("/api/auth/login", login);

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

describe("Auth Controller", () => {
  describe("POST /api/auth/login", () => {
    it("should login user Talia", async () => {
      const res = await request(app).post("/api/auth/login");

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.token).toBeDefined();
      expect(res.body.user.name).toBe("Talia");
      expect(res.body.user.email).toBe("talia@example.com");
      expect(res.body.user.role).toBe("student");

      // Verify user was created in the database
      const user = await User.findOne({ name: "Talia" });
      expect(user).not.toBeNull();
      expect(user?.isAuthenticated).toBe(true);
    });

    it("should set authentication status to true for existing user", async () => {
      // Create a user first
      await User.create({
        name: "Talia",
        email: "talia@example.com",
        role: "student",
        isAuthenticated: false,
      });

      // Login with the user
      const res = await request(app).post("/api/auth/login");

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);

      // Verify isAuthenticated was updated
      const user = await User.findOne({ name: "Talia" });
      expect(user?.isAuthenticated).toBe(true);
    });
  });
});
