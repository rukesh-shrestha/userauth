import express from "express";
import morgan from "morgan";
import "dotenv/config";
import session from "express-session";

import connectDB from "./config/dbConnector.js";
const app = express();
connectDB();
import userRouter from "./routers/userRoutes.js";
import passport from "passport";
import googleAuth from "./config/googleAuth.js";
import MongoStore from "connect-mongo";
googleAuth(passport);

const PORT = process.env.PORT;

//middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.CONNECTION_DATABASE_STRING,
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan("dev"));
app.use(express.json());
app.use("/api/users/auth", userRouter);

app.listen(PORT, () =>
  console.log(`The Application is Hosted on http://localhost:${PORT}`)
);
