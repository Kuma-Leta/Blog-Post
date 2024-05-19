import { Schema, model } from "mongoose";
interface signup {
  name: string;
  password: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  // token:ge
}
const signupSchema = new Schema<signup & Document>(
  {
    name: {
      type: String,
      required: [true, "you must provide name"],
      trim: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, "you must provide password"],
    },

    email: {
      type: String,
      required: [true, "you must provide email"],
      unique: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Email format is invalid"],
    },
  },
  { timestamps: true }
);
export const SignupModel = model("Signup", signupSchema);
