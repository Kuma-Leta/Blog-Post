import express, { Request, Response, NextFunction, Router } from "express";
import { changePassword } from "./../Controllers/profileController/setting/changePassword";

import {
  changeName,
  changeEmail,
  deleteUserAccount,
} from "./../Controllers/profileController/setting/changeAccount";

import {
  signup,
  login,
  forgotPassword,
  resetPassword,
  protect,
  updatePassword,
  restrictTo,
} from "../Controllers/authController";

import {
  getMe,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
} from "../Controllers/userController";

import postRouter from "./postRoutes";

const router: Router = express.Router();

router.use("/:userId/post", postRouter);

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgotpassword", forgotPassword);
router.patch("/resetpassword/:token", resetPassword);

router.use(protect);

router.patch("/updatePassword", changePassword);
router.patch("/updateEmail", changeEmail);
router.patch("/changeName", changeName);
router.delete("/deleteMe", deleteUserAccount);
router.get("/me", getUser);

router.use(restrictTo("admin"));

router.route("/").get(getAllUsers);

router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

export default router;
