import crypto from "crypto";
import { promisify } from "util";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "./../models/userModel";
import asyncWrapper from "./../utils/asyncWrapper";
import AppError from "./../utils/appError";
import sendEmail from "./../utils/email";
import multer from "multer";
import fs from "fs";
import path from "path";

export interface AuthenticatedRequest extends Request {
  user?: any;
}

const signToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (
  user: any,
  statusCode: number,
  res: Response
): void => {
  const token = signToken(user._id);
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

export const signup = asyncWrapper(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      // console.log("Request Body:", req.body);
      // console.log(req.file);

      const newUser = await User.create({
        ...req.body,
        photo: req.file?.path.replace(path.join(__dirname, "../../public"), ""), // Assuming 'photo' is the fieldname for profile picture
      });
      createSendToken(newUser, 201, res);
    } catch (error: any) {
      // console.error("Signup Error:", error);

      // Handle duplicate email error
      if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
        return next(
          new AppError(
            "Email already in use. Please use a different email.",
            400
          )
        );
      }

      next(error);
    }
  }
);

export const login = asyncWrapper(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    // console.log(req.body);
    const { email, password } = req.body;
    // console.log("email: " + email, "password: " + password);

    if (!email || !password) {
      return next(new AppError("Please provide email and password", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError("Incorrect email or password", 400));
    }

    createSendToken(user, 201, res);
  }
);

export const protect = asyncWrapper(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next(
        new AppError(
          "You are not logged in. Please log in first to get access",
          401
        )
      );
    }

    const JWT_SECRET = process.env.JWT_SECRET as string;

    const verifyAsync = promisify<string, string, any>(jwt.verify);

    const decode: any = await verifyAsync(token, JWT_SECRET);

    const currentUser = await User.findById(decode.id);
    if (!currentUser) {
      return next(
        new AppError(
          "The user belonging to this token does no longer exist.",
          401
        )
      );
    }

    if (currentUser.changePasswordAfter(decode.iat)) {
      return next(
        new AppError(
          "User recently changed password! Please log in again.",
          401
        )
      );
    }

    req.user = currentUser;
    next();
  }
);

export const restrictTo = (...roles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }

    next();
  };
};

export const forgotPassword = asyncWrapper(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const user = await User.findOne({ email: req.body.email });
    // console.log(req.body);
    if (!user) {
      return next(new AppError("There is no user with email address.", 404));
    }

    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    // console.log("reset token" + resetToken);
    const resetURL = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/users/resetPassword/${resetToken}`;

    const message = `Forgot password? Submit a PATCH request with your new password and password confirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email`;

    try {
      // console.log(user.email);
      await sendEmail({
        email: user.email,
        subject: "Your password reset token (valid for 10 min)",
        message,
      });
    } catch (err) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });

      return next(
        new AppError(
          "There was an error sending the email. Try again later!",
          500
        )
      );
    }

    res.status(201).json({
      status: "success",
      message: "Token has been sent to the email",
    });
  }
);

export const resetPassword = asyncWrapper(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      return next(new AppError("Token is invalid or has expired.", 400));
    }
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    createSendToken(user, 201, res);
  }
);

export const updatePassword = asyncWrapper(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const user = await User.findById(req.user.id).select("+password");

    if (!user) {
      return next(new AppError("User not found", 404));
    }

    if (
      !(await user.correctPassword(req.body.currentPassword, user.password))
    ) {
      return next(new AppError("Your current password is wrong", 401));
    }

    user.password = req.body.newPassword;
    user.passwordConfirm = req.body.newPasswordConfirm;
    await user.save();

    createSendToken(user, 200, res);
  }
);

const uploadDirectory = path.join(__dirname, "../../public/uploads");
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}
const storage = multer.diskStorage({
  destination: (
    req: any,
    file: any,
    cb: (arg0: null, arg1: string) => void
  ) => {
    cb(null, uploadDirectory);
  },
  filename: (
    req: any,
    file: { fieldname: string; originalname: string },
    cb: (arg0: null, arg1: string) => void
  ) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

export const upload = multer({ storage });
