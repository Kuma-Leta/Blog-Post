import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export const connectDB = async () => {
  try {
    const connenction_string = process.env.CONNECTION_STRING?.replace(
      "<password>",
      process.env.PASSWORD as string
    );
    const connection = await mongoose.connect(connenction_string || "");
    console.log("db connected successfully");
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
