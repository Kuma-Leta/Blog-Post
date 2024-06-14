import { Request, Response, NextFunction, RequestHandler } from 'express';
export interface AuthenticatedRequest extends Request {
  user?: any;
}
// Define the type for the function that will be passed to the wrapper
type AsyncHandler = (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<any>;

const asyncWrapper = (fn: AsyncHandler): RequestHandler => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

export default asyncWrapper;
