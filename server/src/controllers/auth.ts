import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { JWT_SECRET, JWT_EXPIRE } from "../env";

const generateToken = (id: string): string => {
  const options: any = { expiresIn: JWT_EXPIRE };
  return jwt.sign({ id }, JWT_SECRET, options);
};

// @desc    Login user (simple login as per requirements)
// @route   POST /api/auth/login
// @access  Public
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    let user = await User.findOne({ name: "Talia" });

    if (!user) {
      user = await User.create({
        name: "Talia",
        email: "talia@example.com",
        role: "student",
        isAuthenticated: true,
      });
    } else {
      user.isAuthenticated = true;
      await user.save();
    }

    const token = generateToken(user._id.toString());

    const options = {
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    };

    res
      .status(200)
      .cookie("token", token, options)
      .json({
        success: true,
        token,
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
export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    if (req.user) {
      const user = await User.findById(req.user._id);

      if (user) {
        user.isAuthenticated = false;
        await user.save();
      }
    }

    res.cookie("token", "none", {
      expires: new Date(Date.now() + 10 * 1000), // Expire in 10 seconds
      httpOnly: true,
    });

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
export const getMe = async (req: Request, res: Response): Promise<void> => {
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
