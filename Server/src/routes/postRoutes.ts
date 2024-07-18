import express, { Router } from "express";
import ratingRoute from "./../routes/ratingRoute";
import { getAllPosts } from "../Controllers/PostsController";
import {
  addPost,
  getMyPost,
  deleteAllMyPost,
  getPost,
  deletePost,
  updatePost,
} from "../Controllers/PostsController";
import { protect, upload } from "./../Controllers/authController";

const router = Router({ mergeParams: true });

router.use("/:postId/rating", ratingRoute);

router.post(
  "/addPost",
  protect,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  addPost
);
router.get("/getAllposts", getAllPosts);
router.patch(
  "/update/:id",
  protect,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  updatePost
);
router.get("/getMyPost", protect, getMyPost);
router.get("/getPost/:postId", protect, getPost);
router.get("/getPost/:postId", getPost);
router.delete("/deletePost/:postId", protect, deletePost);
router.delete("/deleteAllMyPost", protect, deleteAllMyPost);
router.delete("/user/:userId/deletePost/:postId", protect, deletePost);

export default router;
