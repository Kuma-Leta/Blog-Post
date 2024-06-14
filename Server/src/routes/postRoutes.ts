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

// Nest ratingRoute under /:postId/rating
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
//router.post("/addPosts", protect, addPost);
router.patch("/update/:id", protect, upload.single("file"), updatePost);
router.get("/getMyPost", protect, getMyPost);
router.get("/getPost/:postId", protect, getPost);
router.delete("/deletePost/:postId", protect, deletePost);
router.delete("/deleteAllMyPost", protect, deleteAllMyPost);
router.delete("/user/:userId/deletePost/:postId", protect, deletePost);

export default router;
