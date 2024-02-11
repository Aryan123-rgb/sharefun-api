import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

/* ROUTES */
import authRouter from "./routes/authRoutes.js";
import postRouter from "./routes/postRoutes.js";
import userRouter from "./routes/userRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 8800;

const app = express();

mongoose.connect(process.env.DATABASE_URL).then(
  () => {
    console.log("Connected to MongoDB");
  },
  (err) => {
    console.log("Error connecting to MongoDB: ", err);
  }
);

app.use(helmet());
app.use(
  cors({
    credentials: true,
    origin: process.env.REACT_APP_URL,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

app.get("/", (req, res) => res.json("ok"));
app.use("/auth", authRouter);
app.use("/post", postRouter);
app.use("/users",userRouter);

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
