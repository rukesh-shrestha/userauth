import express from "express";
import {
  userRegistrationHandlier,
  userLoginHandlier,
  securityQuestionHandler,
  userForgetPassword,
  verifyPasswordHandlier,
} from "../controllers/userController.js";
import verifyEmail from "../utils/mail/verifyEmailToken.js";
import validateToken from "../middleware/validateAccessToken.js";
const userRouter = express.Router();

userRouter.post("/signup", userRegistrationHandlier);
userRouter.get("/verify-email", verifyEmail);
userRouter.post("/signin", userLoginHandlier);
userRouter.get("/reset-password", verifyPasswordHandlier);
userRouter.post("/resetpassword", userForgetPassword);

userRouter.post(
  "/security/set/questions",
  validateToken,
  securityQuestionHandler
);
export default userRouter;
