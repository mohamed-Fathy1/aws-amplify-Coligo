import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User";
import Announcement from "./models/Announcement";
import Quiz from "./models/Quiz";

// Load environment variables
dotenv.config();

// Configure MongoDB connection options
const mongooseOptions = {
  socketTimeoutMS: 60000,
  connectTimeoutMS: 60000,
  serverSelectionTimeoutMS: 60000,
};

// Connect to MongoDB with retry logic
const connectDB = async () => {
  let retries = 5;
  while (retries > 0) {
    try {
      console.log(`Connecting to MongoDB... (${retries} attempts left)`);
      await mongoose.connect(
        process.env.MONGODB_URI || "mongodb://localhost:27017/coligo",
        mongooseOptions
      );
      console.log("MongoDB Connected!");
      return true;
    } catch (error) {
      console.error("MongoDB connection error:", error);
      retries -= 1;
      if (retries === 0) {
        console.error("Failed to connect to MongoDB after multiple attempts");
        process.exit(1);
      }
      // Wait 5 seconds before retrying
      console.log("Retrying in 5 seconds...");
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
  return false;
};

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

// Main seed function
const seedDB = async () => {
  try {
    // Connect to database
    await connectDB();

    console.log("Clearing existing data...");

    // Delete existing data - with timeouts and error handling
    try {
      await User.deleteMany({});
      console.log("Users deleted");
    } catch (error) {
      console.error("Error deleting users:", error);
      // Continue anyway
    }

    try {
      await Announcement.deleteMany({});
      console.log("Announcements deleted");
    } catch (error) {
      console.error("Error deleting announcements:", error);
      // Continue anyway
    }

    try {
      await Quiz.deleteMany({});
      console.log("Quizzes deleted");
    } catch (error) {
      console.error("Error deleting quizzes:", error);
      // Continue anyway
    }

    // Create seed data
    console.log("Creating sample data...");

    // Add your existing seed creation logic here
    // ...

    console.log("Database seeded!");

    // Only exit if we're running the script directly
    if (require.main === module) {
      process.exit(0);
    }
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

// Run the seed function if this script is executed directly
if (require.main === module) {
  seedDB();
}

// Export for programmatic use
export default seedDB;
