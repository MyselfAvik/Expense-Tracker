import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  changeProfilePic,
  checkAuth,
  deleteExpense,
  login,
  logout,
  refreshAccesToken,
  sendExpense,
  signup,
} from "../controllers/user.controller.js";
import { verifySession } from "../middlewares/user.middleware.js";

const router = Router();

router.route("/signup").post(upload.single("profileImage"), signup);
router
  .route("/changeProfilePic")
  .post(upload.single("profileImage"),verifySession, changeProfilePic);
router.route("/login").post(login);
router.route("/logout").post(verifySession, logout);
router.route("/refresh").post(refreshAccesToken);
router.route("/check/auth").get(verifySession, checkAuth);
router.route("/post/expense").post(verifySession, sendExpense);
router.route("/delete/expense/:id").post(verifySession, deleteExpense);

export { router };
