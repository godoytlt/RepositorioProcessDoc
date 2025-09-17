import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

// Para aceitar JSON no body
app.use(express.json());

// Rotas
app.use("/api/users", userRoutes);

export default app;
