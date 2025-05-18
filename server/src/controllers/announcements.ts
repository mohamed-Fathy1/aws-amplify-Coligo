import { Request, Response } from "express";
import Announcement from "../models/Announcement";
import { IUser } from "../models/User";

// Extended Request interface with user property
interface AuthRequest extends Request {
  user?: IUser;
}

// @desc    Get all announcements
// @route   GET /api/announcements
// @access  Private
export const getAnnouncements = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const announcements = await Announcement.find()
      .populate({
        path: "author",
        select: "name role",
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: announcements.length,
      data: announcements,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc    Get single announcement
// @route   GET /api/announcements/:id
// @access  Private
export const getAnnouncement = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const announcement = await Announcement.findById(req.params.id).populate({
      path: "author",
      select: "name role",
    });

    if (!announcement) {
      res.status(404).json({
        success: false,
        error: "Announcement not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: announcement,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc    Create new announcement
// @route   POST /api/announcements
// @access  Private
export const createAnnouncement = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    // Add author to request body
    req.body.author = req.user?._id;

    const announcement = await Announcement.create(req.body);

    res.status(201).json({
      success: true,
      data: announcement,
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

// @desc    Update announcement
// @route   PUT /api/announcements/:id
// @access  Private
export const updateAnnouncement = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    let announcement = await Announcement.findById(req.params.id);

    if (!announcement) {
      res.status(404).json({
        success: false,
        error: "Announcement not found",
      });
      return;
    }

    // Make sure user is the author or an admin
    if (
      announcement.author.toString() !== req.user?._id.toString() &&
      req.user?.role !== "admin"
    ) {
      res.status(401).json({
        success: false,
        error: "Not authorized to update this announcement",
      });
      return;
    }

    announcement = await Announcement.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).populate({
      path: "author",
      select: "name role",
    });

    res.status(200).json({
      success: true,
      data: announcement,
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

// @desc    Delete announcement
// @route   DELETE /api/announcements/:id
// @access  Private
export const deleteAnnouncement = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const announcement = await Announcement.findById(req.params.id);

    if (!announcement) {
      res.status(404).json({
        success: false,
        error: "Announcement not found",
      });
      return;
    }

    // Make sure user is the author or an admin
    if (
      announcement.author.toString() !== req.user?._id.toString() &&
      req.user?.role !== "admin"
    ) {
      res.status(401).json({
        success: false,
        error: "Not authorized to delete this announcement",
      });
      return;
    }

    await announcement.deleteOne();

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
