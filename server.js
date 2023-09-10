import express from "express";
import morgan from "morgan";
import "dotenv/config";

import connectDB from "./config/dbConnector.js";
const app = express();
connectDB();
import userRouter from "./routers/userRoutes.js";
import passport from "passport";
import googleAuth from "./config/googleAuth.js";

googleAuth(passport);

const PORT = process.env.PORT;

//middleware
app.use(passport.initialize());
app.use(morgan("dev"));
app.use(express.json());
app.use("/api/users/auth", userRouter);

app.listen(PORT, () =>
  console.log(`The Application is Hosted on http://localhost:${PORT}`)
);
