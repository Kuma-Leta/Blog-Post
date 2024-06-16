import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "./../../../models/userModel";
import AppError from "./../../../utils/appError";
import asyncWrapper from "../../../utils/asyncWrapper";
import { AuthenticatedRequest } from "./../../authController";

export const changePassword = asyncWrapper(
  async (req: AuthenticatedRequest, res: Response, next: Function) => {
    const { oldPassword, newPassword, passwordConfirm } = req.body;

    // Fetch the user from the database
    const user = await User.findById(req.user._id).select("+password");

    // Check if user exists
    if (!user) {
      return next(new AppError("User not found", 404));
    }

    // Compare the provided old password with the stored hashed password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return next(new AppError("Old password is incorrect", 400));
    }

    // Update the password in the user document
    user.password = newPassword;
    user.passwordConfirm = passwordConfirm;

    try {
      await user.save();
      res.status(200).json({ message: "Password changed successfully" });
    } catch (error: any) {
      next(new AppError(error.message, 400));
    }
  }
);
