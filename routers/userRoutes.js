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
import passport from "passport";
const userRouter = express.Router();

//Google Authentication
userRouter.get(
  "/google/signup",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

userRouter.get(
  "/google/callback",
  passport.authenticate("google"),
  async (req, res) => {
    try {
      res.json({
        message: "Done",
      });
    } catch (error) {
      res.json({
        status: error.message === "User Already Exist" ? `fail` : `error`,
        data: {
          message: error.message,
        },
      });
    }
  }
);

// userRouter.get(
//   "/google/callback",
//   passport.authenticate("google", (err, user, info) => {
//     if (err) {
//       console.log(err);
//     }

//     if (user) {
//       console.log("user", user);
//     }

//     console.log(info);
//   })
// );

// Custom Authenticatio
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
