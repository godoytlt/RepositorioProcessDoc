import express from "express";
import { registerUser, getMe } from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// rota de cadastro (sem repetir /users)
router.post("/register", registerUser);

// rota de perfil
router.get("/me", authMiddleware, getMe);

export default router;
