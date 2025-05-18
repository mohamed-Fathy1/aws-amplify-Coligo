import { Request, Response } from "express";
import Quiz from "../models/Quiz";
import { IUser } from "../models/User";

// Extended Request interface with user property
interface AuthRequest extends Request {
  user?: IUser;
}

// @desc    Get all quizzes
// @route   GET /api/quizzes
// @access  Private
export const getQuizzes = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    let query = {};

    if (req.query.course) {
      query = { course: req.query.course };
    }

    const quizzes = await Quiz.find(query).sort({ dueDate: 1 });

    res.status(200).json({
      success: true,
      count: quizzes.length,
      data: quizzes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc    Get single quiz
// @route   GET /api/quizzes/:id
// @access  Private
export const getQuiz = async (req: Request, res: Response): Promise<void> => {
  try {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      res.status(404).json({
        success: false,
        error: "Quiz not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: quiz,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc    Create new quiz
// @route   POST /api/quizzes
// @access  Private (Admin & Teachers only)
export const createQuiz = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    if (req.user?.role !== "admin" && req.user?.role !== "teacher") {
      res.status(403).json({
        success: false,
        error: "Not authorized to create quizzes",
      });
      return;
    }

    const quiz = await Quiz.create(req.body);

    res.status(201).json({
      success: true,
      data: quiz,
    });
  } catch (error: any) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(
        (val: any) => val.message
      );

      res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
  }
};

// @desc    Update quiz
// @route   PUT /api/quizzes/:id
// @access  Private (Admin & Teachers only)
export const updateQuiz = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    if (req.user?.role !== "admin" && req.user?.role !== "teacher") {
      res.status(403).json({
        success: false,
        error: "Not authorized to update quizzes",
      });
      return;
    }

    let quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      res.status(404).json({
        success: false,
        error: "Quiz not found",
      });
      return;
    }

    quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: quiz,
    });
  } catch (error: any) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(
        (val: any) => val.message
      );

      res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
  }
};

// @desc    Delete quiz
// @route   DELETE /api/quizzes/:id
// @access  Private (Admin & Teachers only)
export const deleteQuiz = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    if (req.user?.role !== "admin" && req.user?.role !== "teacher") {
      res.status(403).json({
        success: false,
        error: "Not authorized to delete quizzes",
      });
      return;
    }

    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      res.status(404).json({
        success: false,
        error: "Quiz not found",
      });
      return;
    }

    await quiz.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
