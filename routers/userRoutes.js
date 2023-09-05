import express from "express";
import { UserRegistrationHandlier } from "../controllers/userController.js";
import verifyEmail from "../utils/mail/verifyEmailToken.js";
const userRouter = express.Router();

userRouter.post("/register", UserRegistrationHandlier);
userRouter.get("/verify-email", verifyEmail);
export default userRouter;
