import { Request, Response, NextFunction, RequestHandler } from "express";
export interface AuthenticatedRequest extends Request {
  user?: any;
}

type AsyncHandler = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => Promise<any>;

const asyncWrapper = (fn: AsyncHandler): RequestHandler => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

export default asyncWrapper;
