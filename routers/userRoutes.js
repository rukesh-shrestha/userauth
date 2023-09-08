import express from "express";
import {
  userRegistrationHandler,
  userLoginHandler,
  securityQuestionHandler,
  userForgetPasswordHandler,
  verifyPasswordHandler,
  changePasswordHandler,
} from "../controllers/userController.js";
import verifyEmail from "../utils/mail/verifyEmailToken.js";
import validateToken from "../middleware/validateAccessToken.js";
const userRouter = express.Router();

userRouter.post("/signup", userRegistrationHandler);
userRouter.get("/verify-email", verifyEmail);
userRouter.post("/signin", userLoginHandler);
userRouter.get("/reset-password", verifyPasswordHandler);
userRouter.post("/resetpassword", userForgetPasswordHandler);
userRouter.post("/updatepassword", validateToken, changePasswordHandler);

userRouter.post(
  "/security/set/questions",
  validateToken,
  securityQuestionHandler
);
export default userRouter;
