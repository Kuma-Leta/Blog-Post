import express, { Request, Response, NextFunction, Router } from "express";
import { login, protect, restrictTo } from "../Controllers/authController";
import { getAdminDashboard } from "../Controllers/adminController";

import {
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
} from "../Controllers/userController";

const router: Router = express.Router();

router.post("/login", login);

router.use(protect);
router.use(restrictTo("admin"));

router.get("/dashboard", getAdminDashboard);

router.route("/").get(getAllUsers);

router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

export default router;
