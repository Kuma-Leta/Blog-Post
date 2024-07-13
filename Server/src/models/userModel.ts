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
  gender?: "male" | "female"; // Add gender field
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
      select: false, // Exclude password field from query results by default
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
  },
  {
    toJSON: { virtuals: true }, // Include virtual fields in JSON output
    toObject: { virtuals: true }, // Include virtual fields in object output
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

  this.password = await bcrypt.hash(this.password, 12); // Hash password with bcrypt
  this.passwordConfirm = undefined; // Clear passwordConfirm after saving
  next();
});

// Middleware to set passwordChangedAt timestamp
userSchema.pre<IUser>("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = new Date(Date.now() - 1000); // Ensure JWT creation time is before password change
  next();
});

// Instance method to compare passwords
userSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, userPassword); // Compare entered password with stored hashed password
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
  return false; // Return false if password was not changed
};

// Instance method to create a password reset token
userSchema.methods.createPasswordResetToken = function (): string {
  const resetToken = crypto.randomBytes(32).toString("hex"); // Generate random resetToken
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex"); // Encrypt resetToken and store in database
  this.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000); // Set expiration time to 10 minutes
  return resetToken; // Return plain text resetToken to send via email
};

// Create User model
const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;
