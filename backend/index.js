import express from "express";
import dotenv from "dotenv";
dotenv.config();
let app = express();

let port = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
