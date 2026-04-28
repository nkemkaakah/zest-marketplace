import { Router } from "express";
import { getMe, login, logout, register, updateMe } from "../controllers/authController.js";
import { requireAuth } from "../middleware/auth.js";

export const authRouter = Router();

authRouter.post("/auth/register", register);
authRouter.post("/auth/login", login);
authRouter.post("/auth/logout", logout);
authRouter.get("/auth/me", requireAuth, getMe);
authRouter.patch("/auth/me", requireAuth, updateMe);
