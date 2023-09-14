import express from "express";
import morgan from "morgan";
import "dotenv/config";
import session from "express-session";
import cors from "cors";
import connectDB from "./config/dbConnector.js";
const app = express();
connectDB();
import swaggerUI from "swagger-ui-express";
import userRouter from "./routers/userRoutes.js";
import passport from "passport";
import googleAuth from "./config/googleAuth.js";
import MongoStore from "connect-mongo";
import YAML from "yamljs";
googleAuth(passport);
const swaggerDocument = YAML.load("./swagger/apiDocs.yaml");
const PORT = process.env.PORT;

//middleware
const corsOptions = {
  origin: process.env.DOMAIN_NAME,
  methods: "GET,POST",
  credentials: true, // If you need to allow sending cookies or authentication headers
};
app.use(cors(corsOptions));
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
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
