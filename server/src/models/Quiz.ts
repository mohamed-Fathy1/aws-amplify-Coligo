import mongoose, { Document, Schema } from "mongoose";

export interface IQuiz extends Document {
  title: string;
  course: string;
  topic: string;
  dueDate: Date;
  instructions: string;
  questions: Array<{
    question: string;
    options: string[];
    correctAnswer: string;
    points: number;
  }>;
  totalPoints: number;
  createdAt: Date;
  updatedAt: Date;
}

const QuizSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title"],
      trim: true,
      maxlength: [100, "Title cannot be more than 100 characters"],
    },
    course: {
      type: String,
      required: [true, "Please specify the course"],
    },
    topic: {
      type: String,
      required: [true, "Please specify the topic"],
    },
    dueDate: {
      type: Date,
      required: [true, "Please specify a due date"],
    },
    instructions: {
      type: String,
      default: "",
    },
    questions: [
      {
        question: {
          type: String,
          required: [true, "Please provide a question"],
        },
        options: {
          type: [String],
          required: [true, "Please provide options"],
        },
        correctAnswer: {
          type: String,
          required: [true, "Please provide the correct answer"],
        },
        points: {
          type: Number,
          default: 1,
        },
      },
    ],
    totalPoints: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Calculate total points before saving
QuizSchema.pre("save", function (next) {
  if (this.questions && Array.isArray(this.questions)) {
    this.totalPoints = this.questions.reduce(
      (total, question) => total + (question.points || 1),
      0
    );
  }
  next();
});

export default mongoose.model<IQuiz>("Quiz", QuizSchema);
