import express, { Router } from "express";
import { protect, restrictTo } from "./../Controllers/authController";
import {getAllRating, updateRating, deleteRating, addRating} from "../Controllers/RatingController";

const router = express.Router({ mergeParams: true });

router
   .route('/')
   .get(protect, getAllRating)
   .post(
       protect,restrictTo('user'), addRating);

router.route('/:id')
      .patch(
      protect, restrictTo('user'), updateRating)
      .delete(
        protect, deleteRating);

export default router;