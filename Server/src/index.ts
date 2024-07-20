import express, { NextFunction, Request, Response } from "express";
const path = require("path");

import postRoute from "./routes/postRoutes";
import ratingRoute from "./routes/ratingRoute";
import userRoutes from "./routes/userRoutes";
import adminRoutes from "./routes/adminRoutes";

import { connectDB } from "./connectDb";
import cors from "cors";
import globalErrorHandler from "./Controllers/errorController";
import AppError from "./utils/appError";

export interface AuthenticatedRequest extends Request {
  user?: any;
}

const app = express();
connectDB();

app.use(express.json());
app.use(cors());

// Configure Express to serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "../public")));

// Mount other routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/post", postRoute);
app.use("/api/v1/rating", ratingRoute);
app.use("/api/v1/admin", adminRoutes);

// Handling unhandled routes
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Adding GlobalErrorHandler middleware
app.use(globalErrorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`The server is listening on port: ${port}`);
});
