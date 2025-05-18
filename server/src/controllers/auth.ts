import { Request, Response } from "express";
import User, { IUser } from "../models/User";

interface AuthRequest extends Request {
  user?: IUser;
}

// @desc    Login user (simple login as per requirements)
// @route   POST /api/auth/login
// @access  Public
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    let user = await User.findOne({ name: "Demo User" });

    if (!user) {
      user = await User.create({
        name: "Demo User",
        email: "demo@example.com",
        role: "student",
        isAuthenticated: true,
      });
    } else {
      user.isAuthenticated = true;
      await user.save();
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
export const logout = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    if (req.user) {
      const user = await User.findById(req.user._id);

      if (user) {
        user.isAuthenticated = false;
        await user.save();
      }
    }

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user?._id).select("-password");

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
