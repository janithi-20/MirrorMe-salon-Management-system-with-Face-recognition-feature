import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import recommendationRoutes from "./routes/recommendationRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

// Health check
app.get("/", (_req, res) => res.send("FaceFit API running"));

// Routes
app.use("/api/recommendations", recommendationRoutes);

// Server start (static-only API, no MongoDB)
const PORT = process.env.PORT || 5000;
console.log("Starting API in STATIC DATA mode (DB disabled)");
app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`));
