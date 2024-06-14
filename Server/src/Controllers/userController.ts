import { Request, Response, NextFunction, RequestHandler } from "express";
import User from "./../models/userModel";
import asyncWrapper from "./../utils/asyncWrapper";
import AppError from "../utils/appError";
import APIFeatures from "../utils/APIFeatures";
// Define the custom request type
export interface AuthenticatedRequest extends Request {
  user?: any;
}

export const getMe = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  req.params.id = req.user.id;
  next();
};
export const getAllUsers = asyncWrapper(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    console.log(req.query);
    //EXECUTE THE QUERY
    const features = new APIFeatures(User.find(), req.query)
      .filter()
      .sort()
      .limit()
      .paginate();
    //const docs = await features.query.explain();
    const users = await features.query;

    res.status(200).json({
      status: "success",
      result: users.length,
      data: {
        data: users,
      },
    });
  }
);
export const getUser = asyncWrapper(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.params.id) req.params.id = req.user.id;
    const user = await User.findById(req.params.id).populate("posts");

    //User.findOne({_id: req.params.id});

    if (!user) {
      return next(new AppError("No user found with that ID", 404));
    }

    res.status(200).json({
      satus: "success",
      data: {
        data: user,
      },
    });
  }
);
//Not Update Password
export const updateUser = asyncWrapper(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

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

export const deleteUser = asyncWrapper(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return next(new AppError("No user found with that ID", 404));
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  }
);
