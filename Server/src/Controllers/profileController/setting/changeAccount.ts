import { NextFunction, Request, Response } from "express";
import User from "./../../../models/userModel";
import Post from "../../../models/postModel";
import AppError from "./../../../utils/appError";
import asyncWrapper from "../../../utils/asyncWrapper";
import { AuthenticatedRequest } from "./../../authController";

// export const changeEmail = asyncWrapper(
//   async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
//     const { newEmail } = req.body;
//     const userId = req.user._id;
//     const existingUser = await User.findOne({ email: newEmail });
//     if (existingUser) {
//       return res.status(400).json({ message: "Email already in use" });
//     }
//     const user = await User.findByIdAndUpdate(
//       userId,
//       { email: newEmail },
//       { new: true }
//     );
//     if (!user) {
//       return next(new AppError("User not found", 404));
//     }
//     res
//       .status(200)
//       .json({ message: "Email changed successfully", email: user.email });
//   }
// );

// Handler for changing email
export const changeEmail = asyncWrapper(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { email: req.body.email },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!user) {
      return next(new AppError("No user found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  }
);

// Handler for changing name
export const changeName = asyncWrapper(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name: req.body.name },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!user) {
      return next(new AppError("No user found with that ID", 404));
    }

    // Update the user's name in all their posts
    await Post.updateMany(
      { user: req.user.id },
      { $set: { author: req.body.name } }
    );

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  }
);

export const deleteUserAccount = asyncWrapper(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const userId = req.user._id;

    // Delete the user
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return next(new AppError("User not found", 404));
    }

    // Delete the user's posts
    await Post.deleteMany({ user: userId });

    res
      .status(200)
      .json({ message: "Account and associated posts deleted successfully" });
  }
);

// // Handler for changing password
// export const changePassword = asyncWrapper(
//   async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
//     const user = await User.findById(req.user.id).select('+password');

//     if (!user) {
//       return next(new AppError("No user found with that ID", 404));
//     }

//     user.password = req.body.password;
//     await user.save();

//     res.status(200).json({
//       status: "success",
//       data: {
//         user,
//       },
//     });
//   }
// );

// // Handler for changing photo
// export const changePhoto = asyncWrapper(
//   async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
//     const user = await User.findById(req.user.id);

//     if (!user) {
//       return next(new AppError("No user found with that ID", 404));
//     }

//     if (req.file) {
//       user.photo = `/uploads/${req.file.filename}`;
//       await user.save();
//     }

//     res.status(200).json({
//       status: "success",
//       data: {
//         user,
//       },
//     });
//   }
// );
