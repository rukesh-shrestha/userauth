import express from "express";
import { registerHandlier } from "../controllers/userController.js";
const userRouter = express.Router();

userRouter.get("/register", registerHandlier);

export default userRouter;
