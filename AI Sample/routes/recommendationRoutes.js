import express from "express";
import {
  getRecommendation,
  createRecommendation,
  listRecommendations,
} from "../controllers/recommendationController.js";

const router = express.Router();

router.get("/", listRecommendations);               // GET /api/recommendations
router.get("/:shape", getRecommendation);           // GET /api/recommendations/Oval
router.post("/", createRecommendation);             // POST /api/recommendations

export default router;
