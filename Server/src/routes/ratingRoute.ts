import express, { Router } from "express";
import { protect, restrictTo } from "./../Controllers/authController";
import {
  getAllRating,
  updateRating,
  deleteRating,
  addRating,
} from "../Controllers/RatingController";

const router = express.Router({ mergeParams: true });

router.route("/").post(protect, restrictTo("user"), addRating);

router
  .route("/:id")
  .get(protect, getAllRating)
  .patch(protect, restrictTo("user"), updateRating)
  .delete(protect, deleteRating);

export default router;
