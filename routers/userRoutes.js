import express from "express";
import { UserRegistrationHandlier } from "../controllers/userController.js";
const userRouter = express.Router();

userRouter.post("/register", UserRegistrationHandlier);

export default userRouter;
