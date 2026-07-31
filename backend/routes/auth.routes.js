import express from "express";
import { Router } from "express";
import { login, signUp, logout } from "../controllers/auth.controllers.js";

const authRouter = express(Router());
authRouter.post("/signup", signUp);
authRouter.post("/login", login);
authRouter.post("/logout", logout);

export default authRouter;
