import express from "express";
import {
  userRegistrationHandlier,
  userLoginHandlier,
  securityQuestionHandler,
} from "../controllers/userController.js";
import verifyEmail from "../utils/mail/verifyEmailToken.js";
import validateToken from "../middleware/validateAccessToken.js";
const userRouter = express.Router();

userRouter.post("/signup", userRegistrationHandlier);
userRouter.get("/verify-email", verifyEmail);
userRouter.post("/signin", userLoginHandlier);
userRouter.use(validateToken);
userRouter.post("/security/set/questions", securityQuestionHandler);
export default userRouter;
