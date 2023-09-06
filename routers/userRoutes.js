import express from "express";
import {
  userRegistrationHandlier,
  userLoginHandlier,
} from "../controllers/userController.js";
import verifyEmail from "../utils/mail/verifyEmailToken.js";
const userRouter = express.Router();

userRouter.post("/signup", userRegistrationHandlier);
userRouter.get("/verify-email", verifyEmail);
userRouter.post("/signin", userLoginHandlier);
export default userRouter;
