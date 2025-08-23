import express from "express";
import { router } from "../routes/app.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://expense-tracker-mu-vert.vercel.app",
    credentials: true,
  })
);

app.use("/user", router);

export default app;
