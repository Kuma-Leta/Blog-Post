import { NextFunction, Request, Response } from "express";
import Rating from "../models/ratingModel";
import asyncWrapper from "../utils/asyncWrapper";
import AppError from "../utils/appError";
import Post from "../models/postModel";
import APIFeatures from "../utils/APIFeatures";
// Define the custom request type
export interface AuthenticatedRequest extends Request {
  user?: any;
}

export const addRating = asyncWrapper(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.body.post) req.body.post = req.params.postId;
    if (!req.body.user) req.body.user = req.user.id;

    const post = await Post.findById(req.params.postId);

    if (req.user.id === String(post?.user)) {
      return next(new AppError("you can't rate your post", 404));
    }

    const rating = await Rating.create(req.body);
    res.status(200).json({
      status: "Success",
      data: {
        data: rating,
      },
    });
  }
);

export const deleteRating = asyncWrapper(async (req, res, next) => {
  const rate = await Rating.findByIdAndDelete(req.params.id);

  if (!rate) {
    return next(new AppError("No document found with that ID", 404));
  }

  if (req.user.id != String(rate?.user)) {
    return next(
      new AppError(
        "You cannot delete these rating because it is not yours",
        404
      )
    );
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});

export const updateRating = asyncWrapper(async (req, res, next) => {
  const rate = await Rating.findById(req.params.id);

  if (req.user.id != String(rate?.user)) {
    return next(
      new AppError(
        "You cannot update these rating because it is not yours",
        404
      )
    );
  }

  const updatedrating = await Rating.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedrating) {
    return next(new AppError("No rating found with that ID", 404));
  }

  if (req.user.id != String(rate?.user)) {
    return next(
      new AppError(
        "You cannot delete these rating because it is not yours",
        404
      )
    );
  }

  res.status(200).json({
    status: "success",
    data: {
      updatedrating,
    },
  });
});

export const getAllRating = asyncWrapper(async (req, res, next) => {
  console.log(req.params);
  let filter = {};
  if (req.params.postId) filter = { post: req.params.postId };

  console.log(req.query);
  //EXECUTE THE QUERY
  const features = new APIFeatures(Rating.find(filter), req.query)
    .filter()
    .sort()
    .limit()
    .paginate();
  //const docs = await features.query.explain();
  const reviews = await features.query
    .populate({ path: "post", select: "author" })
    .populate({ path: "user", select: "name" });

  res.status(200).json({
    status: "success",
    result: reviews.length,
    data: {
      data: reviews,
    },
  });
});
