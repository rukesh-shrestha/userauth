import express from "express";
import morgan from "morgan";
import "dotenv/config";
import userRouter from "./routers/userRoutes.js";

const app = express();

const PORT = process.env.PORT;

//middleware
app.use(morgan("dev"));
app.use("/api/v1", userRouter);

app.listen(PORT, () =>
  console.log(`The Application is Hosted on http://localhost:${PORT}`)
);
