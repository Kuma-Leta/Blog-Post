import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload, verify } from "jsonwebtoken";
import { SignupModel } from "../models/models";
export interface AuthenticatedRequest extends Request {
  user?: any;
}
export const protect = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // get token from header
      token = req.headers.authorization.split(" ")[1];
      //verify token
      const decoded: JwtPayload | string = jwt.verify(
        token,
        process.env.JWT_SECRET || " "
      ) as JwtPayload;
      req.user = await SignupModel.findById(decoded.id).select("-password");
    } catch (error) {
      res.status(401).json({ message: "unauthorized" });
    }
  } else {
    res.status(401).json({ message: "unauthorized" });
  }
};
