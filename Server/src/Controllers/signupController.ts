import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { SignupModel } from "../models/models";
const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "", { expiresIn: "30d" });
};
export const createUsers = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const { name, email, password } = req.body;
    const userAlreadyExists = await SignupModel.findOne({ email: email });
    if (userAlreadyExists) {
      return res.status(400).json({ message: "user already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userAccount = new SignupModel({
      email: email,
      password: hashedPassword,
      name: name,
    });
    await userAccount.save();
    if (userAccount) {
      res.status(201).json({
        id: userAccount.id,
        name: userAccount.name,
        email: userAccount.email,
        token: generateToken(userAccount.id),
      });
    }
  } catch (error: any) {
    console.log(error);
    let statusCode = 500;
    let message = "Internal server error";

    if (error.code === 11000) {
      // Handling MongoDB duplicate key error
      message = "Email already exists";
      statusCode = 400;
    } else if (error.name === "ValidationError") {
      statusCode = 400;
      message = "Validation error";
    }

    res.status(statusCode).json({
      message,
      status: statusCode,
    });
  }
};
