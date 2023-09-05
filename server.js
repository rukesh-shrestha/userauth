import express from "express";
import morgan from "morgan";
import "dotenv/config";
import connectDB from "./config/dbConnector.js";
import userRouter from "./routers/userRoutes.js";

const app = express();
connectDB();

const PORT = process.env.PORT;

//middleware
app.use(morgan("dev"));
app.use(express.json());
app.use("/api/users/", userRouter);

app.listen(PORT, () =>
  console.log(`The Application is Hosted on http://localhost:${PORT}`)
);
