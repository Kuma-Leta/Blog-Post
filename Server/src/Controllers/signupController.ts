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
    const { email, password } = req.body;
    const userAccount = await SignupModel.findOne({ email });
    if (userAccount && (await bcrypt.compare(password, userAccount.password))) {
      res.status(200).json({
        id: userAccount._id,
        email: userAccount.email,
        name: userAccount.name,
        token: generateToken(userAccount.id),
      });
    } else {
      res.status(400).json({ message: "invalid user credential" });
    }
  } catch (error: any) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};
