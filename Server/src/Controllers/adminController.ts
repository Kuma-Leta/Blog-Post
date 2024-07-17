import { Request, Response, NextFunction } from "express";
import User from "../models/userModel";
import Post from "../models/postModel";
import asyncWrapper from "../utils/asyncWrapper";

export const getAdminDashboard = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const userCount = await User.countDocuments();
    const postCount = await Post.countDocuments();
    const recentUsers = await User.find().sort({ createdAt: -1 }).limit(5);
    const recentPosts = await Post.find().sort({ createdAt: -1 }).limit(5);

    res.status(200).json({
      status: "success",
      data: {
        userCount,
        postCount,
        recentUsers,
        recentPosts,
      },
    });
  }
);
