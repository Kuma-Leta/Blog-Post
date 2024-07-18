import crypto from "crypto";
import mongoose, { Document, Model } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

interface IUser extends Document {
  name: string;
  email: string;
  photo?: string;
  numberOfPost: number;
  role: "user" | "admin";
  gender?: "male" | "female";
  password: string;
  passwordConfirm?: string;
  passwordChangedAt?: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  correctPassword(
    candidatePassword: string,
    userPassword: string
  ): Promise<boolean>;
  changePasswordAfter(JWTTimestamp: number): boolean;
  createPasswordResetToken(): string;
  createdAt: Date;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Please tell us your name"],
    },
    email: {
      type: String,
      required: [true, "Please provide a valid email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    photo: String,
    numberOfPost: {
      type: Number,
      default: 0,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 8,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please confirm your password"],
      validate: {
        validator: function (this: IUser, el: string): boolean {
          return el === this.password;
        },
        message: "Passwords are not the same!",
      },
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Define virtual populate for user's posts
userSchema.virtual("posts", {
  ref: "Post",
  foreignField: "user",
  localField: "_id",
});

// Middleware to hash the password before saving
userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

// Middleware to set passwordChangedAt timestamp
userSchema.pre<IUser>("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = new Date(Date.now() - 1000);
  next();
});

// Instance method to compare passwords
userSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Instance method to check if password was changed after JWT creation
userSchema.methods.changePasswordAfter = function (
  JWTTimestamp: number
): boolean {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      (this.passwordChangedAt.getTime() / 1000).toString(),
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

// Instance method to create a password reset token
userSchema.methods.createPasswordResetToken = function (): string {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);
  return resetToken;
};

// Create User model
const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;
