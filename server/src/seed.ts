import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db";
import User from "./models/User";
import Announcement from "./models/Announcement";
import Quiz from "./models/Quiz";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Sample data
const seedData = async () => {
  try {
    // Clean existing data
    await User.deleteMany({});
    await Announcement.deleteMany({});
    await Quiz.deleteMany({});

    console.log("Previous data cleared...");

    // Create users
    const demoUser = await User.create({
      name: "Talia",
      email: "talia@example.com",
      role: "student",
      isAuthenticated: true,
    });

    const mrAhmed = await User.create({
      name: "Mr.Ahmed Mostafa",
      email: "ahmed@example.com",
      role: "teacher",
      isAuthenticated: true,
    });

    const mrsSalma = await User.create({
      name: "Mrs.Salma Ahmed",
      email: "salma@example.com",
      role: "teacher",
      isAuthenticated: true,
    });

    const schoolManagement = await User.create({
      name: "School management",
      email: "management@example.com",
      role: "admin",
      isAuthenticated: true,
    });

    const eventsManager = await User.create({
      name: "Events Manager",
      email: "events@example.com",
      role: "admin",
      isAuthenticated: true,
    });

    console.log("Users created...");

    // Create announcements
    await Announcement.create({
      title: "Exam Preparation",
      content:
        "Hi my friends! I just want you ready to our exams and focus on remaining assignments to gain more grades, good luck my warriors! 😉",
      author: mrAhmed._id,
      course: "Math 101",
    });

    await Announcement.create({
      title: "Unit 2 Quiz",
      content:
        "Hello my students, I want to announce that the next quiz will be within 3 days and will cover the whole unit 2: Add and subtract numbers. Study hard! Good luck!",
      author: mrsSalma._id,
      course: "Physics 02",
    });

    await Announcement.create({
      title: "Morning Announcement",
      content:
        "Goooooooooood morning, Warriors! That get-ready-for-the-day call is heard each morning by 850 students at Goodwyn Junior High School in Tawamov, Egypt. I just want you ready to our exams and focus on remaining assignments to gain more grades, good luck my warriors! 😉",
      author: schoolManagement._id,
      course: "Management",
    });

    await Announcement.create({
      title: "Field Trip",
      content:
        "Helloppp. Can't wait our upcoming trip on the next weekend. The trip will be to Dreampark and Pyramids! To book your seat please contact your class teacher.",
      author: eventsManager._id,
      course: "Events",
    });

    console.log("Announcements created...");

    // Create quizzes
    await Quiz.create({
      title: "Unit 2 quiz",
      course: "Physics 02",
      topic: "Unit2: Motion and Forces",
      dueDate: new Date("2023-12-30T09:00:00"),
      instructions:
        "Answer all questions. You have 60 minutes to complete this quiz.",
      questions: [
        {
          question: "What is Newton's First Law?",
          options: [
            "An object at rest stays at rest, and an object in motion stays in motion.",
            "Force equals mass times acceleration.",
            "For every action, there is an equal and opposite reaction.",
            "Energy cannot be created or destroyed.",
          ],
          correctAnswer:
            "An object at rest stays at rest, and an object in motion stays in motion.",
          points: 5,
        },
        {
          question: "What is the SI unit of force?",
          options: ["Newton", "Joule", "Watt", "Pascal"],
          correctAnswer: "Newton",
          points: 3,
        },
        {
          question: "What is acceleration?",
          options: [
            "The rate of change of velocity",
            "The rate of change of position",
            "Force divided by mass",
            "All of the above",
          ],
          correctAnswer: "All of the above",
          points: 5,
        },
      ],
    });

    await Quiz.create({
      title: "12-12 Assignment",
      course: "Arabic #12",
      topic: "شعر - اللغة العربية",
      dueDate: new Date("2023-12-30T09:00:00"),
      instructions: "Complete all assignments and submit by the due date.",
      questions: [
        {
          question: "من هو شاعر قصيدة مصر تتحدث عن نفسها؟",
          options: ["أحمد شوقي", "حافظ إبراهيم", "نزار قباني", "محمود درويش"],
          correctAnswer: "حافظ إبراهيم",
          points: 2,
        },
        {
          question: "ما المقصود بالبلاغة في اللغة العربية؟",
          options: [
            "الإطناب والتطويل",
            "مطابقة الكلام لمقتضى الحال",
            "استخدام الكلمات الصعبة",
            "الكتابة بخط جميل",
          ],
          correctAnswer: "مطابقة الكلام لمقتضى الحال",
          points: 3,
        },
      ],
    });

    console.log("Quizzes created...");

    console.log("Seed completed successfully!");
    process.exit();
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Run the seed function
seedData();
