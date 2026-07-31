import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
dotenv.config();
let app = express();

let port = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());
app.use("/api", authRouter);

app.listen(port, () => {
  connectDB();
  console.log(`Server is running at port ${port}`);
});
