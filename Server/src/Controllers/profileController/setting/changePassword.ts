import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "./../../../models/userModel";
import AppError from "./../../../utils/appError";
import asyncWrapper from "../../../utils/asyncWrapper";
import { AuthenticatedRequest } from "./../../authController";

export const changePassword = asyncWrapper(async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { oldPassword, newPassword } = req.body;

  // Fetch the user from the database
  const user = await User.findById(req.user._id).select('+password');
  
  // Check if user exists
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  // Compare the provided old password with the stored hashed password
  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
    return res.status(400).json({ error: "Old password is incorrect" });
  }

  // Hash the new password
  const hashedPassword = await bcrypt.hash(newPassword, 12);

  // Update the password in the user document
  user.password = req.body.newPassword;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  // Send response
  res.status(200).json({ message: "Password changed successfully" });
});

